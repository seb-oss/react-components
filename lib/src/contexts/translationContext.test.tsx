import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TranslationProvider, useTranslationContext } from "./translationContext";

enableFetchMocks();

const TestContext: React.FC<React.PropsWithChildren<{ data?: any; translationKey: string }>> = ({ data, translationKey }) => {
    const { isLoading, t } = useTranslationContext();
    return <div>{isLoading ? <span className="loading-screen">loading...</span> : <p className="translated-text">{t(translationKey, data) as string}</p>}</div>;
};

const MOCK_TRANSLATION_RESULT: any = { result: { content: { title_translation: "title_translation" } } };

describe("context: translationContext", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        fetchMock.resetMocks();
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should throw error when context used without provider", () => {
        expect(() => render(<TestContext translationKey="title_translation" />, container)).toThrowError("useTranslationContext must be used within a TranslationProvider");
    });

    it("Should show loading screen when fetching translation", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(MOCK_TRANSLATION_RESULT));
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url">
                    <TestContext translationKey="title_translation" />
                </TranslationProvider>,
                container
            );
            expect(container.querySelector(".loading-screen")).toBeDefined();
        });
        expect(container.querySelector(".loading-screen")).toBeNull();
    });

    it("Should get translation when key exist in translations", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(MOCK_TRANSLATION_RESULT));
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url">
                    <TestContext translationKey="title_translation" />
                </TranslationProvider>,
                container
            );
        });
        expect(container.querySelector(".translated-text").textContent).toEqual("title_translation");
    });

    it("Should interpolate translation when data exist", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ result: { content: { text_hello: "today is {date}" } } }));
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url">
                    <TestContext translationKey="text_hello" data={{ date: "2020-01-01" }} />
                </TranslationProvider>,
                container
            );
        });
        expect(container.querySelector(".translated-text").textContent).toEqual("today is 2020-01-01");
    });

    it("Should get empty string when translation does not exist", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url">
                    <TestContext translationKey="key_unknown" />
                </TranslationProvider>,
                container
            );
        });
        expect(container.querySelector(".translated-text").textContent).toEqual("");
    });

    it("Should map custom translation path when provided", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ response: MOCK_TRANSLATION_RESULT }));
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url" translationPath="response.result.content">
                    <TestContext translationKey="title_translation" />
                </TranslationProvider>,
                container
            );
        });
        expect(container.querySelector(".translated-text").textContent).toEqual("title_translation");
    });

    it("Should get fallback translation when translation fetch fails", async () => {
        fetchMock.mockRejectOnce();
        await act(async () => {
            render(
                <TranslationProvider url="https://translation_url" fallbackTranslation={{ title_translation: "title_fallbacktranslation" }}>
                    <TestContext translationKey="title_translation" />
                </TranslationProvider>,
                container
            );
        });
        expect(container.querySelector(".translated-text").textContent).toEqual("title_fallbacktranslation");
    });
});

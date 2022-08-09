import { render, screen, waitFor } from "@testing-library/react";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import { TranslationProvider, useTranslationContext } from "./translationContext";

enableFetchMocks();

const TestContext: React.FC<React.PropsWithChildren<{ data?: any; translationKey: string }>> = ({ data, translationKey }) => {
    const { isLoading, t } = useTranslationContext();
    return (
        <div>
            {isLoading ? (
                <span role="progressbar" className="loading-screen">
                    loading...
                </span>
            ) : (
                <p data-testid="translated-text" className="translated-text">
                    {t(translationKey, data) as string}
                </p>
            )}
        </div>
    );
};

const MOCK_TRANSLATION_RESULT: any = { result: { content: { title_translation: "title_translation" } } };

describe("context: translationContext", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    const consoleWarnSpy = jest.spyOn(console, "warn");

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("Should throw error when context used without provider", () => {
        consoleErrorSpy.mockImplementation(jest.fn());
        expect(() => render(<TestContext translationKey="title_translation" />)).toThrowError("useTranslationContext must be used within a TranslationProvider");
        consoleErrorSpy.mockClear();
    });

    it("Should show loading screen when fetching translation", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(MOCK_TRANSLATION_RESULT));
        render(
            <TranslationProvider url="https://translation_url">
                <TestContext translationKey="title_translation" />
            </TranslationProvider>
        );
        await screen.findByRole("progressbar");
        await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument());
    });

    it("Should get translation when key exist in translations", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(MOCK_TRANSLATION_RESULT));
        render(
            <TranslationProvider url="https://translation_url">
                <TestContext translationKey="title_translation" />
            </TranslationProvider>
        );
        await screen.findByText("title_translation");
    });

    it("Should interpolate translation when data exist", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ result: { content: { text_hello: "today is {date}" } } }));
        render(
            <TranslationProvider url="https://translation_url">
                <TestContext translationKey="text_hello" data={{ date: "2020-01-01" }} />
            </TranslationProvider>
        );
        await screen.findByText("today is 2020-01-01");
    });

    it("Should get empty string when translation does not exist", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));
        render(
            <TranslationProvider url="https://translation_url">
                <TestContext translationKey="key_unknown" />
            </TranslationProvider>
        );
        await waitFor(() => expect(screen.queryByTestId("translated-text")).toHaveTextContent(""));
    });

    it("Should map custom translation path when provided", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ response: MOCK_TRANSLATION_RESULT }));
        render(
            <TranslationProvider url="https://translation_url" translationPath="response.result.content">
                <TestContext translationKey="title_translation" />
            </TranslationProvider>
        );
        await screen.findByText("title_translation");
    });

    it("Should get fallback translation when translation fetch fails", async () => {
        consoleWarnSpy.mockImplementation(jest.fn());
        fetchMock.mockRejectOnce();
        render(
            <TranslationProvider url="https://translation_url" fallbackTranslation={{ title_translation: "title_fallbacktranslation" }}>
                <TestContext translationKey="title_translation" />
            </TranslationProvider>
        );
        await screen.findByText("title_fallbacktranslation");
        consoleWarnSpy.mockClear();
    });
});

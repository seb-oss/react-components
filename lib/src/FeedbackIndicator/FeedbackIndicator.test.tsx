import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { FeedbackIndicator, IndicatorType } from ".";

type TestCase = { type: IndicatorType; value: number };

describe("Component: FeedbackIndicator", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        const text: string = "some text";
        act(() => {
            render(<FeedbackIndicator type={null} message={text} />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains(`progress-${0}`)).toBeTruthy();
        act(() => {
            render(<FeedbackIndicator type="danger" message={text} />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.textContent).toEqual(text);
    });

    describe("Should render with all indicator types", () => {
        const types: Array<TestCase> = [
            { type: "danger", value: 10 },
            { type: "warning", value: 50 },
            { type: "success", value: 100 },
            { type: "unsupported" as any, value: 0 },
        ];
        types.map((testCase: TestCase) => {
            test(`- ${testCase.type}`, () => {
                act(() => {
                    render(<FeedbackIndicator type={testCase.type} />, container);
                });
                expect(container.firstElementChild.classList.contains(`progress-${testCase.value}`)).toBeTruthy();
            });
        });
    });

    it("Should render with child wrapper mode", () => {
        act(() => {
            render(
                <FeedbackIndicator type="danger">
                    <div id="test">test</div>
                </FeedbackIndicator>,
                container
            );
        });
        expect(container.firstElementChild.classList.contains("wrapper-indicator")).toBeTruthy();
        expect(container.querySelector("#test")).not.toBeNull();
    });
});

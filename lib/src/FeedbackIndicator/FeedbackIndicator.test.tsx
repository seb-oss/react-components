import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { FeedbackIndicator } from ".";
import { IndicatorType } from "./FeedbackIndicator";

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

    it("Should return non HTML elements", () => {
        const content: string = "TEST";
        act(() => {
            render(
                <FeedbackIndicator type="danger" message="message">
                    {content}
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild).toBeNull();
        expect(container.textContent).toContain(content);
    });

    it("Should apply classes correctly to its child", () => {
        const errorMessage: string = "my error message";
        act(() => {
            render(
                <FeedbackIndicator type="danger" message={errorMessage}>
                    <p>test</p>
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("p");
        expect(container.firstElementChild.classList.contains("rc-d")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("feedback")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("feedback-10")).toBeTruthy();

        expect(container.lastElementChild.tagName.toLowerCase()).toEqual("p");
        expect(container.lastElementChild.classList.contains("rc-d")).toBeTruthy();
        expect(container.lastElementChild.classList.contains("feedback-message")).toBeTruthy();
        expect(container.lastElementChild.textContent).toEqual(errorMessage);
    });

    describe("Supported themes", () => {
        const testCases: { theme: IndicatorType; expected: string }[] = [
            { theme: "danger", expected: "feedback-10" },
            { theme: "warning", expected: "feedback-50" },
            { theme: "success", expected: "feedback-100" },
            { theme: "unknown" as any, expected: "feedback-0" },
        ];

        testCases.forEach((testCase) =>
            test(testCase.theme, () => {
                act(() => {
                    render(
                        <FeedbackIndicator type={testCase.theme} message="message">
                            <p>test</p>
                        </FeedbackIndicator>,
                        container
                    );
                });
                expect(container.firstElementChild.classList.contains(testCase.expected)).toBeTruthy();
            })
        );
    });

    it("Should not override the child's classname", () => {
        const childClassName: string = "childclassname";

        act(() => {
            render(
                <FeedbackIndicator type="danger">
                    <p className={childClassName}>test</p>
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild.classList.contains(childClassName)).toBeTruthy();
        expect(container.firstElementChild.classList.contains("feedback")).toBeTruthy();
    });

    it("Should allow rendering without border", () => {
        act(() => {
            render(
                <FeedbackIndicator type="danger" noBorder>
                    <p>test</p>
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild.classList.contains("no-border")).toBeTruthy();
    });

    it("Should not crash when passing no children", () => {
        act(() => {
            render(<FeedbackIndicator type="danger" />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should wrap children with a div if received more than one", () => {
        act(() => {
            render(
                <FeedbackIndicator type="danger">
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
        expect(container.firstElementChild.classList.contains("feedback")).toBeTruthy();
    });

    it("Should have no effect if no type is passed", () => {
        act(() => {
            render(
                <FeedbackIndicator type={null}>
                    <p>test</p>
                </FeedbackIndicator>,
                container
            );
        });

        expect(container.firstElementChild.classList.contains("feedback")).toBeFalsy();
    });
});

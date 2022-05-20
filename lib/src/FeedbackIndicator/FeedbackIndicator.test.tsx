import { render, screen } from "@testing-library/react";
import React from "react";
import { FeedbackIndicator } from ".";
import { IndicatorType } from "./FeedbackIndicator";

describe("Component: FeedbackIndicator", () => {
    function getFeedbackWrapper(): ChildNode {
        return screen.getByRole("alert").previousSibling;
    }

    it("Should return non HTML elements", () => {
        const content: string = "TEST";
        render(
            <FeedbackIndicator type="danger" message="message">
                {content}
            </FeedbackIndicator>
        );
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it("Should apply classes correctly to its child", () => {
        const errorMessage: string = "my error message";
        render(
            <FeedbackIndicator type="danger" message={errorMessage}>
                <p>test</p>
            </FeedbackIndicator>
        );
        const alertElement: HTMLElement = screen.getByRole("alert");
        expect(alertElement).toHaveTextContent(errorMessage);
        expect(getFeedbackWrapper()).toHaveClass("feedback-10");
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
                render(
                    <FeedbackIndicator type={testCase.theme} message="message">
                        <p>test</p>
                    </FeedbackIndicator>
                );
                expect(getFeedbackWrapper()).toHaveClass(testCase.expected);
            })
        );
    });

    it("Should not override the child's classname", () => {
        const childClassName: string = "childclassname";
        render(
            <FeedbackIndicator type="danger">
                <p className={childClassName}>test</p>
            </FeedbackIndicator>
        );
        expect(screen.getByText("test")).toHaveClass(childClassName);
    });

    it("Should allow rendering without border", () => {
        render(
            <FeedbackIndicator type="danger" noBorder>
                <p>test</p>
            </FeedbackIndicator>
        );
        expect(getFeedbackWrapper()).toHaveClass("no-border");
    });

    it("Should not crash when passing no children", () => {
        expect(() => render(<FeedbackIndicator type="danger" />)).not.toThrowError();
    });

    it("Should wrap children with a div if received more than one", () => {
        render(
            <FeedbackIndicator type="danger">
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </FeedbackIndicator>
        );
        expect(getFeedbackWrapper().nodeName).toEqual("DIV");
    });

    it("Should have no effect if no type is passed", () => {
        render(
            <FeedbackIndicator type={null}>
                <p>test</p>
            </FeedbackIndicator>
        );
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
});

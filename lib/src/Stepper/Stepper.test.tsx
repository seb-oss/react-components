import React from "react";
import { Stepper, StepperProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

type OnchangeTestCase = {
    statement: string;
    triggerEvent: () => void;
};

describe("Component: Stepper", () => {
    let container: HTMLDivElement = null;
    const defaultProps: StepperProps = {
        value: 1,
        onIncrease: jest.fn(),
        onDecrease: jest.fn(),
        min: 1,
        max: 6,
    };

    const renderComponent = (props: StepperProps = defaultProps) => {
        act(() => {
            render(<Stepper {...props} />, container);
        });
    };

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
        renderComponent();
        expect(container).toBeDefined();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "myStepperClass";
        const id: string = "myStepperId";
        renderComponent({ ...defaultProps, className, id });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should pass down the id to the html input component", () => {
        const id: string = "myStepperId";
        renderComponent({ ...defaultProps, id });
        expect(container.querySelector("input").getAttribute("id")).toBe(id);
    });

    it("Should render label", () => {
        const label: string = "Stepper label";
        renderComponent({ ...defaultProps, label });
        expect(container.querySelector(".custom-label")).not.toBeNull();
        expect(container.querySelector(".custom-label").innerHTML).toEqual("Stepper label");
    });

    it("Should disable decrement if value is min and disable increment if value is max", () => {
        renderComponent();
        expect(container.querySelector(".stepper-decrement").classList).toContain("disabled");
        Simulate.click(container.querySelector(".stepper-decrement"));
        expect(defaultProps.onDecrease).not.toBeCalled();
        renderComponent({ ...defaultProps, value: defaultProps.max });
        expect(container.querySelector(".stepper-increment").classList).toContain("disabled");
        Simulate.click(container.querySelector(".stepper-increment"));
        expect(defaultProps.onIncrease).not.toBeCalled();
    });

    describe("Should fire onIncrease function", () => {
        const newProps: StepperProps = { ...defaultProps, value: 3 };
        const testCases: Array<OnchangeTestCase> = [
            { statement: "on + button clicked", triggerEvent: () => Simulate.click(container.querySelector(".stepper-increment")) },
            { statement: "on arrow up button pressed", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "ArrowUp" }) },
            { statement: "on arrow right button click", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "ArrowRight" }) },
            { statement: "on home button click", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "Home" }) },
        ];
        testCases.forEach((testCase: OnchangeTestCase) => {
            it(testCase.statement, () => {
                renderComponent(newProps);
                testCase.triggerEvent();
                expect(newProps.onIncrease).toBeCalled();
            });
        });
    });

    describe("Should fire onDecrease function", () => {
        const newProps: StepperProps = { ...defaultProps, value: 3 };
        const testCases: Array<OnchangeTestCase> = [
            { statement: "on - button clicked", triggerEvent: () => Simulate.click(container.querySelector(".stepper-decrement")) },
            { statement: "on arrow down button pressed", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "ArrowDown" }) },
            { statement: "on arrow left button click", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "ArrowLeft" }) },
            { statement: "on end button click", triggerEvent: () => Simulate.keyDown(container.querySelector(".stepper-preview"), { key: "End" }) },
        ];
        testCases.forEach((testCase: OnchangeTestCase) => {
            it(testCase.statement, () => {
                renderComponent(newProps);
                testCase.triggerEvent();
                expect(newProps.onDecrease).toBeCalled();
            });
        });
    });

    it("Should render the element as disabled when disabled is set to true", () => {
        renderComponent({ ...defaultProps, disabled: true });
        expect(container.querySelector(".stepper-container").classList).toContain("disabled");
        expect(container.querySelector("input").hasAttribute("disabled")).toBeTruthy();
    });
});

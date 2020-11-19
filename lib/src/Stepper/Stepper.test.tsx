import React from "react";
import { shallow, ReactWrapper, mount } from "enzyme";
import { Stepper, StepperProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: Stepper", () => {
    let container: HTMLDivElement = null;
    const props = {
        value: 1,
        onIncrease: jest.fn(),
        onDecrease: jest.fn(),
        min: 1,
        max: 6,
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
        act(() => {
            render(<Stepper {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "myStepperClass";
        const id: string = "myStepperId";
        act(() => {
            render(<Stepper {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should pass down the id to the html input component", () => {
        const id: string = "myStepperId";
        act(() => {
            render(<Stepper {...props} id={id} />, container);
        });
        expect(container.querySelector("input").getAttribute("id")).toBe(id);
    });

    it("Should render label", () => {
        const label: string = "Stepper label";
        act(() => {
            render(<Stepper {...props} label={label} />, container);
        });
        expect(container.querySelector(".custom-label")).not.toBeNull();
        expect(container.querySelector(".custom-label").innerHTML).toEqual("Stepper label");
    });

    it("Should disable decrement if value is min and disable increment if value is max", () => {
        act(() => {
            render(<Stepper {...props} />, container);
        });
        expect(container.querySelector(".stepper-decrement").classList).toContain("disabled");
        act(() => {
            render(<Stepper {...props} value={props.max} />, container);
        });
        expect(container.querySelector(".stepper-increment").classList).toContain("disabled");
    });

    it("Should fire onIncrease on onDecrese when clicked", () => {
        act(() => {
            render(<Stepper {...props} value={3} />, container);
        });
        Simulate.click(container.querySelector(".stepper-increment"));
        expect(props.onIncrease).toBeCalled();
        Simulate.click(container.querySelector(".stepper-decrement"));
        expect(props.onDecrease).toBeCalled();
    });

    it("Should render the element as disabled when disabled is set to true", () => {
        act(() => {
            render(<Stepper {...props} disabled={true} />, container);
        });
        expect(container.querySelector(".stepper-container").classList).toContain("disabled");
        expect(container.querySelector("input").hasAttribute("disabled")).toBeTruthy();
    });

    it("Should render warning and error message when passed", () => {
        act(() => {
            render(<Stepper {...props} disabled={true} hint="error" />, container);
        });
        expect(container.querySelector(".progress-feedback").classList).toContain("show");
    });
});

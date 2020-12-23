import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ToggleSelectorItem, ToggleSelectorItemProps } from "./ToggleSelectorItem";

describe("Component: ToggleSelectorItem", () => {
    let container: HTMLDivElement = null;
    const props: ToggleSelectorItemProps = {
        name: "toggle",
        onChange: jest.fn(),
        value: "bungalow",
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllMocks();
    });

    it("Should render simple toggle selector", () => {
        act(() => {
            render(<ToggleSelectorItem {...props} />, container);
        });
        expect(container.querySelector(".rc.toggle-selector-item")).not.toBeNull();
    });

    it("Should disable whole selector", () => {
        act(() => {
            render(<ToggleSelectorItem {...props} disabled />, container);
        });
        expect(container.querySelector(".disabled")).not.toBeNull();
    });

    it("Should not trigger any changes when item is disabled", () => {
        act(() => {
            render(<ToggleSelectorItem {...props} disabled />, container);
        });
        act(() => {
            Simulate.click(container.querySelector(".rc.toggle-selector-item").querySelectorAll(".disabled")[0]);
        });
        expect(props.onChange).not.toBeCalled();
    });

    it("Should trigger onChange when item is selected", () => {
        act(() => {
            render(<ToggleSelectorItem {...props} />, container);
        });
        act(() => {
            const inputField: HTMLInputElement = container.querySelector(".rc.toggle-selector-item").querySelector(`input[name="${props.name}"]`);
            inputField.checked = true;
            Simulate.change(inputField);
        });
        expect(props.onChange).toBeCalled();
    });

    it("Should trigger onChange when item is selected using enter or spacebar", () => {
        act(() => {
            render(<ToggleSelectorItem {...props} />, container);
        });
        act(() => {
            const buttonField: HTMLInputElement = container.querySelector(".rc.toggle-selector-item > .btn");
            Simulate.keyDown(buttonField, { keyCode: 32 });
        });
        expect(props.onChange).toBeCalled();
        act(() => {
            const buttonField: HTMLInputElement = container.querySelector(".rc.toggle-selector-item > .btn");
            Simulate.keyDown(buttonField, { keyCode: 13 });
        });
        expect(props.onChange).toBeCalled();
    });
});

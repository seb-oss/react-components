import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ToggleSelector, ToggleSelectorProps } from ".";
import { ToggleSelectorItemProps } from "./ToggleSelectorItem";

describe("Component: ToggleSelector", () => {
    let container: HTMLDivElement = null;
    const props: ToggleSelectorProps = {
        name: "toggle",
        onChange: jest.fn(),
        value: null,
        list: [
            { label: "Bungalow", value: "bungalow", icon: <svg /> },
            { label: "Apartment", value: "apartment" },
            { label: "Hotel", value: "hotel", disabled: true, icon: <svg /> },
        ],
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
            render(<ToggleSelector {...props} />, container);
        });
        expect(container.querySelector(".rc.toggle-selector")).not.toBeNull();
    });

    it("Should disable whole selector", () => {
        act(() => {
            render(<ToggleSelector {...props} disabled />, container);
        });
        expect(container.querySelector(".rc.toggle-selector").querySelectorAll(".disabled").length).toBe(props.list.length);
    });

    it("Should able to disable selector item individually", () => {
        act(() => {
            render(<ToggleSelector {...props} />, container);
        });
        const disabledItemLength: number = props.list.filter(({ disabled }: ToggleSelectorItemProps) => disabled).length;
        expect(container.querySelector(".rc.toggle-selector").querySelectorAll(".disabled").length).toBe(disabledItemLength);
    });

    it("Should not trigger any changes when item is disabled", () => {
        act(() => {
            render(<ToggleSelector {...props} disabled />, container);
        });
        act(() => {
            Simulate.click(container.querySelector(".rc.toggle-selector").querySelectorAll(".disabled")[0]);
        });
        expect(props.onChange).not.toBeCalled();
    });

    it("Should trigger onChange when item is selected", () => {
        act(() => {
            render(<ToggleSelector {...props} />, container);
        });
        act(() => {
            const inputField: HTMLInputElement = container.querySelector(".rc.toggle-selector-item").querySelector(`input[name="${props.name}"]`);
            inputField.checked = true;
            Simulate.change(inputField);
        });
        expect(props.onChange).toBeCalled();
    });

    it("Should able to select multiple item", () => {
        const newProps: ToggleSelectorProps = {
            ...props,
            value: props.list.filter(({ disabled }: ToggleSelectorItemProps) => !disabled).map(({ value }: ToggleSelectorItemProps) => value),
            multiple: true,
        };
        act(() => {
            render(<ToggleSelector {...newProps} />, container);
        });
        expect(container.querySelector(".rc.toggle-selector").querySelectorAll(".checked").length).toBe(newProps.value.length);
    });

    it("Should trigger onChange when item is selected in multiple mode", () => {
        const newProps: ToggleSelectorProps = {
            ...props,
            value: props.list.filter(({ disabled }: ToggleSelectorItemProps) => !disabled).map(({ value }: ToggleSelectorItemProps) => value),
            multiple: true,
        };
        let finalValue: Array<string> = [];
        act(() => {
            render(<ToggleSelector {...newProps} />, container);
        });
        act(() => {
            const inputField: HTMLInputElement = container.querySelector(".rc.toggle-selector-item").querySelector(`input[name="${props.name}"]`);
            inputField.checked = !inputField.checked;
            Simulate.change(inputField);
        });
        container.querySelectorAll(".rc.toggle-selector-item").forEach((item) => {
            const inputField: HTMLInputElement = item.querySelector(`input[name="${props.name}"]`);
            if (inputField.checked) {
                finalValue.push(inputField.value);
            }
        });
        expect(props.onChange).toBeCalledWith(finalValue);
    });

    it("Should trigger onChange when item is selected using enter or spacebar", () => {
        act(() => {
            render(<ToggleSelector {...props} />, container);
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

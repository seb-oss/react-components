import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Datepicker, DatepickerProps } from ".";
import { advanceTo, clear } from "jest-date-mock";

describe("Component: Datepicker", () => {
    let container: HTMLDivElement = null;

    const props: DatepickerProps = {
        value: new Date(),
        onChange: jest.fn(),
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
            render(<Datepicker {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should render and pass custom class", () => {
        const className: string = "myDatepickerClass";
        act(() => {
            render(<Datepicker {...{ ...props, className }} />, container);
        });
        expect(container).toBeDefined();
        expect(container.querySelectorAll(`.${className}`).length).toEqual(1);
    });

    it("Should pass any other native html prop", () => {
        const id: string = "my-id";

        act(() => {
            render(<Datepicker {...{ ...props, id }} />, container);
        });
        expect(container).toBeDefined();

        expect(container.firstElementChild);
        expect(container.firstElementChild.classList.contains("seb-datepicker-native")).toBeTruthy();
        expect(container.firstElementChild.id).toEqual(id);

        act(() => {
            render(<Datepicker {...{ ...props, id, forceCustom: true }} />, container);
        });

        const dayPicker: HTMLInputElement = container.querySelector<HTMLInputElement>(`div.input-group > input[type="number"]`);
        expect(dayPicker).toBeTruthy();
        expect(dayPicker.id).toEqual(id);
    });

    it("Should pass wrapper and select props for custom datepicker and ignore for native picker", () => {
        const wrapperProps: DatepickerProps["wrapperProps"] = { className: "test123" };
        const customPickerSelectProps: DatepickerProps["customPickerSelectProps"] = { className: "selectTest123" };
        act(() => {
            render(<Datepicker {...{ ...props, forceCustom: true, wrapperProps, customPickerSelectProps }} />, container);
        });

        const wrapperSelector: string = `div.input-group.${wrapperProps.className}`;
        const selectElementSelector: string = `div.input-group.${wrapperProps.className}>select.custom-select.${customPickerSelectProps.className}`;

        expect(container.querySelectorAll<HTMLElement>(wrapperSelector).length).toBeTruthy();
        expect(container.querySelectorAll<HTMLElement>(selectElementSelector).length).toBeTruthy();

        act(() => {
            render(<Datepicker {...{ ...props, forceCustom: false, wrapperProps, customPickerSelectProps }} />, container);
        });

        expect(container.querySelectorAll<HTMLElement>(wrapperSelector).length).toBeFalsy();
        expect(container.querySelectorAll<HTMLElement>(selectElementSelector).length).toBeFalsy();
    });

    it("Should fire change event when component value is changed", () => {
        act(() => {
            render(<Datepicker {...props} />, container);
        });

        Simulate.change(container.querySelector<HTMLInputElement>("input"));
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should enable disabled when disabled prop is set to true", () => {
        act(() => {
            render(<Datepicker {...props} disabled />, container);
        });
        expect(container.firstElementChild.hasAttribute("disabled")).toBe(true);
    });

    it("Should ignore timezone info from date and only respect the year, month and day", () => {
        const [year, month, day] = [2015, 11, 25];
        // mock change system date to 2015-25-11 midnight!
        advanceTo(new Date(year, month, day, 0, 0, 0));
        const value: Date = new Date();
        act(() => {
            render(<Datepicker {...{ ...props, value }} />, container);
        });

        expect(container.querySelector<HTMLInputElement>("input").value).toEqual(`${year}-${month + 1}-${day}`);
        // change back to correct system date!
        clear();
    });
});

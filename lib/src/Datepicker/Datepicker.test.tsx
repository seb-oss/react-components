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

        const value = "2010-01-01";
        const inputElement: HTMLInputElement = container.querySelector<HTMLInputElement>("input.seb-datepicker-native");
        const event: any = { target: { value } };
        Simulate.change(inputElement, event);
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should fire change event with null when component value is out of range and with latest value when in range", () => {
        const [min, max]: [Date, Date] = [new Date(props.value.getFullYear() - 10, 1, 1), new Date(props.value.getFullYear() + 10, 1, 1)];
        act(() => {
            render(<Datepicker {...props} min={max} />, container);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} max={min} />, container);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={min} max={min} />, container);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={max} max={max} />, container);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={min} max={max} />, container);
        });

        expect(props.onChange).toHaveBeenCalled();
        const tzoffset: number = new Date().getTimezoneOffset() * 60000;
        const expectedDate: string = new Date(Date.now() - tzoffset).toISOString()?.substr(0, 10) || "";
        expect(container.querySelector<HTMLInputElement>("input").value).toEqual(expectedDate);

        act(() => {
            render(<Datepicker {...props} min={min} max={max} forceCustom />, container);
        });

        expect(props.onChange).toHaveBeenCalled();
        expect(container.querySelector<HTMLInputElement>("input.seb-datepicker-custom-day").value).toEqual(props.value.getDate().toString());
        expect(container.querySelector<HTMLInputElement>("select.seb-datepicker-custom-month").value).toEqual(`${props.value.getMonth() + 1}`);
        expect(container.querySelector<HTMLInputElement>("input.seb-datepicker-custom-year").value).toEqual(props.value.getFullYear().toString());
    });

    it("should support fallback custom picker", () => {
        act(() => {
            render(<Datepicker {...props} forceCustom />, container);
        });

        const dayElement: HTMLInputElement = container.querySelector("input.seb-datepicker-custom-day");
        const dayEvent: any = { target: { value: "27" } };
        act(() => {
            Simulate.change(dayElement, dayEvent);
        });

        expect(dayElement.value).toEqual("27");
        expect(props.onChange).toHaveBeenCalled();

        const monthElement: HTMLSelectElement = container.querySelector("select.seb-datepicker-custom-month");
        const monthEvent: any = { target: { value: "12" } };
        act(() => {
            Simulate.change(monthElement, monthEvent);
        });

        expect(monthElement.value).toEqual("12");
        expect(props.onChange).toHaveBeenCalled();

        const yearElement: HTMLInputElement = container.querySelector("input.seb-datepicker-custom-year");
        const yearEvent: any = { target: { value: "2030" } };
        act(() => {
            Simulate.change(yearElement, yearEvent);
        });

        expect(yearElement.value).toEqual("2030");
        expect(props.onChange).toHaveBeenCalled();
    });

    it("should fire null for invalid input on custom picker", () => {
        act(() => {
            render(<Datepicker {...props} forceCustom />, container);
        });

        const dayElement: HTMLInputElement = container.querySelector("input.seb-datepicker-custom-day");
        const dayEvent: any = { target: { value: "ABC" } };
        act(() => {
            Simulate.change(dayElement, dayEvent);
        });

        expect(dayElement.value).toEqual("");
        expect(props.onChange).toHaveBeenCalledWith(null);
    });

    it("Should use default locale when unknown locale code provided", () => {
        act(() => {
            render(<Datepicker {...props} localeCode="%$#^%$@" forceCustom />, container);
        });

        const monthElement: HTMLSelectElement = container.querySelector("select.seb-datepicker-custom-month");

        expect(monthElement.querySelectorAll("option").item(0).innerHTML.toLowerCase()).toBe("month");
    });

    it("Should enable disabled when disabled prop is set to true", () => {
        act(() => {
            render(<Datepicker {...props} disabled />, container);
        });
        expect(container.firstElementChild.hasAttribute("disabled")).toBe(true);
    });

    it("Should support monthPicker", () => {
        act(() => {
            render(<Datepicker {...props} monthPicker />, container);
        });
        const inputElement: HTMLInputElement = container.querySelector<HTMLInputElement>("input.seb-datepicker-native");
        expect(inputElement.type).toBe("month");

        act(() => {
            render(<Datepicker {...props} monthPicker forceCustom />, container);
        });
        const dayElement: HTMLInputElement = container.querySelector("input.seb-datepicker-custom-day");
        const monthElement: HTMLSelectElement = container.querySelector("select.seb-datepicker-custom-month");
        const yearElement: HTMLInputElement = container.querySelector("input.seb-datepicker-custom-year");
        expect(dayElement).toBeFalsy();
        expect(monthElement).toBeTruthy();
        expect(yearElement).toBeTruthy();
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

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
        jest.clearAllMocks();
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
        const year: number = props.value.getFullYear();
        act(() => {
            render(<Datepicker {...props} min={max} />, container);
        });
        const yearElement: HTMLInputElement = container.querySelector("input");
        act(() => {
            Simulate.change(yearElement, { target: { value: new Date(year, 1, 1) } } as any);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} max={min} />, container);
        });

        act(() => {
            Simulate.change(yearElement, { target: { value: new Date(year + 11, 1, 1) } } as any);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={min} max={min} />, container);
        });

        act(() => {
            Simulate.change(yearElement, { target: { value: new Date(year, 1, 1) } } as any);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={max} max={max} />, container);
        });

        act(() => {
            Simulate.change(yearElement, { target: { value: new Date(year, 1, 1) } } as any);
        });

        expect(props.onChange).toHaveBeenCalledWith(null);

        act(() => {
            render(<Datepicker {...props} min={min} max={max} />, container);
        });

        act(() => {
            Simulate.change(yearElement, { target: { value: new Date(year, 1, 1) } } as any);
        });

        expect(props.onChange).toHaveBeenCalled();
        const tzoffset: number = new Date().getTimezoneOffset() * 60000;
        const expectedDate: string = new Date(Date.now() - tzoffset).toISOString()?.substr(0, 10) || "";
        expect(container.querySelector<HTMLInputElement>("input").value).toEqual(expectedDate);

        act(() => {
            render(<Datepicker {...props} min={min} max={max} forceCustom />, container);
        });

        act(() => {
            Simulate.change(container.querySelector("input.seb-datepicker-custom-year"), { target: { value: year } } as any);
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

    describe("Custom picker keyboard support", () => {
        function changeValue(element: Element, value: number) {
            act(() => Simulate.change(element, { target: { value } } as any));
        }

        function pressKey(element: Element, key: string): void {
            act(() => Simulate.keyDown(element, { key }));
        }

        function renderCustomDatepicker(customProps?: Partial<DatepickerProps>): void {
            act(() => render(<Datepicker {...{ ...props, value: new Date("2020-01-01"), ...customProps }} forceCustom />, container));
        }

        describe("Day picker", () => {
            function getDayInputElement(): HTMLInputElement {
                return container.querySelector(".seb-datepicker-custom-day");
            }

            beforeEach(() => {
                renderCustomDatepicker();
            });

            it("Should decrease day value when down arrow button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                expect(customDayInput.value).toEqual("1");
                pressKey(customDayInput, "ArrowDown");
                expect(customDayInput.value).toEqual("31");
                pressKey(customDayInput, "ArrowDown");
                expect(customDayInput.value).toEqual("30");
            });

            it("Should increase day value when up arrow button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                changeValue(customDayInput, 31);
                expect(customDayInput.value).toEqual("31");
                pressKey(customDayInput, "ArrowUp");
                expect(customDayInput.value).toEqual("1");
                pressKey(customDayInput, "ArrowUp");
                expect(customDayInput.value).toEqual("2");
            });

            it("Should decrease day value by 5 when page down arrow button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                expect(customDayInput.value).toEqual("1");
                pressKey(customDayInput, "PageDown");
                expect(customDayInput.value).toEqual("27");
                pressKey(customDayInput, "PageDown");
                expect(customDayInput.value).toEqual("22");
            });

            it("Should increase day value by 5 when page up arrow button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                changeValue(customDayInput, 31);
                expect(customDayInput.value).toEqual("31");
                pressKey(customDayInput, "PageUp");
                expect(customDayInput.value).toEqual("5");
                pressKey(customDayInput, "PageUp");
                expect(customDayInput.value).toEqual("10");
            });

            it("Should decrease day value to minimum day value when home button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                changeValue(customDayInput, 15);
                expect(customDayInput.value).toEqual("15");
                pressKey(customDayInput, "Home");
                expect(customDayInput.value).toEqual("1");
                pressKey(customDayInput, "Home");
                expect(customDayInput.value).toEqual("1");
            });

            it("Should increase day value to maximum day value when end button is pressed", () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                changeValue(customDayInput, 15);
                expect(customDayInput.value).toEqual("15");
                pressKey(customDayInput, "End");
                expect(customDayInput.value).toEqual("31");
                pressKey(customDayInput, "End");
                expect(customDayInput.value).toEqual("31");
            });
        });

        describe("Year picker", () => {
            const CURRENT_YEAR: number = new Date().getFullYear();

            function getYearInputElement(): HTMLInputElement {
                return container.querySelector(".seb-datepicker-custom-year");
            }

            it("Should decrease year value when down arrow button is pressed", () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "ArrowDown");
                expect(customYearInput.value).toEqual("2019");
                pressKey(customYearInput, "ArrowDown");
                expect(customYearInput.value).toEqual("2018");
            });

            it("Should increase year value when up arrow button is pressed", () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "ArrowUp");
                expect(customYearInput.value).toEqual("2021");
                pressKey(customYearInput, "ArrowUp");
                expect(customYearInput.value).toEqual("2022");
            });

            it("Should decrease year value by 5 when page down arrow button is pressed", () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "PageDown");
                expect(customYearInput.value).toEqual("2015");
                pressKey(customYearInput, "PageDown");
                expect(customYearInput.value).toEqual("2010");
            });

            it("Should increase year value by 5 when page up arrow button is pressed", () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "PageUp");
                expect(customYearInput.value).toEqual("2025");
                pressKey(customYearInput, "PageUp");
                expect(customYearInput.value).toEqual("2030");
            });

            it("Should decrease year value to default minimum year value when home button is pressed", () => {
                renderCustomDatepicker();
                const MIN_YEAR: string = `${CURRENT_YEAR - 200}`;
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "Home");
                expect(customYearInput.value).toEqual(MIN_YEAR);
                pressKey(customYearInput, "Home");
                expect(customYearInput.value).toEqual(MIN_YEAR);
            });

            it("Should decrease year value to custom minimum year value when home button is pressed", () => {
                renderCustomDatepicker({ min: new Date("2000-01-01") });
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "Home");
                expect(customYearInput.value).toEqual("2000");
                pressKey(customYearInput, "Home");
                expect(customYearInput.value).toEqual("2000");
            });

            it("Should increase year value to default maximum year value when end button is pressed", () => {
                renderCustomDatepicker();
                const MAX_YEAR: string = `${CURRENT_YEAR + 200}`;
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "End");
                expect(customYearInput.value).toEqual(MAX_YEAR);
                pressKey(customYearInput, "End");
                expect(customYearInput.value).toEqual(MAX_YEAR);
            });

            it("Should increase year value to custom maximum year value when end button is pressed", () => {
                renderCustomDatepicker({ max: new Date("2050-01-01") });
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                pressKey(customYearInput, "End");
                expect(customYearInput.value).toEqual("2050");
                pressKey(customYearInput, "End");
                expect(customYearInput.value).toEqual("2050");
            });
        });
    });
});

import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { advanceTo, clear } from "jest-date-mock";
import React from "react";
import { Datepicker, DatepickerProps } from ".";

describe("Component: Datepicker", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn");
    const props: DatepickerProps = {
        value: new Date(),
        onChange: jest.fn(),
        "aria-label": "Date picker",
    };

    function changeDate(date: string): void {
        fireEvent.change(screen.getByLabelText(props["aria-label"]), { target: { value: date } });
        fireEvent.blur(screen.getByLabelText(props["aria-label"]), { target: { value: date } });
    }

    async function changeValue(input: HTMLInputElement, value: string): Promise<void> {
        await userEvent.clear(input);
        await userEvent.type(input, value);
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should render", () => {
        render(<Datepicker {...props} />);
        expect(screen.getByLabelText(props["aria-label"])).toBeInTheDocument();
    });

    it("Should render and pass custom class", () => {
        const className = "my-custom-datepicker";
        render(<Datepicker {...{ ...props, className }} />);
        expect(screen.getByLabelText(props["aria-label"])).toHaveClass(className);
    });

    it("Should pass any other native html prop", () => {
        const id = "my-id";
        const { rerender }: RenderResult = render(<Datepicker {...{ ...props, id }} />);
        expect(screen.getByLabelText(props["aria-label"])).toHaveClass("seb-datepicker-native");
        expect(screen.getByLabelText(props["aria-label"])).toHaveAttribute("id", id);

        rerender(<Datepicker {...{ ...props, id, forceCustom: true }} />);
        expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
    });

    it("Should pass wrapper and select props for custom datepicker and ignore for native picker", () => {
        const wrapperProps: DatepickerProps["wrapperProps"] = { className: "my-custom-wrapper" };
        const customPickerSelectProps: DatepickerProps["customPickerSelectProps"] = { className: "my-custom-picker" };
        const { rerender }: RenderResult = render(<Datepicker {...{ ...props, forceCustom: true, wrapperProps, customPickerSelectProps }} />);
        expect(screen.getByRole("group")).toHaveClass(wrapperProps.className);
        expect(screen.getByRole("combobox")).toHaveClass(customPickerSelectProps.className);

        rerender(<Datepicker {...{ ...props, forceCustom: false, wrapperProps, customPickerSelectProps }} />);
        expect(screen.queryByRole("group")).not.toBeInTheDocument();
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });

    it("Should render when value prop is empty string", () => {
        render(<Datepicker {...props} value={"" as unknown as Date} />);
        expect(screen.getByLabelText(props["aria-label"])).toBeInTheDocument();
    });

    it("Should fire change event when component value is changed", () => {
        render(<Datepicker {...props} />);
        expect(props.onChange).not.toHaveBeenCalled();
        changeDate(`2000-01-01`);
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should fire change event with null when component value is out of range and with latest value when in range", async () => {
        const [min, max]: [Date, Date] = [new Date(props.value.getFullYear() - 10, 1, 1), new Date(props.value.getFullYear() + 10, 1, 1)];
        const year: number = props.value.getFullYear();
        const { rerender }: RenderResult = render(<Datepicker {...props} min={min} />);
        expect(props.onChange).not.toHaveBeenCalled();
        changeDate(`${year - 11}-01-01`);
        expect(props.onChange).toHaveBeenCalledTimes(2);
        expect(props.onChange).toHaveBeenLastCalledWith(null);

        rerender(<Datepicker {...props} max={max} />);
        changeDate(`${year + 11}-01-01`);
        expect(props.onChange).toHaveBeenCalledTimes(4);
        expect(props.onChange).toHaveBeenLastCalledWith(null);

        rerender(<Datepicker {...props} min={min} max={max} />);
        changeDate(`${year - 11}-01-01`);
        expect(props.onChange).toHaveBeenCalledTimes(6);
        expect(props.onChange).toHaveBeenLastCalledWith(null);
        changeDate(`${year + 11}-01-01`);
        expect(props.onChange).toHaveBeenCalledTimes(8);
        expect(props.onChange).toHaveBeenLastCalledWith(null);
        changeDate(`${year}-01-01`);
        expect(props.onChange).toHaveBeenCalledTimes(9);
    });

    it("should support fallback custom picker", async () => {
        render(<Datepicker {...props} forceCustom />);
        const [dayInput, yearInput]: Array<HTMLInputElement> = screen.getAllByRole("spinbutton");
        expect(props.onChange).not.toHaveBeenCalled();
        await changeValue(dayInput, "27");
        expect(dayInput).toHaveValue(27);
        expect(props.onChange).toHaveBeenCalled();

        jest.clearAllMocks();

        const monthInput: HTMLSelectElement = screen.getByRole("combobox");
        expect(props.onChange).not.toHaveBeenCalled();
        await userEvent.selectOptions(monthInput, "12");
        expect(monthInput).toHaveValue("12");
        expect(props.onChange).toHaveBeenCalled();

        jest.clearAllMocks();

        expect(props.onChange).not.toHaveBeenCalled();
        await changeValue(yearInput, "2030");
        expect(yearInput).toHaveValue(2030);
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should use default locale when unknown locale code provided", () => {
        consoleWarnSpy.mockImplementation(jest.fn());
        render(<Datepicker {...props} localeCode="%$#^%$@" forceCustom />);
        expect(screen.getByText("month")).toBeInTheDocument();
        consoleWarnSpy.mockClear();
    });

    it("Should enable disabled when disabled prop is set to true", () => {
        render(<Datepicker {...props} disabled />);
        expect(screen.getByLabelText(props["aria-label"])).toBeDisabled();
    });

    it("Should support monthPicker", () => {
        const { rerender }: RenderResult = render(<Datepicker {...props} monthPicker />);
        expect(screen.getByLabelText(props["aria-label"])).toBeInTheDocument();

        rerender(<Datepicker {...props} monthPicker forceCustom />);
        expect(screen.getByRole("combobox")).toHaveClass("seb-datepicker-custom-month");
        expect(screen.getByRole("spinbutton")).toHaveClass("seb-datepicker-custom-year");
    });

    it("Should ignore timezone info from date and only respect the year, month and day", () => {
        const [year, month, day]: Array<number> = [2015, 11, 25];
        // mock change system date to 2015-25-11 midnight!
        advanceTo(new Date(year, month, day, 0, 0, 0));
        const value: Date = new Date();
        render(<Datepicker {...{ ...props, value }} />);
        expect(screen.getByLabelText(props["aria-label"])).toHaveValue(`${year}-${month + 1}-${day}`);
        // change back to correct system date!
        clear();
    });

    describe("Custom picker keyboard support", () => {
        // function changeValue(element: Element, value: number) {
        //     act(() => Simulate.change(element, { target: { value } } as any));
        // }

        function renderCustomDatepicker(customProps?: Partial<DatepickerProps>): void {
            render(<Datepicker {...{ ...props, value: new Date("2020-01-01"), ...customProps }} forceCustom />);
        }

        describe("Day picker", () => {
            function getDayInputElement(): HTMLInputElement {
                const [dayInput]: Array<HTMLInputElement> = screen.getAllByRole<HTMLInputElement>("spinbutton");
                dayInput.focus();
                return dayInput;
            }

            beforeEach(() => {
                renderCustomDatepicker();
            });

            it("Should decrease day value when down arrow button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                expect(customDayInput.value).toEqual("1");
                await userEvent.keyboard("[ArrowDown]");
                expect(customDayInput.value).toEqual("31");
                await userEvent.keyboard("[ArrowDown]");
                expect(customDayInput.value).toEqual("30");
            });

            it("Should increase day value when up arrow button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                await changeValue(customDayInput, "31");
                expect(customDayInput.value).toEqual("31");
                await userEvent.keyboard("[ArrowUp]");
                expect(customDayInput.value).toEqual("1");
                await userEvent.keyboard("[ArrowUp]");
                expect(customDayInput.value).toEqual("2");
            });

            it("Should decrease day value by 5 when page down arrow button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                expect(customDayInput.value).toEqual("1");
                await userEvent.keyboard("[PageDown]");
                expect(customDayInput.value).toEqual("27");
                await userEvent.keyboard("[PageDown]");
                expect(customDayInput.value).toEqual("22");
            });

            it("Should increase day value by 5 when page up arrow button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                await changeValue(customDayInput, "31");
                expect(customDayInput.value).toEqual("31");
                await userEvent.keyboard("[PageUp]");
                expect(customDayInput.value).toEqual("5");
                await userEvent.keyboard("[PageUp]");
                expect(customDayInput.value).toEqual("10");
            });

            it("Should decrease day value to minimum day value when home button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                await changeValue(customDayInput, "15");
                expect(customDayInput.value).toEqual("15");
                await userEvent.keyboard("[Home]");
                expect(customDayInput.value).toEqual("1");
                await userEvent.keyboard("[Home]");
                expect(customDayInput.value).toEqual("1");
            });

            it("Should increase day value to maximum day value when end button is pressed", async () => {
                const customDayInput: HTMLInputElement = getDayInputElement();
                await changeValue(customDayInput, "15");
                expect(customDayInput.value).toEqual("15");
                await userEvent.keyboard("[End]");
                expect(customDayInput.value).toEqual("31");
                await userEvent.keyboard("[End]");
                expect(customDayInput.value).toEqual("31");
            });
        });

        describe("Year picker", () => {
            const CURRENT_YEAR: number = new Date().getFullYear();

            function getYearInputElement(): HTMLInputElement {
                const [, yearInput]: Array<HTMLInputElement> = screen.getAllByRole<HTMLInputElement>("spinbutton");
                yearInput.focus();
                return yearInput;
            }

            it("Should decrease year value when down arrow button is pressed", async () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[ArrowDown]");
                expect(customYearInput.value).toEqual("2019");
                await userEvent.keyboard("[ArrowDown]");
                expect(customYearInput.value).toEqual("2018");
            });

            it("Should increase year value when up arrow button is pressed", async () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[ArrowUp]");
                expect(customYearInput.value).toEqual("2021");
                await userEvent.keyboard("[ArrowUp]");
                expect(customYearInput.value).toEqual("2022");
            });

            it("Should decrease year value by 5 when page down arrow button is pressed", async () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[PageDown]");
                expect(customYearInput.value).toEqual("2015");
                await userEvent.keyboard("[PageDown]");
                expect(customYearInput.value).toEqual("2010");
            });

            it("Should increase year value by 5 when page up arrow button is pressed", async () => {
                renderCustomDatepicker();
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[PageUp]");
                expect(customYearInput.value).toEqual("2025");
                await userEvent.keyboard("[PageUp]");
                expect(customYearInput.value).toEqual("2030");
            });

            it("Should decrease year value to default minimum year value when home button is pressed", async () => {
                renderCustomDatepicker();
                const MIN_YEAR = `${CURRENT_YEAR - 200}`;
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[Home]");
                expect(customYearInput.value).toEqual(MIN_YEAR);
                await userEvent.keyboard("[Home]");
                expect(customYearInput.value).toEqual(MIN_YEAR);
            });

            it("Should decrease year value to custom minimum year value when home button is pressed", async () => {
                renderCustomDatepicker({ min: new Date("2000-01-01") });
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[Home]");
                expect(customYearInput.value).toEqual("2000");
                await userEvent.keyboard("[Home]");
                expect(customYearInput.value).toEqual("2000");
            });

            it("Should increase year value to default maximum year value when end button is pressed", async () => {
                renderCustomDatepicker();
                const MAX_YEAR = `${CURRENT_YEAR + 200}`;
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[End]");
                expect(customYearInput.value).toEqual(MAX_YEAR);
                await userEvent.keyboard("[End]");
                expect(customYearInput.value).toEqual(MAX_YEAR);
            });

            it("Should increase year value to custom maximum year value when end button is pressed", async () => {
                renderCustomDatepicker({ max: new Date("2050-01-01") });
                const customYearInput: HTMLInputElement = getYearInputElement();
                expect(customYearInput.value).toEqual("2020");
                await userEvent.keyboard("[End]");
                expect(customYearInput.value).toEqual("2050");
                await userEvent.keyboard("[End]");
                expect(customYearInput.value).toEqual("2050");
            });
        });
    });
});

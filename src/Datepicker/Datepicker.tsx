import * as React from "react";
import "./date-picker-style.scss";

// const calendarAltIcon: JSX.Element = (
//     <svg name="calendar-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//         <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z" />
//     </svg>
// );

export interface DatepickerProps {
    /** the value of the datepicker as a Date object */
    value: Date;
    /** On Change handler with the latest Date value */
    onChange: (value: Date) => void;
    /** Element placeholder */
    placeholder?: string;
    /** Element class name */
    className?: string;
    /** Property sets whether a datepicker is a month picker  */
    monthPicker?: boolean;
    /** Property sets whether SEB styled datepicker will be rendered despite the browser used */
    forceCustom?: boolean;
    /** Property sets whether datepicker is disabled */
    disabled?: boolean;
    /** Minimum range of date that can be selected */
    min?: Date;
    /** Maximum range of date that can be selected */
    max?: Date;
    /** Locale of datepicker */
    localeCode?: string;
}

interface UnitNames {
    month: string;
    day: string;
    year: string;
}

export const Datepicker: React.FunctionComponent<DatepickerProps> = (props: DatepickerProps): React.ReactElement<void> => {
    const { monthPicker, forceCustom, className, value, min, max, disabled, onChange } = props;

    const getInputRawValue = (value: Date, monthPicker: boolean): string => {
        return getStringFromDate(value, monthPicker);
    };

    const initCustomDay = (value: Date, monthPicker: boolean): number => {
        const inputRawValue: string = getInputRawValue(value, monthPicker);
        if (!!inputRawValue) {
            const value: number = monthPicker ? 1 : Number(inputRawValue.substr(8, 2));
            return value;
        }
        return null;
    };

    const [customDay, setCustomDay] = React.useState<number>(initCustomDay(value, monthPicker));

    const customPickerOrder: string[] = ["day", "month", "year"];
    const unitNames: UnitNames = {
        month: "Month",
        day: "Day",
        year: "Year",
    };

    const supportsInputOfType = (type: "date" | "month"): boolean => {
        const input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", type);

        const notADateValue: string = "not-a-date";
        input.setAttribute("value", notADateValue);

        return input.value !== notADateValue;
    };

    const isValidDate = (d: Date): boolean => {
        return !!(d && d instanceof Date && !isNaN(d.getTime()));
    };

    const getStringFromDate = (d: Date, monthPicker: boolean): string => {
        if (isValidDate(d)) {
            return d?.toISOString()?.substr(0, monthPicker ? 7 : 10) || "";
        } else {
            return "";
        }
    };

    const nativeClassNames = (value: Date, className: string): string => {
        return `form-control seb-datepicker-native${!isValidDate(value) ? "is-invalid" : ""}${!!className ? ` ${className}` : ""}`;
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value: changeEventValue } = e.target;
        const value: Date = new Date(changeEventValue);
        onChange(value);
    };

    const renderCustomDatepicker = (value: Date, monthPicker: boolean, customPickerOrder: string[], unitNames: UnitNames, disabled: boolean) => {
        const renderUnits: React.ReactNodeArray = [];
        for (let unit of customPickerOrder) {
            let unitIndex = customPickerOrder.indexOf(unit);

            switch (unit) {
                case "day":
                    renderUnits.push(
                        <input
                            style={{ display: monthPicker ? "none" : "inherit" }}
                            className={`form-control${!isValidDate(value) ? "is-invalid" : ""}`}
                            type="number"
                            min="1"
                            max="31"
                            placeholder={unitNames.day}
                            disabled={disabled}
                            value={customDay}
                        />
                    );
                    break;

                default:
                    break;
            }
        }
    };

    if (monthPicker) {
        if (!forceCustom && supportsInputOfType("month")) {
            return (
                <input
                    type="month"
                    className={nativeClassNames(value, className)}
                    min={getStringFromDate(min, monthPicker)}
                    max={getStringFromDate(max, monthPicker)}
                    value={getInputRawValue(value, monthPicker)}
                    disabled={disabled}
                    onChange={handleOnChange}
                />
            );
        }
    } else {
        if (!forceCustom && supportsInputOfType("date")) {
            return (
                <input
                    type="date"
                    className={nativeClassNames(value, className)}
                    min={getStringFromDate(min, monthPicker)}
                    max={getStringFromDate(max, monthPicker)}
                    value={getInputRawValue(value, monthPicker)}
                    disabled={disabled}
                    onChange={handleOnChange}
                />
            );
        }
    }

    return <>fallback datepicker</>;
};

import React from "react";
import "./date-picker-style.scss";
import { padNumber } from "./formatters";

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
    const { monthPicker, forceCustom, className, value, min, max, disabled, onChange, localeCode = "en" } = props;

    const isValidDate = React.useCallback((d: Date): boolean => {
        return !!(d && d instanceof Date && !isNaN(d.getTime()));
    }, []);

    const getStringFromDate = React.useCallback((d: Date, monthPicker: boolean): string => {
        return isValidDate(d) ? d?.toISOString()?.substr(0, monthPicker ? 7 : 10) || "" : "";
    }, [isValidDate]);

    const getInputRawValue = (value: Date, monthPicker: boolean): string => {
        return getStringFromDate(value, monthPicker);
    };

    const isDateInRange = (d: Date, min: Date, max: Date, success?: () => void, fail?: () => void): void => {
        if (!min && !max) {
            success && success();
        } else if (min && d >= min) {
            if (!max || (max && d <= max)) {
                success && success();
            } else {
                fail && fail();
            }
        } else if (max && d <= max) {
            if (!min || (min && d >= min)) {
                success && success();
            } else {
                fail && fail();
            }
        } else {
            fail && fail();
        }
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

    const handleChangeCustomDay = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const v: number = e.target?.value ? Number(e.target.value) : null;
        if (!monthPicker) {
            setCustomDay(v);
        }
    };

    const initCustomMonth = (value: Date, monthPicker: boolean): number => {
        const inputRawValue: string = getInputRawValue(value, monthPicker);
        if (!!inputRawValue) {
            const value: number = monthPicker ? 1 : Number(inputRawValue.substr(5, 2));
            return value;
        }
        return null;
    };

    const [customMonth, setCustomMonth] = React.useState<number>(initCustomMonth(value, monthPicker));

    const handleChangeCustomMonth = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const v: number = e.target?.value ? Number(e.target.value) : null;
        setCustomMonth(v);
    };

    const initCustomYear = (value: Date, monthPicker: boolean): number => {
        const inputRawValue: string = getInputRawValue(value, monthPicker);
        if (!!inputRawValue) {
            const value: number = monthPicker ? 1 : Number(inputRawValue.substr(0, 4));
            return value;
        }
        return null;
    };

    const [customYear, setCustomYear] = React.useState<number>(initCustomYear(value, monthPicker));

    const handleChangeCustomYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const v: number = e.target?.value ? Number(e.target.value) : null;
        setCustomYear(v);
    };

    React.useEffect(() => {
        const day: number = monthPicker ? 1 : customDay;
        const month: number = customMonth;
        const year: number = customYear;
        const dateString: string = `${padNumber(year, true)}-${padNumber(month)}-${padNumber(day)}`;
        const date: Date = new Date(dateString);
        const m: number = date.getMonth() + 1;
        if (date.getFullYear() === year && m === month && date.getDate() === day) {
            isDateInRange(
                date,
                min,
                max,
                () => {
                    onChange(date);
                },
                () => {
                    onChange(new Date(""));
                }
            );
        } else {
            onChange(new Date(""));
        }
    }, [monthPicker, customDay, customMonth, customYear, min, max]);

    const getRelativeTimeFormat = (code: string): any => {
        if ((Intl as any)["RelativeTimeFormat"]) {
            try {
                const rtf: any = new (Intl as any).RelativeTimeFormat(code);
                if (rtf) {
                    return rtf;
                }
            } catch (error) {
                return null;
            }
        }
        return null;
    };

    const getLocaleOrDefault = (localeCode: string): Intl.DateTimeFormat => {
        let locale: Intl.DateTimeFormat;
        try {
            locale = new Intl.DateTimeFormat(localeCode, { month: "long" });
        } catch (error) {
            locale = new Intl.DateTimeFormat("en", { month: "long" });
        }
        return locale;
    };

    const unitNames: UnitNames = {
        month: "Month",
        day: "Day",
        year: "Year",
    };

    const monthNames = () => {
        const date: Date = new Date(2012, 0, 5);
        const locale: Intl.DateTimeFormat = getLocaleOrDefault(localeCode);

        const names: string[] = [unitNames.month];
        [...Array(12)].map((_, i) => {
            date.setMonth(i);
            names.push(locale.format(date));
        });
        return names;
    };

    const customPickerOrder = () => {
        const date: Date = new Date(2012, 0, 5);
        const rtf: any = getRelativeTimeFormat(localeCode);
        let order: string[] = ["day", "month", "year"];
        const locale: Intl.DateTimeFormat = getLocaleOrDefault(localeCode);

        const localeDateString: string = locale.format(date);
        order.sort((a, b) => {
            const positions: { day: number; month: number; year: number } = {
                day: localeDateString?.search(/5/g) || 0,
                month: localeDateString?.search(/1/g) || 1,
                year: localeDateString?.search(/2012/g) || 2,
            };
            return positions[a] - positions[b];
        });

        order?.map((unit) => {
            unitNames[unit] =
                rtf
                    ?.formatToParts(1, unit)
                    ?.filter((x) => x.type === "literal")[1]
                    ?.value?.trim() || unit;
        });

        return order;
    };

    const supportsInputOfType = (type: "date" | "month"): boolean => {
        if (typeof document !== "undefined") {
            const input: HTMLInputElement = document.createElement("input");
            input.setAttribute("type", type);

            const notADateValue: string = "not-a-date";
            input.setAttribute("value", notADateValue);

            return input.value !== notADateValue;
        }

        return false;
    };

    const nativeClassNames = (value: Date, className: string): string => {
        return `form-control seb-datepicker-native${!isValidDate(value) ? "is-invalid" : ""}${!!className ? ` ${className}` : ""}`;
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value: changeEventValue } = e.target;
        const value: Date = new Date(changeEventValue);
        onChange(value);
    };

    const renderCustomDatepicker = (value: Date, monthPicker: boolean, customPickerOrder: string[], unitNames: UnitNames, disabled: boolean, monthNames: string[]) => {
        const order: string[] = monthPicker ? [...customPickerOrder.filter((x: string) => x !== "day")] : customPickerOrder;
        return (
            <div className={`input-group${!!className ? ` ${className}` : ""}`}>
                {order?.map((unit: string, unitIndex: number) => {
                    switch (unit) {
                        case "day":
                            return (
                                <input
                                    key={unitIndex}
                                    className={`form-control${!isValidDate(value) ? " is-invalid" : ""}`}
                                    type="number"
                                    min="1"
                                    max="31"
                                    placeholder={unitNames.day}
                                    disabled={disabled}
                                    value={customDay}
                                    onChange={handleChangeCustomDay}
                                />
                            );

                        case "month":
                            return (
                                <select
                                    key={unitIndex}
                                    className={`custom-select${!isValidDate(value) ? " is-invalid" : ""}${unitIndex === 0 ? " rounded-left" : ""}${
                                        unitIndex === customPickerOrder.length - 1 ? " rounded-right" : ""
                                    }`}
                                    value={customMonth}
                                    disabled={disabled}
                                    onChange={handleChangeCustomMonth}
                                >
                                    {monthNames.map((month: string, i: number) => {
                                        return (
                                            <option key={i} disabled={disabled || i === 0} value={i}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                            );

                        case "year":
                            return (
                                <input
                                    key={unitIndex}
                                    className={`form-control${!isValidDate(value) ? " is-invalid" : ""}`}
                                    type="number"
                                    min="1"
                                    placeholder={unitNames.year}
                                    disabled={disabled}
                                    value={customYear}
                                    onChange={handleChangeCustomYear}
                                />
                            );
                        default:
                            break;
                    }
                })}
            </div>
        );
    };

    if (monthPicker && !forceCustom && supportsInputOfType("month")) {
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
    } else if (!forceCustom && supportsInputOfType("date")) {
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
    } else {
        return <>{renderCustomDatepicker(value, monthPicker, customPickerOrder(), unitNames, disabled, monthNames())}</>;
    }

    // return (
    //     <>fallback</>
    // )
};

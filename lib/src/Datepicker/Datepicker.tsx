import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";
import "./datepicker.scss";
import { padNumber } from "./formatters";

interface OverriddenNativeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    value: any;
    min?: any;
    max?: any;
    onChange: any;
}

export interface DatepickerProps extends OverriddenNativeProps {
    /** the value of the datepicker as a Date object */
    value: Date;
    /** On Change handler with the latest Date value */
    onChange: (value: Date) => void;
    /** Property sets whether a datepicker is a month picker  */
    monthPicker?: boolean;
    /** Property sets whether SEB styled datepicker will be rendered despite the browser used */
    forceCustom?: boolean;
    /** Minimum range of date that can be selected */
    min?: Date;
    /** Maximum range of date that can be selected */
    max?: Date;
    /** Locale of datepicker */
    localeCode?: string;
    /** Div wrapper props. NOTE: customPicker ONLY! */
    wrapperProps?: JSX.IntrinsicElements["div"];
    /** Props for the select element of month picker. NOTE: customPicker ONLY! */
    customPickerSelectProps?: JSX.IntrinsicElements["select"];
}

interface UnitNames {
    month: string;
    day: string;
    year: string;
}

type InputRenderType = "custom" | "date" | "month";

const CURRENT_YEAR: number = new Date().getFullYear();
const MAX_DAY: number = 31;
const MIN_DAY: number = 1;
const MAX_YEAR: number = CURRENT_YEAR + 200;
const MIN_YEAR: number = CURRENT_YEAR - 200;
const PAGE_STEP: number = 5;
const UNIT_NAMES: UnitNames = {
    month: "Month",
    day: "Day",
    year: "Year",
};

export const Datepicker: React.FunctionComponent<DatepickerProps> = React.forwardRef(
    (
        { monthPicker, forceCustom, className, value, min, max, disabled, onChange, localeCode = "en", wrapperProps, customPickerSelectProps, ...props }: DatepickerProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ): React.ReactElement<void> => {
        const maxYearRange = React.useMemo(() => max?.getFullYear() || MAX_YEAR, []);
        const minYearRange = React.useMemo(() => min?.getFullYear() || MIN_YEAR, []);
        const [renderType, setRenderType] = React.useState<InputRenderType>("date");

        const isValidDate = React.useCallback((d: Date): boolean => {
            return !!(d && d instanceof Date && !isNaN(d.getTime()));
        }, []);

        const getStringFromDate = React.useCallback(
            (d: Date, monthPicker: boolean): string => {
                if (isValidDate(d)) {
                    const year: string = `0000${d.getFullYear()}`.substr(-4, 4);
                    const month: string = `00${d.getMonth() + 1}`.substr(-2, 2);
                    const day: string = `00${d.getDate()}`.substr(-2, 2);

                    return `${year}-${month}-${day}`.substr(0, monthPicker ? 7 : 10) || "";
                } else {
                    return "";
                }
            },
            [isValidDate]
        );

        const getInputRawValue = React.useCallback(
            (value: Date, monthPicker: boolean): string => {
                return getStringFromDate(value, monthPicker);
            },
            [getStringFromDate]
        );

        const isDateInRange = React.useCallback((d: Date, min: Date, max: Date): boolean => {
            if (!min && !max) {
                return true;
            } else if (min && d >= min) {
                if (!max || (max && d <= max)) {
                    return true;
                } else {
                    return false;
                }
            } else if (max && d <= max) {
                return !min || (min && d >= min);
            } else {
                return false;
            }
        }, []);

        const onCustomDatepickerChange = React.useCallback(
            (day: number, month: number, year: number) => {
                day = monthPicker ? 1 : day;
                const dateString: string = `${padNumber(year, true)}-${padNumber(month)}-${padNumber(day)}`;
                const date: Date = new Date(dateString);
                // as long as all custom input fields are not null and is valid date, fire onChange
                if (!!day && !!month && !!year && isValidDate(date) && isDateInRange(date, min, max)) {
                    onChange(date);
                } else {
                    onChange(null);
                }
            },
            [isDateInRange, onChange, min, max, monthPicker]
        );

        const initCustomDay = React.useCallback(
            (value: Date, monthPicker: boolean): number => {
                const inputRawValue: string = getInputRawValue(value, monthPicker);
                if (!!inputRawValue) {
                    const value: number = monthPicker ? 1 : Number(inputRawValue.substr(8, 2));
                    return value;
                }
            },
            [getInputRawValue]
        );

        const [customDay, setCustomDay] = React.useState<number>(initCustomDay(value, monthPicker));

        const initCustomMonth = React.useCallback(
            (value: Date, monthPicker: boolean): number => {
                const inputRawValue: string = getInputRawValue(value, monthPicker);
                if (!!inputRawValue) {
                    const value: number = monthPicker ? 1 : Number(inputRawValue.substr(5, 2));
                    return value;
                }
            },
            [getInputRawValue]
        );

        const [customMonth, setCustomMonth] = React.useState<number>(initCustomMonth(value, monthPicker));

        const initCustomYear = React.useCallback(
            (value: Date, monthPicker: boolean): number => {
                const inputRawValue: string = getInputRawValue(value, monthPicker);
                if (!!inputRawValue) {
                    const value: number = monthPicker ? 1 : Number(inputRawValue.substr(0, 4));
                    return value;
                }
            },
            [getInputRawValue]
        );

        const [customYear, setCustomYear] = React.useState<number>(initCustomYear(value, monthPicker));

        const changeCustomDay = React.useCallback(
            (day: number) => {
                setCustomDay(() => {
                    onCustomDatepickerChange(day, customMonth, customYear);
                    return day;
                });
            },
            [customMonth, customYear, onCustomDatepickerChange]
        );

        const changeCustomMonth = React.useCallback(
            (month: number) => {
                setCustomMonth(() => {
                    onCustomDatepickerChange(customDay, month, customYear);
                    return month;
                });
            },
            [customDay, customYear, onCustomDatepickerChange]
        );

        const changeCustomYear = React.useCallback(
            (year: number) => {
                setCustomYear(() => {
                    onCustomDatepickerChange(customDay, customMonth, year);
                    return year;
                });
            },
            [customDay, customMonth, onCustomDatepickerChange]
        );

        const getEventValue = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const value = Number(e.target?.value);
            return Number.isNaN(value) ? null : value;
        }, []);

        const handleChangeCustomDay = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                if (!monthPicker) {
                    const day: number = getEventValue(e);
                    changeCustomDay(day);
                }
            },
            [changeCustomDay]
        );

        const handleChangeCustomMonth = React.useCallback(
            (e: React.ChangeEvent<HTMLSelectElement>): void => {
                const month: number = getEventValue(e);
                changeCustomMonth(month);
            },
            [changeCustomMonth]
        );

        const handleChangeCustomYear = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                const year: number = getEventValue(e);
                changeCustomYear(year);
            },
            [changeCustomMonth]
        );

        const handleKeyDownCustomDay = React.useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (!hasModifierKey(e)) {
                    let newCustomDay = null;

                    switch (e.key) {
                        case "ArrowDown":
                            newCustomDay = customDay - 1;
                            break;
                        case "ArrowUp":
                            newCustomDay = customDay + 1;
                            break;
                        case "PageDown":
                            newCustomDay = customDay - PAGE_STEP;
                            break;
                        case "PageUp":
                            newCustomDay = customDay + PAGE_STEP;
                            break;
                        case "Home":
                            newCustomDay = MIN_DAY;
                            break;
                        case "End":
                            newCustomDay = MAX_DAY;
                            break;
                    }

                    if (newCustomDay !== null) {
                        e.preventDefault();
                        /**
                         * Sanitize the custom day value. If the value is larger than the maximum day of 31,
                         * it will be reduced down to the remainder of <custom day % 31> (32 % 31 = 1); if
                         * the value is lesser than the minimum day of 1, it will be increment up to the
                         * product of <custom day + 31> (-1 + 31 = 30). This handling ensures that the custom
                         * day value will always be in the range of the maximum and minimum day allowed.
                         */
                        const sanitizedDay: number = newCustomDay > MAX_DAY ? newCustomDay % MAX_DAY : newCustomDay < MIN_DAY ? newCustomDay + MAX_DAY : newCustomDay;
                        changeCustomDay(sanitizedDay);
                    }
                }
            },
            [customDay, changeCustomDay]
        );

        const handleKeyDownCustomYear = React.useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (!hasModifierKey(e)) {
                    let newCustomYear = null;

                    switch (e.key) {
                        case "ArrowDown":
                            newCustomYear = customYear - 1;
                            break;
                        case "ArrowUp":
                            newCustomYear = customYear + 1;
                            break;
                        case "PageDown":
                            newCustomYear = customYear - PAGE_STEP;
                            break;
                        case "PageUp":
                            newCustomYear = customYear + PAGE_STEP;
                            break;
                        case "Home":
                            newCustomYear = minYearRange;
                            break;
                        case "End":
                            newCustomYear = maxYearRange;
                            break;
                    }

                    if (newCustomYear !== null) {
                        e.preventDefault();
                        /**
                         * Sanitize the custom year value so that they are within the max and min year range.
                         */
                        const sanitizedYear: number = newCustomYear > maxYearRange ? maxYearRange : newCustomYear < minYearRange ? minYearRange : newCustomYear;
                        changeCustomYear(sanitizedYear);
                    }
                }
            },
            [customYear, maxYearRange, minYearRange, changeCustomYear]
        );

        const getRelativeTimeFormat = React.useCallback((code: string): any => {
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
        }, []);

        const getLocaleOrDefault = React.useCallback((localeCode: string): Intl.DateTimeFormat => {
            let locale: Intl.DateTimeFormat;
            try {
                locale = new Intl.DateTimeFormat(localeCode, { month: "long" });
            } catch (error) {
                console.warn(`Locale with code: ${localeCode} was not recognised. Using locale 'en' instead.`);
                locale = new Intl.DateTimeFormat("en", { month: "long" });
            }
            return locale;
        }, []);

        const monthNames: string[] = React.useMemo(() => {
            const date: Date = new Date(2012, 0, 5);
            const locale: Intl.DateTimeFormat = getLocaleOrDefault(localeCode);

            const names: string[] = [UNIT_NAMES.month];
            [...Array(12)].map((_, i) => {
                date.setMonth(i);
                names.push(locale.format(date));
            });
            return names;
        }, [localeCode, getLocaleOrDefault]);

        const customPickerOrder = React.useMemo(() => {
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
                UNIT_NAMES[unit] =
                    rtf
                        ?.formatToParts(1, unit)
                        ?.filter((x) => x.type === "literal")[1]
                        ?.value?.trim() || unit;
            });

            return order;
        }, [localeCode, getRelativeTimeFormat, getLocaleOrDefault]);

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

        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { value: changeEventValue } = e.target;
            const value: Date = new Date(changeEventValue);
            if (isDateInRange(value, min, max)) {
                onChange(value);
                return;
            }
            onChange(null);
        };

        const renderCustomDatepicker = (value: Date, monthPicker: boolean, customPickerOrder: string[], unitNames: UnitNames, disabled: boolean, monthNames: string[]) => {
            const order: string[] = monthPicker ? [...customPickerOrder.filter((x: string) => x !== "day")] : customPickerOrder;
            const dateValueLabel: string = randomId("seb-datepicker-custom-value-");
            return (
                <div
                    {...wrapperProps}
                    ref={ref}
                    className={classnames("input-group", "seb-datepicker-custom", wrapperProps?.className)}
                    role="group"
                    aria-labelledby={`${wrapperProps?.["aria-labelledby"] ? `${wrapperProps?.["aria-labelledby"]} ` : ""}${dateValueLabel}`}
                >
                    <div id={dateValueLabel} className="sr-only">
                        {monthPicker ? "" : `${customDay} `}
                        {monthNames[customMonth]}, {customYear}
                    </div>
                    {order?.map((unit: string, unitIndex: number) => {
                        switch (unit) {
                            case "day":
                                return (
                                    <input
                                        {...props}
                                        key={unitIndex}
                                        className={classnames("form-control", "seb-datepicker-custom-day", className)}
                                        type="number"
                                        min={MIN_DAY}
                                        max={MAX_DAY}
                                        placeholder={unitNames.day}
                                        disabled={disabled}
                                        value={isDateInRange(value, min, max) ? customDay || "" : ""}
                                        onChange={handleChangeCustomDay}
                                        onKeyDown={handleKeyDownCustomDay}
                                    />
                                );

                            case "month":
                                return (
                                    <select
                                        {...customPickerSelectProps}
                                        key={unitIndex}
                                        className={classnames(
                                            "custom-select",
                                            "seb-datepicker-custom-month",
                                            { "rounded-left": unitIndex === 0 },
                                            { "rounded-right": unitIndex === customPickerOrder.length - 1 },
                                            customPickerSelectProps?.className
                                        )}
                                        value={isDateInRange(value, min, max) ? customMonth || "" : ""}
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
                                        {...props}
                                        key={unitIndex}
                                        className={classnames("form-control", "seb-datepicker-custom-year", className)}
                                        type="number"
                                        min="1"
                                        placeholder={unitNames.year}
                                        disabled={disabled}
                                        value={isDateInRange(value, min, max) ? customYear || "" : ""}
                                        onChange={handleChangeCustomYear}
                                        onKeyDown={handleKeyDownCustomYear}
                                    />
                                );
                            default:
                                break;
                        }
                    })}
                </div>
            );
        };

        React.useEffect(() => {
            setRenderType(() => {
                if (forceCustom) {
                    return "custom";
                }
                if (monthPicker && supportsInputOfType("month")) {
                    return "month";
                }
                if (supportsInputOfType("date")) {
                    return "date";
                }
                return "custom";
            });
        }, [forceCustom, monthPicker]);

        if (renderType === "month") {
            return (
                <input
                    {...props}
                    ref={ref}
                    type="month"
                    className={classnames("form-control", "seb-datepicker-native", className)}
                    min={getStringFromDate(min, monthPicker)}
                    max={getStringFromDate(max, monthPicker)}
                    value={isDateInRange(value, min, max) ? getInputRawValue(value, monthPicker) : ""}
                    disabled={disabled}
                    onChange={handleOnChange}
                />
            );
        } else if (renderType === "date") {
            return (
                <input
                    {...props}
                    ref={ref}
                    type="date"
                    className={classnames("form-control", "seb-datepicker-native", className)}
                    min={getStringFromDate(min, monthPicker)}
                    max={getStringFromDate(max, monthPicker)}
                    value={isDateInRange(value, min, max) ? getInputRawValue(value, monthPicker) : ""}
                    disabled={disabled}
                    onChange={handleOnChange}
                />
            );
        } else {
            return <>{renderCustomDatepicker(value, monthPicker, customPickerOrder, UNIT_NAMES, disabled, monthNames)}</>;
        }
    }
);

/**
 * Detect if a modifier key is pressed along with the current key event.
 *
 * @param {object} event - Keyboard event
 * @returns true if key pressed is combined with modifier key, false otherwise
 */
function hasModifierKey({ altKey, ctrlKey, metaKey, shiftKey }: React.KeyboardEvent) {
    return altKey || ctrlKey || metaKey || shiftKey;
}

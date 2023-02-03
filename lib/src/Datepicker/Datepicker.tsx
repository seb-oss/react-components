import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";
import "./datepicker.scss";

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
const MAX_DAY = 31;
const MIN_DAY = 1;
const MAX_YEAR: number = CURRENT_YEAR + 200;
const MIN_YEAR: number = CURRENT_YEAR - 200;
const PAGE_STEP = 5;
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
        const customPickerOrder = React.useMemo(() => {
            const date: Date = new Date(2012, 0, 5);
            const locale: Intl.DateTimeFormat = getLocaleOrDefault(localeCode);
            const rtf: Intl.RelativeTimeFormat | null = getRelativeTimeFormat(localeCode);
            const order: Intl.RelativeTimeFormatUnit[] = ["day", "month", "year"];
            const localeDateString: string = locale.format(date);
            order.sort((a, b) => {
                const positions: { day: number; month: number; year: number } = {
                    day: localeDateString?.search(/5/g) || 0,
                    month: localeDateString?.search(/1/g) || 1,
                    year: localeDateString?.search(/2012/g) || 2,
                };
                return positions[a] - positions[b];
            });
            order.forEach((unit) => {
                UNIT_NAMES[unit] =
                    rtf
                        ?.formatToParts(1, unit)
                        ?.filter((x) => x.type === "literal")[1]
                        ?.value?.trim() || unit;
            });
            return order;
        }, [localeCode]);
        const monthNames: string[] = React.useMemo(() => {
            const date: Date = new Date(2012, 0, 5);
            const locale: Intl.DateTimeFormat = getLocaleOrDefault(localeCode);
            const names: string[] = [UNIT_NAMES.month];
            [...Array(12)].forEach((_, i) => {
                date.setMonth(i);
                names.push(locale.format(date));
            });
            return names;
        }, [localeCode]);
        const maxYearRange: number = React.useMemo(() => max?.getFullYear() || MAX_YEAR, [max]);
        const minYearRange: number = React.useMemo(() => min?.getFullYear() || MIN_YEAR, [min]);
        const renderType: InputRenderType = React.useMemo(() => {
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
        }, [forceCustom, monthPicker]);
        const [customDay, setCustomDay] = React.useState<number>(getCustomDateValue(value?.getDate(), monthPicker));
        const [customMonth, setCustomMonth] = React.useState<number>(getCustomDateValue(value?.getMonth() + 1, monthPicker));
        const [customYear, setCustomYear] = React.useState<number>(getCustomDateValue(value?.getFullYear(), monthPicker));

        const onCustomDatepickerChange = React.useCallback(
            (day: number, month: number, year: number) => {
                day = monthPicker ? 1 : day;
                const dateString = formatDate(year, month, day);
                const date: Date = new Date(dateString);
                onChange(date);
            },
            [onChange, monthPicker]
        );

        const changeCustomDay = React.useCallback(
            (day: number) => {
                onCustomDatepickerChange(day, customMonth, customYear);
                setCustomDay(day);
            },
            [customMonth, customYear, onCustomDatepickerChange]
        );

        const changeCustomMonth = React.useCallback(
            (month: number) => {
                onCustomDatepickerChange(customDay, month, customYear);
                setCustomMonth(month);
            },
            [customDay, customYear, onCustomDatepickerChange]
        );

        const changeCustomYear = React.useCallback(
            (year: number) => {
                onCustomDatepickerChange(customDay, customMonth, year);
                setCustomYear(year);
            },
            [customDay, customMonth, onCustomDatepickerChange]
        );

        const handleChangeCustomDay = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                const day: number = getEventValue(e);
                changeCustomDay(day);
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
            [changeCustomYear]
        );

        const handleKeyDownCustomDay = React.useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (!hasModifierKey(e)) {
                    let newCustomDay: number = null;

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
                    let newCustomYear: number = null;

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

        const handleOnChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                const { value: newValue } = e.target;
                const newDate: Date = new Date(newValue);
                onChange(newDate);
            },
            [onChange]
        );

        const handleOnBlur = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>): void => {
                const { value: newValue } = e.target;
                const newDate: Date = new Date(newValue);

                if (!isDateInRange(newDate, min, max)) {
                    onChange(null);
                }
            },
            [max, min, onChange]
        );

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
                                        value={customDay || ""}
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
                                        value={customMonth || ""}
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
                                        value={customYear || ""}
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

        if (renderType === "month") {
            return (
                <input
                    {...props}
                    ref={ref}
                    type="month"
                    className={classnames("form-control", "seb-datepicker-native", className)}
                    min={getDateString(min, monthPicker)}
                    max={getDateString(max, monthPicker)}
                    value={getDateString(value, monthPicker)}
                    disabled={disabled}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                />
            );
        }

        if (renderType === "date") {
            return (
                <input
                    {...props}
                    ref={ref}
                    type="date"
                    className={classnames("form-control", "seb-datepicker-native", className)}
                    min={getDateString(min, monthPicker)}
                    max={getDateString(max, monthPicker)}
                    value={getDateString(value, monthPicker)}
                    disabled={disabled}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                />
            );
        }

        return renderCustomDatepicker(value, monthPicker, customPickerOrder, UNIT_NAMES, disabled, monthNames);
    }
);

function formatDate(year: number, month: number, day: number): string {
    const formattedYear = year.toString().padStart(4, "0");
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

function getCustomDateValue(value: number, monthPicker: boolean) {
    if (monthPicker) {
        return 1;
    }

    if (isNaN(value)) {
        return undefined;
    }

    return value;
}

function getDateString(d: Date, monthPicker: boolean): string {
    if (isValidDate(d)) {
        const dateString = formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        return dateString.substring(0, monthPicker ? 7 : 10) || "";
    }

    return "";
}

function getEventValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value = Number(e.target?.value);
    return Number.isNaN(value) ? null : value;
}

function getLocaleOrDefault(localeCode: string): Intl.DateTimeFormat {
    try {
        return new Intl.DateTimeFormat(localeCode, { month: "long" });
    } catch (error) {
        console.warn(`Locale with code: ${localeCode} was not recognised. Using locale 'en' instead.`);
        return new Intl.DateTimeFormat("en", { month: "long" });
    }
}

function getRelativeTimeFormat(code: string): Intl.RelativeTimeFormat | null {
    try {
        return new Intl.RelativeTimeFormat(code);
    } catch (error) {
        console.warn(`Relative time format with code: ${code} was not recognised.`);
        return null;
    }
}

/**
 * Detect if a modifier key is pressed along with the current key event.
 *
 * @param {object} event - Keyboard event
 * @returns true if key pressed is combined with modifier key, false otherwise
 */
function hasModifierKey({ altKey, ctrlKey, metaKey, shiftKey }: React.KeyboardEvent) {
    return altKey || ctrlKey || metaKey || shiftKey;
}

function isDateInRange(d: Date, min: Date, max: Date): boolean {
    const isAfterMinDate = !min || d >= min;
    const isBeforeMaxDate = !max || d <= max;
    return isAfterMinDate && isBeforeMaxDate;
}

function isValidDate(d: Date): boolean {
    return !!(d && d instanceof Date && !isNaN(d.getTime()));
}

function supportsInputOfType(type: "date" | "month"): boolean {
    if (typeof document !== "undefined") {
        const input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", type);
        const notADateValue = "not-a-date";
        input.setAttribute("value", notADateValue);
        return input.value !== notADateValue;
    }

    return false;
}

import React from "react";
import { padNumber } from "./formatters";
import classnames from "classnames";
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

export const Datepicker: React.FunctionComponent<DatepickerProps> = React.forwardRef(
    (
        { monthPicker, forceCustom, className, value, min, max, disabled, onChange, localeCode = "en", wrapperProps, customPickerSelectProps, ...props }: DatepickerProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ): React.ReactElement<void> => {
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

        const handleChangeCustomDay = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                if (!monthPicker) {
                    const v: number = e.target?.value && !Number.isNaN(Number(e.target?.value)) ? Number(e.target.value) : null;
                    setCustomDay(() => {
                        onCustomDatepickerChange(v, customMonth, customYear);
                        return v;
                    });
                }
            },
            [customMonth, customYear, onCustomDatepickerChange]
        );

        const handleChangeCustomMonth = React.useCallback(
            (e: React.ChangeEvent<HTMLSelectElement>): void => {
                const v: number = e.target?.value && !Number.isNaN(Number(e.target?.value)) ? Number(e.target.value) : null;
                setCustomMonth(() => {
                    onCustomDatepickerChange(customDay, v, customYear);
                    return v;
                });
            },
            [customDay, customYear, onCustomDatepickerChange]
        );

        const handleChangeCustomYear = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                const v: number = e.target?.value && !Number.isNaN(Number(e.target?.value)) ? Number(e.target.value) : null;
                setCustomYear(() => {
                    onCustomDatepickerChange(customDay, customMonth, v);
                    return v;
                });
            },
            [customDay, customMonth, onCustomDatepickerChange]
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
            return (
                <div {...wrapperProps} ref={ref} className={classnames("input-group", "seb-datepicker-custom", wrapperProps?.className)}>
                    {order?.map((unit: string, unitIndex: number) => {
                        switch (unit) {
                            case "day":
                                return (
                                    <input
                                        {...props}
                                        key={unitIndex}
                                        className={classnames("form-control", "seb-datepicker-custom-day", className)}
                                        type="number"
                                        min="1"
                                        max="31"
                                        placeholder={unitNames.day}
                                        disabled={disabled}
                                        value={isDateInRange(value, min, max) ? customDay || "" : ""}
                                        onChange={handleChangeCustomDay}
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
            return <>{renderCustomDatepicker(value, monthPicker, customPickerOrder(), unitNames, disabled, monthNames())}</>;
        }
    }
);

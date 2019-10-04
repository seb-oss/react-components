import * as React from "react";
import DatePicker from "react-date-picker";
import "./date-picker-style.scss";

const calendarAltIcon: JSX.Element = <svg name="calendar-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z" /></svg>;

export interface DatepickerProps {
    calendarIcon?: JSX.Element;
    className?: string;
    clearable?: boolean;
    clearIcon?: JSX.Element;
    disabled?: boolean;
    error?: string;
    format?: string;
    id?: string;
    label?: string;
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    name: string;
    onChange: (value: Date) => void;
    placeHolder?: string;
    showLeadingZeros?: boolean;
    value: Date;
}

export const Datepicker: React.FunctionComponent<DatepickerProps> = (props: DatepickerProps): React.ReactElement<void> => {
    return (
        <div className={"form-group date-picker" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label">{props.label}</label>}
                <div className="date-wrapper">
                    <DatePicker
                        name={props.name}
                        onChange={props.onChange}
                        value={props.value}
                        calendarIcon={props.calendarIcon || calendarAltIcon}
                        clearIcon={props.clearIcon || (props.clearable ? undefined : null)}
                        disabled={props.disabled}
                        minDate={props.minDate}
                        maxDate={props.maxDate}
                        locale={props.locale}
                        format={props.format}
                        showLeadingZeros={props.showLeadingZeros === undefined ? true : props.showLeadingZeros}
                    />
                    {!props.value && props.placeHolder ? <div className="date-placeholder"><p>{props.placeHolder}</p></div> : ""}
                </div>
                <div className="alert alert-danger">{props.error}</div>
            </div>
        </div>
    );
};

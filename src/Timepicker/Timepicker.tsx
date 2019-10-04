import * as React from "react";
import "./time-picker-style.scss";

const angleUpIcon: JSX.Element = <svg name="angle-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleDownIcon: JSX.Element = <svg name="angle-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;

export interface TimepickerValue {
    hours: number;
    minutes: number;
    dayperiod: TimepickerDayperiodTypes;
}

export const enum TimepickerDayperiodTypes {
    AM = "AM",
    PM = "PM"
}

const enum TimerStepperTypes {
    Increment = "INCREMENT",
    Decrement = "DECREMENT"
}

const enum TimerStepperContext {
    Hours = "HOURS",
    Minutes = "MINUTES",
    Dayperiod = "DAYPERIOD"
}

export interface TimepickerProps {
    className?: string;
    id?: string;
    name: string;
    onChange: (value: TimepickerValue) => void;
    value: TimepickerValue;
}

class Timepicker extends React.Component<TimepickerProps> {
    handleClick(context: TimerStepperContext, type: TimerStepperTypes, currentValue: TimepickerValue): TimepickerValue {
        const newValue: TimepickerValue = { ...currentValue };
        switch (context) {
            case TimerStepperContext.Hours:
                let hours: number = currentValue.hours;
                switch (type) {
                    case TimerStepperTypes.Increment: hours = hours === 12 ? 1 : (hours + 1); break;
                    case TimerStepperTypes.Decrement: hours = hours === 1 ? 12 : (hours - 1); break;
                }
                newValue.hours = hours;
                break;
            case TimerStepperContext.Minutes:
                let minutes: number = currentValue.minutes;
                switch (type) {
                    case TimerStepperTypes.Increment: minutes = minutes === 59 ? 0 : (minutes + 1); break;
                    case TimerStepperTypes.Decrement: minutes = minutes === 0 ? 59 : (minutes - 1); break;
                }
                newValue.minutes = minutes;
                break;
            case TimerStepperContext.Dayperiod:
                let dayperiod: TimepickerDayperiodTypes = currentValue.dayperiod;
                switch (dayperiod) {
                    case TimepickerDayperiodTypes.AM: dayperiod = TimepickerDayperiodTypes.PM; break;
                    case TimepickerDayperiodTypes.PM: dayperiod = TimepickerDayperiodTypes.AM; break;
                }
                newValue.dayperiod = dayperiod;
                break;
        }
        return newValue;
    }

    handleChange(context: TimerStepperContext, value: number, currentValue: TimepickerValue): TimepickerValue {
        const newValue: TimepickerValue = { ...currentValue };
        if (typeof (value) === "number") {
            switch (context) {
                case TimerStepperContext.Hours:
                    let hours: number;
                    if (value > 12) {
                        hours = 12;
                    } else if (value < 1) {
                        hours = 1;
                    } else {
                        hours = value;
                    }
                    newValue.hours = hours;
                    break;
                case TimerStepperContext.Minutes:
                    let minutes: number;
                    if (value > 59) {
                        minutes = 59;
                    } else if (value < 0) {
                        minutes = 0;
                    } else {
                        minutes = value;
                    }
                    newValue.minutes = minutes;
                    break;

            }
            return newValue;
        } else {
            return null;
        }
    }

    render() {

        return (
            <div className={"custom-timepicker" + (this.props.className ? ` ${this.props.className}` : "")} id={this.props.id}>
                <div className="timepicker-hours">
                    <div
                        className="triangle-before"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Hours, TimerStepperTypes.Increment, this.props.value)); }}
                    >
                        {angleUpIcon}
                    </div>
                    <input
                        type="number"
                        name={this.props.name + "-hours"}
                        className="timepicker-input"
                        value={this.props.value.hours < 10 ? "0" + this.props.value.hours : String(this.props.value.hours)}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                this.props.onChange(this.handleChange(TimerStepperContext.Hours, Number(e.target.value), this.props.value));
                            }
                        }
                    />
                    <div
                        className="triangle-after"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Hours, TimerStepperTypes.Decrement, this.props.value)); }}
                    >
                        {angleDownIcon}
                    </div>
                </div>
                <div className="timepicker-minutes">
                    <div
                        className="triangle-before"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Minutes, TimerStepperTypes.Increment, this.props.value)); }}
                    >
                        {angleUpIcon}
                    </div>
                    <input
                        type="number"
                        name={this.props.name + "-minutes"}
                        className="timepicker-input"
                        value={this.props.value.minutes < 10 ? "0" + this.props.value.minutes : String(this.props.value.minutes)}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                this.props.onChange(this.handleChange(TimerStepperContext.Minutes, Number(e.target.value), this.props.value));
                            }
                        }
                    />
                    <div
                        className="triangle-after"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Minutes, TimerStepperTypes.Decrement, this.props.value)); }}
                    >
                        {angleDownIcon}
                    </div>
                </div>
                <div className="timepicker-dayperiod">
                    <div
                        className="triangle-before"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Dayperiod, TimerStepperTypes.Increment, this.props.value)); }}
                    >
                        {angleUpIcon}
                    </div>
                    <input
                        type="text"
                        name={this.props.name + "-dayperiod"}
                        className="timepicker-input"
                        readOnly={true}
                        disabled={true}
                        value={this.props.value.dayperiod}
                    />
                    <div
                        className="triangle-after"
                        onClick={() => { this.props.onChange(this.handleClick(TimerStepperContext.Dayperiod, TimerStepperTypes.Decrement, this.props.value)); }}
                    >
                        {angleDownIcon}
                    </div>
                </div>
            </div>
        );
    }
}

export { Timepicker };

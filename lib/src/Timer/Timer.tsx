import React from "react";
import classnames from "classnames";

export interface TimerProps {
    /** Callback when timer ends */
    callback?: VoidFunction;
    /** Element class name */
    className?: string;
    /** Timer's duration in milliseconds */
    duration: number;
    /** Element ID */
    id?: string;
}

interface TimerState {
    timer: string;
}
/** A timer is a component for measuring time intervals */
export class Timer extends React.Component<TimerProps, TimerState> {
    private innerInterval: any;
    constructor(props: TimerProps) {
        super(props);

        this.state = {
            timer: "00:00",
        };
    }

    startInterval(timeout: number): void {
        this.setState({ timer: this.convertMStoTime(timeout) }, () => {
            this.clearInterval();
            this.innerInterval = setInterval(() => {
                if (timeout > 0) {
                    timeout = timeout - 1000;
                    this.setState({ timer: this.convertMStoTime(timeout) }, () => {
                        if (timeout === 0) {
                            this.props.callback();
                            this.clearInterval();
                        }
                    });
                }
            }, 1000);
        });
    }

    clearInterval(): void {
        if (this.innerInterval) {
            clearTimeout(this.innerInterval);
            this.innerInterval = null;
        }
    }

    convertMStoTime(value: number): string {
        const date: Date = new Date(value);
        return (
            (date.getUTCHours() > 0 ? date.getUTCHours() + ":" : "") +
            (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
            ":" +
            (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds())
        );
    }

    componentDidMount() {
        if (this.props.duration !== null && this.props.duration !== undefined) {
            this.startInterval(this.props.duration);
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    componentDidUpdate(prevProps: TimerProps): void {
        if (prevProps.duration !== this.props.duration) {
            if (this.props.duration !== null && this.props.duration !== undefined) {
                this.startInterval(this.props.duration);
            }
        }
    }

    render(): React.ReactNode {
        return (
            <div className={classnames("custom-timer", this.props.className)} id={this.props.id}>
                {this.state.timer}
            </div>
        );
    }
}

import React from "react";
import classnames from "classnames";

export type TimerProps = JSX.IntrinsicElements["time"] & {
    /** Active state when the timer starts counting */
    active?: boolean;
    /** Callback when timer ends */
    onTimerEnd?: VoidFunction;
    /** Timer's duration in milliseconds */
    duration?: number;
};
/** A timer is a component for measuring time intervals */
export const Timer: React.FC<TimerProps> = ({ duration, onTimerEnd, active, ...props }: TimerProps) => {
    const innerInterval = React.useRef<any>(0);
    const [timer, setTimer] = React.useState<string>("00:00");

    const clearTimerInterval = React.useCallback((): void => {
        if (innerInterval.current) {
            clearTimeout(innerInterval.current);
            innerInterval.current = null;
        }
    }, []);

    const startInterval = React.useCallback((timeout: number): void => {
        clearTimerInterval();
        innerInterval.current = setInterval(() => {
            if (timeout > 0) {
                timeout = timeout - 1000;
                setTimer(convertMStoTime(timeout));
                if (timeout === 0) {
                    onTimerEnd && onTimerEnd();
                    clearTimerInterval();
                }
            }
        }, 1000);
    }, []);

    React.useEffect(() => setTimer(convertMStoTime(duration)), [duration]);

    React.useEffect(() => {
        active && duration > 0 ? startInterval(duration) : clearTimerInterval();
        return clearTimerInterval;
    }, [active]);

    return (
        <time className={classnames("rc timer", props.className)} {...props}>
            {timer}
        </time>
    );
};

function convertMStoTime(value: number): string {
    const date: Date = new Date(value);
    return (
        (date.getUTCHours() > 0 ? date.getUTCHours() + ":" : "") +
        (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
        ":" +
        (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds())
    );
}

import React from "react";
import classnames from "classnames";

export type TimerProps = JSX.IntrinsicElements["div"] & {
    /** Callback when timer ends */
    callback?: VoidFunction;
    /** Timer's duration in milliseconds */
    duration?: number;
    /** Additional timer prefix */
    timerPrefix?: React.ReactNode;
    /** Additional timer suffix */
    timerSuffix?: React.ReactNode;
};

export const Timer: React.FC<TimerProps> = ({ duration, callback, timerPrefix, timerSuffix, ...props }: TimerProps) => {
    const [innerInterval, setInnerInterval] = React.useState<NodeJS.Timeout>();
    const [timer, setTimer] = React.useState<string>("00:00");

    const startInterval = (timeout: number): void => {
        setTimer(convertMStoTime(timeout));
        clearInterval();
        setInnerInterval(
            setInterval(() => {
                if (timeout > 0) {
                    timeout = timeout - 1000;
                    setTimer(convertMStoTime(timeout));
                    if (timeout === 0) {
                        callback?.();
                        clearInterval();
                    }
                }
            }, 1000)
        );
    };

    const clearInnerInterval = (): void => {
        if (innerInterval) {
            clearInterval(innerInterval);
            setInnerInterval(null);
        }
    };

    const convertToTwoDigits = (rawNumber: number): string => `${rawNumber < 10 ? "0" : ""}${rawNumber}`;

    const convertMStoTime = (milliseconds: number): string => {
        const rawSeconds: number = milliseconds / 1000;
        const rawMinutes: number = rawSeconds / 60;
        const displaySeconds: number = rawSeconds % 60;
        const displayMinutes: number = Math.floor(rawMinutes % 60); // get remainder minutes
        const displayHours: number = Math.floor(rawMinutes / 60); // get converted hours
        return (displayHours > 0 ? displayHours + ":" : "") + convertToTwoDigits(displayMinutes) + ":" + convertToTwoDigits(displaySeconds);
    };

    React.useEffect(() => {
        if (duration >= 1000) {
            // only start timer if there's at least 1 second set
            clearInnerInterval();
            startInterval(duration);
        }
        return () => {
            clearInnerInterval();
        };
    }, [duration]);

    return (
        <div {...props} className={classnames("custom-timer", props.className)} role="timer" aria-live="polite" aria-atomic="true">
            {timerPrefix}
            {timer}
            {timerSuffix}
        </div>
    );
};

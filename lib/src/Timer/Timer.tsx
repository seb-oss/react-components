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
        setTimer(formatMilitaryTime(timeout));
        setInnerInterval(() => {
            const newInterval = setInterval(() => {
                timeout -= 1000;
                if (timeout > 0) {
                    setTimer(formatMilitaryTime(timeout));
                } else {
                    setTimer(formatMilitaryTime(0));
                    clearInterval(newInterval);
                    callback?.();
                }
            }, 1000);
            return newInterval;
        });
    };

    const clearInnerInterval = (): void => {
        if (innerInterval) {
            clearInterval(innerInterval);
            setInnerInterval(null);
        }
    };

    const formatTwoDigits = (time: number): string => `${time}`.padStart(2, "0");

    const formatMilitaryTime = (milliseconds: number): string => {
        const rawSeconds: number = milliseconds / 1000;
        const rawMinutes: number = rawSeconds / 60;
        const displaySeconds: number = Math.floor(rawSeconds % 60);
        const displayMinutes: number = Math.floor(rawMinutes % 60); // get remainder minutes
        const displayHours: number = Math.floor(rawMinutes / 60); // get converted hours
        return (displayHours > 0 ? displayHours + ":" : "") + formatTwoDigits(displayMinutes) + ":" + formatTwoDigits(displaySeconds);
    };

    React.useEffect(() => {
        startInterval(duration);
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

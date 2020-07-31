import React from "react";
import classnames from "classnames";

export type TimerProps = JSX.IntrinsicElements["time"] & {
    duration?: number;
    onTimerEnded?: () => void;
};

export const Timer: React.FC<TimerProps> = React.memo(({ duration, onTimerEnded, ...props }: TimerProps) => {
    const [time, setTime] = React.useState<string>("00:00");
    const countDown: React.MutableRefObject<number> = React.useRef<number>(0);
    const timer: React.MutableRefObject<any> = React.useRef<any>(0);

    /**
     * Converts the numeric value into two digits string for display purposes
     * @param {number} value The numberic value to be converted
     * @returns The two digits string value
     */
    const toDoubleDigits = React.useCallback((value: number): string => {
        return value.toLocaleString("en", { minimumIntegerDigits: 2 });
    }, []);

    /** Clears the timer */
    const clearTimer = React.useCallback((): void => {
        countDown.current = 0;
        timer.current && clearInterval(timer.current);
    }, []);

    /** Kicks off the timer */
    const startTimer = React.useCallback((): void => {
        timer.current = setInterval(() => {
            if (countDown.current--) {
                const minutes: number = Math.floor(countDown.current / 60);
                const seconds: number = countDown.current < 60 ? countDown.current : countDown.current % 60;
                setTime(toDoubleDigits(minutes) + ":" + toDoubleDigits(seconds));
            } else {
                clearTimer();
                onTimerEnded();
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        clearTimer();
        if (duration !== null && duration !== undefined) {
            countDown.current = duration;
            startTimer();
        }
    }, [duration]);

    React.useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return (
        <time {...props} className={classnames("rc", "timer", props.className)}>
            {time}
        </time>
    );
});

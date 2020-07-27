import React from "react";
import { Timer } from ".";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { time } from "console";
import { TimerProps } from "./Timer";

describe("Component: Timer", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllTimers();
    });

    it("Should render", () => {
        act(() => {
            render(<Timer duration={10} />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("time");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("timer")).toBeTruthy();
    });

    it("Should update the timer successfully", () => {
        const onTimerEnd: jest.Mock = jest.fn();
        act(() => {
            render(<TestBed onTimerEnded={onTimerEnd} />, container);
        });
        act(() => jest.advanceTimersByTime(1000));
        expect(container.querySelector("time").textContent).toEqual("00:09");

        act(() => {
            Simulate.click(container.querySelector("#changeTest"));
        });
        act(() => jest.advanceTimersByTime(1000));
        expect(container.querySelector("time").textContent).toEqual("00:03");

        act(() => {
            Simulate.click(container.querySelector("#nullTest"));
        });
        act(() => jest.advanceTimersByTime(1000));
        expect(container.querySelector("time").textContent).toEqual("00:03");

        act(() => {
            Simulate.click(container.querySelector("#changeTest"));
        });
        act(() => jest.advanceTimersByTime(1000));
        act(() => jest.advanceTimersByTime(1000));
        act(() => jest.advanceTimersByTime(1000));
        act(() => jest.advanceTimersByTime(1000));
        act(() => jest.advanceTimersByTime(1000));
        expect(container.querySelector("time").textContent).toEqual("00:00");
        expect(onTimerEnd).toBeCalled();
    });

    it("Should render minutes and seconds correctly", () => {
        act(() => {
            render(<Timer duration={90} />, container);
        });
        act(() => jest.advanceTimersByTime(1000));
        expect(container.firstElementChild.textContent).toEqual("01:29");
    });
});

const TestBed: React.FC<TimerProps> = (props: TimerProps) => {
    const [duration, setDuration] = React.useState<number>(10);

    return (
        <div>
            <button id="changeTest" onClick={() => setDuration(4)} />
            <button id="nullTest" onClick={() => setDuration(null)} />
            <Timer onTimerEnded={props.onTimerEnded} duration={duration} />
        </div>
    );
};

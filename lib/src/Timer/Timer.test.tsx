import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Timer, TimerProps } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Timer", () => {
    let container: HTMLDivElement = null;
    const duration: number = 10000;

    const renderComponent = (props: TimerProps = {}) => {
        act(() => {
            render(<Timer {...props} />, container);
        });
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        renderComponent();
        expect(container.querySelector(`[role="timer"]`)).not.toBeNull();
    });

    it("Should call callback when countdown is done", () => {
        const callback: jest.Mock = jest.fn();
        jest.spyOn(global, "setInterval");
        renderComponent({ duration, callback });
        act(() => {
            jest.advanceTimersByTime(duration);
        });
        expect(setInterval).toBeCalled();
        expect(callback).toBeCalled();
    });

    it("Should render with prefix and suffix", () => {
        const timerPrefix: React.ReactElement = <div className="prefix">hello</div>;
        const timerSuffix: React.ReactElement = <div className="suffix">hello</div>;
        renderComponent({ duration, timerPrefix });
        expect(container.querySelector(`.prefix`)).not.toBeNull();
        renderComponent({ duration, timerSuffix });
        expect(container.querySelector(`.suffix`)).not.toBeNull();
    });
});

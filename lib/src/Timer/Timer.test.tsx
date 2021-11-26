import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Timer } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Timer", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        act(() => {
            render(<Timer />, container);
        });
        expect(container.querySelector(`[role="presentation"]`)).not.toBeNull();
    });

    it("Should call callback when countdown is done", () => {
        jest.useFakeTimers();
        jest.spyOn(global, "setInterval");
        const callback: jest.Mock = jest.fn();
        act(() => {
            render(<Timer duration={10000} callback={callback} />, container);
        });
        expect(setInterval).toBeCalled();
        expect(callback).toBeCalled();
    });

    it("Should render with prefix", () => {
        const prefix: React.ReactElement = <div className="prefix">hello</div>;
        act(() => {
            render(<Timer timerPrefix={prefix} />, container);
        });
        expect(container.querySelector(`.prefix`)).not.toBeNull();
    });

    it("Should render with suffix", () => {
        const suffix: React.ReactElement = <div className="suffix">hello</div>;
        act(() => {
            render(<Timer timerSuffix={suffix} />, container);
        });
        expect(container.querySelector(`.suffix`)).not.toBeNull();
    });
});

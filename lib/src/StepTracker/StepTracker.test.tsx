import React from "react";
import { StepTracker, StepTrackerProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: StepTracker", () => {
    let container: HTMLDivElement = null;
    const props: StepTrackerProps = {
        step: 1,
        list: [{ label: "First" }, { label: "Second" }, { label: "Third" }, { label: "Forth" }],
    };

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
            render(<StepTracker {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySteptrackerClass";
        const id: string = "mySteptrackerId";
        act(() => {
            render(<StepTracker {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render with default values if only compolsory props are passed", () => {
        act(() => {
            render(<StepTracker {...props} />, container);
        });
        expect(container.querySelector(`.horizontal`)).not.toBeNull();
        expect(container.querySelector(`.bottom`)).not.toBeNull();
    });

    it("Should render a clickable component and fire click event if onClick method is passed and element is clicked", () => {
        const onClick: jest.Mock = jest.fn();

        act(() => {
            render(<StepTracker {...props} onClick={onClick} />, container);
        });

        expect(container.querySelector(`.clickable`)).not.toBeNull();
        Simulate.click(container.querySelector(".step-wrapper .step"));
        act(() => {
            render(<StepTracker {...props} onClick={onClick} orientation="vertical" />, container);
        });
        Simulate.click(container.querySelector(".step-wrapper .step"));
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("Should be able to render with difference orientation and label positions", () => {
        act(() => {
            render(<StepTracker {...props} labelPosition="bottom" />, container);
        });
        expect(container.querySelector(`.bottom`)).not.toBeNull();
        act(() => {
            render(<StepTracker {...props} orientation="vertical" />, container);
        });
        expect(container.querySelector(`.vertical`)).not.toBeNull();
        act(() => {
            render(<StepTracker {...props} labelPosition="right" />, container);
        });
        expect(container.querySelector(`.right`)).not.toBeNull();
        act(() => {
            render(<StepTracker {...props} labelPosition="left" />, container);
        });
        expect(container.querySelector(`.left`)).not.toBeNull();
    });

    it("Should display numbers when useNumbers is set to true", () => {
        act(() => {
            render(<StepTracker {...props} useNumbers />, container);
        });
        expect(container.querySelector(`.numbered`)).not.toBeNull();
        act(() => {
            render(<StepTracker {...props} orientation="vertical" useNumbers />, container);
        });
        expect(container.querySelector(`.numbered`)).not.toBeNull();
    });
});

import React from "react";
import { StepTracker, StepTrackerProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: StepTracker", () => {
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
            render(<StepTracker />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySteptrackerClass";
        const id: string = "mySteptrackerId";
        act(() => {
            render(<StepTracker className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render with default values if only compolsory props are passed", () => {
        act(() => {
            render(<StepTracker />, container);
        });
        expect(container.querySelector(`.horizontal`)).not.toBeNull();
        expect(container.querySelector(`.bottom`)).not.toBeNull();
    });

    it("Should render a clickable component and fire click event if onStepClicked method is passed and element is clicked", () => {
        const onStepClicked: jest.Mock = jest.fn();

        act(() => {
            render(
                <StepTracker onStepClicked={onStepClicked}>
                    <StepTracker.Label>First</StepTracker.Label>
                    <StepTracker.Label>Second</StepTracker.Label>
                    <StepTracker.Label>Third</StepTracker.Label>
                </StepTracker>,
                container
            );
        });

        expect(container.querySelector(`.clickable`)).not.toBeNull();
        Simulate.click(container.querySelector(".step-wrapper .step"));
        act(() => {
            render(
                <StepTracker onStepClicked={onStepClicked} orientation="vertical">
                    <StepTracker.Label>First</StepTracker.Label>
                    <StepTracker.Label>Second</StepTracker.Label>
                    <StepTracker.Label>Third</StepTracker.Label>
                </StepTracker>,
                container
            );
        });
        Simulate.click(container.querySelector(".step-wrapper .step"));
        expect(onStepClicked).toHaveBeenCalledTimes(2);
    });

    it("Should be able to render with difference orientation and label positions", () => {
        act(() => {
            render(<StepTracker labelPosition="bottom" />, container);
        });
        expect(container.querySelector(`.bottom`)).not.toBeNull();
        act(() => {
            render(<StepTracker orientation="vertical" />, container);
        });
        expect(container.querySelector(`.vertical`)).not.toBeNull();
        act(() => {
            render(<StepTracker labelPosition="right" />, container);
        });
        expect(container.querySelector(`.right`)).not.toBeNull();
        act(() => {
            render(<StepTracker labelPosition="left" />, container);
        });
        expect(container.querySelector(`.left`)).not.toBeNull();
    });

    it("Should display numbers when useNumbers is set to true", () => {
        act(() => {
            render(
                <StepTracker useNumbers>
                    <StepTracker.Label>First</StepTracker.Label>
                    <StepTracker.Label>Second</StepTracker.Label>
                    <StepTracker.Label>Third</StepTracker.Label>
                </StepTracker>,
                container
            );
        });
        expect(container.querySelector(`.numbered`)).not.toBeNull();
        act(() => {
            render(
                <StepTracker orientation="vertical" useNumbers>
                    <StepTracker.Label>First</StepTracker.Label>
                    <StepTracker.Label>Second</StepTracker.Label>
                    <StepTracker.Label>Third</StepTracker.Label>
                </StepTracker>,
                container
            );
        });
        expect(container.querySelector(`.numbered`)).not.toBeNull();
    });
});

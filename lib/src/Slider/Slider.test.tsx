import React from "react";
import { Slider, SliderLabel, SliderProps, SliderTheme } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Slider", () => {
    let container: HTMLDivElement = null;
    const props: SliderProps = {
        value: 90,
        onChange: jest.fn(),
        name: "slider",
    };
    const labels: Array<SliderLabel> = [
        { position: 0, label: "empty" },
        { position: 100, label: "full" },
    ];

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
            render(<Slider {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "mySliderClass";
        const id: string = "mySliderId";
        act(() => {
            render(<Slider {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render label", () => {
        const label: string = "Slider label";
        act(() => {
            render(<Slider {...props} label={label} />, container);
        });
        expect(container.querySelector(".custom-slider__label")).not.toBeNull();
        expect(container.querySelector(".custom-slider__label").textContent).toEqual(label);
    });

    it("Should render error message", () => {
        const error: string = "Some error";
        act(() => {
            render(<Slider {...props} indicator={{ type: "danger", message: error }} />, container);
        });
        expect(container.querySelector(".feedback")).not.toBeNull();
    });

    it("Should render with default min and max if not passed", () => {
        act(() => {
            render(<Slider {...props} />, container);
        });
        expect(container.querySelector("input").getAttribute("min")).toEqual("0");
        expect(container.querySelector("input").getAttribute("max")).toEqual("100");
        act(() => {
            render(<Slider {...props} min={20} max={60} />, container);
        });
        expect(container.querySelector("input").getAttribute("min")).toEqual("20");
        expect(container.querySelector("input").getAttribute("max")).toEqual("60");
    });

    it("Should always show tooltip when alwaysShowTooltip is set to true", () => {
        act(() => {
            render(<Slider {...props} alwaysShowTooltip />, container);
        });
        expect(container.querySelector(".custom-slider__tooltip-wrapper").classList.contains("custom-slider__tooltip-wrapper--force-show")).toBeTruthy();
    });

    it("Should show ticks when showTicks is set to true", () => {
        act(() => {
            render(<Slider {...props} labels={labels} showTicks />, container);
        });
        expect(container.querySelector(".custom-slider__tickmarks-label").classList.contains("custom-slider__tickmarks-label--ticks")).toBeTruthy();
    });

    it("Should be able to pick a different theme", () => {
        const theme: SliderTheme = "danger";
        act(() => {
            render(<Slider {...props} theme={theme} tooltipTheme={theme} />, container);
        });
        expect(container.querySelector(".custom-slider").classList.contains(`custom-slider--${theme}`)).toBeTruthy(); // theme
        expect(container.querySelector(".custom-slider__tooltip-wrapper").classList.contains(`custom-slider__tooltip-wrapper--${theme}`)).toBeTruthy(); // tooltipTheme
    });

    it("Should be disabled when disabled prop is set to true", () => {
        act(() => {
            render(<Slider {...props} disabled />, container);
        });
        expect(container.querySelector(".custom-slider").classList.contains(`custom-slider--disabled`)).toBeTruthy();
        expect(container.querySelector("input").disabled).toBeTruthy();
    });

    it("Should render labels out of bounds at the edges of the slider", () => {
        const testLabels: Array<SliderLabel> = [
            { position: -12, label: "lower than minimum" },
            { position: 112, label: "higher than maximum" },
        ];
        act(() => {
            render(<Slider {...props} labels={testLabels} />, container);
        });
        const firstLabelStyle: string = container.querySelectorAll(".custom-slider__tickmarks-label").item(0).getAttribute("style");
        const secondLabelStyle: string = container
            .querySelectorAll(".custom-slider__tickmarks-label")
            .item(testLabels.length - 1)
            .getAttribute("style");
        expect(firstLabelStyle).toEqual("left: 0%;");
        expect(secondLabelStyle).toEqual("left: 100%;");
    });

    it("Should render labels correctly", () => {
        const testLabels: Array<SliderLabel> = [
            { position: 0, label: "0%" },
            { position: 50, label: "50%" },
            { position: 100, label: "100%" },
        ];
        act(() => {
            render(<Slider {...props} labels={testLabels} />, container);
        });
        expect(container.querySelectorAll(".custom-slider__tickmarks-label")).toHaveLength(3);
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(0).getAttribute("style")).toEqual("left: 0%;");
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(0).textContent).toEqual("0%");
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(1).getAttribute("style")).toEqual("left: 50%;");
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(1).textContent).toEqual("50%");
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(2).getAttribute("style")).toEqual("left: 100%;");
        expect(container.querySelectorAll(".custom-slider__tickmarks-label").item(2).textContent).toEqual("100%");
    });
});

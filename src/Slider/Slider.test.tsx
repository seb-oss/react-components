import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Slider, RangeSliderLabel, SliderProps, SliderTheme } from "./Slider";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Slider", () => {
    let container: HTMLDivElement = null;
    const props: SliderProps = {
        value: 90,
        onChange: jest.fn(),
        name: "slider"
    };
    const labels: Array<RangeSliderLabel> = [{ position: 0, text: "empty" }, { position: 100, text: "full" }];

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
        act(() => { render(<Slider {...props} />, container); });
        expect(container).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "mySliderClass";
        const id: string = "mySliderId";
        act(() => { render(<Slider {...props} className={className} id={id} />, container); });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render label", () => {
        const label: string = "Slider label";
        act(() => { render(<Slider {...props} label={label} />, container); });
        expect(container.querySelector(".custom-label")).not.toBeNull();
        expect(container.querySelector(".custom-label").textContent).toEqual(label);
    });

    it("Should render error message", () => {
        const error: string = "Some error";
        act(() => { render(<Slider {...props} error={error} />, container); });
        expect(container.querySelector(".alert")).not.toBeNull();
        expect(container.querySelector(".alert").textContent).toEqual(error);
    });

    it("Should render with default min and max if not passed", () => {
        act(() => { render(<Slider {...props} />, container); });
        expect(container.querySelector("input").getAttribute("min")).toEqual("0");
        expect(container.querySelector("input").getAttribute("max")).toEqual("100");
        act(() => { render(<Slider {...props} min={20} max={60} />, container); });
        expect(container.querySelector("input").getAttribute("min")).toEqual("20");
        expect(container.querySelector("input").getAttribute("max")).toEqual("60");
    });

    it("Should render labels when passed", () => {
        act(() => { render(<Slider {...props} labels={labels} />, container); });
        expect(container.querySelector(".custom-slider-label")).not.toBeNull();
    });

    it("Should always show tooltip when alwaysShowTooltip is set to true", () => {
        act(() => { render(<Slider {...props} alwaysShowTooltip />, container); });
        expect(container.querySelector(".custom-slider-preview").classList.contains("always-show")).toBeTruthy();
    });

    it("Should show ticks when showTicks is set to true", () => {
        act(() => { render(<Slider {...props} labels={labels} showTicks />, container); });
        expect(container.querySelector(".custom-slider-label").classList.contains("show-ticks")).toBeTruthy();
    });

    it("Should be able to pick a different theme", () => {
        const theme: SliderTheme = "danger";
        act(() => { render(<Slider {...props} theme={theme} tooltipTheme={theme} />, container); });
        expect(container.querySelector(".custom-slider-holder").classList.contains(theme)).toBeTruthy(); // theme
        expect(container.querySelector(".custom-slider-preview").classList.contains(theme)).toBeTruthy(); // tooltipTheme
    });

    it("Should be disabled when disabled prop is set to true", () => {
        act(() => { render(<Slider {...props} disabled />, container); });
        expect(container.querySelector(".custom-slider").classList.contains("disabled")).toBeTruthy();
        expect(container.querySelector("input").disabled).toBeTruthy();
    });

    it("Should render labels out of bounds at the edges of the slider", () => {
        const testLabels: Array<RangeSliderLabel> = [
            { position: -12, text: "lower than minimum" },
            { position: 112, text: "higher than maximum" },
        ];
        act(() => { render(<Slider {...props} labels={testLabels} />, container); });
        const firstLabelStyle: string = container.querySelectorAll(".custom-slider-label").item(0).getAttribute("style");
        const secondLabelStyle: string = container.querySelectorAll(".custom-slider-label").item(testLabels.length - 1).getAttribute("style");
        expect(firstLabelStyle).toEqual("left: 0%;");
        expect(secondLabelStyle).toEqual("left: 100%;");
    });

    it("Should render labels correctly", () => {
        const testLabels: Array<RangeSliderLabel> = [
            { position: 0, text: "0%" },
            { position: 50, text: "50%" },
            { position: 100, text: "100%" },
        ];
        act(() => { render(<Slider {...props} labels={testLabels} />, container); });
        expect(container.querySelectorAll(".custom-slider-label")).toHaveLength(3);
        expect(container.querySelectorAll(".custom-slider-label").item(0).getAttribute("style")).toEqual("left: 0%;");
        expect(container.querySelectorAll(".custom-slider-label").item(0).textContent).toEqual("0%");
        expect(container.querySelectorAll(".custom-slider-label").item(1).getAttribute("style")).toEqual("left: 50%;");
        expect(container.querySelectorAll(".custom-slider-label").item(1).textContent).toEqual("50%");
        expect(container.querySelectorAll(".custom-slider-label").item(2).getAttribute("style")).toEqual("left: 100%;");
        expect(container.querySelectorAll(".custom-slider-label").item(2).textContent).toEqual("100%");
    });

    it("Should throw a warning when min value is passed larger than max value", () => {
        const warnSpy = spyOn(console, "warn");
        act(() => { render(<Slider {...props} min={50} max={30} />, container); });
        expect(warnSpy).toBeCalled();
    });

    it("Should enable transitions only when the steps less than 30 to increase preceptual performance", () => {
        act(() => { render(<Slider {...props} min={0} max={100} step={20} />, container); });
        expect(container.querySelector(".custom-slider-track").classList.contains("with-transitions")).toBeTruthy();
    });

    describe("Testing thumb location in regards to min, max, and value", () => {
        const testCases: Array<ThumbLocationTestcase> = [
            { min: 0, max: 100, value: 5, expected: "5%" },
            { min: 0, max: 100, value: 0, expected: "0%" },
            { min: 0, max: 100, value: 100, expected: "100%" },
            { min: 0, max: 100, value: -10, expected: "0%" },
            { min: 0, max: 100, value: 110, expected: "100%" },
            { min: -50, max: 50, value: -10, expected: "40%" },
            { min: -50, max: 50, value: 10, expected: "60%" },
            { min: -50, max: 0, value: -10, expected: "80%" },
            { min: -50, max: -10, value: -15, expected: "87.5%" },
        ];
        testCases.map((testCase: ThumbLocationTestcase) => {
            test(`Test case - (Range: ${testCase.min} - ${testCase.max}) | value: ${testCase.value} | expected thum location: ${testCase.expected}`, () => {
                act(() => { render(<Slider {...testCase} name="mySlider" onChange={jest.fn()} />, container) });
                expect(container.querySelector(".custom-slider-thumb").getAttribute("style")).toEqual(`left: ${testCase.expected};`);
            });
        });
    });
});

type ThumbLocationTestcase = {
    min: number;
    max: number;
    value: number;
    expected: string;
};

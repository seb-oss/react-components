import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Slider, RangeSliderLabel, SliderProps } from "./Slider";

describe("Component: Slider", () => {
    let wrapper: ShallowWrapper<SliderProps>;
    const props: SliderProps = {
        value: 90,
        onChange: jest.fn(),
        name: "slider",
    };
    const labels: Array<RangeSliderLabel> = [{ position: 0, text: "empty" }, { position: 100, text: "full" }];

    beforeEach(() => {
        wrapper = shallow(<Slider {...props} />);
    });

    it("Should render", () => expect(wrapper).toBeDefined());

    it("Should pass custom class and id", () => {
        const className: string = "mySliderClass";
        const id: string = "mySliderId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render label", () => {
        const label: string = "Slider label";
        wrapper.setProps({ label });
        expect(wrapper.find(".custom-label")).toBeDefined();
        expect(wrapper.find(".custom-label").text()).toEqual(label);
    });

    it("Should render error message", () => {
        const error: string = "Some error";
        wrapper.setProps({ error });
        expect(wrapper.find(".alert")).toBeDefined();
        expect(wrapper.find(".alert").text()).toEqual(error);
    });

    it("Should render with default min and max if not passed", () => {
        expect(wrapper.find("input").prop("min")).toEqual(0);
        expect(wrapper.find("input").prop("max")).toEqual(100);
        wrapper.setProps({ min: 20, max: 60 });
        expect(wrapper.find("input").prop("min")).toEqual(20);
        expect(wrapper.find("input").prop("max")).toEqual(60);
    });

    it("Should render labels when passed", () => {
        wrapper.setProps({ labels });
        expect(wrapper.find(".custom-slider-label").length).toBeGreaterThan(0);
    });

    describe("Should reset when value is out of boundries", () => {
        let mountedWrapper: ReactWrapper<SliderProps>;
        beforeEach(() => {
            mountedWrapper = mount(<Slider {...props} />);
        });
        test("Value is lower that the minimum", async (done: jest.DoneCallback) => {
            expect.assertions(1);
            mountedWrapper.setProps({ value: -12 }, () => {
                setTimeout(() => {
                    expect(props.onChange).toBeCalledWith({ target: { value: 0, name: props.name, valueAsNumber: 0 } });
                    done();
                });
            });
        });
        test("Value is higher that the maximum", async (done: jest.DoneCallback) => {
            expect.assertions(1);
            mountedWrapper.setProps({ value: 112 }, () => {
                setTimeout(() => {
                    expect(props.onChange).toBeCalledWith({ target: { value: 100, name: props.name, valueAsNumber: 100 } });
                    done();
                });
            });
        });
    });

    it("Should always show tooltip when alwaysShowTooltip is set to true", () => {
        wrapper.setProps({ alwaysShowTooltip: true });
        expect(wrapper.find(".custom-slider-preview").hasClass("always-show")).toBeTruthy();
    });

    it("Should show ticks when showTicks is set to true", () => {
        wrapper.setProps({ showTicks: true, labels });
        expect(wrapper.find(".custom-slider-label").first().hasClass("show-ticks")).toBeTruthy();
    });

    it("Should be able to pick a different theme", () => {
        const theme: string = "danger";
        wrapper.setProps({ theme, tooltipTheme: theme });
        expect(wrapper.find(".custom-slider-holder").hasClass(theme)).toBeTruthy(); // theme
        expect(wrapper.find(".custom-slider-preview").hasClass(theme)).toBeTruthy(); // tooltipTheme
    });

    it("Should render alternative version of slider", () => {
        wrapper.setProps({ alternative: true });
        expect(wrapper.find(".custom-slider").hasClass("alternative")).toBeTruthy();
    });

    it("Should be disabled when disabled prop is set to true", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.hasClass("disabled")).toBeTruthy();
    });

    it("Should render labels out of bounds at the edges of the slider", () => {
        wrapper.setProps({
            labels: [
                { position: -12, text: "lower than minimum" },
                { position: 112, text: "higher than maximum" },
            ]
        });
        const firstLabelStyle: React.CSSProperties = wrapper.find(".custom-slider-label").first().getElement().props.style;
        const secondLabelStyle: React.CSSProperties = wrapper.find(".custom-slider-label").last().getElement().props.style;
        expect(firstLabelStyle.left).toEqual("0%");
        expect(secondLabelStyle.left).toEqual("100%");
    });

});

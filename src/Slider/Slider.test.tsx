import * as React from "react";
import { shallow } from "enzyme";
import { Slider, RangeSliderLabel } from "./Slider";

describe("Component: Slider", () => {
    const props = {
        value: 90,
        onChange: jest.fn(),
        name: "slider",
    };

    const labels: Array<RangeSliderLabel> = [{ position: 0, text: "empty" }, { position: 100, text: "full" }];

    it("Should render", () => {
        const wrapper = shallow(<Slider {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Slider {...props} className="mySlider" />);
        expect(wrapper.hasClass("mySlider")).toBeTruthy();
    });

    it("Should render label", () => {
        const wrapper = shallow(<Slider {...props} label="Slider label" />);
        expect(wrapper.find(".custom-label")).toBeDefined();
        expect(wrapper.find(".custom-label").text()).toEqual("Slider label");
    });

    it("Should render error message", () => {
        const wrapper = shallow(<Slider {...props} error="Some error" />);
        expect(wrapper.find(".alert")).toBeDefined();
        expect(wrapper.find(".alert").text()).toEqual("Some error");
    });

    it("Should render with default min and max if not passed", () => {
        const wrapper = shallow(<Slider {...props} />);
        expect(wrapper.find("input").prop("min")).toEqual(0);
        expect(wrapper.find("input").prop("max")).toEqual(100);
        wrapper.setProps({ min: 20, max: 60 });
        expect(wrapper.find("input").prop("min")).toEqual(20);
        expect(wrapper.find("input").prop("max")).toEqual(60);
    });

    it("Should render labels when passed", () => {
        const wrapper = shallow(<Slider {...props} labels={labels} />);
        expect(wrapper.find(".custom-slider-label").length).toBeGreaterThan(0);
    });

    it("Should fire change event and reset value if value passed is out of boundries", () => {
        const wrapper = shallow(<Slider {...props} min={0} max={100} />);
        wrapper.setProps({ value: -12 });
        expect(props.onChange).toBeCalledWith({ target: { value: 0 } });
        wrapper.setProps({ value: 112 });
        expect(props.onChange).toBeCalledWith({ target: { value: 100 } });
    });

    it("Should always show tooltip when alwaysShowTooltip is set to true", () => {
        const wrapper = shallow(<Slider {...props} alwaysShowTooltip={true} />);
        expect(wrapper.find(".custom-slider-preview").hasClass("always-show")).toBeTruthy();
    });

    it("Should show ticks when showTicks is set to true", () => {
        const wrapper = shallow(<Slider {...props} showTicks={true} labels={labels} />);
        expect(wrapper.find(".custom-slider-label").first().hasClass("show-ticks")).toBeTruthy();
    });

    it("Should be able to pick a different theme", () => {
        const wrapper = shallow(<Slider {...props} theme="danger" tooltipTheme="danger" />);
        expect(wrapper.find(".custom-slider-holder").hasClass("danger")).toBeTruthy(); // theme
        expect(wrapper.find(".custom-slider-preview").hasClass("danger")).toBeTruthy(); // tooltipTheme
    });

    it("Should render alternative version of slider", () => {
        const wrapper = shallow(<Slider {...props} alternative={true} />);
        expect(wrapper.find(".custom-slider").hasClass("alternative")).toBeTruthy();
    });

});

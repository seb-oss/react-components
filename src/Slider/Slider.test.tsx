import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Slider, RangeSliderLabel, SliderProps, SliderTheme } from "./Slider";

describe("Component: Slider", () => {
    let wrapper: ShallowWrapper<SliderProps>;
    let mountedWrapper: ReactWrapper<SliderProps>;
    const props: SliderProps = {
        value: 90,
        onChange: jest.fn(),
        name: "slider"
    };
    const labels: Array<RangeSliderLabel> = [{ position: 0, text: "empty" }, { position: 100, text: "full" }];

    beforeEach(() => {
        wrapper = shallow(<Slider {...props} />);
        mountedWrapper = mount(<Slider {...props} />);
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
        expect(mountedWrapper.find("input").prop("min")).toEqual(0);
        expect(mountedWrapper.find("input").prop("max")).toEqual(100);
        mountedWrapper = mount(<Slider {...props} min={20} max={60} />);
        expect(mountedWrapper.find("input").prop("min")).toEqual(20);
        expect(mountedWrapper.find("input").prop("max")).toEqual(60);
    });

    it("Should render labels when passed", () => {
        wrapper.setProps({ labels });
        expect(wrapper.find(".custom-slider-label").length).toBeGreaterThan(0);
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
        const theme: SliderTheme = "danger";
        wrapper.setProps({ theme, tooltipTheme: theme });
        expect(wrapper.find(".custom-slider-holder").hasClass(theme)).toBeTruthy(); // theme
        expect(wrapper.find(".custom-slider-preview").hasClass(theme)).toBeTruthy(); // tooltipTheme
    });

    it("Should be disabled when disabled prop is set to true", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.hasClass("disabled")).toBeTruthy();
    });

    it("Should render labels out of bounds at the edges of the slider", () => {
        mountedWrapper = mount(<Slider
            {...props}
            labels={[
                { position: -12, text: "lower than minimum" },
                { position: 112, text: "higher than maximum" },
            ]}
        />);
        const firstLabelStyle: React.CSSProperties = mountedWrapper.find(".custom-slider-label").first().getElement().props.style;
        const secondLabelStyle: React.CSSProperties = mountedWrapper.find(".custom-slider-label").last().getElement().props.style;
        expect(firstLabelStyle.left).toEqual("0%");
        expect(secondLabelStyle.left).toEqual("100%");
    });

    it("Should reset the slider thumb to min and max if the value is less than min or exceeds max", () => {
        mountedWrapper = mount(<Slider {...props} min={0} value={-5} />);
        expect(mountedWrapper.find(".custom-slider-thumb").getElement().props.style.left).toBe("0%");
        mountedWrapper = mount(<Slider {...props} max={100} value={110} />);
        expect(mountedWrapper.find(".custom-slider-thumb").getElement().props.style.left).toBe("100%");
    });

    it("Should render labels correctly", () => {
        mountedWrapper = mount(
            <Slider
                {...props}
                labels={[
                    { position: 0, text: "0%" },
                    { position: 50, text: "50%" },
                    { position: 100, text: "100%" },
                ]}
            />
        );
        expect(mountedWrapper.find(".custom-slider-label")).toHaveLength(3);
        expect(mountedWrapper.find(".custom-slider-label").at(0).getElement().props.style.left).toBe("0%");
        expect(mountedWrapper.find(".custom-slider-label").at(0).text()).toBe("0%");
        expect(mountedWrapper.find(".custom-slider-label").at(1).getElement().props.style.left).toBe("50%");
        expect(mountedWrapper.find(".custom-slider-label").at(1).text()).toBe("50%");
        expect(mountedWrapper.find(".custom-slider-label").at(2).getElement().props.style.left).toBe("100%");
        expect(mountedWrapper.find(".custom-slider-label").at(2).text()).toBe("100%");
    });

    it("Should throw a warning when min value is passed larger than max value", () => {
        const warnSpy = spyOn(console, "warn");
        mountedWrapper = mount(
            <Slider
                {...props}
                min={50}
                max={30}
            />
        );
        expect(warnSpy).toBeCalled();
    });

    it("Should allow passing negative values", () => {
        mountedWrapper = mount(
            <Slider
                {...props}
                min={-10}
                max={10}
                value={-5}
            />
        );
        expect(mountedWrapper.find(".custom-slider-thumb").prop("style")).toEqual({ left: "25%" });
        expect(mountedWrapper.find(".custom-slider-slider-before").prop("style")).toEqual({ width: "25%" });
        expect(mountedWrapper.find(".custom-slider-slider-after").prop("style")).toEqual({ width: "75%" });
        expect(mountedWrapper.find(".custom-slider-preview").text()).toEqual("-5");
    });

    afterEach(() => mountedWrapper.unmount());
});

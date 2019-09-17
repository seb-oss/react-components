import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Rating, RatingProps } from "./Rating";
import { SVGStarHollow } from "./RatingStar";

const initialColors: [string, string] = ["#A9A9A9", "#FFC500"];
const disabledColors: [string, string] = ["#dddddd", "#bfbfbf"];

describe("Component: Rating", () => {
    let wrapper: ShallowWrapper<RatingProps>;
    let mountedWrapper: ReactWrapper<RatingProps>;

    beforeEach(() => {
        mountedWrapper && mountedWrapper.unmount();
        wrapper = shallow(<Rating />);
        mountedWrapper = mount(<Rating />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myRatingClass";
        const id: string = "myRatingId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render hollow stars when passed", () => {
        mountedWrapper.setProps({ initialValue: 3 });
        // Filled star
        expect(mountedWrapper.find("svg").first().hasClass("custom-svg-star")).toBeTruthy();
        expect(mountedWrapper.find("svg").last().hasClass("custom-svg-star")).toBeTruthy();
        // Hollow star
        mountedWrapper.setProps({ useHollow: true });
        expect(mountedWrapper.find("svg").first().hasClass("custom-svg-star-hollow")).toBeTruthy();
        expect(mountedWrapper.find("svg").last().hasClass("custom-svg-star")).toBeTruthy();
    });

    it("Should render with default colors if colors passed incorrectly", () => {
        mountedWrapper.setProps({ initialValue: 3, colors: ["#0F0"] as any });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(initialColors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(initialColors[1]);
        mountedWrapper.setProps({ useHollow: true });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(initialColors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(initialColors[1]);
    });

    it("Should accept custom colors only when an array of two colors are passed", () => {
        const colors: [string, string] = ["#0F0", "#F00"];
        mountedWrapper.setProps({ initialValue: 3, colors });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(colors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(colors[1]);
        mountedWrapper.setProps({ useHollow: true });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(colors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(colors[1]);
    });

    it("Should fire change event when passed", () => {
        const onChange: jest.Mock = jest.fn();
        mountedWrapper.setProps({ onChange });
        mountedWrapper.children().first().children().first().children().first().children().first().children().last().simulate("click");
        expect(onChange).toBeCalled();
    });

    it("Should enable tooltip when passed", () => {
        const tooltipList: Array<string> = ["1", "2", "3", "4", "5"];
        mountedWrapper.setProps({ tooltipList, initialValue: 3 });
        expect(mountedWrapper.find("svg").at(1).find("title").length).toBe(1);
        expect(mountedWrapper.find("svg").at(1).find("title").first().text()).toEqual("1");

        const starWrapper: ShallowWrapper<RatingProps> = shallow(<SVGStarHollow width={25} height={25} fill="#F00" title="title" />);
        expect(starWrapper.find("title").length).toBe(1);
        expect(starWrapper.find("title").first().text()).toEqual("title");
    });

    it("Should be disabled when disabled prop is set to true", () => {
        mountedWrapper.setProps({ initialValue: 3, disabled: true });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(disabledColors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(disabledColors[1]);
        mountedWrapper.setProps({ useHollow: true });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual(disabledColors[0]);
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual(disabledColors[1]);
    });
});

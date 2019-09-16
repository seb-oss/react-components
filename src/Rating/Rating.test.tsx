import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Rating, RatingProps } from "./Rating";
import { SVGStarHollow } from "./RatingStar";

describe("Component: Rating", () => {
    let wrapper: ShallowWrapper<RatingProps>;
    let mountedWrapper: ReactWrapper<RatingProps>;

    beforeEach(() => {
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

    it("Should accept custom colors only when an array of two colors are passed", () => {
        mountedWrapper.setProps({ initialValue: 3, colors: ["#0F0"] as any });
        // Filled star
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#A9A9A9");
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#FFC500");
        mountedWrapper.setProps({ colors: ["#0F0", "#F00"] });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#0F0");
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#F00");
        // Hollow star
        mountedWrapper.setProps({ useHollow: true });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#A9A9A9");
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#FFC500");
        mountedWrapper.setProps({ colors: ["#0F0", "#F00"] });
        expect(mountedWrapper.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#0F0");
        expect(mountedWrapper.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#F00");
    });

    it("Should fire change event", () => {
        const onChange: jest.Mock = jest.fn();
        mountedWrapper.setProps({ onChange });
        mountedWrapper
            .children().first()
            .children().first()
            .children().first()
            .children().first()
            .children().last()
            .simulate("click");
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
});

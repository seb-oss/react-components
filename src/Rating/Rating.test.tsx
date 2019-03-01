import * as React from "react";
import { shallow, mount } from "enzyme";
import { Rating } from "./Rating";
import { SVGStar, SVGStarHollow } from "./RatingStar";

describe("Component: Rating", () => {

    it("Should render", () => {
        const wrapper = shallow(<Rating />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Rating className="myRating" />);
        expect(wrapper.hasClass("myRating")).toBeTruthy();
    });

    it("Should render hollow stars when passed", () => {
        // Filled star
        const wrapper1 = mount(<Rating initialValue={3} />);
        expect(wrapper1.find("svg").first().hasClass("custom-svg-star")).toBeTruthy();
        expect(wrapper1.find("svg").last().hasClass("custom-svg-star")).toBeTruthy();
        // Hollow star
        const wrapper2 = mount(<Rating initialValue={3} useHollow={true} />);
        expect(wrapper2.find("svg").first().hasClass("custom-svg-star-hollow")).toBeTruthy();
        expect(wrapper2.find("svg").last().hasClass("custom-svg-star")).toBeTruthy();
    });

    it("Should accept custom colors only when an array of two colors are passed", () => {
        // Filled star
        const wrapper1 = mount(<Rating initialValue={3} colors={["#0F0"]} />);
        expect(wrapper1.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#A9A9A9");
        expect(wrapper1.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#FFC500");
        wrapper1.setProps({ colors: ["#0F0", "#F00"] });
        expect(wrapper1.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#0F0");
        expect(wrapper1.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#F00");
        // Hollow star
        const wrapper2 = mount(<Rating initialValue={3} colors={["#0F0"]} useHollow={true} />);
        expect(wrapper2.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#A9A9A9");
        expect(wrapper2.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#FFC500");
        wrapper2.setProps({ colors: ["#0F0", "#F00"] });
        expect(wrapper2.find("svg").first().find(".star-fill").first().prop("fill")).toEqual("#0F0");
        expect(wrapper2.find("svg").last().find(".star-fill").first().prop("fill")).toEqual("#F00");
    });

    it("Should fire change event", () => {
        const onChange = jest.fn();
        const wrapper = mount(<Rating onChange={onChange} />);
        wrapper
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
        const wrapper1 = mount(<Rating tooltipList={tooltipList} initialValue={3} />);
        expect(wrapper1.find("svg").at(1).find("title").length).toBe(1);
        expect(wrapper1.find("svg").at(1).find("title").first().text()).toEqual("1");

        const wrapper2 = shallow(<SVGStarHollow width={25} height={25} fill="#F00" title="title" />);
        expect(wrapper2.find("title").length).toBe(1);
        expect(wrapper2.find("title").first().text()).toEqual("title");
    });
});

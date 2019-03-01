import * as React from "react";
import { shallow, mount } from "enzyme";
import { Dialogue } from "./Dialogue";

describe("Component: Dialogue", () => {

    it("Should render and be hidden until toggled", () => {
        const wrapper = shallow(<Dialogue toggle={false} />);
        expect(wrapper).toBeDefined();
        wrapper.instance().componentDidMount();
        expect(wrapper.state("open")).toEqual(false);
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Dialogue toggle={true} className="myDialogue" />);
        expect(wrapper.find(".dialogue-container").hasClass("myDialogue")).toBeTruthy();
    });

    it("Should render a close button if no action or button text is passed", () => {
        const wrapper = shallow(<Dialogue toggle={true} />);
        expect(wrapper.find(".dialogue-action").length).toBe(1);
        expect(wrapper.find(".dialogue-action").find("button").text()).toEqual("Close");
    });

    it("Should render a close button if only actions are passed without button text", () => {
        const primary = jest.fn();
        const wrapper = shallow(<Dialogue toggle={true} primaryAction={primary} />);
        expect(wrapper.find(".dialogue-action").length).toBe(1);
        expect(wrapper.find(".dialogue-action").find("button").text()).toEqual("Close");
        wrapper.find(".primary-action").find("button").simulate("click");
        expect(primary).toBeCalled();
    });

    it("Should fire primary and secondary actions when passed and clicked on", () => {
        const primary = jest.fn();
        const secondary = jest.fn();
        const wrapper = mount(
            <Dialogue
                toggle={true}
                primaryAction={primary}
                secondaryAction={secondary}
                primaryBtn="primary"
                secondaryBtn="secondary"
            />
        );
        wrapper.find(".primary-action").find("button").simulate("click");
        wrapper.find(".secondary-action").find("button").simulate("click");
        expect(wrapper.find(".dialogue-action").length).toBe(2); // Rendered both actions
        expect(primary).toHaveBeenCalled(); // Primary action fired
        expect(secondary).toHaveBeenCalled(); // Secondary action fired
    });

    it("Should render header and description when passed", () => {
        const wrapper = shallow(<Dialogue toggle={true} header="header" desc="desc" />);
        expect(wrapper.find(".dialogue-header").length).toBe(1);
        expect(wrapper.find(".dialogue-header").text()).toEqual("header");
        expect(wrapper.find(".dialogue-desc").length).toBe(1);
        expect(wrapper.find(".dialogue-desc").text()).toEqual("desc");
    });

    it("Should toggle off the dialogue when set to false", () => {
        const wrapper = shallow(<Dialogue toggle={true} />);
        expect(wrapper.hasClass("open-dialogue")).toBeTruthy();
        expect(wrapper.hasClass("close-dialogue")).toBeFalsy();
        wrapper.setProps({ toggle: false });
        expect(wrapper.hasClass("open-dialogue")).toBeFalsy();
        expect(wrapper.hasClass("close-dialogue")).toBeTruthy();
    });

    it("Should not update when parent re-renders until props are changed", () => {
        const wrapper = mount(<Dialogue toggle={false} />);
        wrapper.instance().componentDidUpdate({ ...wrapper.instance().props }, {});
        expect(wrapper.state("open")).toEqual(false);
        expect(wrapper.state("close")).toEqual(false);
        wrapper.instance().componentDidUpdate({ toggle: false }, {});
        expect(wrapper.state("open")).toEqual(false);
        expect(wrapper.state("close")).toEqual(false);
        wrapper.setProps({ toggle: true });
        wrapper.instance().componentDidUpdate({ toggle: true }, {});
        expect(wrapper.state("open")).toEqual(true);
        expect(wrapper.state("close")).toEqual(false);
    });
});

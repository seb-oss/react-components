import * as React from "react";
import { shallow } from "enzyme";
import { StepTracker } from "./StepTracker";

describe("Component: StepTracker", () => {
    const props = {
        step: 1,
        list: ["first", "second", "third", "fourth"]
    };

    it("Should render", () => {
        const wrapper = shallow(<StepTracker {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass a custom class", () => {
        const wrapper = shallow(<StepTracker {...props} className="mySteptracker" />);
        expect(wrapper.hasClass("mySteptracker")).toBeTruthy();
    });

    it("Should render with default values if only compolsory props are passed", () => {
        const wrapper = shallow(<StepTracker {...props} />);
        expect(wrapper.hasClass("horizontal")).toBeTruthy();
        expect(wrapper.hasClass("label-bottom")).toBeTruthy();
    });

    it("Should render a clickable component and fire click event if onClick method is passed and element is clicked", () => {
        const onClick = jest.fn();
        const wrapper = shallow(<StepTracker {...props} onClick={onClick} />);
        expect(wrapper.hasClass("clickable")).toBeTruthy();
        wrapper.find(".step-wrapper").find(".step").first().simulate("click");
        wrapper.setProps({ orientation: "vertical" });
        wrapper.find(".step-wrapper").find(".step").first().simulate("click");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("Should be able to render with difference orientation and label positions", () => {
        const wrapper = shallow(<StepTracker {...props} />);
        wrapper.setProps({ labelPosition: "top" });
        expect(wrapper.hasClass("label-top"));
        wrapper.setProps({ orientation: "vertical" });
        expect(wrapper.hasClass("vertical"));
        expect(wrapper.hasClass("label-right"));
        wrapper.setProps({ orientation: "vertical", labelPosition: "left" });
        expect(wrapper.hasClass("label-left"));
    });

    it("Should display numbers when useNumbers is set to true", () => {
        const wrapper = shallow(<StepTracker {...props} useNumbers={true} />);
        expect(wrapper.find(".step").first().hasClass("numbered"));
        wrapper.setProps({ orientation: "vertical" });
        expect(wrapper.find(".step").first().hasClass("numbered"));
    });

});

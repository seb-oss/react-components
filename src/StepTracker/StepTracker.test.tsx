import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { StepTracker, StepTrackerProps } from "./StepTracker";

describe("Component: StepTracker", () => {
    const props: StepTrackerProps = {
        step: 1,
        list: ["first", "second", "third", "fourth"],
    };
    let wrapper: ShallowWrapper<StepTrackerProps>;

    beforeEach(() => {
        wrapper = shallow(<StepTracker {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySteptrackerClass";
        const id: string = "mySteptrackerId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render with default values if only compolsory props are passed", () => {
        expect(wrapper.hasClass("horizontal")).toBeTruthy();
        expect(wrapper.hasClass("label-bottom")).toBeTruthy();
    });

    it("Should render a clickable component and fire click event if onClick method is passed and element is clicked", () => {
        const onClick: jest.Mock = jest.fn();
        wrapper.setProps({ onClick });
        expect(wrapper.hasClass("clickable")).toBeTruthy();
        wrapper.find(".step-wrapper").find(".step").first().simulate("click");
        wrapper.setProps({ orientation: "vertical" });
        wrapper.find(".step-wrapper").find(".step").first().simulate("click");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("Should be able to render with difference orientation and label positions", () => {
        wrapper.setProps({ labelPosition: "top" });
        expect(wrapper.hasClass("label-top"));
        wrapper.setProps({ orientation: "vertical" });
        expect(wrapper.hasClass("vertical"));
        expect(wrapper.hasClass("label-right"));
        wrapper.setProps({ orientation: "vertical", labelPosition: "left" });
        expect(wrapper.hasClass("label-left"));
    });

    it("Should display numbers when useNumbers is set to true", () => {
        wrapper.setProps({ useNumbers: true });
        expect(wrapper.find(".step").first().hasClass("numbered"));
        wrapper.setProps({ orientation: "vertical" });
        expect(wrapper.find(".step").first().hasClass("numbered"));
    });
});

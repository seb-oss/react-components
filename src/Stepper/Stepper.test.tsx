import * as React from "react";
import { shallow, ReactWrapper, mount } from "enzyme";
import { Stepper, StepperProps } from "./Stepper";

describe("Component: Stepper", () => {
    const props = {
        value: 1,
        onIncrease: jest.fn(),
        onDecrease: jest.fn(),
        min: 1,
        max: 6
    };

    it("Should render", () => {
        const wrapper = shallow(<Stepper {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Stepper {...props} className="myStepper" />);
        expect(wrapper.hasClass("myStepper")).toBeTruthy();
    });

    it("Should pass down the id to the html input component", () => {
        let mountedWrapper: ReactWrapper<StepperProps>;
        const id: string = "my-stepper-id";
        mountedWrapper = mount(<Stepper {...props} id={id} />);
        expect(mountedWrapper.find(`#${id}`).length).toBeDefined();
        mountedWrapper = mount(<Stepper {...props} />);
        expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
    });

    it("Should render label", () => {
        const wrapper = shallow(<Stepper {...props} label="Stepper label" />);
        expect(wrapper.find(".custom-label")).toBeDefined();
        expect(wrapper.find(".custom-label").text()).toEqual("Stepper label");
    });

    it("Should disable decrement if value is min and disable increment if value is max", () => {
        const wrapper = shallow(<Stepper {...props} />);
        expect(wrapper.find(".stepper-decrement").hasClass("disabled")).toBeTruthy();
        wrapper.setProps({ value: 6 });
        expect(wrapper.find(".stepper-increment").hasClass("disabled")).toBeTruthy();
    });

    it("Should fire onIncrease on onDecrese when clicked", () => {
        const wrapper = shallow(<Stepper {...props} />);
        wrapper.setProps({ value: 3 });
        wrapper.find(".stepper-increment").simulate("click");
        expect(props.onIncrease).toBeCalled();
        wrapper.find(".stepper-decrement").simulate("click");
        expect(props.onDecrease).toBeCalled();
    });

    it("Should render the element as disabled when disabled is set to true", () => {
        const wrapper = shallow(<Stepper {...props} disabled={true} />);
        expect(wrapper.find(".stepper-container").hasClass("disabled"));
        expect(wrapper.find("input").prop("disabled")).toEqual(true);
    });

    it("Should render warning and error message when passed", () => {
        const wrapper = shallow(<Stepper {...props} error="error" warning="warning" />);
        expect(wrapper.find(".alert-danger").length).toBe(1);
        expect(wrapper.find(".alert-warning").length).toBe(0);
        wrapper.setProps({ error: "" });
        expect(wrapper.find(".alert-danger").length).toBe(0);
        expect(wrapper.find(".alert-warning").length).toBe(1);
    });
});

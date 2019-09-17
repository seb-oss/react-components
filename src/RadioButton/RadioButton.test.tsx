import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { RadioButton, RadioButtonProps } from "./RadioButton";

describe("Component: RadioButton", () => {
    let wrapper: ShallowWrapper<RadioButtonProps>;
    const props: RadioButtonProps = {
        value: "wer",
        label: "label",
        onChange: jest.fn(),
        name: "Gender",
        radioValue: "male"
    };

    beforeEach(() => {
        wrapper = shallow(<RadioButton {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myRadiobuttonClass";
        const id: string = "myRadiobuttonId";
        const mountedWrapper: ReactWrapper<RadioButtonProps> = mount(<RadioButton {...props} className={className} id={id} />);
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render with random id if id is not passed", async (done: jest.DoneCallback) => {
        expect.assertions(2);
        const mountedWrapper: ReactWrapper<RadioButtonProps> = mount(<RadioButton {...props} label="label" />);
        setTimeout(() => {
            expect(mountedWrapper.find("input").getElement().props.id).toBeDefined();
            expect(mountedWrapper.find("label").getElement().props.htmlFor).toBeDefined();
            done();
        });
    });

    it("Should fire a change event", () => {
        wrapper.find("input").simulate("change", { target: { value: "test-value" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display label, description and error", () => {
        const label: string = "label";
        const description: string = "description";
        const error: string = "error";
        wrapper.setProps({ label, description, error });
        expect(wrapper.find(".radio-label").length).toBe(1);
        expect(wrapper.find(".radio-label").text()).toEqual(label);
        expect(wrapper.find(".radio-description").length).toBe(1);
        expect(wrapper.find(".radio-description").text()).toEqual(description);
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert").text()).toEqual(error);
        expect(wrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
    });

    it("Should render inline when inline prop is set to true", () => {
        wrapper.setProps({ inline: true });
        expect(wrapper.find(".input-field").hasClass("inline")).toBeTruthy();
    });

});

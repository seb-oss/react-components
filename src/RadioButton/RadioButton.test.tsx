import * as React from "react";
import { shallow } from "enzyme";
import { RadioButton } from "./RadioButton";

describe("Component: RadioButton", () => {
    const props = {
        value: "wer",
        label: "label",
        onChange: jest.fn(),
        name: "Gender",
        radioValue: "male"
    };

    it("Should render", () => {
        const wrapper = shallow(<RadioButton {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<RadioButton {...props} className="myRadiobutton" />);
        expect(wrapper.hasClass("myRadiobutton")).toBeTruthy();
    });

    it("Should pass custom id and name", () => {
        const wrapper = shallow(<RadioButton {...props} id="my-id" name="my-name" />);
        expect(wrapper.find("#my-id")).toHaveLength(1);
        expect(wrapper.find(".radio-input").getElement().props.name).toEqual("my-name");
    });

    it("Should fire a change event", () => {
        const wrapper = shallow(<RadioButton {...props} />);
        wrapper.find("input").simulate("change", { target: { value: "test-value" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display label, description and error", () => {
        const wrapper = shallow(<RadioButton {...props} label="label" description="desc" error="error" />);
        expect(wrapper.find(".radio-label").length).toBe(1);
        expect(wrapper.find(".radio-label").text()).toEqual("label");
        expect(wrapper.find(".radio-description").length).toBe(1);
        expect(wrapper.find(".radio-description").text()).toEqual("desc");
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert").text()).toEqual("error");
        expect(wrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
    });

    it("Should render inline when inline prop is set to true", () => {
        const wrapper = shallow(<RadioButton {...props} inline={true} />);
        expect(wrapper.find(".input-field").hasClass("inline")).toBeTruthy();
    });

});

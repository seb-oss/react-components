import * as React from "react";
import { shallow } from "enzyme";
import { CheckBox } from "./CheckBox";

describe("Component: CheckBox", () => {
    const props = {
        name: "myCheckbox",
        checked: false,
        onChange: jest.fn()
    };

    it("Should render", () => {
        const wrapper = shallow(<CheckBox {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should renders and pass custom class", () => {
        const wrapper = shallow(<CheckBox {...props} className="myClassname" />);
        expect(wrapper.find(".input-field").hasClass("myClassname")).toBeTruthy();
    });

    it("Should pass down the id to the hmtl input component", () => {
        const wrapper = shallow(<CheckBox {...props} id="my-checkbox-id" />);
        expect(wrapper.find("#my-checkbox-id")).toHaveLength(1);
    });

    it("Should pass down the name to the html input component", () => {
        const wrapper = shallow(<CheckBox {...props} />);
        expect(wrapper.find("input").getElement().props.name).toEqual("myCheckbox");
    });

    it("Should render inline when inline prop is set to true", () => {
        const wrapper = shallow(<CheckBox {...props} inline={true} />);
        expect(wrapper.hasClass("inline")).toBeTruthy();
    });

    it("Should render labels, description and error when passed", () => {
        const wrapper = shallow(<CheckBox {...props} label="label" topLabel="topLabel" description="description" error="error" />);
        expect(wrapper.find(".custom-control-label").length).toBe(1); // Label
        expect(wrapper.find(".checkbox-toplabel").length).toBe(1); // Top Label
        expect(wrapper.find(".checkbox-description").length).toBe(1); // Description
        expect(wrapper.find(".alert").length).toBe(1); // Error
    });

    it("Should fire a change event when checkbox input value is changed", () => {
        const wrapper = shallow(<CheckBox {...props} />);
        wrapper.find("input").simulate("change");
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should disable checkbox when disabled prop is set to true", () => {
        const wrapper = shallow(<CheckBox {...props} disabled={true} />);
        expect(wrapper.find("input").props().disabled).toBeTruthy();
    });

});

import * as React from "react";
import { shallow } from "enzyme";
import { RadioGroup } from "./RadioGroup";

describe("Component: RadioGroup", () => {
    const props = {
        list: [
            { value: "option1", group: "customgroup", label: "option1" },
            { value: "option2", group: "customgroup", label: "option2", description: "desc" },
            { value: "option3", group: "customgroup", label: "option3", disabled: true }
        ],
        onChange: jest.fn(),
        value: "male",
    };

    it("Should render", () => {
        const wrapper = shallow(<RadioGroup {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<RadioGroup {...props} className="myRadioGroup" />);
        expect(wrapper.hasClass("myRadioGroup")).toBeTruthy();
    });

    it("Should fire change event when radio group value changes", () => {
        const wrapper = shallow(<RadioGroup {...props} />);
        wrapper.find("input").last().simulate("change", { target: { value: "test-value" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display group label, items' label and description, and group error", () => {
        const wrapper = shallow(<RadioGroup {...props} error="error" label="label" />);
        // Group Label
        expect(wrapper.find(".radio-group-label").length).toBe(1);
        expect(wrapper.find(".radio-group-label").text()).toEqual("label");
        // Item label and description
        expect(wrapper.find(".radio-item").first().find(".radio-label").first().text()).toEqual("option1");
        expect(wrapper.find(".radio-item").at(1).find(".radio-description").length).toBe(1);
        expect(wrapper.find(".radio-item").at(1).find(".radio-description").first().text()).toEqual("desc");
        // Error
        expect(wrapper.find(".input-field").first().hasClass("has-error")).toBeTruthy();
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert-danger").text()).toEqual("error");
    });

    it("Should render group items in inline mode", () => {
        const wrapper = shallow(<RadioGroup {...props} inline={true} />);
        expect(wrapper.find(".input-field").first().hasClass("inline")).toBeTruthy();
    });

    it("Should render disabled inputs when disabled is passed in item or in disableAll prop", () => {
        const wrapper = shallow(<RadioGroup {...props} />);
        expect(wrapper.find(".radio-item").at(2).find(".radio-input").prop("disabled")).toBeTruthy();
        wrapper.setProps({ disableAll: true });
        expect(wrapper.find(".radio-item").at(0).find(".radio-input").prop("disabled")).toBeTruthy();
        expect(wrapper.find(".radio-item").at(1).find(".radio-input").prop("disabled")).toBeTruthy();
        expect(wrapper.find(".radio-item").at(2).find(".radio-input").prop("disabled")).toBeTruthy();
    });

});

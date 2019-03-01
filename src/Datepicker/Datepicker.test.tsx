import * as React from "react";
import { shallow, mount } from "enzyme";
import { Datepicker } from "./Datepicker";

describe("Component: Datepicker", () => {
    const props = {
        name: "myDatepicker",
        value: new Date(),
        onChange: jest.fn(),
    };

    it("Should render", () => {
        const wrapper = shallow(<Datepicker {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should render and pass custom class", () => {
        const wrapper = shallow(<Datepicker {...props} className="mydatepicker" />);
        expect(wrapper.hasClass("mydatepicker")).toBeTruthy();
    });

    it("Should fire change event when component value is changed", () => {
        const wrapper = mount(<Datepicker {...props} />);
        wrapper.find("input").first().simulate("change");
        expect(props.onChange).toHaveBeenCalled();
        wrapper.unmount();
    });

    it("Should render label and error", () => {
        const wrapper = shallow(<Datepicker {...props} label="label" error="error" />);
        // Label
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual("label");
        // Error
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert").text()).toEqual("error");
    });

    it("Should enable disabled when disabled prop is set to true", () => {
        const wrapper = mount(<Datepicker {...props} disabled={true} />);
        expect(wrapper.find("input").first().prop("disabled")).toBe(true);
        wrapper.unmount();
    });
});

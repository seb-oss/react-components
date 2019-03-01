import * as React from "react";
import { shallow } from "enzyme";
import { Toggle } from "./Toggle";

describe("Component: Toggle ", () => {

    const props = {
        value: true,
        onChange: jest.fn(),
        name: "myToggle"
    };

    it("Should render", () => {
        const wrapper = shallow(<Toggle {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Toggle {...props} className="myToggle" />);
        expect(wrapper.hasClass("myToggle")).toBeTruthy();
    });

    it("Should fire change event when changed", () => {
        const wrapper = shallow(<Toggle {...props} />);
        wrapper.find(".toggle").simulate("change", { target: { value: false } });
        expect(props.onChange).toBeCalled();
    });

    it("Should render label", () => {
        const wrapper = shallow(<Toggle {...props} label="label" />);
        expect(wrapper.find(".toggle-label").length).toBe(1);
        expect(wrapper.find(".toggle-label").text()).toEqual("label");
    });
});

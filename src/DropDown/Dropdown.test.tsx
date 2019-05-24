import * as React from "react";
import { shallow, mount } from "enzyme";
import { DropDown } from "./DropDown";

describe("Component: DropDown", () => {
    const props = {
        onChange: jest.fn(),
        list: [
            { value: "Male", label: "male", selected: false },
            { value: "Female", label: "Female", selected: false },
        ]
    };

    it("Should render", () => {
        const wrapper = shallow(<DropDown {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<DropDown {...props} className="myDropdown" />);
        expect(wrapper.hasClass("myDropdown")).toBeTruthy();
    });

    it("Should render label when passed", () => {
        const wrapper = shallow(<DropDown {...props} label="label" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual("label");
    });

    it("Should render placeholder", () => {
        const wrapper2 = mount(<DropDown {...props} placeholder="myPlaceholder" />);
        expect(wrapper2.find(".title").length).toBe(1);
        expect(wrapper2.find(".title").text()).toEqual("myPlaceholder");
        wrapper2.unmount();
    });

    it("Should enable searchable prop when set to true", () => {
        const wrapper = mount(<DropDown {...props} searchable={true} />);
        expect(wrapper.find(".search-input").length).toBe(1);
    });
});

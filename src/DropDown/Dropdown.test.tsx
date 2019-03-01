import * as React from "react";
import { shallow, mount } from "enzyme";
import { DropDown } from "./DropDown";

describe("Component: DropDown", () => {
    const props = {
        onChange: jest.fn(),
        selectedValue: null,
        list: [
            { value: "Male", label: "male" },
            { value: "Female", label: "Female" },
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

    it("Should render label and error when passed", () => {
        const wrapper = shallow(<DropDown {...props} label="label" error="error" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual("label");
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert").text()).toEqual("error");
    });

    it("Should render alternative by default", () => {
        const wrapper = mount(<DropDown {...props} />);
        expect(wrapper.find("select").length).toBe(0);
    });

    it("Should render native select when native is set to true", () => {
        const wrapper = shallow(<DropDown {...props} native={true} />);
        expect(wrapper.find("select").length).toBe(1);
        wrapper.setProps({ selectedValue: props.list[0] });
        expect(wrapper.find("select").prop("value")).toEqual(props.list[0].value);
    });

    it("Should render native select when native is set to true", () => {
        const wrapper = mount(<DropDown {...props} native={true} />);
        expect(wrapper.find("select").length).toBe(1);
        wrapper.unmount();
    });

    it("Should render placeholder", () => {
        // Native
        const wrapper1 = shallow(<DropDown {...props} native={true} placeholder="myPlaceholder" />);
        expect(wrapper1.find("option").length).toBe(props.list.length + 1);
        expect(wrapper1.find("option").first().prop("value")).toBe("DEFAULT");
        expect(wrapper1.find("option").first().text()).toBe("myPlaceholder");
        // Alternative
        const wrapper2 = mount(<DropDown {...props} placeholder="myPlaceholder" />);
        expect(wrapper2.find(".custom-dropdown__placeholder").length).toBe(1);
        expect(wrapper2.find(".custom-dropdown__placeholder").text()).toEqual("myPlaceholder");
        wrapper2.unmount();
    });

    it("Should enable searchable and clearable props when set to true", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={props.list}
                selectedValue={props.list[0]}
                searchable={true}
                clearable={true}
                multi={true}
            />
        );
        expect(wrapper.find(".custom-dropdown__clear-indicator").length).toBe(1);
        expect(wrapper.find(".custom-dropdown__input").find("input").length).toBe(1);
    });

    it("Should fire a change event when element value changed (Native only)", () => {
        // Native
        const nativeChanged = jest.fn();
        const wrapper = shallow(<DropDown list={props.list} selectedValue={null} onChange={nativeChanged} native={true} />);
        wrapper.find("select").simulate("change", { target: { value: "male" } });
        expect(nativeChanged).toBeCalled();
    });

});

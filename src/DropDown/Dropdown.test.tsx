import * as React from "react";
import { shallow, mount } from "enzyme";
import { DropDown } from "./DropDown";

describe("Component: DropDown", () => {
    const basicProps = {
        onChange: jest.fn(),
        selectedValue: null,
    };
    const props = {
        ...basicProps,
        list: [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
        ]
    };

    it("Should render", () => {
        const wrapper = shallow(<DropDown {...props} />);
        expect(wrapper).toBeDefined();
        wrapper.unmount();
    });

    it("Should pass custom class", () => {
        const wrapper = mount(<DropDown {...props} className="test-custom-class" />);
        expect(wrapper.hasClass("test-custom-class")).toBeTruthy();
        wrapper.unmount();
    });

    it("Should render label when passed", () => {
        const wrapper = shallow(<DropDown {...props} label="label" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual("label");
        wrapper.unmount();
    });

    it("Should open menu when clicked on trigger", () => {
        const wrapper = mount(<DropDown {...props} label="label" />);
        const toggleButton = wrapper.find(".custom-dropdown-toggle");
        expect(toggleButton.length).toBe(1);
        toggleButton.simulate("click");
        expect(wrapper.find(".show").length).toBe(1);
        wrapper.unmount();
    });

    it("Should display \"Empty\" if list prop is an empty array", () => {
        const wrapper = mount(<DropDown {...basicProps} list={[]} placeholder="myPlaceholder" />);
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("Empty");
        wrapper.unmount();
    });

    it("Should render placeholder", () => {
        const wrapper = mount(<DropDown {...props} placeholder="myPlaceholder" />);
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("myPlaceholder");
        wrapper.unmount();
    });

    it("Should display item label when one item is selected instead of placeholder", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                ]}
                selectedValue={{ value: "Male", label: "Male" }}
                placeholder="myPlaceholder"
            />
        );
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("Male");
        wrapper.unmount();
    });

    it("Should display item label when one item is selected even when multi is enabled", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                selectedValue={[{ value: "Male", label: "Male" }]}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                ]}
                placeholder="myPlaceholder"
                multi={true}
            />
        );
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("Male");
        wrapper.unmount();
    });

    it("Should display \"[selectedList.length] Selected\" label if selected more than one and less that total amount of items. (multi only)", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                ]}
                selectedValue={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" }
                ]}
                placeholder="myPlaceholder"
                multi={true}
            />
        );
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("2 Selected");
        wrapper.unmount();
    });

    it("Should display label: All selected (list.length) when all items are selected", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                ]}
                selectedValue={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" }
                ]}
                placeholder="myPlaceholder"
                multi={true}
                clearable={true}
            />
        );
        expect(wrapper.find(".title").length).toBe(1);
        expect(wrapper.find(".title").text()).toEqual("All selected (2)");
        wrapper.unmount();
    });

    it("Should enable searchable prop when set to true", () => {
        const wrapper = mount(<DropDown {...props} searchable={true} />);
        expect(wrapper.find(".search-input").length).toBe(1);
        wrapper.unmount();
    });

    it("Should enable more button when set to true", () => {
        const wrapper = mount(<DropDown {...props} more={true} />);
        expect(wrapper.find(".custom-dropdown-toggle").length).toBe(1);
        expect(wrapper.find(".more").length).toBe(1);
        wrapper.unmount();
    });

    it("Should display native dropdown if native prop set true", () => {
        const wrapper = mount(<DropDown {...props} native={true} />);
        expect(wrapper.find(".form-control").length).toBe(1);
        wrapper.unmount();
    });

    it("Should not display native dropdown if multi prop set true", () => {
        const wrapper = mount(<DropDown {...props} native={true} multi={true} />);
        expect(wrapper.find(".form-control").length).toBe(0);
        wrapper.unmount();
    });

    it("Should display error is error prop set", () => {
        const wrapper = mount(<DropDown {...props} error={"error"} />);
        expect(wrapper.find(".alert-danger").length).toBe(1);
        expect(wrapper.find(".alert-danger").text()).toEqual("error");
        wrapper.unmount();
    });

    it("Should disable component when disabled set to true", () => {
        const wrapper = shallow(<DropDown {...props} disabled={true} />);
        expect(wrapper.find(".disabled").length).toBe(2);
        wrapper.unmount();
    });

    it("Should display clear button when multi prop set to true and at least one item selected", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                ]}
                selectedValue={[{ value: "Male", label: "Male" }]}
                multi={true}
            />
        );
        expect(wrapper.find(".dropdown-times-icon").length).toBe(1);
        wrapper.unmount();
    });

    it("Should display clear button when clearable prop set to true and at least one item selected", () => {
        const wrapper = mount(
            <DropDown
                onChange={props.onChange}
                list={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                ]}
                selectedValue={{ value: "Male", label: "Male" }}
                clearable={true}
            />
        );
        expect(wrapper.find(".dropdown-times-icon").length).toBe(1);
        wrapper.unmount();
    });

    it("Should not display clear button if all items are unselected even when clearable prop set to true", () => {
        const wrapper = mount(
            <DropDown
                {...props}
                clearable={true}
            />
        );
        expect(wrapper.find(".dropdown-times-icon").length).toBe(0);
        wrapper.unmount();
    });
});

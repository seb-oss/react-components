import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { CheckBox, CheckBoxProps } from "./CheckBox";

describe("Component: CheckBox", () => {
    const props: CheckBoxProps = {
        name: "myCheckbox",
        label: "myLabel",
        checked: false,
        onChange: jest.fn()
    };
    let wrapper: ShallowWrapper<CheckBoxProps>;

    beforeEach(() => {
        wrapper = shallow(<CheckBox {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should renders and pass custom class", () => {
        const className: string = "myCheckboxClass";
        const id: string = "myCheckboxId";
        const mountedWrapper: ReactWrapper<CheckBoxProps> = mount(<CheckBox {...props} className={className} id={id} />);
        expect(mountedWrapper.find(".custom-checkbox").hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`)).toHaveLength(2); // Input and label
    });

    it("Should generated a random id when id is not passed", () => {
        const mountedWrapper: ReactWrapper<CheckBoxProps> = mount(<CheckBox {...props} />);
        expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
    });

    it("Should pass down the name to the html input component", () => {
        expect(wrapper.find("input").getElement().props.name).toEqual("myCheckbox");
    });

    it("Should render inline and condensed when passed", () => {
        const mountedWrapper: ReactWrapper<CheckBoxProps> = mount(<CheckBox {...props} inline={true} condensed={true} />);
        expect(mountedWrapper.find(".custom-checkbox").hasClass("inline")).toBeTruthy();
        expect(mountedWrapper.find(".custom-checkbox").hasClass("condensed")).toBeTruthy();
    });

    it("Should render top label and description when passed", () => {
        const topLabel: string = "my top label";
        const description: string = "my description";
        wrapper.setProps({ topLabel, description });
        expect(wrapper.find(".checkbox-toplabel").length).toBe(1); // Top Label
        expect(wrapper.find(".checkbox-toplabel").text()).toEqual(topLabel); // Top Label
        expect(wrapper.find(".checkbox-description").length).toBe(1); // Description
        expect(wrapper.find(".checkbox-description").text()).toEqual(description); // Description
    });

    it("Should fire a change event when checkbox input value is changed", () => {
        wrapper.find("input").simulate("change");
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should disable checkbox when disabled prop is set to true", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find("input").props().disabled).toBeTruthy();
    });

});

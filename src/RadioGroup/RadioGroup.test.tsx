import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { RadioGroup, RadioGroupProps } from "./RadioGroup";

describe("Component: RadioGroup", () => {
    const props: RadioGroupProps<string> = {
        list: [
            { value: "option1", label: "option1" },
            { value: "option2", label: "option2", description: "desc" },
            { value: "option3", label: "option3", disabled: true }
        ],
        onChange: jest.fn(),
        value: "male",
        name: "gender"
    };
    let wrapper: ShallowWrapper<RadioGroupProps>;
    let mountedWrapper: ReactWrapper<RadioGroupProps>;

    beforeEach(() => {
        wrapper = shallow(<RadioGroup {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const className: string = "myRadioGroupClass";
        const id: string = "myRadioGroupId";
        mountedWrapper = mount(<RadioGroup {...props} className={className} id={id} />);
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should fire change event when radio group value changes", () => {
        wrapper.find("input").last().simulate("change", { target: { value: "test-value" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display group label, items' label and description, and group error", () => {
        const label: string = "my label";
        wrapper.setProps({ label });
        // Group Label
        expect(wrapper.find(".radio-group-label").length).toBe(1);
        expect(wrapper.find(".radio-group-label").text()).toEqual(label);
        // Item label and description
        expect(wrapper.find(".custom-control").first().find(".custom-control-label").first().text()).toEqual(props.list[0].label);
        expect(wrapper.find(".custom-control").at(1).find(".radio-description").length).toBe(1);
        expect(wrapper.find(".custom-control").at(1).find(".radio-description").first().text()).toEqual(props.list[1].description);
    });

    it("Should render group items in inline mode", () => {
        mountedWrapper = mount(<RadioGroup {...props} inline={true} condensed={true} />);
        expect(mountedWrapper.find(".custom-radio").hasClass("inline")).toBeTruthy();
        expect(mountedWrapper.find(".custom-radio").hasClass("condensed")).toBeTruthy();
    });

    it("Should render disabled inputs when disabled is passed in item or in disableAll prop", () => {
        expect(wrapper.find(".custom-control").at(2).find(".custom-control-input").prop("disabled")).toBeTruthy();
        wrapper.setProps({ disableAll: true });
        expect(wrapper.find(".custom-control").at(0).find(".custom-control-input").prop("disabled")).toBeTruthy();
        expect(wrapper.find(".custom-control").at(1).find(".custom-control-input").prop("disabled")).toBeTruthy();
        expect(wrapper.find(".custom-control").at(2).find(".custom-control-input").prop("disabled")).toBeTruthy();
    });

});

import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { TextLabel, TextLabelProps } from ".";

describe("Component: TextLabel", () => {
    let wrapper: ShallowWrapper<TextLabelProps>;

    beforeEach(() => {
        wrapper = shallow(<TextLabel value="textlabel" />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should render with correct value", () => {
        expect(wrapper.find(".custom-label-value").text()).toEqual("textlabel");
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTextlabelClass";
        const id: string = "myTextlabelId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render label", () => {
        const label: string = "my label";
        wrapper.setProps({ label });
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual(label);
    });
});

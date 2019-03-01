import * as React from "react";
import { shallow } from "enzyme";
import { TextLabel } from "./TextLabel";

describe("Component: TextLabel", () => {

    it("Should render", () => {
        const wrapper = shallow(<TextLabel value="textlabel" />);
        expect(wrapper).toBeDefined();
    });

    it("Should render with correct value", () => {
        const wrapper = shallow(<TextLabel value="textlabel" />);
        expect(wrapper.find(".custom-label-value").text()).toEqual("textlabel");
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<TextLabel value="textlabel" className="myTextlabel" />);
        expect(wrapper.hasClass("myTextlabel")).toBeTruthy();
    });

    it("Should render label", () => {
        const wrapper = shallow(<TextLabel value="textlabel" label="label" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual("label");
    });

});

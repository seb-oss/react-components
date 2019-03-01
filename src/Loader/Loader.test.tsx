import * as React from "react";
import { shallow } from "enzyme";
import { Loader } from "./Loader";

describe("Component: Loader", () => {

    it("Should render", () => {
        const wrapper = shallow(<Loader toggle={true} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Loader toggle={true} className="myLoader" />);
        expect(wrapper.hasClass("myLoader")).toBeTruthy();
    });

    it("Should disable fullscreen when set to false", () => {
        const wrapper = shallow(<Loader toggle={true} fullscreen={false} />);
        expect(wrapper.hasClass("fullscreen")).toBeFalsy();
    });

    it("Should hide loader when toggle is true", () => {
        const wrapper = shallow(<Loader toggle={true} />);
        wrapper.setProps({ toggle: false });
        expect(wrapper.find(".loader-holder").length).toBe(0);
    });

});

import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Icon, IconProps } from "./Icon";

describe("Component: Icon", () => {
    const icon = <svg />;
    let wrapper: ShallowWrapper<IconProps>;

    beforeEach(() => {
        wrapper = shallow(<Icon src={icon} />);
    });

    it("Should render", () => expect(wrapper).toBeDefined());

    it("Should render SVG inside", () => expect(wrapper.children("svg")).toBeDefined());

    it("Should pass custom class", () => {
        wrapper.setProps({ className: "myIcon" });
        expect(wrapper.hasClass("myIcon")).toBeTruthy();
    });

    it("Should render HTML title when passed", () => {
        wrapper.setProps({ title: "someTitle" });
        expect(wrapper.html().indexOf(`title="someTitle"`)).not.toEqual(-1);
    });

    it("Should fire click event if passed", () => {
        const action: jest.Mock = jest.fn();
        wrapper.setProps({ onClick: action }).simulate("click");
        expect(action).toBeCalled();
    });

    it("Should render in custom size", () => {
        wrapper.setProps({ size: 30 });
        expect(wrapper.prop("style")).toEqual({ width: 30, height: 30 });
    });
});

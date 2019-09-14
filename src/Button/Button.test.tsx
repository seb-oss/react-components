import * as React from "react";
import { shallow, ShallowWrapper, HTMLAttributes } from "enzyme";
import { Button, ButtonProps } from "./Button";

describe("Component: Button", () => {

    let wrapper: ShallowWrapper<ButtonProps>;
    let onClick: jest.Mock;

    beforeEach(() => {
        onClick = jest.fn();
        wrapper = shallow(<Button label="label" onClick={onClick} />);
    });

    it("Should render", () => expect(wrapper).toBeDefined());

    it("Should render label correctly", () => expect(wrapper.find(".button-content").children(".button-label").text()).toEqual("label"));

    it("Should fire onClick callback when clicked", () => {
        wrapper.find(".btn").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });

    it("Should render custom className", () => {
        wrapper.setProps({ className: "my-button" });
        expect(wrapper.hasClass("my-button")).toBeTruthy();
    });

    it("Should pass down the id to the button component", () => {
        wrapper.setProps({ id: "my-button-id" });
        expect(wrapper.find("#my-button-id")).toHaveLength(1);
    });

    it("Should pass down the name to the button component", () => {
        wrapper.setProps({ name: "my-button-name" });
        expect(wrapper.find("button").getElement().props.name).toEqual("my-button-name");
    });

    it("Should disable button when disabled prop is set to true", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.html().indexOf("disabled")).not.toEqual(-1);
    });

    it("Should render custom theme", () => {
        expect(wrapper.hasClass("btn-primary")).toBeTruthy();
        wrapper.setProps({ theme: "secondary" });
        expect(wrapper.hasClass("btn-secondary")).toBeTruthy();
    });

    it("Should render HTML title attribute when passed", () => {
        wrapper.setProps({ title: "someTitle" });
        expect(wrapper.html().indexOf(`title="someTitle"`)).not.toEqual(-1);
    });

    it("Should render icon inside button", () => {
        const icon: React.ReactElement<SVGElement> = <svg className="customIcon" />;
        wrapper.setProps({ icon: icon, iconPosition: "right" });
        expect(wrapper.hasClass("icon-right")).toBeTruthy();
        expect(wrapper.find(".svg-holder").length).toBe(1);
        expect(wrapper.find(".svg-holder").children("svg.customIcon")).toBeDefined();
    });

    it("Should render icon to the left as default if no position is passed", () => {
        const icon: React.ReactElement<SVGElement> = <svg />;
        wrapper.setProps({ icon: icon });
        expect(wrapper.hasClass("icon-left"));
    });
});

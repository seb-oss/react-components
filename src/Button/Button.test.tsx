import * as React from "react";
import { shallow, ShallowWrapper, HTMLAttributes } from "enzyme";
import { Button, ButtonProps, ButtonTheme, ButtonSizes } from "./Button";

type ButtonTestItem<T, K> = { value: T, expected: K };

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

    it("Should render custom className and id", () => {
        const className: string = "myButtonClass";
        const id: string = "myButtonId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    describe("Should render supported themes", () => {
        const list: Array<ButtonTestItem<ButtonTheme, string>> = [
            { value: "primary", expected: "btn-primary" },
            { value: "secondary", expected: "btn-outline-primary" },
            { value: "alternative", expected: "btn-secondary" },
            { value: "ghost-dark", expected: "btn-ghost-dark" },
            { value: "ghost-light", expected: "btn-ghost-light" },
            { value: "anchor", expected: "btn-anchor" },
            { value: "danger", expected: "btn-danger" },
            { value: "unsupported-theme" as any, expected: "btn-primary" },
        ];
        list.map((item: ButtonTestItem<ButtonTheme, string>) => {
            it(`Theme: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                wrapper.setProps({ theme: item.value });
                expect(wrapper.hasClass(item.expected));
            });
        });
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonSizes, string>> = [
            { value: "lg", expected: "btn-lg" },
            { value: "md", expected: "btn-md" },
            { value: "sm", expected: "btn-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonSizes, string>) => {
            it(`Size: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                wrapper.setProps({ size: item.value });
                expect(wrapper.hasClass(item.expected));
            });
        });
    });

    it("Should pass name, title, disabled to native button element", () => {
        const name: string = "myButtonName";
        const title: string = "myButtonTitle";
        wrapper.setProps({ name, title, disabled: true });
        expect(wrapper.find("button").getElement().props.name).toEqual(name);
        expect(wrapper.find("button").getElement().props.title).toEqual(title);
        expect(wrapper.find("button").getElement().props.disabled).toEqual(true);
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

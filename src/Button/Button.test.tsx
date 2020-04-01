import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Button, ButtonProps, ButtonTheme, ButtonSizes } from "./Button";

type ButtonTestItem<T, K> = { value: T; expected: K };

describe("Component: Button", () => {
    let wrapper: ShallowWrapper<ButtonProps>;
    let mountedWrapper: ReactWrapper<ButtonProps>;

    const props: ButtonProps = {
        label: "label",
        onClick: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<Button {...props} />);
        mountedWrapper = mount(<Button {...props} />);
    });

    it("Should render", () => expect(wrapper).toBeDefined());

    it("Should render label correctly", () => expect(wrapper.find(".button-content").children(".button-label").text()).toEqual("label"));

    it("Should fire onClick callback when clicked", () => {
        const onClick: jest.Mock = jest.fn();
        wrapper.setProps({ onClick });
        wrapper.find("button").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });

    it("Should render custom className", () => {
        const className: string = "myButtonClass";
        mountedWrapper = mount(<Button {...props} className={className} />);
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
    });

    it("Should pass id", () => {
        const id: string = "myButtonId";
        wrapper.setProps({ id });
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    describe("Should render supported themes", () => {
        const list: Array<ButtonTestItem<ButtonTheme, string>> = [
            { value: "primary", expected: "btn-primary" },
            { value: "outline-primary", expected: "btn-outline-primary" },
            { value: "secondary", expected: "btn-secondary" },
            { value: "ghost-dark", expected: "btn-ghost-dark" },
            { value: "ghost-light", expected: "btn-ghost-light" },
            { value: "anchor", expected: "btn-link" },
            { value: "link", expected: "btn-link" },
            { value: "danger", expected: "btn-danger" },
            { value: "unsupported-theme" as any, expected: "btn-primary" },
        ];
        list.map((item: ButtonTestItem<ButtonTheme, string>) => {
            it(`Theme: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                mountedWrapper = mount(<Button {...props} theme={item.value} />);
                expect(mountedWrapper.hasClass(item.expected));
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
                mountedWrapper = mount(<Button {...props} size={item.value} />);
                expect(mountedWrapper.find("button").hasClass(item.expected));
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
        mountedWrapper = mount(<Button {...props} icon={icon} />);
        expect(mountedWrapper.find("button").hasClass("icon-left")).toBeTruthy();
        expect(mountedWrapper.find(".svg-holder").length).toBe(1);
        expect(mountedWrapper.find(".svg-holder").children("svg.customIcon")).toBeDefined();
        mountedWrapper = mount(<Button {...props} icon={icon} iconPosition="right" />);
        expect(mountedWrapper.find("button").hasClass("icon-right")).toBeTruthy();
    });

    it("Should render icon to the left as default if no position is passed", () => {
        const icon: React.ReactElement<SVGElement> = <svg />;
        wrapper.setProps({ icon: icon });
        expect(wrapper.hasClass("icon-left"));
    });

    it("Should render children in replacement for icons", () => {
        const svgId: string = "my-test-svg";
        wrapper = shallow(
            <Button {...props} iconPosition="left">
                <svg id={svgId} />
            </Button>
        );
        expect(wrapper.find(`#${svgId}`).length).toBeDefined();
    });

    afterEach(() => mountedWrapper.unmount());
});

import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { TextBox, TextBoxProps } from ".";

describe("Component: TextBox", () => {
    let wrapper: ShallowWrapper<TextBoxProps>;
    let mountedWrapper: ReactWrapper<TextBoxProps>;
    const props: TextBoxProps = {
        name: "myTextBox",
        value: "",
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<TextBox {...props} />);
        mountedWrapper = mount(<TextBox {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.hasClass("input-box-group")).toBeTruthy();
    });

    it("Should pass down the id or random id to the TextBox component", () => {
        const id: string = "my-TextBox-id";
        mountedWrapper = mount(<TextBox {...props} id={id} />);
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
        mountedWrapper = mount(<TextBox {...props} label="test label" />);
        expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
    });

    it("Should pass down extra optional attributes to the component", () => {
        wrapper.setProps({ pattern: "my-pattern", minLength: 2, maxLength: 4, required: true });
        const componentProps = wrapper.find("input").getElement().props;
        expect(componentProps.pattern).toEqual("my-pattern");
        expect(componentProps.minLength).toEqual(2);
        expect(componentProps.maxLength).toEqual(4);
        expect(componentProps.required).toEqual(true);
    });

    it("Should trigger onChange callback when change to input element is detected", () => {
        wrapper.find("input").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    describe("Testing optional events", () => {
        let mountedProps: TextBoxProps;

        beforeAll(() => {
            mountedProps = {
                name: "myTextBox",
                value: "",
                onChange: jest.fn(),
                onKeyDown: jest.fn(),
                onKeyUp: jest.fn(),
                onKeyPress: jest.fn(),
                onFocus: jest.fn(),
                onBlur: jest.fn(),
            };
            mountedWrapper = mount(<TextBox {...mountedProps} />);
            mountedWrapper.find(".form-control").simulate("keyDown", { key: "a", keyCode: 65 });
            mountedWrapper.find(".form-control").simulate("keyUp", { key: "a", keyCode: 65 });
            mountedWrapper.find(".form-control").simulate("keyPress", { key: "a", keyCode: 65 });
            mountedWrapper.find(".form-control").simulate("focus", { key: "a", keyCode: 65 });
            mountedWrapper.find(".form-control").simulate("blur", { key: "a", keyCode: 65 });
        });

        test("KeyDown", () => expect(mountedProps.onKeyDown).toBeCalled());
        test("KeyUp", () => expect(mountedProps.onKeyUp).toBeCalled());
        test("KeyPress", () => expect(mountedProps.onKeyPress).toBeCalled());
        test("Focus", () => expect(mountedProps.onFocus).toBeCalled());
        test("Blur", () => expect(mountedProps.onBlur).toBeCalled());
    });

    it("Should pass custom class", () => {
        const className: string = "myTextBox";
        wrapper.setProps({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should render label", () => {
        const label: string = "my label";
        wrapper.setProps({ label });
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual(label);
    });

    it("Should show hint and success indicators, hide error message when hint is set to `null`", () => {
        const hint: string = "some error";
        mountedWrapper = mount(<TextBox {...props} hint={hint} />);
        expect(mountedWrapper.find(".progress-0").length).toBe(1);
        expect(mountedWrapper.find(".progress-0").text()).toEqual(hint);
        mountedWrapper = mount(<TextBox {...props} hint={hint} hintTheme="success" />);
        expect(mountedWrapper.find(".input-group").hasClass("success")).toBeTruthy();
        expect(mountedWrapper.find(".progress-100").length).toBe(1);
        mountedWrapper = mount(<TextBox {...props} hint={hint} hintTheme="warning" />);
        expect(mountedWrapper.find(".input-group").hasClass("warning")).toBeTruthy();
        expect(mountedWrapper.find(".progress-50").length).toBe(1);
        mountedWrapper = mount(<TextBox {...props} hint={hint} hintTheme="danger" />);
        expect(mountedWrapper.find(".input-group").hasClass("danger")).toBeTruthy();
        expect(mountedWrapper.find(".progress-10").length).toBe(1);
    });

    describe("Testing optional properties", () => {
        let inputProps: TextBoxProps;
        const optionals: Array<Partial<Pick<TextBoxProps, keyof TextBoxProps>>> = [
            { name: "" },
            { name: "my-textbox-name" },
            { pattern: "my-pattern" },
            { minLength: 2 },
            { maxLength: 4 },
            { required: true },
            { autoComplete: "on" },
            { type: "number" },
            { disabled: true },
            { readOnly: true },
            { placeholder: "my placeholder" },
        ];
        optionals.map((optional: Pick<TextBoxProps, keyof TextBoxProps>) => {
            const key: string = Object.keys(optional)[0];
            test(key, () => {
                wrapper.setProps({ ...optional });
                inputProps = wrapper.find("input").getElement().props;
                expect(inputProps[key]).toEqual(optional[key]);
            });
        });
    });

    describe("Test left append", () => {
        it("Should render text and title", () => {
            wrapper.setProps({ leftSlot: "leftSlot", leftSlotTitle: "leftTitle" });
            expect(wrapper.find(".input-box-group-wrapper").children().at(0).hasClass("input-group-prepend")).toBeTruthy();
            expect(wrapper.find(".input-group-text").length).toBe(1);
            expect(wrapper.find(".input-group-text").prop("title")).toEqual("leftTitle");
            expect(wrapper.find(".input-group-text").text()).toEqual("leftSlot");
        });

        it("Should render icon and trigger onLeftClick callback when clicked", () => {
            const onLeftClick: jest.Mock = jest.fn();
            const testIcon: JSX.Element = <svg />;
            wrapper.setProps({ leftSlot: testIcon, onLeftClick });
            expect(wrapper.find(".input-group-prepend").hasClass("clickable")).toBeTruthy();
            expect(wrapper.find(".input-group-text").childAt(0).matchesElement(testIcon)).toBeTruthy();
            wrapper.find(".input-group-prepend").simulate("click");
            expect(onLeftClick).toBeCalled();
        });
    });

    describe("Test right append", () => {
        it("Should render text and title", () => {
            wrapper.setProps({ rightSlot: "rightSlot", rightSlotTitle: "rightTitle" });
            expect(wrapper.find(".input-box-group-wrapper").children().at(1).hasClass("input-group-append")).toBeTruthy();
            expect(wrapper.find(".input-group-text").length).toBe(1);
            expect(wrapper.find(".input-group-text").prop("title")).toEqual("rightTitle");
            expect(wrapper.find(".input-group-text").text()).toEqual("rightSlot");
        });

        it("Should render icon and trigger onRightClick callback when clicked", () => {
            const onRightClick: jest.Mock = jest.fn();
            const testIcon: JSX.Element = <svg />;
            wrapper.setProps({ rightSlot: testIcon, onRightClick });
            expect(wrapper.find(".input-group-append").hasClass("clickable")).toBeTruthy();
            expect(wrapper.find(".input-group-text").childAt(0).matchesElement(testIcon)).toBeTruthy();
            wrapper.find(".input-group-append").simulate("click");
            expect(onRightClick).toBeCalled();
        });
    });
});

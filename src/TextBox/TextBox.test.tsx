import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { TextBox, TextBoxProps } from "./TextBox";

describe("Component: TextBox", () => {
    const props: TextBoxProps = {
        name: "MyTextBox",
        value: "",
        onChange: jest.fn(),
    };
    let wrapper: ShallowWrapper<TextBoxProps>;
    let mountedWrapper: ReactWrapper<TextBoxProps>;

    beforeEach(() => {
        wrapper = shallow(<TextBox {...props} />);
        mountedWrapper = mount(<TextBox {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const className: string = "myTextBoxClass";
        wrapper.setProps({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should pass down the id or random id to the TextBoxGroup component", () => {
        const id: string = "my-TextBoxGroup-id";
        mountedWrapper = mount(<TextBox {...props} id={id} />);
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
        mountedWrapper = mount(<TextBox {...props} label="test label" />);
        expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
    });

    describe("Testing optional properties", () => {
        let inputProps: TextBoxProps;
        const optionals: Array<Partial<Pick<TextBoxProps, keyof TextBoxProps>>> = [
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

    it("Should fire change event", () => {
        wrapper.find("input").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    it("Should render label", () => {
        const label: string = "my label";
        wrapper.setProps({ label });
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual(label);
    });

    it("Should show error and success indicators, hide error message when `showErrorMessage` props is set to `false`", () => {
        const error: string = "some error";
        mountedWrapper = mount(<TextBox {...props} error={error} />);
        expect(mountedWrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(mountedWrapper.find(".alert-danger").length).toBe(1);
        expect(mountedWrapper.find(".alert-danger").text()).toEqual(error);
        mountedWrapper = mount(<TextBox {...props} error={error} showErrorMessage={false} success />);
        expect(mountedWrapper.find(".input-field").hasClass("has-error")).toBeFalsy();
        expect(mountedWrapper.find(".input-field").hasClass("success")).toBeTruthy();
        expect(mountedWrapper.find(".alert-danger").length).toBe(0);
        mountedWrapper = mount(<TextBox {...props} error={error} showErrorMessage={false} />);
        expect(mountedWrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(mountedWrapper.find(".alert-danger").length).toBe(0);
        mountedWrapper = mount(<TextBox {...props} error={error} showErrorMessage={true} />);
        expect(mountedWrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(mountedWrapper.find(".alert-danger").length).toBe(1);
        mountedWrapper = mount(<TextBox {...props} error={error} showErrorMessage={null} />);
        expect(mountedWrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(mountedWrapper.find(".alert-danger").length).toBe(1);
    });

    describe("Testing optional event listners:", () => {
        const eventListeners = {
            onKeyDown: jest.fn(),
            onKeyUp: jest.fn(),
            onKeyPress: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn(),
        };
        mountedWrapper = mount(<TextBox {...props} {...eventListeners} />);
        mountedWrapper.find(".form-control").simulate("keyDown", { key: "a", keyCode: 65 });
        mountedWrapper.find(".form-control").simulate("keyUp", { key: "a", keyCode: 65 });
        mountedWrapper.find(".form-control").simulate("keyPress", { key: "a", keyCode: 65 });
        mountedWrapper.find(".form-control").simulate("focus", { key: "a", keyCode: 65 });
        mountedWrapper.find(".form-control").simulate("blur", { key: "a", keyCode: 65 });
        test("KeyDown", () => expect(eventListeners.onKeyDown).toBeCalled());
        test("KeyUp", () => expect(eventListeners.onKeyUp).toBeCalled());
        test("KeyPress", () => expect(eventListeners.onKeyPress).toBeCalled());
        test("Focus", () => expect(eventListeners.onFocus).toBeCalled());
        test("Blur", () => expect(eventListeners.onBlur).toBeCalled());
    });
});

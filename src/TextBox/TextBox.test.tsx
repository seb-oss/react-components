import * as React from "react";
import { shallow, mount } from "enzyme";
import { TextBox } from "./TextBox";

describe("Component: TextBox", () => {
    const props = {
        name: "MyTextBox",
        value: "my-value",
        onChange: jest.fn(),
    };

    it("Should render", () => {
        const wrapper = shallow(<TextBox {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<TextBox {...props} className="myTextbox" />);
        expect(wrapper.hasClass("myTextbox")).toBeTruthy();
    });

    it("Should fire change event", () => {
        const wrapper = shallow(<TextBox {...props} />);
        wrapper.find("input").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    it("Should render label and error", () => {
        const wrapper = shallow(<TextBox {...props} label="label" error="error" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".alert-danger").text()).toEqual("error");
    });

    it("Should enable autocomplete when autocomplete is set to true", () => {
        const wrapper = shallow(<TextBox {...props} autoComplete={true} />);
        expect(wrapper.find("input").prop("autoComplete")).toEqual("on");
    });

    describe("- Testing optional event listners:", () => {
        const eventListeners = {
            onKeyDown: jest.fn(),
            onKeyUp: jest.fn(),
            onKeyPress: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn()
        };
        const wrapper = mount(<TextBox {...props} {...eventListeners} />);
        wrapper.find(".form-control").simulate("keyDown", { key: "a", keyCode: 65 });
        wrapper.find(".form-control").simulate("keyUp", { key: "a", keyCode: 65 });
        wrapper.find(".form-control").simulate("keyPress", { key: "a", keyCode: 65 });
        wrapper.find(".form-control").simulate("focus", { key: "a", keyCode: 65 });
        wrapper.find(".form-control").simulate("blur", { key: "a", keyCode: 65 });
        test("KeyDown", () => expect(eventListeners.onKeyDown).toBeCalled());
        test("KeyUp", () => expect(eventListeners.onKeyUp).toBeCalled());
        test("KeyPress", () => expect(eventListeners.onKeyPress).toBeCalled());
        test("Focus", () => expect(eventListeners.onFocus).toBeCalled());
        test("Blur", () => expect(eventListeners.onBlur).toBeCalled());
    });

});

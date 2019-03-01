import * as React from "react";
import { shallow, mount } from "enzyme";
import { TextArea } from "./TextArea";

describe("Component: TextArea", () => {
    const props = {
        name: "myTextarea",
        value: "wer",
        onChange: jest.fn()
    };

    it("Should render", () => {
        const wrapper = shallow(<TextArea {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<TextArea {...props} className="myTextarea" />);
        expect(wrapper.hasClass("myTextarea")).toBeTruthy();
    });

    it("Should fire change event", () => {
        const wrapper = shallow(<TextArea {...props} />);
        wrapper.find("textarea").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    it("Should render label and error", () => {
        const wrapper = shallow(<TextArea {...props} error="error" label="label" />);
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(wrapper.find(".alert-danger").text()).toEqual("error");
    });

    it("Should render textarea with resizable option", () => {
        const wrapper = shallow(<TextArea {...props} />);
        expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
        wrapper.setProps({ resizable: true });
        expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
        wrapper.setProps({ resizable: false });
        expect(wrapper.find("textarea").hasClass("resizable")).toBeFalsy();
    });

    describe("- Testing optional event listners:", () => {
        const eventListeners = {
            onKeyDown: jest.fn(),
            onKeyUp: jest.fn(),
            onKeyPress: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn()
        };
        const wrapper = mount(<TextArea {...props} {...eventListeners} />);
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

import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { TextArea, TextAreaProps } from "./TextArea";

describe("Component: TextArea", () => {
    const props: TextAreaProps = {
        name: "myTextarea",
        value: "wer",
        onChange: jest.fn(),
    };
    let wrapper: ShallowWrapper<TextAreaProps>;

    beforeEach(() => {
        wrapper = shallow(<TextArea {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const className: string = "myTextareaClass";
        wrapper.setProps({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should pass id", () => {
        const id: string = "myTextareaId";
        let mountedWrapper: ReactWrapper<TextAreaProps>;
        mountedWrapper = mount(<TextArea {...props} id={id} />);
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
        mountedWrapper = mount(<TextArea {...props} label="test label" />);
        expect(mountedWrapper.find("textarea").getElement().props.id).toBeTruthy();
    });

    it("Should fire change event", () => {
        wrapper.find("textarea").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    it("Should render label and error", () => {
        const error: string = "some error";
        const label: string = "some label";
        wrapper.setProps({ error, label });
        expect(wrapper.find("label").length).toBe(1);
        expect(wrapper.find("label").text()).toEqual(label);
        expect(wrapper.find(".alert").length).toBe(1);
        expect(wrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
        expect(wrapper.find(".alert-danger").text()).toEqual(error);
    });

    it("Should render textarea with resizable option", () => {
        expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
        wrapper.setProps({ resizable: true });
        expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
        wrapper.setProps({ resizable: false });
        expect(wrapper.find("textarea").hasClass("resizable")).toBeFalsy();
    });

    describe("Testing optional event listners:", () => {
        const eventListeners = {
            onKeyDown: jest.fn(),
            onKeyUp: jest.fn(),
            onKeyPress: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn(),
        };
        const mountedWrapper: ReactWrapper<TextAreaProps> = mount(<TextArea {...props} {...eventListeners} />);
        const testCases: Array<[keyof WindowEventMap, keyof TextAreaProps]> = [
            ["keydown", "onKeyDown"],
            ["keyup", "onKeyUp"],
            ["keypress", "onKeyPress"],
            ["focus", "onFocus"],
            ["blur", "onBlur"],
        ];
        testCases.map((testCase: [keyof WindowEventMap, keyof TextAreaProps]) => {
            const [type, action] = testCase;
            test(action, () => {
                const mock: jest.Mock = jest.fn();
                mountedWrapper.setProps({ [action]: mock } as any);
                mountedWrapper.find(".form-control").simulate(type, { key: "a", keyCode: 65 });
                expect(mock).toBeCalled();
            });
        });
    });
});

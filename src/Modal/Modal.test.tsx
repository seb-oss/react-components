import * as React from "react";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { Modal, ModalProps } from "./Modal";

describe("Component: Modal", () => {
    let modalProps: ModalProps;
    let wrapper: ShallowWrapper<ModalProps>;

    beforeEach(() => {
        modalProps = { toggle: false, onDismiss: jest.fn() };
        wrapper = shallow(<Modal {...modalProps} />);
    });

    it("Should render and be hidden until toggled", () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.hasClass("show")).toBeFalsy();
        expect(wrapper.hasClass("fade")).toBeTruthy();
    });

    it("Should render and be displayed when toggled", () => {
        wrapper.setProps({ toggle: true });
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.hasClass("modal-fullscreen")).toBeFalsy();
        expect(wrapper.hasClass("modal-aside")).toBeFalsy();
    });

    it("It should open in full screen", () => {
        wrapper.setProps({ toggle: true, fullscreen: true });
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.hasClass("modal-aside")).toBeFalsy();
        expect(wrapper.find(".modal-fullscreen")).toBeTruthy();
    });

    it("should open with position left", () => {
        wrapper.setProps({ toggle: true, position: "left" });
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.find(".modal-aside")).toBeTruthy();
        expect(wrapper.find(".modal-aside-left")).toBeTruthy();
    });

    it("Should open with position right", () => {
        wrapper.setProps({ toggle: true, position: "right" });
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.find(".modal-aside")).toBeTruthy();
        expect(wrapper.find(".modal-aside-right")).toBeTruthy();
    });

    it("Should call `onDismiss` when backdrop is clicked", () => {
        wrapper.setProps({ toggle: true });
        wrapper.find(".modal-backdrop").simulate("click");
        expect(modalProps.onDismiss).toBeCalled();
    });

    it("Should not call `onDismiss` when backdrop is clicked and `disableBackdropDismiss` is set to true", () => {
        wrapper.setProps({ toggle: true, disableBackdropDismiss: true });
        wrapper.find(".modal-backdrop").simulate("click");
        expect(modalProps.onDismiss).not.toBeCalled();
    });

    it("Should have a header and body", () => {
        wrapper.setProps({ toggle: true, header: <h1>Header</h1>, body: <p>Body</p> });
        expect(wrapper.find(".modal-header").text()).toEqual("Header");
        expect(wrapper.find(".modal-body").text()).toEqual("Body");
    });

    it("Should not update when parent re-renders until props are changed", () => {
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: false });
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: true });
        expect(wrapper.find(".show")).toBeTruthy();
    });

    it("Should pass ID", () => {
        wrapper.setProps({ id: "myModal" });
        expect(wrapper.find("#myModal").length).toBeGreaterThan(0);
    });
});

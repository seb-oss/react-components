import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
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

    it("Should have a header, body, and footer", () => {
        wrapper.setProps({
            toggle: true,
            header: <h1>Header</h1>,
            body: <p>Body</p>,
            footer: <p>Footer</p>
        });
        expect(wrapper.find(".modal-header").text()).toEqual("Header");
        expect(wrapper.find(".modal-body").text()).toEqual("Body");
        expect(wrapper.find(".modal-footer").text()).toEqual("Footer");
    });

    it("Should not update when parent re-renders until props are changed", () => {
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: false });
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: true });
        expect(wrapper.find(".show")).toBeTruthy();
    });

    it("Should pass ID and className", () => {
        wrapper.setProps({ id: "myModalID", className: "myModalClass" });
        expect(wrapper.find("#myModalID").length).toBeGreaterThan(0);
        expect(wrapper.hasClass("myModalClass")).toBeTruthy();
    });

    it("Should focus on the modal when toggled", () => {
        const mountedWrapper: ReactWrapper<ModalProps> = mount(<Modal {...modalProps} />);
        mountedWrapper.setProps({ toggle: true });
        expect(document.activeElement.classList.contains("modal")).toBeTruthy();
    });

    it("Should display warning when onDismiss is not passed", () => {
        const mountedWrapper: ReactWrapper<ModalProps> = mount(<Modal toggle={false} onDismiss={null} />);
        const consoleWarn: jest.SpyInstance = jest.spyOn(console, "warn");
        mountedWrapper.find(".modal-backdrop").simulate("click");
        expect(consoleWarn).toBeCalled();
    });

    it("Should pass accessibility attributes", () => {
        const accessibilityAttributes: ModalProps = { ...modalProps, ariaLabel: "MyLabel", ariaDescribedby: "MyDescription" };
        const mountedWrapper: ReactWrapper<ModalProps> = mount(<Modal {...accessibilityAttributes} />);
        expect(mountedWrapper.find(".modal").getDOMNode().hasAttribute("aria-label")).toBeTruthy();
        expect(mountedWrapper.find(".modal").getDOMNode().getAttribute("aria-label")).toEqual(accessibilityAttributes.ariaLabel);
        expect(mountedWrapper.find(".modal").getDOMNode().hasAttribute("aria-describedby")).toBeTruthy();
        expect(mountedWrapper.find(".modal").getDOMNode().getAttribute("aria-describedby")).toEqual(accessibilityAttributes.ariaDescribedby);
    });
});

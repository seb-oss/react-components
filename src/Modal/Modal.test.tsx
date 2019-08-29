import * as React from "react";
import { shallow, mount } from "enzyme";
import { Modal } from "./Modal";

describe("Component: Modal", () => {

    it("Should render and be hidden until toggled", () => {
        const wrapper = shallow(<Modal toggle={false} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.hasClass("show")).toBeFalsy();
        expect(wrapper.hasClass("fade")).toBeTruthy();
    });

    it("should render and be displayed when toggled", () => {
        const wrapper = shallow(<Modal toggle={true} />);
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.hasClass("modal-fullscreen")).toBeFalsy();
        expect(wrapper.hasClass("modal-aside")).toBeFalsy();
    });

    it("it should open in full screen", () => {
        const wrapper = shallow(<Modal toggle={true} fullscreen={true} />);
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.hasClass("modal-aside")).toBeFalsy();
        expect(wrapper.find(".modal-fullscreen")).toBeTruthy();
    });

    it("should open with position left", () => {
        const wrapper = shallow(<Modal toggle={true} position="left" />);
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.find(".modal-aside")).toBeTruthy();
        expect(wrapper.find(".modal-aside-left")).toBeTruthy();
    });

    it("should open with position right", () => {
        const wrapper = shallow(<Modal toggle={true} position="right" />);
        expect(wrapper.hasClass("show")).toBeTruthy();
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.find(".modal-aside")).toBeTruthy();
        expect(wrapper.find(".modal-aside-right")).toBeTruthy();
    });

    it("should close on backdrop dismiss", () => {
        const wrapper = mount(
            <Modal toggle={true} />
        );
        wrapper.find(".modal-backdrop").simulate("click");
        expect(wrapper.hasClass("show")).toBeFalsy();
        expect(wrapper.find(".fade")).toBeTruthy();
    });

    it("should not close on backdrop dismiss", () => {
        const wrapper = mount(
            <Modal
                toggle={true}
                disableBackdropDismiss={true}
            />
        );
        wrapper.find(".modal-backdrop").simulate("click");
        expect(wrapper.hasClass("fade")).toBeFalsy();
        expect(wrapper.find(".show")).toBeTruthy();
    });

    it("should have a header and body", () => {
        const wrapper = mount(
            <Modal
                toggle={true}
                header={<h1>Header</h1>}
                body={<p>Body</p>}
            />
        );
        expect(wrapper.find(".modal-header").text()).toEqual("Header");
        expect(wrapper.find(".modal-body").text()).toEqual("Body");
    });

    it("should not update when parent re-renders until props are changed", () => {
        const wrapper = mount(<Modal toggle={false} />);
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: false });
        expect(wrapper.hasClass("show")).toBeFalsy();
        wrapper.setProps({ toggle: true });
        expect(wrapper.find(".show")).toBeTruthy();
    });
});

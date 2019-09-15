import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Dialogue, DialogueProps } from "./Dialogue";

describe("Component: Dialogue", () => {
    let wrapper: ShallowWrapper<DialogueProps>;
    beforeEach(() => {
        wrapper = shallow(<Dialogue toggle={false} />);
    });

    it("Should render and be hidden until toggled", () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.hasClass("open-dialogue")).toBeFalsy();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myDialogueClass";
        const id: string = "myDialogueId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render a close button if no action or button text is passed", () => {
        wrapper.setProps({ toggle: true });
        expect(wrapper.find(".dialogue-action").length).toBe(1);
        expect(wrapper.find(".dialogue-action").find("button").text()).toEqual("Close");
    });

    it("Should render a close button if only actions are passed without button text", () => {
        const primaryAction: jest.Mock = jest.fn();
        wrapper.setProps({ toggle: true, primaryAction });
        expect(wrapper.find(".dialogue-action").length).toBe(1);
        expect(wrapper.find(".dialogue-action").find("button").text()).toEqual("Close");
        wrapper.find(".primary-action").find("button").simulate("click");
        expect(primaryAction).toBeCalled();
    });

    it("Should fire primary and secondary actions when passed and clicked on", () => {
        const primaryAction: jest.Mock = jest.fn();
        const secondaryAction: jest.Mock = jest.fn();
        const mountedWrapper: ReactWrapper<DialogueProps> = mount(
            <Dialogue
                toggle={true}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                primaryBtn="primary"
                secondaryBtn="secondary"
            />
        );
        mountedWrapper.find(".primary-action").find("button").simulate("click");
        mountedWrapper.find(".secondary-action").find("button").simulate("click");
        expect(mountedWrapper.find(".dialogue-action").length).toBe(2); // Rendered both actions
        expect(primaryAction).toHaveBeenCalled(); // Primary action fired
        expect(secondaryAction).toHaveBeenCalled(); // Secondary action fired
    });

    it("Should render header and description when passed", () => {
        const header: string = "header";
        const desc: string = "desc";
        wrapper.setProps({ header, desc });
        expect(wrapper.find(".dialogue-header").length).toBe(1);
        expect(wrapper.find(".dialogue-header").text()).toEqual("header");
        expect(wrapper.find(".dialogue-desc").length).toBe(1);
        expect(wrapper.find(".dialogue-desc").text()).toEqual("desc");
    });

    it("Should toggle off the dialogue when set to false", () => {
        wrapper.setProps({ toggle: true });
        expect(wrapper.hasClass("open-dialogue")).toBeTruthy();
        expect(wrapper.hasClass("close-dialogue")).toBeFalsy();
        wrapper.setProps({ toggle: false });
        expect(wrapper.hasClass("open-dialogue")).toBeFalsy();
        expect(wrapper.hasClass("close-dialogue")).toBeTruthy();
    });

    it("Should dismiss when clicked and the feature is enabled", () => {
        const mountedWrapper: ReactWrapper<DialogueProps> = mount(
            <Dialogue
                toggle={true}
                enableBackdropDismiss={true}
                onDismiss={() => mountedWrapper.setProps({ toggle: false })}
            />
        );
        expect(mountedWrapper.find(".open-dialogue").length).toBeTruthy();
        mountedWrapper.find(".dialogue-container").simulate("click", { target: { classList: ["dialogue-container"] } });
        expect(mountedWrapper.find(".open-dialogue").length).toBeFalsy();
    });

    it("Should render close button and dismiss dialogue when clicked", () => {
        const mountedWrapper: ReactWrapper<DialogueProps> = mount(
            <Dialogue
                toggle={true}
                enableCloseButton={true}
                onDismiss={() => mountedWrapper.setProps({ toggle: false })}
            />
        );
        expect(mountedWrapper.find(".close-button").length).toBeTruthy();
        expect(mountedWrapper.find(".with-close")).toBeTruthy();
        mountedWrapper.find(".close-button").simulate("click", { target: { classList: ["close-button"] } });
        expect(mountedWrapper.find(".open-dialogue").length).toBeFalsy();
    });

    describe("Dismissing the modal, should not dismiss when:", () => {
        let onDismiss: jest.Mock;
        let mountedWrapper: ReactWrapper<DialogueProps>;

        beforeEach(() => {
            onDismiss = jest.fn();
            mountedWrapper = mount(<Dialogue toggle={true} onDismiss={onDismiss} />);
        });

        it("Neither enableBackdropDismiss nor enableCloseButton are enabled", () => {
            mountedWrapper.find(".dialogue-container").simulate("click", { target: { classList: ["dialogue-container"] } });
            expect(onDismiss).not.toBeCalled();
        });

        it("enableCloseButton is enabled but the event is triggered by clicking on dialogue-container and backdrop is disabled", () => {
            mountedWrapper.setProps({ enableBackdropDismiss: false, enableCloseButton: true });
            mountedWrapper.find(".dialogue-container").simulate("click");
            expect(onDismiss).not.toBeCalled();
        });
    });
});

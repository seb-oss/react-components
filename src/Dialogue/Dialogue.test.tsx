import * as React from "react";
import { Dialogue } from "./Dialogue";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Dialogue", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render and be hidden until toggled", () => {
        act(() => { render(<Dialogue toggle={false} />, container); });
        expect(container).toBeDefined();
        expect(container.querySelector(".custom-dialogue").classList.contains("open-dialogue")).toBeFalsy();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myDialogueClass";
        const id: string = "myDialogueId";
        act(() => { render(<Dialogue toggle={false} id={id} className={className} />, container); });
        expect(container.querySelector(".custom-dialogue").classList.contains(className)).toBeTruthy();
        expect(container.querySelector(".custom-dialogue").getAttribute("id")).toEqual(id);
    });

    it("Should render a close button if no action or button text is passed", () => {
        act(() => { render(<Dialogue toggle={true} />, container); });
        expect(container.querySelectorAll(".dialogue-action").length).toBe(1);
        expect(container.querySelector(".dialogue-action").querySelector("button").innerHTML).toEqual("Close");
    });

    it("Should render a close button if only actions are passed without button text", () => {
        const primaryAction: jest.Mock = jest.fn();
        act(() => { render(<Dialogue toggle={true} primaryAction={primaryAction} />, container); });
        expect(container.querySelector(".dialogue-action")).toBeDefined();
        const button: HTMLButtonElement = container.querySelector(".dialogue-action").querySelector("button");
        expect(button.innerHTML).toEqual("Close");
        act(() => {
            container.querySelector(".primary-action").querySelector("button").dispatchEvent(new MouseEvent("click"));
        });
        expect(primaryAction).not.toBeCalled();
    });

    it("Should fire primary and secondary actions when passed and clicked on", () => {
        const primaryAction: jest.Mock = jest.fn();
        const secondaryAction: jest.Mock = jest.fn();
        const primaryBtn: string = "primary";
        const secondaryBtn: string = "secondary";
        act(() => {
            render(<Dialogue
                toggle={true}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                primaryBtn={primaryBtn}
                secondaryBtn={secondaryBtn}
            />, container);
        });
        act(() => {
            container.querySelector(".primary-action").querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            container.querySelector(".secondary-action").querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll(".dialogue-action").length).toBe(2); // Rendered both actions
        expect(primaryAction).toHaveBeenCalled(); // Primary action fired
        expect(secondaryAction).toHaveBeenCalled(); // Secondary action fired
    });

    it("Should render header and description when passed", () => {
        const header: string = "header";
        const desc: string = "desc";
        act(() => { render(<Dialogue toggle={false} header={header} desc={desc} />, container); });
        expect(container.querySelector(".dialogue-header")).toBeDefined();
        expect(container.querySelector(".dialogue-header").innerHTML).toEqual("header");
        expect(container.querySelector(".dialogue-desc")).toBeDefined();
        expect(container.querySelector(".dialogue-desc").innerHTML).toEqual("desc");
    });

    it("Should toggle off the dialogue when set to false", () => {
        act(() => { render(<Dialogue toggle={true} />, container); });
        expect(container.querySelector(".custom-dialogue").classList.contains("open-dialogue")).toBeTruthy();
        expect(container.querySelector(".custom-dialogue").classList.contains("close-dialogue")).toBeFalsy();
        act(() => { render(<Dialogue toggle={false} />, container); });
        expect(container.querySelector(".custom-dialogue").classList.contains("open-dialogue")).toBeFalsy();
        expect(container.querySelector(".custom-dialogue").classList.contains("close-dialogue")).toBeTruthy();
    });

    it("Should dismiss when backdrop or close is clicked and the feature is enabled", () => {
        const onDismiss: jest.Mock = jest.fn();
        act(() => { render(<Dialogue toggle={true} enableBackdropDismiss enableCloseButton onDismiss={onDismiss} />, container); });
        expect(container.querySelector(".open-dialogue")).toBeDefined();
        act(() => {
            container.querySelector(".dialogue-container").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onDismiss).toBeCalled();
    });

    it("Should render close button and dismiss dialogue when clicked", () => {
        const onDismiss: jest.Mock = jest.fn();
        act(() => { render(<Dialogue toggle={true} enableCloseButton onDismiss={onDismiss} />, container); });
        expect(container.querySelector(".close-button")).toBeDefined();
        expect(container.querySelector(".with-close")).toBeDefined();
        act(() => { container.querySelector(".close-button").dispatchEvent(new MouseEvent("click", { bubbles: true })); });
        expect(onDismiss).toBeCalled();
    });

    it("Should disable action buttons when disable prop is passed", () => {
        act(() => {
            render(<Dialogue
                toggle={false}
                primaryAction={() => true}
                secondaryAction={() => true}
                primaryBtn="next"
                secondaryBtn="back"
                disablePrimaryBtn
                disableSecondaryBtn
            />, container);
        });
        expect(container.querySelector(".primary-action").querySelector("button").disabled).toBeTruthy();
        expect(container.querySelector(".secondary-action").querySelector("button").disabled).toBeTruthy();
    });

    describe("Dismissing the modal, should not dismiss when:", () => {
        const onDismiss: jest.Mock = jest.fn();

        it("Neither enableBackdropDismiss nor enableCloseButton are enabled", () => {
            act(() => { render(<Dialogue toggle={true} onDismiss={onDismiss} />, container); });
            act(() => {
                container.querySelector(".dialogue-container").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(onDismiss).not.toBeCalled();
        });

        it("enableCloseButton is enabled but the event is triggered by clicking on dialogue-container and backdrop is disabled", () => {
            act(() => { render(<Dialogue toggle={true} onDismiss={onDismiss} enableCloseButton enableBackdropDismiss={false} />, container); });
            act(() => { container.querySelector(".dialogue-container").dispatchEvent(new MouseEvent("click", { bubbles: true })); });
            expect(onDismiss).not.toBeCalled();
        });

        it("enableBackdropDismiss is enabled but the user clicks on other than the backdrop", () => {
            act(() => { render(<Dialogue toggle={true} onDismiss={onDismiss} />, container); });
            act(() => {
                container.querySelector(".dialogue").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(onDismiss).not.toBeCalled();
        });
    });
});

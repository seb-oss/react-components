import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate, SyntheticEventData } from "react-dom/test-utils";
import { ModalProps } from ".";
import { Key } from "../utils";
import { Modal, ModalPosition, ModalSize } from "./Modal";

describe("Component: Modal", () => {
    let container: HTMLDivElement = null;
    const MOCK_MODAL_BODY: React.ReactNode = (
        <div className="modal-body">
            <input id="test-input" type="text" />
            <button id="test-button" />
        </div>
    );

    function renderModal(props: ModalProps = {}): void {
        act(() => {
            render(<Modal toggle {...props} />, container);
        });

        act(() => Simulate.animationEnd(document.querySelector(props.fullscreen ? ".modal" : ".modal-dialog")));
    }

    function pressKey(data: Partial<SyntheticEventData>, element: Element = document.activeElement): void {
        act(() => Simulate.keyDown(element, data));
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        renderModal({ toggle: false });
        const modal: HTMLDivElement = document.body.querySelector<HTMLDivElement>("div.rc.modal");
        expect(modal).not.toBeNull();
        expect(modal.classList.contains("show")).toBeFalsy();
        expect(modal.classList.contains("hide")).toBeFalsy();
        expect(modal.firstElementChild.classList.contains("modal-dialog")).toBeTruthy();
        expect(modal.firstElementChild.firstElementChild.classList.contains("modal-content")).toBeTruthy();
    });

    it("Should be centered when configured", () => {
        renderModal({ centered: true });
        expect(document.querySelector(".modal").classList.contains("modal-centered")).toBeTruthy();
    });

    it("Should be fullscreen when configured", () => {
        renderModal({ fullscreen: true });
        expect(document.querySelector(".modal").classList.contains("modal-fullscreen")).toBeTruthy();
    });

    it("Should fire animation handler when animation has ended", () => {
        const onAnimationEnd: jest.Mock = jest.fn();
        expect(onAnimationEnd).not.toHaveBeenCalled();
        renderModal({ fullscreen: true, onAnimationEnd });
        expect(onAnimationEnd).toHaveBeenCalled();
    });

    it("Should fire backdrop handler when backdrop is dismissed", () => {
        const onBackdropDismiss: jest.Mock = jest.fn();
        const onClick: jest.Mock = jest.fn();

        renderModal({ onBackdropDismiss, onClick });
        expect(onClick).not.toBeCalled();
        act(() => Simulate.click(document.querySelector(".modal-dialog")));
        expect(onClick).toBeCalled();
        expect(onBackdropDismiss).not.toBeCalled();
        act(() => Simulate.click(document.querySelector(".modal")));
        expect(onBackdropDismiss).toBeCalled();
    });

    it("Should fire escape handler when escape key is pressed", () => {
        const onEscape: jest.Mock = jest.fn();

        renderModal({ onEscape });
        expect(onEscape).not.toBeCalled();
        pressKey({ key: Key.Escape }, document.querySelector(".rc.modal"));
        expect(onEscape).toBeCalled();
    });

    describe("Sizes", () => {
        const sizes: ModalSize[] = ["sm", "md", "lg"];
        sizes.forEach((size: ModalSize) => {
            it(`Should render size (${size}) when configured`, () => {
                renderModal({ size });
                expect(document.querySelector(".modal-dialog").classList.contains(`modal-${size}`)).toBeTruthy();
            });
        });
    });

    describe("Positions", () => {
        const positions: ModalPosition[] = ["left", "right"];
        positions.forEach((position: ModalPosition) =>
            it(`Should render position (${position}) when configured`, () => {
                renderModal({ position });
                expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeTruthy();
                expect(document.querySelector(".modal").classList.contains(`modal-aside-${position}`)).toBeTruthy();
            })
        );

        it("Should render position (default) when configured", () => {
            renderModal({ position: "default" });
            expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeFalsy();
        });

        it("Should be overridden when fullscreen is configured", () => {
            renderModal({ fullscreen: true, position: "left" });
            expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeFalsy();
            expect(document.querySelector(".modal").classList.contains("modal-aside-left")).toBeFalsy();
        });
    });

    describe("Auto focus", () => {
        describe("Should focus on first input when modal is visible", () => {
            it("default mode", () => {
                renderModal({ children: MOCK_MODAL_BODY });
                expect(document.activeElement).toBe(document.getElementById("test-input"));
            });

            it("fullscreen mode", () => {
                renderModal({
                    children: MOCK_MODAL_BODY,
                    fullscreen: true,
                });
                expect(document.activeElement).toBe(document.getElementById("test-input"));
            });
        });

        describe("Should not focus on first input when modal not visible", () => {
            it("default mode", () => {
                renderModal({
                    children: MOCK_MODAL_BODY,
                    toggle: false,
                });
                expect(document.activeElement).toBe(document.body);
            });

            it("fullscreen mode", () => {
                renderModal({
                    children: MOCK_MODAL_BODY,
                    fullscreen: true,
                    toggle: false,
                });
                expect(document.activeElement).toBe(document.body);
            });
        });

        describe("Should retain focus body when input is not available in modal", () => {
            it("default mode", () => {
                renderModal({ children: <div className="modal-body"></div> });
                expect(document.activeElement).toBe(document.body);
            });

            it("fullscreen mode", () => {
                renderModal({ children: <div className="modal-body"></div>, fullscreen: true });
                expect(document.activeElement).toBe(document.body);
            });
        });
    });

    describe("Should trap focus", () => {
        function tabForward() {
            act(() => pressKey({ key: Key.Tab }, document.querySelector(".rc.modal")));
        }

        function tabBackward() {
            act(() => pressKey({ key: Key.Tab, shiftKey: true }, document.querySelector(".rc.modal")));
        }

        beforeEach(() => {
            const extraButton = document.createElement("button");
            extraButton.className = "extra";
            document.body.appendChild(extraButton);
        });

        afterEach(() => {
            document.body.removeChild(document.querySelector(".extra"));
        });

        it("Descending tabbing", () => {
            renderModal({ children: MOCK_MODAL_BODY });

            expect(document.activeElement).toBe(document.getElementById("test-input"));

            tabForward();
            expect(document.activeElement).toBe(document.getElementById("test-button"));

            tabForward();
            expect(document.activeElement).toBe(document.getElementById("test-input"));

            tabForward();
            expect(document.activeElement).toBe(document.getElementById("test-button"));
        });

        it("Ascending tabbing", () => {
            renderModal({ children: MOCK_MODAL_BODY });

            expect(document.activeElement).toBe(document.getElementById("test-input"));

            tabBackward();
            expect(document.activeElement).toBe(document.getElementById("test-button"));

            tabBackward();
            expect(document.activeElement).toBe(document.getElementById("test-input"));

            tabBackward();
            expect(document.activeElement).toBe(document.getElementById("test-button"));
        });

        it("Shouldn not do anything when there is no focusable elements in the modal or the event is not a tab", () => {
            renderModal();

            expect(document.activeElement.className === "extra");

            tabForward();
            expect(document.activeElement.className === "extra");

            tabBackward();
            expect(document.activeElement.className === "extra");
        });
    });

    it("Should cleanup side effects when unmounted", () => {
        renderModal();
        expect(document.body.classList.contains("modal-open")).toBeTruthy();
        act(() => {
            unmountComponentAtNode(container);
        });
        expect(document.body.classList.contains("modal-open")).toBeFalsy();
    });
});

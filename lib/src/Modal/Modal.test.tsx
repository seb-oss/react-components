import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import React from "react";
import { ModalProps } from ".";
import { Key } from "../utils";
import { Modal, ModalPosition, ModalSize } from "./Modal";

describe("Component: Modal", () => {
    const MOCK_MODAL_BODY: React.ReactNode = (
        <div className="modal-body">
            <input id="test-input" data-testid="test-input" type="text" />
            <button id="test-button" data-testid="test-button" />
        </div>
    );

    function renderModal(props: ModalProps = {}, sibling?: React.ReactNode): RenderResult {
        const result = render(
            <>
                <Modal toggle {...props} />
                {sibling}
            </>
        );
        fireEvent.animationEnd(screen.getByRole(props.fullscreen ? "dialog" : "document"));
        return result;
    }

    it("Should render correctly", () => {
        renderModal();
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("document")).toBeInTheDocument();
    });

    it("Should toggle visibility correctly", () => {
        const { rerender } = renderModal();
        expect(screen.getByRole("dialog")).not.toHaveClass("hide");
        expect(screen.getByRole("dialog")).toHaveClass("show");
        rerender(<Modal />);
        expect(screen.getByRole("dialog")).not.toHaveClass("show");
        expect(screen.getByRole("dialog")).toHaveClass("hide");
    });

    it("Should be centered when configured", () => {
        renderModal({ centered: true });
        expect(screen.getByRole("dialog")).toHaveClass("modal-centered");
    });

    it("Should be fullscreen when configured", () => {
        renderModal({ fullscreen: true });
        expect(screen.getByRole("dialog")).toHaveClass("modal-fullscreen");
    });

    it("Should fire animation handler when animation has ended", () => {
        const onAnimationEnd: jest.Mock = jest.fn();
        expect(onAnimationEnd).not.toHaveBeenCalled();
        renderModal({ fullscreen: true, onAnimationEnd });
        expect(onAnimationEnd).toHaveBeenCalled();
    });

    it("Should fire backdrop handler when backdrop is dismissed", async () => {
        const user: UserEvent = userEvent.setup();
        const onBackdropDismiss: jest.Mock = jest.fn();
        const onClick: jest.Mock = jest.fn();
        renderModal({ onBackdropDismiss, onClick });
        expect(onClick).not.toBeCalled();
        await user.click(screen.getByRole("document"));
        expect(onClick).toBeCalled();
        expect(onBackdropDismiss).not.toBeCalled();
        await user.click(screen.getByRole("dialog"));
        expect(onBackdropDismiss).toBeCalled();
    });

    it("Should fire escape handler when escape key is pressed", async () => {
        const user: UserEvent = userEvent.setup();
        const onEscape: jest.Mock = jest.fn();
        renderModal({ onEscape });
        expect(onEscape).not.toBeCalled();
        await user.click(screen.getByRole("document"));
        await user.keyboard(`[${Key.Escape}]`);
        expect(onEscape).toBeCalled();
    });

    describe("Sizes", () => {
        ["sm", "md", "lg"].forEach((size: ModalSize) => {
            it(`Should render size (${size}) when configured`, () => {
                renderModal({ size });
                expect(screen.getByRole("document")).toHaveClass(`modal-${size}`);
            });
        });
    });

    describe("Positions", () => {
        ["left", "right"].forEach((position: ModalPosition) =>
            it(`Should render position (${position}) when configured`, () => {
                renderModal({ position });
                expect(screen.getByRole("dialog")).toHaveClass("modal-aside", `modal-aside-${position}`);
            })
        );

        it("Should render position (default) when configured", () => {
            renderModal({ position: "default" });
            expect(screen.getByRole("dialog")).not.toHaveClass("modal-aside");
        });

        it("Should be overridden when fullscreen is configured", () => {
            renderModal({ fullscreen: true, position: "left" });
            expect(screen.getByRole("dialog")).not.toHaveClass("modal-aside", "modal-aside-left");
        });
    });

    describe("Auto focus", () => {
        describe("Should focus on first input when modal is visible", () => {
            it("default mode", () => {
                renderModal({ children: MOCK_MODAL_BODY });
                expect(screen.getByTestId("test-input")).toHaveFocus();
            });

            it("fullscreen mode", () => {
                renderModal({ children: MOCK_MODAL_BODY, fullscreen: true });
                expect(screen.getByTestId("test-input")).toHaveFocus();
            });
        });

        describe("Should not focus on first input when modal not visible", () => {
            it("default mode", () => {
                renderModal({ children: MOCK_MODAL_BODY, toggle: false });
                expect(document.body).toHaveFocus();
            });

            it("fullscreen mode", () => {
                renderModal({ children: MOCK_MODAL_BODY, fullscreen: true, toggle: false });
                expect(document.body).toHaveFocus();
            });
        });

        describe("Should retain focus body when input is not available in modal", () => {
            it("default mode", () => {
                renderModal({ children: <div className="modal-body"></div> });
                expect(document.body).toHaveFocus();
            });

            it("fullscreen mode", () => {
                renderModal({ children: <div className="modal-body"></div>, fullscreen: true });
                expect(document.body).toHaveFocus();
            });
        });
    });

    describe("Should trap focus", () => {
        const extraButton = <button data-testid="extra" />;

        async function tabForward() {
            const user: UserEvent = userEvent.setup();
            await user.tab();
        }

        async function tabBackward() {
            const user: UserEvent = userEvent.setup();
            await user.tab({ shift: true });
        }

        it("Descending tabbing", async () => {
            renderModal({ children: MOCK_MODAL_BODY }, extraButton);
            expect(screen.getAllByRole("button")).toHaveLength(2);
            expect(screen.getByTestId("test-input")).toHaveFocus();
            await tabForward();
            expect(screen.getByTestId("test-button")).toHaveFocus();
            await tabForward();
            expect(screen.getByTestId("test-input")).toHaveFocus();
            await tabForward();
            expect(screen.getByTestId("test-button")).toHaveFocus();
        });

        it("Ascending tabbing", async () => {
            renderModal({ children: MOCK_MODAL_BODY }, extraButton);
            expect(screen.getAllByRole("button")).toHaveLength(2);
            expect(screen.getByTestId("test-input")).toHaveFocus();
            await tabBackward();
            expect(screen.getByTestId("test-button")).toHaveFocus();
            await tabBackward();
            expect(screen.getByTestId("test-input")).toHaveFocus();
            await tabBackward();
            expect(screen.getByTestId("test-button")).toHaveFocus();
        });

        it("Shouldn not do anything when there is no focusable elements in the modal or the event is not a tab", () => {
            renderModal();
            expect(document.body).toHaveFocus();
            tabForward();
            expect(document.body).toHaveFocus();
            tabBackward();
            expect(document.body).toHaveFocus();
        });
    });

    it("Should cleanup side effects when unmounted", () => {
        const { unmount } = renderModal();
        expect(document.body).toHaveClass("modal-open");
        unmount();
        expect(document.body).not.toHaveClass("modal-open");
    });

    it("Should return focus when unmounted", () => {
        const { unmount } = renderModal({ children: MOCK_MODAL_BODY });
        expect(screen.getByTestId("test-input")).toHaveFocus();
        unmount();
        expect(document.body).toHaveFocus();
    });
});

import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Modal, ModalSize, ModalPosition } from ".";

describe("Component: Modal", () => {
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

    it("Should render correctly", () => {
        act(() => {
            render(<Modal />, container);
        });
        const dialogElement: HTMLDivElement = container.firstElementChild.firstElementChild as any;

        expect(container.firstElementChild).not.toBeNull();
        expect(dialogElement).not.toBeNull();

        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("modal")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("role")).toEqual("dialog");
        expect(container.firstElementChild.getAttribute("aria-modal")).toEqual("true");

        expect(dialogElement.classList.contains("modal-dialog")).toBeTruthy();
        expect(dialogElement.getAttribute("role")).toEqual("document");

        expect(dialogElement.firstElementChild).not.toBeNull();
        expect(dialogElement.firstElementChild.classList.contains("modal-content")).toBeTruthy();
    });

    it("Should render the component fullscreen or centered when passed", () => {
        act(() => {
            render(<Modal centered />, container);
        });
        expect(container.firstElementChild.classList.contains("modal-centered")).toBeTruthy();

        act(() => {
            render(<Modal fullscreen={true} />, container);
        });

        expect(container.firstElementChild.classList.contains("modal-fullscreen")).toBeTruthy();
    });

    it("Should pass optional parameters correctly", () => {
        const id: string = "myID";
        const className: string = "myClassName";
        const ariaLabel: string = "myAriaLabel";
        const ariaLabelledby: string = "myAriaLabelledby";
        const ariaDescribedby: string = "myAriaDescribedby";

        act(() => {
            render(<Modal id={id} className={className} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby} />, container);
        });

        expect(container.firstElementChild.id).toEqual(id);
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual(ariaLabel);
        expect(container.firstElementChild.getAttribute("aria-labelledby")).toEqual(ariaLabelledby);
        expect(container.firstElementChild.getAttribute("aria-describedby")).toEqual(ariaDescribedby);
    });

    it("Should emit dismiss when close button or backdrop is clicked", () => {
        const onDismiss: jest.Mock = jest.fn();

        act(() => {
            render(<Modal onDismiss={onDismiss} />, container);
        });

        act(() => {
            // Backdrop click
            Simulate.click(container.firstElementChild);
            // Close button click
            Simulate.click(container.querySelector(".close"));
        });

        expect(onDismiss).toHaveBeenCalledTimes(2);

        act(() => {
            render(<Modal toggle onDismiss={onDismiss} />, container);
        });

        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
        });

        expect(onDismiss).toHaveBeenCalledTimes(3);
    });

    it("Should not emit since the backdrop dismiss is disabled", () => {
        const onDismiss: jest.Mock = jest.fn();

        act(() => {
            render(<Modal toggle backdropDismiss={false} escapeToDismiss={false} onDismiss={onDismiss} />, container);
        });

        act(() => {
            Simulate.click(container.firstElementChild);
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", bubbles: true }));
        });

        expect(onDismiss).not.toBeCalled();
    });

    it("Should handle window keyup event correctly as the toggle changes", () => {
        const onDismiss: jest.Mock = jest.fn();

        // If the modal is hidden, no listener is added
        act(() => {
            render(<Modal onDismiss={onDismiss} escapeToDismiss={false} toggle={false} />, container);
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
        });
        expect(onDismiss).not.toBeCalled();

        // It should not add a listener when escapeToDismiss is disabled
        act(() => {
            onDismiss.mockReset();
            render(<Modal onDismiss={onDismiss} escapeToDismiss={false} toggle />, container);
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
        });
        expect(onDismiss).not.toBeCalled();

        // It should try to remove the listner when the modal is hidden
        act(() => {
            onDismiss.mockReset();
            render(<Modal onDismiss={onDismiss} escapeToDismiss toggle={false} />, container);
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
        });
        expect(onDismiss).not.toBeCalled();
    });

    describe("Should render with all supported sizes", () => {
        const sizes: Array<ModalSize> = ["lg", "sm"];

        sizes.forEach((size: ModalSize) => {
            it(`- ${size}`, () => {
                act(() => {
                    render(<Modal size={size} />, container);
                });

                expect(container.firstElementChild.firstElementChild.classList.contains(`modal-${size}`)).toBeTruthy();
            });
        });
    });

    describe("Should render with all supported positions", () => {
        const positions: Array<ModalPosition> = ["left", "right"];

        positions.forEach((position: ModalPosition) => {
            it(`- ${position}`, () => {
                act(() => {
                    render(<Modal position={position} />, container);
                });

                expect(container.firstElementChild.classList.contains("modal-aside")).toBeTruthy();
                expect(container.firstElementChild.classList.contains(`modal-aside-${position}`)).toBeTruthy();
            });
        });
    });

    it("Should not render fullscreen when aside is enable and centered when fullscreen is enabled", () => {
        act(() => {
            render(<Modal fullscreen position="left" />, container);
        });

        expect(container.firstElementChild.classList.contains("modal-fullscreen")).toBeFalsy();

        act(() => {
            render(<Modal fullscreen centered />, container);
        });

        expect(container.firstElementChild.classList.contains("modal-fullscreen")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("modal-centered")).toBeFalsy();
    });

    it("Should remove the hide class after the modal becomes hidden", () => {
        const onAnimationEnd: jest.Mock = jest.fn();
        act(() => {
            render(<Modal toggle onAnimationEnd={onAnimationEnd} />, container);
        });
        act(() => {
            Simulate.animationEnd(container.firstElementChild.firstElementChild);
        });

        expect(container.firstElementChild.classList.contains("show")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("hide")).toBeFalsy();

        act(() => {
            render(<Modal toggle={false} />, container);
        });
        expect(container.firstElementChild.classList.contains("show")).toBeFalsy();
        expect(container.firstElementChild.classList.contains("hide")).toBeTruthy();

        act(() => {
            Simulate.animationEnd(container.firstElementChild.firstElementChild);
        });

        expect(container.firstElementChild.classList.contains("show")).toBeFalsy();
        expect(container.firstElementChild.classList.contains("hide")).toBeFalsy();
        expect(onAnimationEnd).toBeCalled();
    });

    it("Should render header, body, and footer", async () => {
        act(() => {
            render(<Modal closeButton={false} header={<div>my header</div>} body={<div>my body</div>} footer={<div>my footer</div>} />, container);
        });

        // Verifies if `closeButton` is also working, otherwise, textContent will be `my headerx`
        expect(container.querySelector(".modal-header").textContent).toEqual("my header");
        expect(container.querySelector(".modal-body").textContent).toEqual("my body");
        expect(container.querySelector(".modal-footer").textContent).toEqual("my footer");
    });
});

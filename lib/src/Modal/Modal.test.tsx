import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Modal, ModalPosition, ModalProps, ModalSize } from "./Modal";

type FocusableElements = HTMLInputElement | HTMLButtonElement | HTMLAnchorElement;

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

        const modal: HTMLDivElement = document.body.querySelector<HTMLDivElement>("div.rc.modal");
        expect(modal).not.toBeNull();
        expect(modal.classList.contains("show")).toBeFalsy();
        expect(modal.classList.contains("hide")).toBeFalsy();
        expect(modal.firstElementChild.classList.contains("modal-dialog")).toBeTruthy();
        expect(modal.firstElementChild.firstElementChild.classList.contains("modal-content")).toBeTruthy();
    });

    it("Should allow it to be centered", () => {
        act(() => {
            render(<Modal toggle centered />, container);
        });

        expect(document.querySelector(".modal").classList.contains("modal-centered")).toBeTruthy();
    });

    it("Should allow it to be rendered in fullscreen", () => {
        act(() => {
            render(<Modal toggle fullscreen />, container);
        });

        expect(document.querySelector(".modal").classList.contains("modal-fullscreen")).toBeTruthy();
    });

    it("Should fire onBackdropDismiss when passed, should also fire onClick", () => {
        act(() => {
            const onClick: jest.Mock = jest.fn();
            const onBackdropDismiss: jest.Mock = jest.fn();

            act(() => {
                render(<Modal onClick={onClick} onBackdropDismiss={onBackdropDismiss} />, container);
            });

            act(() => Simulate.click(document.querySelector(".modal-dialog")));
            expect(onClick).toBeCalled();
            expect(onBackdropDismiss).not.toBeCalled();

            act(() => Simulate.click(document.querySelector(".modal")));
            expect(onBackdropDismiss).toBeCalled();
        });
    });

    it("Should fire onEscape when passed", () => {
        const onEscape: jest.Mock = jest.fn();

        act(() => {
            render(<Modal toggle onEscape={onEscape} />, container);
        });

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        });

        expect(onEscape).toBeCalled();
    });

    describe("Auto focus", () => {
        beforeEach(() => {
            act(() => document.body.focus());
        });

        describe("Should auto focus when there is an input and it is toggled", () => {
            test("default", () => {
                act(() => {
                    render(
                        <Modal toggle autoFocus>
                            <div className="modal-body">
                                <input id="test-input" type="test" />
                            </div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal-dialog")));
                expect(document.activeElement).toBe(document.getElementById("test-input"));
            });

            test("fullscreen", () => {
                const onAnimationEnd: jest.Mock = jest.fn();

                act(() => {
                    render(
                        <Modal toggle autoFocus fullscreen onAnimationEnd={onAnimationEnd}>
                            <div className="modal-body">
                                <input id="test-input" type="test" />
                            </div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal")));
                expect(document.activeElement).toBe(document.getElementById("test-input"));
                expect(onAnimationEnd).toBeCalled();
            });
        });

        describe("Should not focus if it is not toggled", () => {
            test("default", () => {
                act(() => {
                    render(
                        <Modal autoFocus>
                            <div className="modal-body">
                                <input id="test-input" type="test" />
                            </div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal-dialog")));
                expect(document.activeElement).toBe(document.body);
            });

            test("fullscreen", () => {
                act(() => {
                    render(
                        <Modal autoFocus fullscreen>
                            <div className="modal-body">
                                <input id="test-input" type="test" />
                            </div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal")));
                expect(document.activeElement).toBe(document.body);
            });
        });

        describe("Should not focus if there is not input inside the modal", () => {
            test("default", () => {
                act(() => {
                    render(
                        <Modal toggle autoFocus>
                            <div className="modal-body"></div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal-dialog")));
                expect(document.activeElement).toBe(document.body);
            });

            test("fullscreen", () => {
                act(() => {
                    render(
                        <Modal toggle autoFocus fullscreen>
                            <div className="modal-body"></div>
                        </Modal>,
                        container
                    );
                });

                act(() => Simulate.animationEnd(document.querySelector(".modal")));
                expect(document.activeElement).toBe(document.body);
            });
        });
    });

    describe("Should render in all supported sizes", () => {
        const sizes: ModalSize[] = ["sm", "md", "lg"];
        sizes.forEach((size: ModalSize) => {
            test(size, () => {
                act(() => {
                    render(<Modal toggle size={size} />, container);
                });

                expect(document.querySelector(".modal-dialog").classList.contains(`modal-${size}`)).toBeTruthy();
            });
        });
    });

    describe("Should allow it to be rendered in different positions", () => {
        const positions: ModalPosition[] = ["left", "right"];
        positions.forEach((position: ModalPosition) =>
            test(position, () => {
                act(() => {
                    render(<Modal toggle position={position} />, container);
                });

                expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeTruthy();
                expect(document.querySelector(".modal").classList.contains(`modal-aside-${position}`)).toBeTruthy();
            })
        );

        test("default", () => {
            act(() => {
                render(<Modal toggle position="default" />, container);
            });

            expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeFalsy();
        });

        it("Fullscreen should override any position", () => {
            act(() => {
                render(<Modal toggle position="left" fullscreen />, container);
            });

            expect(document.querySelector(".modal").classList.contains("modal-aside")).toBeFalsy();
            expect(document.querySelector(".modal").classList.contains("modal-aside-left")).toBeFalsy();
        });
    });

    describe("Should trap focus when enabled", () => {
        function tabForward() {
            const focusableElements: FocusableElements[] = Array.from(document.querySelectorAll<FocusableElements>("input, button, a"));
            const currentIndex: number = focusableElements.findIndex((el) => el === document.activeElement);

            // Tabbing to the next element doesn't work in test, therefore, it is simulated here
            if (currentIndex === -1) {
                focusableElements[0].focus();
            } else {
                if (currentIndex === focusableElements.length - 1) {
                    focusableElements[0].focus();
                } else {
                    focusableElements[currentIndex + 1].focus();
                }
            }

            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Tab" }));
        }
        function tabBackward() {
            const focusableElements: FocusableElements[] = Array.from(document.querySelectorAll<FocusableElements>("input, button, a"));
            const currentIndex: number = focusableElements.findIndex((el) => el === document.activeElement);

            // Tabbing to the previous element doesn't work in test, therefore, it is simulated here
            if (currentIndex === -1) {
                focusableElements[focusableElements.length - 1].focus();
            } else {
                if (currentIndex === 0) {
                    focusableElements[focusableElements.length - 1].focus();
                } else {
                    focusableElements[currentIndex - 1].focus();
                }
            }

            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Tab", shiftKey: true }));
        }

        test("Descending tabbing", () => {
            const extraButton = document.createElement("button");
            extraButton.className = "extra";

            document.body.appendChild(extraButton);

            act(() => {
                render(
                    <Modal toggle trapFocus>
                        <input id="test-input" type="text" />
                        <button id="test-button" />
                    </Modal>,
                    container
                );
            });

            document.body.appendChild(extraButton.cloneNode());

            expect(document.querySelector(".last-focusable-element")).not.toBeNull();

            act(() => tabForward());
            expect(document.activeElement).toBe(document.getElementById("test-input"));

            act(() => tabForward());
            expect(document.activeElement).toBe(document.getElementById("test-button"));

            act(() => tabForward());
            expect(document.activeElement).toBe(document.getElementById("test-input"));

            document.body.removeChild(document.querySelector(".extra"));
            document.body.removeChild(document.querySelector(".extra"));
        });

        test("Ascending tabbing", () => {
            const extraButton = document.createElement("button");
            extraButton.className = "extra";

            document.body.appendChild(extraButton);

            act(() => {
                render(
                    <Modal toggle trapFocus>
                        <input id="test-input" type="text" />
                        <button id="test-button" />
                    </Modal>,
                    container
                );
            });

            expect(document.querySelector(".last-focusable-element")).not.toBeNull();

            act(() => tabBackward());
            expect(document.activeElement).toBe(document.getElementById("test-button"));

            act(() => tabBackward());
            expect(document.activeElement).toBe(document.getElementById("test-input"));

            act(() => tabBackward());
            expect(document.activeElement).toBe(document.getElementById("test-button"));

            document.body.removeChild(document.querySelector(".extra"));
        });

        it("Shouldn not do anything when there is no focusable elements in the modal or the event is not a tab", () => {
            const extraButton = document.createElement("button");
            extraButton.className = "extra";

            document.body.appendChild(extraButton);

            act(() => {
                render(<Modal toggle trapFocus />, container);
            });

            document.body.appendChild(extraButton.cloneNode());

            act(() => tabForward());
            expect(document.activeElement.className === "extra");

            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", shiftKey: true }));
            expect(document.activeElement.className === "extra");

            document.body.removeChild(document.querySelector(".extra"));
            document.body.removeChild(document.querySelector(".extra"));
        });
    });
});

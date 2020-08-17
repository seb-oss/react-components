import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Modal } from "./Modal";

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

    it("Should render and be hidden until toggled", () => {
        act(() => {
            render(<Modal toggle={false} onDismiss={null} />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("show")).toBeFalsy();
    });

    it("Should render and be displayed when toggled", () => {
        act(() => {
            render(<Modal onDismiss={null} toggle />, container);
        });
        expect(container.firstElementChild.classList.contains("show")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("modal-fullscreen")).toBeFalsy();
        expect(container.firstElementChild.classList.contains("modal-aside")).toBeFalsy();
    });

    it("Should open in full screen", () => {
        act(() => {
            render(<Modal onDismiss={null} toggle fullscreen />, container);
        });
        expect(container.firstElementChild.classList.contains("show")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("fade")).toBeFalsy();
        expect(container.firstElementChild.classList.contains("modal-aside")).toBeFalsy();
        expect(container.querySelector(".modal-fullscreen")).not.toBeNull();
    });

    it("should open with position left", () => {
        act(() => {
            render(<Modal onDismiss={null} toggle position="left" />, container);
        });
        expect(container.firstElementChild.classList.contains("show")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("fade")).toBeFalsy();
        expect(container.querySelector(".modal-aside")).not.toBeNull();
        expect(container.querySelector(".modal-aside-left")).not.toBeNull();
    });

    it("Should open with position right", () => {
        act(() => {
            render(<Modal onDismiss={null} toggle position="right" />, container);
        });
        expect(container.firstElementChild.classList.contains("show")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("fade")).toBeFalsy();
        expect(container.querySelector(".modal-aside")).not.toBeNull();
        expect(container.querySelector(".modal-aside-right")).not.toBeNull();
    });

    it("Should call `onDismiss` when backdrop is clicked", () => {
        const onDismiss: jest.Mock = jest.fn();
        act(() => {
            render(<Modal onDismiss={onDismiss} toggle />, container);
        });
        act(() => {
            Simulate.click(container.firstElementChild);
        });
        expect(onDismiss).toBeCalled();
    });

    it("Should not call `onDismiss` when backdrop is clicked and `disableBackdropDismiss` is set to true", () => {
        const onDismiss: jest.Mock = jest.fn();
        act(() => {
            render(<Modal onDismiss={onDismiss} toggle disableBackdropDismiss />, container);
        });
        act(() => {
            Simulate.click(container.firstElementChild);
        });
        expect(onDismiss).not.toBeCalled();
    });

    it("Should have a header, body, and footer", () => {
        act(() => {
            render(<Modal onDismiss={null} header={<h1>Header</h1>} body={<p>Body</p>} footer={<p>Footer</p>} toggle />, container);
        });
        expect(container.querySelector(".modal-header").textContent).toEqual("Header");
        expect(container.querySelector(".modal-body").textContent).toEqual("Body");
        expect(container.querySelector(".modal-footer").textContent).toEqual("Footer");
    });

    it("Should pass ID and className", () => {
        const id: string = "myId";
        const className: string = "myId";
        act(() => {
            render(<Modal onDismiss={null} toggle id={id} className={className} />, container);
        });
        expect(container.firstElementChild.id).toEqual(id);
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should display warning when onDismiss is not passed", () => {
        act(() => {
            render(<Modal toggle={false} onDismiss={null} />, container);
        });
        const consoleWarn: jest.SpyInstance = jest.spyOn(console, "warn").mockImplementation(() => null);
        Simulate.click(container.firstElementChild);
        expect(consoleWarn).toBeCalled();
    });

    it("Should pass accessibility attributes", () => {
        const ariaLabel: string = "myLabel";
        const ariaDescribedby: string = "myDescription";
        act(() => {
            render(<Modal toggle={false} onDismiss={null} ariaLabel={ariaLabel} ariaDescribedby={ariaDescribedby} />, container);
        });
        expect(container.firstElementChild.hasAttribute("aria-label")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual(ariaLabel);
        expect(container.firstElementChild.hasAttribute("aria-describedby")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-describedby")).toEqual(ariaDescribedby);
    });

    it("Should render centered", () => {
        act(() => {
            render(<Modal toggle centered onDismiss={null} />, container);
        });
        expect(container.firstElementChild.classList.contains("modal-centered")).toBeTruthy();
    });

    it("Should render with lg and sm sizes", () => {
        act(() => {
            render(<Modal toggle onDismiss={null} size="modal-lg" />, container);
        });
        expect(container.firstElementChild.firstElementChild.classList.contains("modal-lg")).toBeTruthy();
        act(() => {
            render(<Modal toggle onDismiss={null} size="modal-sm" />, container);
        });
        expect(container.firstElementChild.firstElementChild.classList.contains("modal-sm")).toBeTruthy();
    });

    it("Should not allow clicking through the modal-dialog to the backdrop", () => {
        const onDismiss: jest.Mock = jest.fn();
        act(() => {
            render(<Modal onDismiss={onDismiss} toggle />, container);
        });
        act(() => {
            Simulate.click(container.firstElementChild.firstElementChild);
        });
        expect(onDismiss).not.toBeCalled();
    });

    it("Should start without `hide` class and add it after it's been dismissed at least once", () => {
        act(() => {
            render(<TestBed />, container);
        });
        expect(container.querySelector(".modal").classList.contains("show")).toBeFalsy();
        expect(container.querySelector(".modal").classList.contains("hide")).toBeFalsy();
        act(() => {
            Simulate.click(container.querySelector("#test"));
        });
        expect(container.querySelector(".modal").classList.contains("show")).toBeTruthy();
        expect(container.querySelector(".modal").classList.contains("hide")).toBeFalsy();
        act(() => {
            Simulate.click(container.querySelector("#test"));
        });
        expect(container.querySelector(".modal").classList.contains("show")).toBeFalsy();
        expect(container.querySelector(".modal").classList.contains("hide")).toBeTruthy();
    });

    it("Should dismiss modal when escape key is registered", () => {
        const onDismiss: jest.Mock = jest.fn();

        act(() => {
            render(<Modal toggle onDismiss={onDismiss} escapeToDismiss={true} />, container);
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "Enter" }));
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "Escape" }));
        });

        expect(onDismiss).toBeCalledTimes(1);
    });

    it("Should not dismiss modal when escape key is registered when escapeToDismiss is set to false", () => {
        const onDismiss: jest.Mock = jest.fn();

        act(() => {
            render(<Modal toggle onDismiss={onDismiss} escapeToDismiss={false} />, container);
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "Enter" }));
        });
        act(() => {
            window.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "Escape" }));
        });

        expect(onDismiss).not.toBeCalled();
    });

    it("Should not focus within the modal when trapFocus is set to false", () => {
        act(() => {
            render(
                <Modal
                    onDismiss={null}
                    trapFocus={false}
                    toggle
                    body={
                        <div>
                            <input id="first" />
                            <input id="second" />
                            <input id="third" />
                        </div>
                    }
                />,
                container
            );
        });

        expect(document.activeElement.tagName).not.toEqual("INPUT");
    });

    it("Should focus within the modal when trapFocus is set to true", () => {
        act(() => {
            render(
                <Modal
                    onDismiss={null}
                    toggle
                    body={
                        <div>
                            <input id="first" />
                            <input id="second" />
                            <input id="third" />
                        </div>
                    }
                />,
                container
            );
        });

        expect(document.activeElement.tagName).toEqual("INPUT");
    });

    describe("Testing trap focus", () => {
        let transitionEvent: Partial<React.TransitionEvent>;

        beforeEach(() => {
            const { getComputedStyle } = window;
            transitionEvent = {
                bubbles: true,
                propertyName: "background-color",
                currentTarget: container.querySelector(".modal-dialog"),
            };
        });

        afterEach(() => {
            window.getComputedStyle = getComputedStyle;
            jest.clearAllMocks();
        });

        it("Should not do anything if toggle is set to false", () => {
            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,1)" });

            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle={false}
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), { bubbles: true, propertyName: "background-color" } as any);
            });

            expect(document.activeElement.tagName).not.toEqual("INPUT");
        });

        it("Should not alter the focus when transition happen with non background changes", () => {
            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,1)" });

            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), { bubbles: true, propertyName: "border" } as any);
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), { bubbles: true, propertyName: "background-color" } as any);
            });

            expect(document.activeElement.id).toEqual("first");
        });

        it("Should alter the focus when transition happen with background changes", () => {
            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,0)" });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), transitionEvent as any);
            });

            expect(document.activeElement.id).toEqual("first");
        });

        it("Should focus on the first child when tab focus goes beyond the last", () => {
            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                (container.querySelector("#third") as HTMLElement).focus();
            });

            expect(document.activeElement.id).toEqual("third");

            act(() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Tab" }));
            });

            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,0)" });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), transitionEvent as any);
            });

            expect(document.activeElement.id).toEqual("first");
        });

        it("Should focus on the first child when tab focus goes beyond the last", () => {
            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Tab", shiftKey: true }));
            });

            expect(document.activeElement.id).toEqual("first");

            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,0)" });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), transitionEvent as any);
            });

            expect(document.activeElement.id).toEqual("third");
        });

        it("Should not change focus when non-tab key is registered", () => {
            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <input id="first" />
                                <input id="second" />
                                <input id="third" />
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter", shiftKey: true }));
            });

            expect(document.activeElement.id).toEqual("first");

            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,0)" });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), transitionEvent as any);
            });

            expect(document.activeElement.id).toEqual("first");
        });

        it("Should not change focus when there are no focusable elements in the body", () => {
            act(() => {
                render(
                    <Modal
                        onDismiss={null}
                        toggle
                        body={
                            <div>
                                <p id="first">first</p>
                                <p id="second">second</p>
                                <p id="third">third</p>
                            </div>
                        }
                    />,
                    container
                );
            });

            act(() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter", shiftKey: true }));
            });

            expect(document.activeElement.id).toEqual("");

            window.getComputedStyle = jest.fn().mockReturnValue({ backgroundColor: "rgba(0,0,0,0)" });

            act(() => {
                Simulate.transitionEnd(container.querySelector(".modal-dialog"), transitionEvent as any);
            });

            expect(document.activeElement.id).toEqual("");
        });
    });
});

const TestBed: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    return (
        <div>
            <Modal toggle={toggle} onDismiss={null} />
            <button id="test" onClick={() => setToggle(!toggle)}>
                toggle
            </button>
        </div>
    );
};

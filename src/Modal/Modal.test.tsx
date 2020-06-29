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

    it("It should open in full screen", () => {
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

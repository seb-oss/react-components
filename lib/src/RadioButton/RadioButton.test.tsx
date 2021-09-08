import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { RadioButton } from "./RadioButton";

describe("Component: RadioButton", () => {
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

    it("Should render", () => {
        act(() => {
            render(<RadioButton />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myRadiobuttonClass";
        const wrapperClassname: string = "myWrapperClassname";

        act(() => {
            render(<RadioButton className={className} wrapperProps={{ className: wrapperClassname }} />, container);
        });
        expect(container.querySelector(".custom-control-input").classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.classList.contains(wrapperClassname)).toBeTruthy();
    });

    it("Should render with random id if id is not passed", () => {
        act(() => {
            render(<RadioButton>label</RadioButton>, container);
        });
        expect(container.querySelector("input").hasAttribute("id")).toBeTruthy();
        expect(container.querySelector("label").getAttribute("for")).toBe(container.querySelector("input").getAttribute("id"));

        const id: string = "myId";
        act(() => {
            render(<RadioButton id={id}>label</RadioButton>, container);
        });
        expect(container.querySelector("input").id).toEqual(id);
        expect(container.querySelector("label").getAttribute("for")).toEqual(id);
    });

    it("Should render and display label", () => {
        const label: string = "my label";
        act(() => {
            render(<RadioButton>{label}</RadioButton>, container);
        });
        expect(container.querySelector(`.custom-control-label`)).not.toBeNull();
        expect(container.querySelector(`.custom-control-label`).innerHTML).toContain(label);
    });
});

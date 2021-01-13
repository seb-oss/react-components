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
        const id: string = "myRadiobuttonId";
        act(() => {
            render(<RadioButton className={className} id={id} />, container);
        });
        expect(container.querySelector(".custom-radio").classList).toContain(className);
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render with random id if id is not passed", () => {
        act(() => {
            render(<RadioButton>label</RadioButton>, container);
        });
        expect(container.querySelector("input").hasAttribute("id")).toBeTruthy();
        expect(container.querySelector("label").getAttribute("for")).toBe(container.querySelector("input").getAttribute("id"));
    });

    it("Should render and display label", () => {
        const label: string = "my label";
        act(() => {
            render(<RadioButton>{label}</RadioButton>, container);
        });
        expect(container.querySelector(`.custom-control-label`)).not.toBeNull();
        expect(container.querySelector(`.custom-control-label`).innerHTML).toContain(label);
    });

    it("Should render inline when inline prop is set to true", () => {
        act(() => {
            render(<RadioButton inline />, container);
        });
        expect(container.querySelector(".custom-radio").classList).toContain("inline");
    });
});

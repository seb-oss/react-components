import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Checkbox } from ".";

describe("Component: Checkbox", () => {
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
            render(<Checkbox />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should render checkbox inline and render label", () => {
        const label: string = "Some label";
        act(() => {
            render(<Checkbox inline>{label}</Checkbox>, container);
        });
        expect(container.firstElementChild.classList.contains("inline")).toBeTruthy();
        expect(container.querySelector(".custom-control").classList.contains("custom-control-inline")).toBeTruthy();
        expect(container.querySelector(".custom-control-label")).not.toBeNull();
        expect(container.querySelector(".custom-control-label").innerHTML).toEqual(label);
    });

    it("Should pass wrapper props when passed", () => {
        const className: string = "wrapper-classname";
        act(() => {
            render(<Checkbox wrapperProps={{ className }} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should render an indicator when passed", () => {
        act(() => {
            render(<Checkbox indicator={{ type: "danger", message: "error" }} />, container);
        });
        expect(container.querySelector(".custom-control").classList.contains("is-danger")).toBeTruthy();
        expect(container.querySelector(".progress-feedback")).not.toBeNull();
    });

    it("Should render random id when there is a label and no id passed", () => {
        const id: string = "some-id";
        act(() => {
            render(<Checkbox />, container);
        });
        expect(container.querySelector("input").id).toEqual("");

        act(() => {
            render(<Checkbox>some label</Checkbox>, container);
        });
        expect(container.querySelector("input").id).not.toEqual("");

        act(() => {
            render(<Checkbox id={id}>some label</Checkbox>, container);
        });
        expect(container.querySelector("input").id).toEqual(id);
    });
});

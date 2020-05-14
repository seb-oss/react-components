import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CheckBox } from ".";

describe("Component: CheckBox", () => {
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
            render(<CheckBox />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should render checkbox inline and render description and label", () => {
        const label: string = "Some label";
        const description: string = "Some description";
        act(() => {
            render(<CheckBox label={label} description={description} inline />, container);
        });
        expect(container.firstElementChild.classList.contains("inline")).toBeTruthy();
        expect(container.querySelector(".custom-control").classList.contains("custom-control-inline")).toBeTruthy();
        expect(container.querySelector(".checkbox-description")).not.toBeNull();
        expect(container.querySelector(".checkbox-description").textContent).toEqual(description);
        expect(container.querySelector(".custom-control-label")).not.toBeNull();
        expect(container.querySelector(".custom-control-label").firstElementChild.classList.contains("checkbox-label")).toBeTruthy();
        expect(container.querySelector(".custom-control-label").firstElementChild.textContent).toEqual(label);
    });

    it("Should pass wrapper props when passed", () => {
        const className: string = "wrapper-classname";
        act(() => {
            render(<CheckBox wrapperProps={{ className }} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should render an indicator when passed", () => {
        act(() => {
            render(<CheckBox indicator={{ type: "danger", text: "error" }} />, container);
        });
        expect(container.querySelector(".custom-control").classList.contains("is-danger")).toBeTruthy();
        expect(container.querySelector(".progress-feedback")).not.toBeNull();
    });

    it("Should render random id when there is a label and no id passed", () => {
        const id: string = "some-id";
        act(() => {
            render(<CheckBox />, container);
        });
        expect(container.querySelector("input").id).toEqual("");

        act(() => {
            render(<CheckBox label="some label" />, container);
        });
        expect(container.querySelector("input").id).not.toEqual("");

        act(() => {
            render(<CheckBox label="some label" id={id} />, container);
        });
        expect(container.querySelector("input").id).toEqual(id);
    });
});

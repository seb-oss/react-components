import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { CustomDropdownItem } from "./CustomDropdownItem";

describe("Component: CustomDropdownItem", () => {
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

    it("Should render correction", () => {
        const content: string = "my content";
        act(() => {
            render(<CustomDropdownItem>{content}</CustomDropdownItem>, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("custom-control")).toBeTruthy();
        // Should not show up until multiple is set to true
        expect(container.firstElementChild.classList.contains("custom-checkbox")).toBeFalsy();
        expect(container.firstElementChild.classList.contains("focused")).toBeFalsy();
        expect(container.querySelector("input")).not.toBeNull();
        expect(container.querySelector("input").type).toEqual("radio");
        expect(container.querySelector("label")).not.toBeNull();
        // Should be set to radio until multiple is set to true
        expect(container.querySelector("label").classList.contains("custom-radio")).toBeTruthy();
        expect(container.querySelector("label").textContent).toEqual(content);
        // Should have a random id
        expect(container.querySelector("input").id.length > 0).toBeTruthy();
        expect(container.querySelector("label").htmlFor.length > 0).toBeTruthy();
        expect(container.querySelector("label").htmlFor).toEqual(container.querySelector("input").id);
    });

    it("Should render correctly with multiple", () => {
        act(() => {
            render(<CustomDropdownItem multiple />, container);
        });
        expect(container.firstElementChild.classList.contains("custom-checkbox")).toBeTruthy();
        expect(container.querySelector("input").type).toEqual("checkbox");
        expect(container.querySelector("input").classList.contains("custom-control-input")).toBeTruthy();
        expect(container.querySelector("label").classList.contains("custom-control-label")).toBeTruthy();
    });

    it("Should render correctly with focused", () => {
        act(() => {
            render(<CustomDropdownItem focused />, container);
        });
        expect(container.firstElementChild.classList.contains("focused")).toBeTruthy();
    });
});

import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Toggle } from ".";

describe("Component: Toggle ", () => {
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
            render(<Toggle />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should pass custom id and label", () => {
        const id: string = "my-toggle-id";
        const label: string = "my toggle label";
        act(() => {
            render(<Toggle id={id} label={label} />, container);
        });
        expect(container.querySelector("input").id).toEqual(id);
        expect(container.querySelector("label").getAttribute("for")).toEqual(id);
        expect(container.querySelector("label").textContent).toEqual(label);
    });

    it("Should render with custom classnames and inline", () => {
        const wrapperClassName: string = "myWrapperClassName";
        const toggleClassName: string = "myToggleClassName";
        act(() => {
            render(<Toggle className={toggleClassName} wrapperProps={{ className: wrapperClassName }} inline />, container);
        });
        expect(container.firstElementChild.classList.contains("inline")).toBeTruthy();
        expect(container.firstElementChild.classList.contains(wrapperClassName)).toBeTruthy();
        expect(container.querySelector("input").classList.contains(toggleClassName)).toBeTruthy();
    });

    it("Should only generated random ID when no id is passed and there is a label", () => {
        act(() => {
            render(<Toggle />, container);
        });
        expect(container.querySelector("input").id.length).toBe(0);

        unmountComponentAtNode(container);

        act(() => {
            render(<Toggle label="label" />, container);
        });
        expect(container.querySelector("input").id.length).toBeGreaterThan(0);
    });
});

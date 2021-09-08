import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Table } from ".";

describe("Component: Table", () => {
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

    it("Should render simple table", async () => {
        act(() => {
            render(<Table />, container);
        });
        expect(container).toBeDefined();
        expect(container.querySelector("table")).not.toBeNull();
    });

    it("Should render table in dark mode", async () => {
        act(() => {
            render(<Table theme="dark" />, container);
        });
        expect(container.querySelector(".dark")).not.toBeNull();
    });
});

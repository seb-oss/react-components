import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { TableCell } from "./TableCell";

describe("Component: Table cell", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("tr");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<TableCell />, container);
        });

        expect(container).toBeDefined();
        expect(container.querySelector("td")).not.toBeNull();
    });
});

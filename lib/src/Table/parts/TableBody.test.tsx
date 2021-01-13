import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import TableBody from "./TableBody";
import TableRow from "./TableRow";

describe("Component: Table body", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("table");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<TableBody />, container);
        });

        expect(container).toBeDefined();
        expect(container.querySelector("tbody")).not.toBeNull();
    });

    it("Should render children correctly", () => {
        act(() => {
            render(
                <TableBody>
                    <TableRow />
                </TableBody>,
                container
            );
        });

        expect(container).toBeDefined();
        expect(container.querySelector("tr")).not.toBeNull();
    });

    it("Should render append parent key to sub row correctly", () => {
        const uniqueKey: string = "test";
        act(() => {
            render(
                <TableBody>
                    <TableRow uniqueKey={uniqueKey}></TableRow>
                    <TableRow isSubRow></TableRow>
                </TableBody>,
                container
            );
        });

        expect(container).toBeDefined();
        expect(container.querySelector(".sub-row")).not.toBeNull();
    });

    it("Should render append parent key to sub row correctly within fragment", () => {
        const uniqueKey: string = "test";
        act(() => {
            render(
                <TableBody>
                    <React.Fragment>
                        <TableRow uniqueKey={uniqueKey}></TableRow>
                        <TableRow isSubRow></TableRow>
                        <tr className="custom" />
                    </React.Fragment>
                </TableBody>,
                container
            );
        });

        expect(container).toBeDefined();
        expect(container.querySelector(".sub-row")).not.toBeNull();
        expect(container.querySelector(".custom")).not.toBeNull();
    });
});

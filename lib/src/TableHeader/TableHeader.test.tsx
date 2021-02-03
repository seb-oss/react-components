import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { TableHeader } from ".";
import { TableContext, TableContextType } from "../Table/TableContextProvider";
import { TableRow } from "../TableRow";

describe("Component: Table header", () => {
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
            render(<TableHeader />, container);
        });

        expect(container).toBeDefined();
        expect(container.querySelector("thead")).not.toBeNull();
    });

    it("Should display empty cell if row is the only header row", () => {
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: null,
            onRowSelect: jest.fn(),
            onRowExpand: jest.fn(),
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableHeader>
                        <TableRow />
                    </TableHeader>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelectorAll("th").length).toEqual(2);
    });

    it("Should only display select if row is the header row", () => {
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: jest.fn(),
            onRowSelect: jest.fn(),
            onRowExpand: jest.fn(),
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableHeader>
                        <TableRow isHeaderRow />
                        <TableRow />
                        <tr className="custom" />
                    </TableHeader>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelectorAll("input").length).toEqual(1);
        expect(container.querySelector(".custom")).not.toBeNull();
    });
});

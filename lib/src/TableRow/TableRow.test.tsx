import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { TableRow } from "./TableRow";
import { TableContext, TableContextType } from "../Table/TableContextProvider";

describe("Component: Table row", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("tbody");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<TableRow />, container);
        });

        expect(container).toBeDefined();
        expect(container.querySelector("tr")).not.toBeNull();
    });

    it("Should be able to expand sub rows", () => {
        const parentUniqueKey: string = "test";
        const onRowExpand: jest.Mock = jest.fn();
        const setTableStateFn: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: setTableStateFn,
            onRowSelect: null,
            onRowExpand,
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableRow uniqueKey={parentUniqueKey}></TableRow>
                    <TableRow isSubRow parentKey={parentUniqueKey}></TableRow>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("tr").classList.contains("collapsible")).toBeTruthy();
        expect(container.querySelector(".sub-row")).not.toBeNull();
        act(() => {
            Simulate.click(container.querySelector(".btn"));
        });
        expect(onRowExpand).toBeCalled();
    });

    it("Should be able to set row to be expanded by default", () => {
        const parentUniqueKey: string = "test";
        const onRowExpand: jest.Mock = jest.fn();
        const setTableStateFn: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [parentUniqueKey] },
            setTableState: setTableStateFn,
            onRowSelect: null,
            onRowExpand,
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableRow uniqueKey={parentUniqueKey} isExpanded></TableRow>
                    <TableRow isSubRow parentKey={parentUniqueKey}></TableRow>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("tr").classList.contains("expanded")).toBeTruthy();
        expect(container.querySelector(".sub-row")).not.toBeNull();
        expect(container.querySelector(".sub-row").classList.contains("show")).toBeTruthy();
    });

    it("Should be able to select row", () => {
        const uniqueKey: string = "test";
        const onRowSelect: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: null,
            onRowSelect,
            onRowExpand: null,
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableRow uniqueKey={uniqueKey} />
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector(".select-control")).not.toBeNull();
        act(() => {
            Simulate.change(container.querySelector(`#tb_checkbox_${uniqueKey}`));
        });
        expect(onRowSelect).toBeCalled();
    });

    it("Should be able to select all row", () => {
        const onRowSelect: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: null,
            onRowSelect,
            onRowExpand: null,
            onSort: null,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableRow isHeaderRow />
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("th")).not.toBeNull();
        act(() => {
            Simulate.change(container.querySelector(`#tb_checkbox_all`));
        });
        expect(onRowSelect).toBeCalled();
    });

    it("Should display empty cell if row is a sub row", () => {
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
                    <TableRow isSubRow />
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelectorAll("td").length).toEqual(2);
    });
});

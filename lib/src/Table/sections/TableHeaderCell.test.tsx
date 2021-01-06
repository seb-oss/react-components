import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import TableHeaderCell from "./TableHeaderCell";
import { TableContext, TableContextType } from "../TableContextProvider";
import { SortDirection } from "../table-typings";

describe("Component: Table header cell", () => {
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
            render(<TableHeaderCell />, container);
        });

        expect(container).toBeDefined();
        expect(container.querySelector("th")).not.toBeNull();
    });

    it("Should be sortable", () => {
        const sortFn: jest.Mock = jest.fn();
        const setTableStateFn: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: null, expandedRows: [] },
            setTableState: setTableStateFn,
            onRowSelect: null,
            onRowExpand: null,
            onSort: sortFn,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableHeaderCell accessor="test">child</TableHeaderCell>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("th").classList.contains("sortable")).toBeTruthy();
        act(() => {
            Simulate.click(container.querySelector(".sort-holder"));
        });
        expect(setTableStateFn).toBeCalled();
        expect(sortFn).toBeCalled();
    });

    it("Should change sorting direction", () => {
        const sortFn: jest.Mock = jest.fn();
        const setTableStateFn: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: { accessor: "test", sortDirection: SortDirection.ASC }, expandedRows: [] },
            setTableState: setTableStateFn,
            onRowSelect: null,
            onRowExpand: null,
            onSort: sortFn,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableHeaderCell accessor="test">child</TableHeaderCell>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("th").classList.contains("sortable")).toBeTruthy();
        expect(container.querySelector(".asc")).not.toBeNull();
        act(() => {
            Simulate.click(container.querySelector(".sort-holder"));
        });
        expect(setTableStateFn).toBeCalledWith({
            ...mockProviderValue.tableState,
            sortedColumn: { ...mockProviderValue.tableState.sortedColumn, sortDirection: SortDirection.DESC },
        });
        expect(sortFn).toBeCalled();
    });

    it("Should able to disable sort per cell", () => {
        const sortFn: jest.Mock = jest.fn();
        const setTableStateFn: jest.Mock = jest.fn();
        const mockProviderValue: TableContextType = {
            tableState: { sortedColumn: { accessor: "test", sortDirection: SortDirection.ASC }, expandedRows: [] },
            setTableState: setTableStateFn,
            onRowSelect: null,
            onRowExpand: null,
            onSort: sortFn,
        };
        act(() => {
            render(
                <TableContext.Provider value={mockProviderValue}>
                    <TableHeaderCell disableSort accessor="test">
                        child
                    </TableHeaderCell>
                </TableContext.Provider>,
                container
            );
        });
        expect(container.querySelector("th").classList.contains("sortable")).toBeFalsy();
    });
});

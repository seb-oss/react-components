import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Column, Table, TableRow, TableHeader } from "./Table";
import makeData from "../../develop/utils/makeData";
import { act } from "react-dom/test-utils";
import { Pagination } from "../Pagination/Pagination";

describe("Component: Table", () => {
    let container: HTMLDivElement = null;

    const columns: Array<Column> = [
        {
            label: "id",
            accessor: "id",
            canSort: false
        },
        {
            label: "First Name",
            accessor: "firstName",
        },
        {
            label: "Last Name",
            accessor: "lastName",
        },
        {
            label: "Age",
            accessor: "age",
        },
        {
            label: "Visits",
            accessor: "visits",
        },
        {
            label: "Profile Progress",
            accessor: "progress",
        },
        {
            label: "Status",
            accessor: "status",
        },
    ];

    const data = makeData(30, 5);
    const smallData = makeData(5, 5);

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render simple table", () => {
        act(() => { render(<Table columns={columns} data={smallData} />, container); });
        expect(container).toBeDefined();
    });

    it('Should render and be able to sort rows ', async () => {
        const event: jest.Mock = jest.fn((rows: Array<TableRow>, sortByColumn: TableHeader) => { console.log("The sorted rows are ", rows); });
        act(() => {
            render(<Table
                columns={columns}
                data={smallData}
                onSort={event}
            />, container);
        });
        await act(async () => {
            container.querySelectorAll(".angle-down").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // note id column canSort is false
        expect(container.querySelectorAll(".angle-down").length).toEqual(columns.length - 1);
        expect(event).toHaveBeenCalled();
    });

    it("Should render and do pagination where necessary ", async () => {
        const pageSize: number = 30;
        const paginationValue: number = 1;
        const setPage: jest.Mock = jest.fn((n: number) => { console.log("Setting page ", n); });
        await act(() => {
            render(<Table
                columns={columns}
                data={data}
                offset={pageSize}
                currentpage={paginationValue}
                usePagination={true}
                footer={
                    <Pagination
                        value={paginationValue}
                        onChange={setPage}
                        size={3}
                        offset={3}
                        useFirstAndLast={true}
                    />
                }
            />, container);
        });
        await act(() => {
            container.querySelectorAll("tfoot > tr .page-item").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }))
        });
        expect(container.querySelectorAll("tfoot > tr .page-item")).toBeDefined();
        expect(setPage).toHaveBeenCalled();
    });

    it("Should render and do be able to expand to sub rows and row details ", async () => {
        const onRowExpanded: jest.Mock = jest.fn((rows: Array<TableRow>) => { console.log("The rows are ", rows); });
        await act(() => {
            render(
                <Table columns={columns}
                    data={smallData}
                    onRowExpanded={onRowExpanded}
                />, container
            );
        });
        await act(() => {
            container.querySelectorAll("tbody > tr .icon-holder svg").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }))
        });

        expect(container.querySelectorAll("tbody > tr.sub-row")).toBeDefined();
        expect(container.querySelectorAll("tbody > tr.sub-row.expanded")).toBeTruthy();
        // expect(container.querySelectorAll("tbody > tr.sub-row.expanded").length).toEqual(1);
        expect(onRowExpanded).toHaveBeenCalled();
    });

});

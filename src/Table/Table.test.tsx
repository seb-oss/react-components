import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Column, Table, TableRow, TableHeader, ActionLinkItem, DataItem, sortDirectionTypes } from "./Table";
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

    const data: Array<DataItem> = makeData([30, 5]);
    const smallData: Array<DataItem> = makeData([5, 5]);

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
        const event: jest.Mock = jest.fn((rows: Array<TableRow>, sortByColumn: TableHeader) => { console.log("The sorted rows are "); });
        const onSortEvent: jest.Mock = jest.fn((rows: Array<TableRow>, accessor: string, sortingOrder: sortDirectionTypes) => rows.slice(0, 2));
        await act(() => {
            render(<Table
                columns={columns}
                data={smallData}
                sortProps={{ onAfterSorting: event }}
            />, container);
        });
        await act(async () => {
            container.querySelectorAll(".icon-holder").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // note: id column canSort is false
        expect(container.querySelectorAll(".icon-holder").length).toEqual(columns.length - 1);
        expect(event).toHaveBeenCalled();

        // you can also use a custom onSort callback as passed by the user
        await act(() => {
            render(<Table
                columns={columns}
                data={smallData}
                sortProps={{ onSort: onSortEvent, onAfterSorting: event }}
            />, container);
        });
        await act(async () => {
            container.querySelectorAll(".icon-holder").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // there should just two rows now
        expect(container.querySelectorAll("tbody > tr.parent-row").length).toEqual(2);
    });

    it("Should render and do pagination where necessary ", async () => {
        const pageSize: number = 30;
        const paginationValue: number = 1;
        const setPage: jest.Mock = jest.fn((n: number) => { console.log("Setting page "); });
        await act(() => {
            render(<Table
                columns={columns}
                data={data}
                offset={pageSize}
                currentpage={paginationValue}
                footer={
                    <Pagination
                        value={paginationValue}
                        onChange={setPage}
                        size={pageSize}
                        useFirstAndLast={true}
                    />
                }
            />, container);
        });
        act(() => {
            container.querySelectorAll("tfoot > tr .page-item").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }))
        });
        expect(container.querySelectorAll("tfoot > tr .page-item")).toBeDefined();
        expect(setPage).toHaveBeenCalled();
    });

    it("Should render and be able to expand the subRows and row details ", async () => {
        const onRowExpanded: jest.Mock = jest.fn((rows: Array<TableRow>) => { console.log("The rows are "); });
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    onRowExpanded={onRowExpanded}
                />, container
            );
        });
        act(() => {
            container.querySelectorAll("tbody > tr.parent-row .icon-holder svg").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
            container.querySelectorAll("tbody > tr.sub-row .icon-holder svg").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(container.querySelectorAll("tbody > tr.parent-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.parent-row.expanded").length).toEqual(1);
        expect(container.querySelectorAll("tbody > tr.sub-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.sub-row.expanded").length).toEqual(1);
        expect(onRowExpanded).toHaveBeenCalled();

        // it should be collapsable even for rowDetails

        const newData: Array<TableRow> = smallData.map((row: TableRow) => ({ ...row, subRows: undefined, rowContentDetail: <p>paragraph</p> }));
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={newData}
                    onRowExpanded={onRowExpanded}
                />, container
            );
        });

        act(() => {
            container.querySelectorAll("tbody > tr.parent-row .icon-holder svg").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(container.querySelectorAll("tbody > tr.parent-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.parent-row.expanded").length).toEqual(1);
    });

    it("should render with and support row selction where necessary", async () => {
        // all items select 
        const onItemSelected: jest.Mock = jest.fn((e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: "row" | "subRow", rowIndex?: number) => { console.log("The rows are "); });
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    onRowSelected={onItemSelected}
                />, container
            );
        });
        act(() => {
            // all items select 
            container.querySelectorAll("thead .custom-control-input").item(0).dispatchEvent(new MouseEvent("click", { bubbles: true }));
            // one item selection
            container.querySelectorAll("tbody .custom-control-input").item(0).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onItemSelected).toHaveBeenCalledTimes(2);
    });

    it("should render and have optional footer row", async () => {
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                />, container
            );
        });
        expect(container.querySelector("tfoot tr")).toBeFalsy();

        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    footer={<p>This is a paragraph. </p>}
                />, container
            );
        });
        expect(container.querySelector("tfoot tr")).toBeTruthy();
    });

    it("should enable and handle custom actions ", async () => {
        const customButtonCallBack: jest.Mock = jest.fn((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => { });
        const actionLinks: Array<ActionLinkItem> = [
            { label: "Add", onClick: customButtonCallBack },
            { label: "Edit", onClick: customButtonCallBack }
        ];
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    actionLinks={actionLinks}
                />, container
            );
        });

        // trigger and open action column
        const openedActionColumnString: string = "tbody tr.parent-row > td .action-column .ellipsis-dropdown-holder .dropdown-content.active";
        expect(container.querySelector(openedActionColumnString)).toBeNull();
        expect(container.querySelector(openedActionColumnString)).toBeFalsy();

        act(() => {
            container.querySelectorAll("tbody tr.parent-row > td .action-column .ellipsis-dropdown-holder").item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });


        expect(container.querySelector(openedActionColumnString)).toBeDefined();
        expect(container.querySelector(openedActionColumnString)).toBeTruthy();

        // action should be closed when you click outside the div 

        act(() => {
            container.querySelector("tbody").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        });

        expect(container.querySelector(openedActionColumnString)).toBeNull();
        expect(container.querySelector(openedActionColumnString)).toBeFalsy();


        act(() => {
            container.querySelectorAll("tbody tr.parent-row > td .action-column a").forEach((el: Element) => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
        });

        // it should be called the length of the data twice
        expect(customButtonCallBack).toHaveBeenCalledTimes(2 * smallData.length);

        // plus one column for action field
        expect(container.querySelectorAll("thead tr th").length).toEqual(columns.length + 1);
    });

    it("should render and support filter and searching ", async () => {
        let results: Array<TableRow> = smallData;
        const customButtonCallBack: jest.Mock = jest.fn((searchResults: Array<TableRow>) => { results = searchResults; });

        // before search
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                />, container
            );
        });

        expect(results.length).toEqual(smallData.length);
        expect(customButtonCallBack).not.toHaveBeenCalled();

        // nothing should change if searchInColumns is empty
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: [],
                        triggerSearchOn: "Change",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack
                    }}
                />, container
            );
        });

        expect(results.length).toEqual(smallData.length);

        // after valid search
        await act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["firstName", "lastName"],
                        triggerSearchOn: "Change",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack
                    }}
                />, container
            );
        });

        expect(results.length).toEqual(1);
        expect(customButtonCallBack).toHaveBeenCalled();
    });

});

import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Column, Table, TableRow, TableHeader, ActionLinkItem, DataItem, sortDirectionTypes, FilterItem, PrimaryActionButton } from "./Table";
import makeData from "../../develop/__utils/makeData";
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
            accessor: "firstName"
        },
        {
            label: "Last Name",
            accessor: "lastName"
        },
        {
            label: "Age",
            accessor: "age"
        },
        {
            label: "Visits",
            accessor: "visits"
        },
        {
            label: "Profile Progress",
            accessor: "progress"
        },
        {
            label: "Status",
            accessor: "status"
        }
    ];

    const data: Array<DataItem<any>> = makeData([30, 5]);
    const smallData: Array<DataItem<any>> = makeData([5, 5]);

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
        act(() => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should render and be able to sort rows ", () => {
        const event: jest.Mock = jest.fn((rows: Array<TableRow>, sortByColumn: TableHeader) => console.log("onAfterSorting called"));
        const onSortEvent: jest.Mock = jest.fn((rows: Array<TableRow>, accessor: string, sortingOrder: sortDirectionTypes) => rows.slice(0, 2));
        act(() => {
            render(<Table columns={columns} data={smallData} sortProps={{ onAfterSorting: event }} />, container);
        });

        // sort number type column(age) ascending and descending
        act(() => {
            container
                .querySelectorAll(".icon-holder")
                .item(3)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        act(() => {
            container
                .querySelectorAll(".icon-holder")
                .item(3)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // sort ascending
        act(() => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // sort descending
        act(() => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        // note: id column canSort is false
        expect(container.querySelectorAll(".icon-holder").length).toEqual(columns.length - 1);
        expect(event).toHaveBeenCalledTimes(4);

        // you can also use a custom onSort callback as passed by the user
        act(() => {
            render(<Table columns={columns} data={smallData} sortProps={{ onSort: onSortEvent, onAfterSorting: event }} />, container);
        });
        act(() => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // there should just two rows now
        expect(container.querySelectorAll("tbody > tr.parent-row").length).toEqual(2);

        // it also support a server sorting, just sort and update your data and columns
        act(() => {
            render(<Table columns={columns} data={smallData} sortProps={{ onSort: onSortEvent, onAfterSorting: event, useServerSorting: true }} />, container);
        });

        expect(container.querySelectorAll("tbody > tr.parent-row").length).toEqual(2);
    });

    it("Should render and do pagination where necessary ", () => {
        const pageSize: number = 30;
        const paginationValue: number = 1;
        const setPage: jest.Mock = jest.fn((n: number) => console.log("setPage called"));
        act(() => {
            render(
                <Table
                    columns={columns}
                    data={data}
                    offset={pageSize}
                    currentpage={paginationValue}
                    footer={<Pagination value={paginationValue} onChange={setPage} size={pageSize} useFirstAndLast={true} />}
                />,
                container
            );
        });
        act(() => {
            container
                .querySelectorAll("tfoot > tr .page-item")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll("tfoot > tr .page-item")).toBeDefined();
        expect(setPage).toHaveBeenCalled();
    });

    it("Should render and be able to expand the subRows and row details ", () => {
        const onRowExpanded: jest.Mock = jest.fn((rows: Array<TableRow>) => console.log("onRowExpanded called"));
        act(() => {
            render(<Table columns={columns} data={smallData} onRowExpanded={onRowExpanded} />, container);
        });
        act(() => {
            container
                .querySelectorAll("tbody > tr.parent-row .icon-holder svg")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
            container
                .querySelectorAll("tbody > tr.sub-row .icon-holder svg")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(container.querySelectorAll("tbody > tr.parent-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.parent-row.expanded").length).toEqual(1);
        expect(container.querySelectorAll("tbody > tr.sub-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.sub-row.expanded").length).toEqual(1);
        expect(onRowExpanded).toHaveBeenCalled();

        // it should be collapsable even for rowDetails

        const newData: Array<TableRow> = smallData.map((row: TableRow) => ({ ...row, subRows: undefined, rowContentDetail: <p>paragraph</p> }));
        act(() => {
            render(<Table columns={columns} data={newData} onRowExpanded={onRowExpanded} />, container);
        });

        act(() => {
            container
                .querySelectorAll("tbody > tr.parent-row .icon-holder svg")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(container.querySelectorAll("tbody > tr.parent-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.parent-row.expanded").length).toEqual(1);
    });

    it("should render with and support row selection where necessary", () => {
        // all items select
        const onRowSelected: jest.Mock = jest.fn((e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: "row" | "subRow", rowIndex?: number) => console.log("onRowSelected called"));
        act(() => {
            render(<Table columns={columns} data={smallData} onRowSelected={onRowSelected} />, container);
        });
        act(() => {
            // all items select
            container
                .querySelectorAll("thead .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
            // one parent item selection
            container
                .querySelectorAll("tbody tr.parent-row .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
            // one subrow item selected
            container
                .querySelectorAll("tbody tr.sub-row .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onRowSelected).toHaveBeenCalledTimes(3);
    });

    it("should render and have optional footer row", () => {
        act(() => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(container.querySelector("tfoot tr")).toBeFalsy();

        act(() => {
            render(<Table columns={columns} data={smallData} footer={<p>This is a paragraph. </p>} />, container);
        });
        expect(container.querySelector("tfoot tr")).toBeTruthy();
    });

    it("should enable and handle custom actions ", () => {
        const customButtonCallBack: jest.Mock = jest.fn((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {});
        const actionLinks: Array<ActionLinkItem> = [
            { label: "Add", onClick: customButtonCallBack },
            { label: "Edit", onClick: customButtonCallBack }
        ];
        act(() => {
            render(<Table columns={columns} data={smallData} actionLinks={actionLinks} />, container);
        });

        // trigger and open action column
        const openedActionColumnString: string = "tbody tr.parent-row td .action-column .ellipsis-dropdown-holder .dropdown-content.active";
        expect(container.querySelector(openedActionColumnString)).toBeNull();
        expect(container.querySelector(openedActionColumnString)).toBeFalsy();

        act(() => {
            container
                .querySelectorAll("tbody tr.parent-row td .action-column .ellipsis-dropdown-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
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
            container.querySelectorAll("tbody tr.parent-row td .action-column a").forEach((el: Element) => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
        });

        // it should be called the length of the data twice
        expect(customButtonCallBack).toHaveBeenCalledTimes(2 * smallData.length);

        // plus one column for action field
        expect(container.querySelectorAll("thead tr th").length).toEqual(columns.length + 1);
    });

    it("should render and enable custom button", () => {
        const primaryActionButton: PrimaryActionButton = {
            label: "Buy",
            onClick: jest.fn((e: React.MouseEvent<HTMLButtonElement>) => {})
        };

        act(() => {
            render(<Table columns={columns} data={smallData} primaryActionButton={primaryActionButton} />, container);
        });

        act(() => {
            container.querySelector("tbody tr.parent-row td .action-column button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(primaryActionButton.onClick).toHaveBeenCalled();
    });

    it("should render and support filtering ", () => {
        let results: Array<TableRow> = smallData;

        // before filter
        act(() => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(results.length).toEqual(smallData.length);

        // pass some filters
        const onAfterFilterCallBack: jest.Mock = jest.fn((rows: Array<TableRow>) => {
            results = rows;
        });

        const onRemoveFilter: jest.Mock = jest.fn((filterItem: FilterItem) => {
            console.log(filterItem);
        });

        const filterValues: Array<string> = smallData.map((data: DataItem<any>) => data.status);

        act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    filterProps={{
                        filterItems: [
                            {
                                accessor: "status",
                                filters: filterValues.slice(0, 1)
                            }
                        ],
                        onAfterFilter: onAfterFilterCallBack,
                        onRemoveFilter: onRemoveFilter
                    }}
                />,
                container
            );
        });

        // after filter, the length of the result should decrease
        expect(results.length).not.toEqual(smallData.length);
        expect(onAfterFilterCallBack).toBeCalled();
        expect(onRemoveFilter).not.toBeCalled();

        // mock on

        act(() => {
            container.querySelector("tbody .filter-item-holder .filter-item .icon-holder").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(onRemoveFilter).toBeCalled();
    });

    it("should render and support searching ", () => {
        let results: Array<TableRow> = smallData;
        const customButtonCallBack: jest.Mock = jest.fn((searchResults: Array<TableRow>) => {
            results = searchResults;
        });

        // before search
        act(() => {
            render(<Table columns={columns} data={smallData} />, container);
        });

        expect(results.length).toEqual(smallData.length);
        expect(customButtonCallBack).not.toHaveBeenCalled();

        // nothing should change if searchInColumns is empty or search text is empty
        act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: [],
                        triggerSearchOn: "Submit",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack,
                        searchTriggered: true
                    }}
                />,
                container
            );
        });

        expect(results.length).toEqual(smallData.length);

        act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["firstName"],
                        triggerSearchOn: "Submit",
                        searchText: null,
                        onSearch: customButtonCallBack,
                        searchTriggered: true
                    }}
                />,
                container
            );
        });

        expect(results.length).toEqual(smallData.length);

        // after valid search
        act(() => {
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
                />,
                container
            );
        });

        expect(results.length).toEqual(1);
        // after valid search with number field
        act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["age"],
                        triggerSearchOn: "Change",
                        searchText: smallData[1].age,
                        onSearch: customButtonCallBack
                    }}
                />,
                container
            );
        });
        expect(customButtonCallBack).toHaveBeenCalledTimes(3);

        // nothing should be returned when search field is not found or undefined
        act(() => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["undefined"],
                        triggerSearchOn: "Submit",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack,
                        searchTriggered: true
                    }}
                />,
                container
            );
        });
        expect(results.length).toEqual(0);
    });
});

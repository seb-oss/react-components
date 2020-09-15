import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Column, Table, TableRow, ActionLinkItem, DataItem, sortDirectionTypes, PrimaryActionButton, EditProps } from ".";
import { Pagination } from "../Pagination";
import makeData from "../../develop/__utils/makeData";

describe("Component: Table", () => {
    let container: HTMLDivElement = null;

    const columns: Array<Column> = [
        {
            label: "id",
            accessor: "id",
            canSort: false,
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

    const data: Array<DataItem<any>> = makeData([30, 5]);
    const smallData: Array<DataItem<any>> = makeData([5, 5]);
    const smallDataActionColumn: Array<DataItem<any>> = makeData([5, 5], true);

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
        await act(async () => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should render and alloow blacklisting or hiding columns ", async () => {
        await act(async () => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(container.querySelectorAll("thead > tr > th").length).toEqual(columns.length);

        const editableColumns: Array<Column> = columns?.map((column: Column, index: number) => {
            if (index === 1) {
                return { ...column, isHidden: true };
            }
            return column;
        });

        await act(async () => {
            render(<Table columns={editableColumns} data={smallData} />, container);
        });

        expect(container.querySelectorAll("thead > tr > th").length).toEqual(columns.length - 1);
    });

    it("Should render and be able to sort rows ", async () => {
        const event: jest.Mock = jest.fn();
        const onSortEvent: jest.Mock = jest.fn((rows: Array<TableRow>, accessor: string, sortingOrder: sortDirectionTypes) => rows.slice(0, 2));
        await act(async () => {
            render(<Table columns={columns} data={smallData} sortProps={{ onAfterSorting: event }} />, container);
        });

        // sort number type column(age) ascending and descending
        await act(async () => {
            container
                .querySelectorAll(".icon-holder")
                .item(3)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        await act(async () => {
            container
                .querySelectorAll(".icon-holder")
                .item(3)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // sort ascending
        await act(async () => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // sort descending
        await act(async () => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        // note: id column canSort is false
        expect(container.querySelectorAll(".icon-holder").length).toEqual(columns.length - 1);
        expect(event).toHaveBeenCalledTimes(4);

        // you can also use a custom onSort callback as passed by the user
        await act(async () => {
            render(<Table columns={columns} data={smallData} sortProps={{ onSort: onSortEvent, onAfterSorting: event }} />, container);
        });
        await act(async () => {
            container
                .querySelectorAll(".icon-holder")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        // there should just two rows now
        expect(container.querySelectorAll("tbody > tr.parent-row").length).toEqual(2);

        // it also support a server sorting, just sort and update your data and columns
        await act(async () => {
            render(<Table columns={columns} data={smallData} sortProps={{ onSort: onSortEvent, onAfterSorting: event, useServerSorting: true }} />, container);
        });

        expect(container.querySelectorAll("tbody > tr.parent-row").length).toEqual(2);
    });

    it("Should render and do pagination where necessary ", async () => {
        const pageSize: number = 30;
        const paginationValue: number = 1;
        const setPage: jest.Mock = jest.fn();
        await act(async () => {
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
        await act(async () => {
            container
                .querySelectorAll("tfoot > tr .page-item")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll("tfoot > tr .page-item")).toBeDefined();
        expect(setPage).toHaveBeenCalled();
    });

    it("Should render and be able to expand the subRows and row details ", async () => {
        const onRowExpanded: jest.Mock = jest.fn();
        await act(async () => {
            render(<Table columns={columns} data={smallData} onRowExpanded={onRowExpanded} />, container);
        });
        await act(async () => {
            container
                .querySelectorAll("tbody > tr.parent-row .icon-holder svg")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        await act(async () => {
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
        await act(async () => {
            render(<Table columns={columns} data={newData} onRowExpanded={onRowExpanded} />, container);
        });

        await act(async () => {
            container
                .querySelectorAll("tbody > tr.parent-row .icon-holder svg")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(container.querySelectorAll("tbody > tr.parent-row.expanded")).toBeTruthy();
        expect(container.querySelectorAll("tbody > tr.parent-row.expanded").length).toEqual(1);
    });

    it("Should render with and support row selection where necessary", async () => {
        // all items select
        let results: Array<TableRow> = [];
        const onRowSelected: jest.Mock = jest.fn((rows: Array<TableRow>) => {
            results = rows;
        });

        await act(async () => {
            render(<Table columns={columns} data={smallData} onRowSelected={onRowSelected} />, container);
        });

        await act(async () => {
            // all items select
            container
                .querySelectorAll("thead .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(results.length).toEqual(smallData.length);

        await act(async () => {
            // all items select
            container
                .querySelectorAll("thead .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(results.length).toEqual(0);

        await act(async () => {
            // one parent item selection
            container
                .querySelectorAll("tbody tr.parent-row .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(results.length).toEqual(1);

        await act(async () => {
            // one subrow item selected
            container
                .querySelectorAll("tbody tr.sub-row .custom-control-input")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(onRowSelected).toHaveBeenCalledTimes(4);
    });

    describe("Should handle inline textbox edit ", () => {
        let results: Array<TableRow> = [];
        let textContainer: HTMLDivElement = null;

        const onAfterEdit: jest.Mock = jest.fn((rows: Array<TableRow>) => {
            results = rows;
        });
        const onRowSelected: jest.Mock = jest.fn((rows: Array<TableRow>) => {});

        const editProps: EditProps = {
            onAfterEdit,
            mode: null,
        };

        const selector: string = "tbody tr.parent-row td .form-group";

        const updatedSelectedRows: Array<TableRow> = smallData?.slice(0, 2).map((row: TableRow) => ({ ...row, selected: true }));

        beforeEach(() => {
            textContainer = document.createElement("div");
            document.body.appendChild(textContainer);
        });

        afterEach(() => {
            unmountComponentAtNode(textContainer);
            textContainer.remove();
            textContainer = null;
        });

        it("Should render and handle edit and save  ", async () => {
            await act(async () => {
                render(<Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={editProps} />, textContainer);
            });

            expect(textContainer.querySelectorAll(selector).length).toEqual(0);

            await act(async () => {
                render(<Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} />, textContainer);
            });

            await act(async () => {
                render(<Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={{ ...editProps, mode: "edit" }} />, textContainer);
            });

            expect(textContainer.querySelectorAll(selector).length).toBeGreaterThan(0);

            await act(async () => {
                render(<Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={{ ...editProps, mode: "save" }} />, textContainer);
            });

            expect(textContainer.querySelectorAll(selector).length).toEqual(0);
            expect(editProps.onAfterEdit).toHaveBeenCalledTimes(1);
            expect(results.length).toEqual(updatedSelectedRows.length);
        });

        it("Should render and handle edit and cancel ", async () => {
            // now repeat the process, for cancel
            results = [];
            await act(async () => {
                render(
                    <Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={{ ...editProps, blackListedAccessors: ["firstName", "lastName"] }} />,
                    textContainer
                );
            });

            expect(textContainer.querySelectorAll(selector).length).toEqual(0);

            // blaclist some columns

            await act(async () => {
                render(
                    <Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={{ ...editProps, mode: "edit", blackListedAccessors: ["firstName", "lastName"] }} />,
                    textContainer
                );
            });

            expect(textContainer.querySelectorAll(selector).length).toBeGreaterThan(0);

            // id column is ommited by default, + firstName and lastName , 3
            expect(textContainer.querySelectorAll(selector).length).toEqual((columns.length - 3) * updatedSelectedRows.length);

            await act(async () => {
                render(<Table columns={columns} data={updatedSelectedRows} onRowSelected={onRowSelected} editProps={{ ...editProps, mode: "cancel" }} />, textContainer);
            });

            expect(textContainer.querySelectorAll(selector).length).toEqual(0);
            expect(results.length).toEqual(0);
        });
    });

    it("Should render and have optional footer row", async () => {
        await act(async () => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(container.querySelector("tfoot tr")).toBeFalsy();

        await act(async () => {
            render(<Table columns={columns} data={smallData} footer={<p>This is a paragraph. </p>} />, container);
        });
        expect(container.querySelector("tfoot tr")).toBeTruthy();
    });

    describe("Should allow passing optional action column to individual row ", () => {
        let actionContainer: HTMLDivElement = null;

        beforeEach(() => {
            actionContainer = document.createElement("div");
            document.body.appendChild(actionContainer);
        });

        afterEach(() => {
            unmountComponentAtNode(actionContainer);
            actionContainer.remove();
            actionContainer = null;
        });

        it("row action columns", async () => {
            await act(async () => {
                const primaryActionButton: PrimaryActionButton = {
                    label: "Buy",
                    buttonSize: "sm",
                    buttonTheme: "danger",
                    onClick: jest.fn((e: React.MouseEvent<HTMLButtonElement>) => {}),
                };

                render(<Table columns={columns} data={smallDataActionColumn} primaryActionButton={primaryActionButton} />, actionContainer);
            });

            const openedActionColumnButtonString: string = "tbody tr.parent-row td .action-column button";

            // select all the buttons, the first row button should be disable
            expect((actionContainer?.querySelectorAll(openedActionColumnButtonString).item(0) as HTMLButtonElement).disabled).toBeTruthy();

            // the second item should not be disable
            expect((actionContainer?.querySelectorAll(openedActionColumnButtonString).item(1) as HTMLButtonElement).disabled).toBeFalsy();
        });
    });

    describe("Should enable and handle custom actions : ", () => {
        let actionContainer: HTMLDivElement = null;

        const customButtonCallBack: jest.Mock = jest.fn((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {});
        const actionLinks: Array<ActionLinkItem> = [
            { label: "Add", onClick: customButtonCallBack },
            { label: "Edit", onClick: customButtonCallBack },
        ];

        // for the sake of subrow, collapse data
        const newData: Array<TableRow> = smallData.slice(0, 2).map((data: TableRow) => ({ ...data, expanded: true }));
        beforeEach(() => {
            actionContainer = document.createElement("div");
            document.body.appendChild(actionContainer);
        });

        afterEach(() => {
            unmountComponentAtNode(actionContainer);
            actionContainer.remove();
            actionContainer = null;
        });

        it("For parent row ", async () => {
            await act(async () => {
                render(<Table columns={columns} data={newData} actionLinks={actionLinks} />, actionContainer);
            });

            // trigger and open row action column
            const openedActionColumnString: string = "tbody tr.parent-row td .action-column .ellipsis-dropdown-holder .dropdown-content.active";
            expect(actionContainer.querySelector(openedActionColumnString)).toBeNull();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeFalsy();

            await act(async () => {
                actionContainer
                    .querySelectorAll("tbody tr.parent-row td .action-column .ellipsis-dropdown-holder")
                    .item(1)
                    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(actionContainer.querySelector(openedActionColumnString)).toBeDefined();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeTruthy();

            await act(async () => {
                actionContainer.querySelectorAll("tbody tr.parent-row td .action-column a").forEach((el: Element) => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
            });

            // It should be triggered times the length of the actionLinks
            expect(customButtonCallBack).toHaveBeenCalledTimes(actionLinks.length);

            // action should be closed when you click outside the div
            await act(async () => {
                actionContainer.querySelector("tbody").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            });

            expect(actionContainer.querySelector(openedActionColumnString)).toBeNull();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeFalsy();

            // plus one column for action field
            expect(actionContainer.querySelectorAll("thead tr th").length).toEqual(columns.length + 1);
        });

        it("For subrow ", async () => {
            await act(async () => {
                render(<Table columns={columns} data={newData} actionLinks={actionLinks} />, actionContainer);
            });

            // trigger and open sub row action column
            const openedActionColumnString: string = "tbody tr.sub-row td .action-column .ellipsis-dropdown-holder .dropdown-content.active";
            expect(actionContainer.querySelector(openedActionColumnString)).toBeNull();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeFalsy();

            await act(async () => {
                actionContainer
                    .querySelectorAll("tbody tr.sub-row td .action-column .ellipsis-dropdown-holder")
                    .item(9)
                    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(actionContainer.querySelector(openedActionColumnString)).toBeDefined();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeTruthy();

            await act(async () => {
                actionContainer
                    .querySelectorAll("tbody tr.sub-row td .action-column .ellipsis-dropdown-holder a")
                    .forEach((el: Element) => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
            });

            // There are two actions on in the custom actions, add and edit. so it should be called twice, times the parent two
            expect(customButtonCallBack).toHaveBeenCalledTimes(actionLinks.length * 2);

            // action should be closed when you click outside the div

            await act(async () => {
                actionContainer.querySelector("tbody").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            });

            expect(actionContainer.querySelector(openedActionColumnString)).toBeNull();
            expect(actionContainer.querySelector(openedActionColumnString)).toBeFalsy();

            // plus one column for action field
            expect(actionContainer.querySelectorAll("thead tr th").length).toEqual(columns.length + 1);
        });
    });

    it("Should render and enable custom button", async () => {
        const primaryActionButton: PrimaryActionButton = {
            label: "Buy",
            buttonSize: "sm",
            buttonTheme: "danger",
            onClick: jest.fn((e: React.MouseEvent<HTMLButtonElement>) => {}),
        };

        await act(async () => {
            render(<Table columns={columns} data={smallData} primaryActionButton={primaryActionButton} />, container);
        });

        await act(async () => {
            container.querySelector("tbody tr.parent-row td .action-column button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(primaryActionButton.onClick).toHaveBeenCalled();

        //check theme and button sizes
        expect(container.querySelector("tbody tr.parent-row td .action-column > .btn-danger")).toBeTruthy();
        expect(container.querySelector("tbody tr.parent-row td .action-column > .btn-sm")).toBeTruthy();
    });

    it("Should render and support filtering ", async () => {
        let results: Array<TableRow> = smallData;

        // before filter
        await act(async () => {
            render(<Table columns={columns} data={smallData} />, container);
        });
        expect(results.length).toEqual(smallData.length);

        // pass some filters
        const onAfterFilterCallBack: jest.Mock = jest.fn((rows: Array<TableRow>) => {
            results = rows;
        });

        const filterValues: Array<string> = smallData.map((data: DataItem<any>) => data.status);

        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    filterProps={{
                        filterItems: [
                            {
                                accessor: "status",
                                filters: filterValues.slice(0, 1),
                            },
                        ],
                        onAfterFilter: onAfterFilterCallBack,
                    }}
                />,
                container
            );
        });

        // after filter, the length of the result should decrease
        expect(results.length).not.toEqual(smallData.length);
        expect(onAfterFilterCallBack).toBeCalled();
    });

    it("Should render and support searching ", async () => {
        let results: Array<TableRow> = smallData;
        const customButtonCallBack: jest.Mock = jest.fn((searchResults: Array<TableRow>) => {
            results = searchResults;
        });

        // before search
        await act(async () => {
            render(<Table columns={columns} data={smallData} />, container);
        });

        expect(results.length).toEqual(smallData.length);
        expect(customButtonCallBack).not.toHaveBeenCalled();

        // nothing should change if searchInColumns is empty or search text is empty
        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: [],
                        triggerSearchOn: "Submit",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack,
                        searchTriggered: true,
                    }}
                />,
                container
            );
        });

        expect(results.length).toEqual(smallData.length);

        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["firstName"],
                        triggerSearchOn: "Submit",
                        searchText: null,
                        onSearch: customButtonCallBack,
                        searchTriggered: true,
                    }}
                />,
                container
            );
        });

        expect(results.length).toEqual(smallData.length);

        // after valid search
        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["firstName", "lastName"],
                        triggerSearchOn: "Change",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack,
                    }}
                />,
                container
            );
        });

        expect(results.length).toBeGreaterThanOrEqual(1);
        // after valid search with number field
        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["age"],
                        triggerSearchOn: "Change",
                        searchText: smallData[1].age,
                        onSearch: customButtonCallBack,
                    }}
                />,
                container
            );
        });
        expect(customButtonCallBack).toHaveBeenCalledTimes(3);

        // nothing should be returned when search field is not found or undefined
        await act(async () => {
            render(
                <Table
                    columns={columns}
                    data={smallData}
                    searchProps={{
                        searchInColumns: ["undefined"],
                        triggerSearchOn: "Submit",
                        searchText: smallData[1].firstName,
                        onSearch: customButtonCallBack,
                        searchTriggered: true,
                    }}
                />,
                container
            );
        });
        expect(results.length).toEqual(0);
    });
});
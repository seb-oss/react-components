import * as React from "react";

import "./table-style.scss";

import {
    useTable,
    HeaderGroup,
    ColumnInstance,
    Row,
    Cell,
    Column,
    useSortBy,
    UseSortByColumnProps,
    usePagination,
    useRowSelect,
    TableInstance,
    UsePaginationInstanceProps,
    UseRowSelectState,
    UseRowSelectInstanceProps,
    UseRowSelectRowProps
} from "react-table";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;

interface TableProps {
    columns: Array<Column>;
    data: any;
    // item selection
    setSelectAllValue?: boolean;
    // sorting
    sortable?: boolean;

    // pagination
    usePagination?: boolean;
    pageSize?: number;
    pageIndex?: number;

    canGotoPreviousPage?: boolean;
    canGotoNextPage?: boolean;
    pagination?: React.ReactNode;

    gotoPage?: (pageNumber: number) => void;
    onSelectAllItemsChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleSelectedRow?: (e: React.ChangeEvent<HTMLInputElement>, row: object) => void;
}

interface TableInstanceProps extends
    TableInstance,
    UsePaginationInstanceProps<any>,
    UseRowSelectInstanceProps<any>,
    UseRowSelectState<any> {

}

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    // Use the state and functions returned from useTable to build your UI
    const { data, columns } = props;
    // const columns = props.columns.map((column: Column) => ({...column, width: 10, canSort: false}));

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,

        selectedRows,
        toggleRowSelectedAll
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination,
        useRowSelect
    ) as TableInstanceProps;

    const list: Array<Row<any>> = props.usePagination ? page : rows;

    return (
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((group: HeaderGroup, index: number) => (
                    <tr key={index} {...group.getHeaderGroupProps()}>
                        {props.onSelectAllItemsChecked &&
                            <th className="check-all-option-holder">
                                {console.log(" mortal ", selectedRows)}
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="chkCheckAll"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            toggleRowSelectedAll(e.target.checked);
                                            props.onSelectAllItemsChecked(e);
                                        }}
                                        name="chkCheckAll"
                                        checked={props.setSelectAllValue}
                                    />
                                    <label className="custom-control-label" htmlFor="chkCheckAll" />
                                </div>
                            </th>
                        }
                        {group.headers.map((column: ColumnInstance & UseSortByColumnProps<ColumnInstance>) => (
                            props.sortable ?
                                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <div className="icon-holder">
                                        <div className={"angle-up" + (column.isSorted && !column.isSortedDesc ? " active" : "")}>
                                            {angleUp}
                                        </div>
                                        <div className={"angle-down" + (column.isSorted && column.isSortedDesc ? " active" : "")}>
                                            {angleDown}
                                        </div>
                                    </div>
                                </th>
                                : <th key={column.id} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {list.map(
                    (row: Row & UseRowSelectRowProps<Row>, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                <td className="check-option-holder">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"row-" + row.index}
                                            name={"row-" + row.index}
                                            checked={row.isSelected}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                row.toggleRowSelected(e.target.checked);
                                                props.onToggleSelectedRow(e, row.original);
                                            }}
                                        />
                                        <label className="custom-control-label" htmlFor={"row-" + row.index} />
                                    </div>
                                </td>
                                {row.cells.map((cell: Cell, index: number) => {
                                    return <td key={index} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    }
                )}
            </tbody>
            <tfoot>
                {props.pagination &&
                    <tr>
                        <td colSpan={list.length}>
                            {props.pagination}
                        </td>
                    </tr>
                }
            </tfoot>
        </table>
    );
});

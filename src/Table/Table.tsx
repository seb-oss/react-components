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

export interface TableRow {
    id: number | string;
    [name: string]: string | number | Date;
}

interface TableProps {
    tableColumns: Array<Column>;
    tableData: Array<TableRow>;
    // item selection
    setSelectAllValue?: boolean;
    // sorting
    sortable?: boolean;

    // pagination
    usePagination?: boolean;
    pagingSize?: number;
    pagingIndex?: number;

    footer?: React.ReactNode;

    onSelectAllItemsChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectSingleItem?: (row: Array<TableRow>) => void;
}

interface TableInstanceProps extends
    TableInstance,
    UsePaginationInstanceProps<any>,
    UseRowSelectInstanceProps<any>,
    UseRowSelectState<any> {
    selectedFlatRows: Array<Row>;
}

interface TableUIProps extends TableProps, TableInstanceProps {
    onToggleRowItem: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow) => void;
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const list: Array<Row<any>> = props.usePagination ? props.page : props.rows;

    return (
        <table {...props.getTableProps()} className="table">
            <thead>
                {props.headerGroups.map((group: HeaderGroup, index: number) => (
                    <tr key={index} {...group.getHeaderGroupProps()}>
                        {props.onSelectAllItemsChecked &&
                            <th className="check-all-option-holder">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="chkCheckAll"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            props.toggleRowSelectedAll(e.target.checked);
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
            <tbody {...props.getTableBodyProps()}>
                {list.map(
                    (row: Row & UseRowSelectRowProps<Row>, rowIndex: number) => {
                        props.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                <td className="check-option-holder">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"row-" + row.index}
                                            name={"row-" + row.index}
                                            checked={row.isSelected}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                console.log("longer allowed ", e.target.checked);
                                                row.toggleRowSelected(e.target.checked);
                                                props.onToggleRowItem(e, row.original as any);
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
                {props.footer &&
                    <tr>
                        <td colSpan={list.length}>
                            {props.footer}
                        </td>
                    </tr>
                }
            </tfoot>
        </table>

    );

});

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    // Use the state and functions returned from useTable to build your UI
    const { tableData, tableColumns } = props;
    const [selectedRows, setSelectedRows] = React.useState<Array<any>>([]);

    const tableInstance = useTable(
        {
            columns: tableColumns,
            data: tableData,
            initialState: { pageIndex: props.pagingIndex },
        },
        useSortBy,
        usePagination,
        useRowSelect
    ) as TableInstanceProps;

    const onToggleRowItem = (e: React.ChangeEvent<HTMLInputElement>, row: TableRow): void => {
        let updatedSelectedItems: Array<TableRow> = [];
        const indexOfItemTobeRemoved: number = selectedRows.findIndex((item: TableRow) => {
            return item.id === row.id;
        });

        if (e.target.checked) {
            updatedSelectedItems = [...selectedRows, row];
        } else if (indexOfItemTobeRemoved > -1) {
            updatedSelectedItems = [
                ...selectedRows.slice(0, indexOfItemTobeRemoved),
                ...selectedRows.slice(indexOfItemTobeRemoved + 1)
            ];
        }

        setSelectedRows(updatedSelectedItems);
    };

    // Effects --------------------------------------------------------------------------
    React.useEffect(() => {
        const nextPageIndex: number = props.pagingIndex === 0 ? 0 : (props.pagingIndex - 1);
        tableInstance.gotoPage(nextPageIndex);
    }, [props.pagingIndex, props.pagingSize]);

    return (
        <TableUI
            onToggleRowItem={onToggleRowItem}
            {...tableInstance}
            {...props}
        />
    );
});

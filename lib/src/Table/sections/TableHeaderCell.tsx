import React from "react";
import { SortDirection, TableCommonTypes } from "../table-typings";
import { TableContext } from "../TableContextProvider";

export type TableHeaderCellProps<T = any> = JSX.IntrinsicElements["th"] &
    TableCommonTypes & {
        accessor?: keyof T;
        isRowSelectIndicator?: boolean;
    };

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ accessor, isRowSelectIndicator, onSort, ...props }: TableHeaderCellProps) => {
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(SortDirection.ASC);
    const context = React.useContext(TableContext);

    const onHeaderSort = () => {
        // const array = context.sortedColumn;
        // array.push(accessor);
        // context.onSort({ ...context, sortedColumn: array });
    };

    return (
        <th {...props}>
            {React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                return isRowSelectIndicator
                    ? React.cloneElement<any>(Child, {
                          name: "test",
                          id: "test",
                          onClick: context.onRowSelect,
                      })
                    : Child;
            })}
        </th>
    );
};

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;

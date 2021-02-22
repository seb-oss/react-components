import React from "react";
import classnames from "classnames";
import { SortDirection } from "../table-typings";
import { SortedColumn, TableContext } from "../TableContextProvider";

export type TableHeaderCellProps<T = any> = JSX.IntrinsicElements["th"] & {
    accessor?: keyof T;
    disableSort?: boolean;
    sortDirection?: SortDirection;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ accessor, disableSort, className, sortDirection, onClick, ...props }: TableHeaderCellProps) => {
    const context = React.useContext(TableContext);
    const [sortedColumn, setSortedColumn] = React.useState<SortedColumn>(null);
    const [sortOrder, setSortOrder] = React.useState<SortDirection>(SortDirection.ASC);
    const [sortable, setSortable] = React.useState<boolean>(false);

    /**
     * get latest sort direction
     * @param oldSortDirection current sort direction
     */
    const getSortDirection = (oldSortDirection: SortDirection): SortDirection => {
        return oldSortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    };

    /** on column sort */
    const onSort = React.useCallback(() => {
        const newSortedColumn: SortedColumn =
            sortedColumn && sortedColumn.accessor === accessor ? { ...sortedColumn, sortDirection: getSortDirection(sortedColumn.sortDirection) } : { accessor, sortDirection: SortDirection.DESC };
        context.setTableState({ ...context.tableState, sortedColumn: newSortedColumn });
        !!newSortedColumn && context.onSort(newSortedColumn);
    }, [sortedColumn, context]);

    React.useEffect(() => {
        setSortable(!disableSort && !!context.onSort);
    }, [disableSort, context.onSort]);

    React.useEffect(() => {
        setSortedColumn(context.tableState.sortedColumn);
    }, [context.tableState.sortedColumn]);

    React.useEffect(() => {
        if (sortDirection && context.onSort) {
            context.setTableState({ ...context.tableState, sortedColumn: { accessor, sortDirection } });
        }
    }, [sortDirection, context.onSort]);

    React.useEffect(() => {
        setSortOrder(sortable && sortedColumn?.accessor === accessor ? sortedColumn?.sortDirection : null);
    }, [sortable, sortedColumn]);

    return (
        <th
            className={classnames(className, { sort: sortable, "sort-asc": sortable && sortOrder === SortDirection.ASC, "sort-desc": sortable && sortOrder === SortDirection.DESC })}
            onClick={sortable ? onSort : onClick}
            {...props}
        >
            {/* {React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                return sortable ? (
                    <div className="sort-holder" onClick={() => onSort()}>
                        <div className="header-content">{Child}</div>
                        <div className={classnames("icon-holder", { asc: sortOrder === SortDirection.ASC, desc: sortDirection === SortDirection.DESC })}>{defaultSort}</div>
                    </div>
                ) : (
                    Child
                );
            })} */}
        </th>
    );
};

TableHeaderCell.displayName = "TableHeaderCell";

export { TableHeaderCell };

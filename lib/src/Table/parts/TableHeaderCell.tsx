import React from "react";
import classnames from "classnames";
import { SortDirection } from "../table-typings";
import { SortedColumn, TableContext } from "../TableContextProvider";

export type TableHeaderCellProps<T = any> = JSX.IntrinsicElements["th"] & {
    accessor?: keyof T;
    disableSort?: boolean;
};

const defaultSort: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 644">
        <path
            transform="translate(0 240)"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
        />
        <path
            transform="translate(0 -100)"
            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
        />
    </svg>
);

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ accessor, disableSort, className, ...props }: TableHeaderCellProps) => {
    const context = React.useContext(TableContext);
    const [sortedColumn, setSortedColumn] = React.useState<SortedColumn>(context.tableState.sortedColumn);
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(SortDirection.ASC);
    const [sortable, setSortable] = React.useState<boolean>(!disableSort || context.onSort);

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
            sortedColumn && sortedColumn.accessor === accessor
                ? { ...sortedColumn, sortDirection: getSortDirection(sortedColumn.sortDirection) }
                : { accessor: accessor as string, sortDirection: SortDirection.DESC };
        context.setTableState({ ...context.tableState, sortedColumn: newSortedColumn });
        !!newSortedColumn && context.onSort(newSortedColumn);
    }, [sortedColumn, context]);

    React.useEffect(() => {
        setSortable(!disableSort && !!context.onSort);
    }, [disableSort, context.onSort]);

    React.useEffect(() => {
        setSortedColumn(context.tableState.sortedColumn);
    }, [context.tableState]);

    React.useEffect(() => {
        setSortDirection(sortable && sortedColumn?.accessor === accessor ? sortedColumn?.sortDirection : null);
    }, [sortable, sortedColumn]);

    return (
        <th className={classnames(className, { sortable: sortable })} {...props}>
            {React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                return sortable ? (
                    <div className="sort-holder" onClick={() => onSort()}>
                        <div className="header-content">{Child}</div>
                        <div className={classnames("icon-holder", { asc: sortDirection === SortDirection.ASC, desc: sortDirection === SortDirection.DESC })}>{defaultSort}</div>
                    </div>
                ) : (
                    Child
                );
            })}
        </th>
    );
};

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;

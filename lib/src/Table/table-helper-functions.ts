import { TableRowProps } from "./sections/TableRow";

export const onSubRowCheck = <T>(tableRows: Array<TableRowProps<T>>, checked: boolean) => {
    return tableRows.map((item) => ({
        ...item,
        checked,
        indeterminate: false,
        subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
    }));
};

export const onParentCheck = <T>(tableRows: Array<TableRowProps<T>>, row: TableRowProps<T>): any => {
    let result = null;
    tableRows.some((tableRow) => {
        if (tableRow._index === row._index) {
            result = row;
            return true;
        } else if (tableRow.subRows) {
            let temp = onParentCheck(tableRow.subRows, row);
            let isAllChecked: boolean = true;
            let isIndeterminate: boolean = false;
            tableRow.subRows.map((item) => {
                const newItem = item._index === row._index ? row : item;
                isAllChecked = isAllChecked && newItem.checked;
                isIndeterminate = isIndeterminate || newItem.checked;
                return {
                    ...newItem,
                };
            });
            tableRow.checked = isAllChecked;
            tableRow.indeterminate = isIndeterminate && !isAllChecked;
            result = temp ? tableRow : result;
            return !!temp;
        }
    });
    return result;
};

export const onRowSelect = <T>(event: React.ChangeEvent<HTMLInputElement>, row: TableRowProps<T>, parentCheck?: boolean) => {
    const target: HTMLInputElement = event.target;
    row.checked = target.checked;
    row.indeterminate = target.indeterminate && !row.checked;
    if (row.subRows) {
        row.subRows = onSubRowCheck(row.subRows, row.checked);
    }
    if (parentCheck) {
        row = onParentCheck(rows, row);
    }
    setRows(
        rows.map((item) => {
            if (item._index === row._index) {
                return row;
            }
            return item;
        })
    );
};

export const onSelectAll = <T = any>(event: React.ChangeEvent<HTMLInputElement>, rows: Array<T>) => {
    const target: HTMLInputElement = event.target;
    const checked: boolean = target.checked;
    return rows.map((item: TableRowProps<T>) => ({
        ...item,
        checked,
        indeterminate: false,
        subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
    }));
};

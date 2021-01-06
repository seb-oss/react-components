import { FilterColumn, GenericTableRow, SortDirection } from "../table-typings";

/**
 * sum the total of columns or cols in a row
 * @param colsLength the length of the columns
 * @param useSelection add a column for selection checkboxes
 * @param useShowActionColumn add another column for action columns
 * @param useGroupBy add another columns for groupby
 */
export function sumCols(colsLength: number, useSelection?: boolean, useShowActionColumn?: boolean, useGroupBy?: boolean): number {
    let sum = colsLength;

    if (useSelection) {
        sum = sum + 1;
    }

    if (useGroupBy) {
        sum = sum + 1;
    }
    if (useShowActionColumn) {
        sum = sum + 1;
    }

    return sum;
}

/**
 * sort array of tabke rows
 * @param items table rows array
 * @param columnName the target column name
 * @param sortDirection the sort direction
 * @return Array of tableRow
 */
export function sortArray<T = any>(items: Array<T> = [], columnName: string, sortDirection: SortDirection): Array<T> {
    const languages: Readonly<Array<string>> = window.navigator?.languages || ["sw", "en"];

    const sortedItems: Array<any> = [...items].sort((firstItem: T, secondItem: T) => {
        let result: number = 0;
        if (sortDirection === SortDirection.ASC) {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(firstItem[columnName]).localeCompare(String(secondItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = firstItem[columnName] - secondItem[columnName];
            }
        } else {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(secondItem[columnName]).localeCompare(String(firstItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = secondItem[columnName] - firstItem[columnName];
            }
        }
        return result;
    });
    return sortedItems;
}

/**
 *
 * @param data table data
 * @param filterColumns filter columns
 */
export function filterArray<T = any>(data: Array<T>, filterColumns: Array<FilterColumn<T>>): Array<T> {
    return data.filter((row: T) => {
        return (
            filterColumns.length === 0 ||
            filterColumns.every((column: FilterColumn) => {
                return Array.isArray(column.value) ? column.value.length === 0 || column.value.indexOf(row[column.accessor]) > -1 : row[column.accessor] === column.value;
            })
        );
    });
}

/**
 * search text in array of table row
 * @param data the array of table rows
 * @param keyword The keyword to search in the array
 * @param searchFields the target field to search
 */
export function searchTextInArray<T = any>(data: Array<T>, keyword: string, searchFields: Array<keyof T>): Array<T> {
    return [...data].filter((row: T) => {
        const searchText: string = String(keyword);

        return searchFields.some((searchColumn: keyof T) => {
            let result: boolean = false;
            const searchField: string = searchColumn as string;
            const regEx: RegExp = new RegExp(searchText, "gi");
            if (row[searchField] === null || row[searchField] === undefined) {
                result = false;
            } else if (typeof row[searchField] === "string") {
                result = row[searchField].search(regEx) > -1;
            } else if (typeof row[searchField] === "number") {
                result = String(row[searchField]).search(regEx) !== -1;
            }
            return result;
        });
    });
}

/**
 * paginate data
 * @param data table data
 * @param offset page size
 * @param currentPage current page index
 */
export function paginate<T = any>(data: Array<T>, offset: number, currentPage: number) {
    if (offset && data?.length > 0) {
        const start: number = currentPage * offset;
        const end: number = offset + start;

        const currentPageData: Array<T> = data?.slice(start, end);
        return currentPageData;
    }
    return data;
}

// export const onSubRowCheck = <T = any>(tableRows: Array<GenericTableRow<T>>, checked: boolean, config?: SubRowSelectionConfig) => {
//     return tableRows.map((item) => ({
//         ...item,
//         checked,
//         indeterminate: false,
//         subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
//     }));
// };

// export const onParentCheck = <T>(tableRows: Array<TableRowProps<T>>, row: TableRowProps<T>): any => {
//     let result = null;
//     tableRows.some((tableRow) => {
//         if (tableRow._index === row._index) {
//             result = row;
//             return true;
//         } else if (tableRow.subRows) {
//             let temp = onParentCheck(tableRow.subRows, row);
//             let isAllChecked: boolean = true;
//             let isIndeterminate: boolean = false;
//             tableRow.subRows.map((item) => {
//                 const newItem = item._index === row._index ? row : item;
//                 isAllChecked = isAllChecked && newItem.checked;
//                 isIndeterminate = isIndeterminate || newItem.checked;
//                 return {
//                     ...newItem,
//                 };
//             });
//             tableRow.checked = isAllChecked;
//             tableRow.indeterminate = isIndeterminate && !isAllChecked;
//             result = temp ? tableRow : result;
//             return !!temp;
//         }
//     });
//     return result;
// };

// export interface SubRowSelectionConfig<T = any, K = any> {
//     accessor: keyof T;
//     uniqueKey: keyof K;
//     subRowConfig?: SubRowSelectionConfig;
// }
// export interface RowSelectConfig<T = any, K = any> {
//     parentC?: string;
//     uniqueKey?: keyof T;
//     subRowConfig?: SubRowSelectionConfig<T, K>;
// }

// export function onRowSelect<T = any, K = any>(event: React.ChangeEvent<HTMLInputElement>, data: Array<GenericTableRow<T>>, rowId: string, config?: RowSelectConfig<T, K>) {
//     const target: HTMLInputElement = event.target;
//     const rowUniqueKey: keyof GenericTableRow<T> = config?.uniqueKey || "id";
//     // row.checked = target.checked;
//     // row.indeterminate = target.indeterminate && !row.checked;
//     // if (row.subRows) {
//     //     row.subRows = onSubRowCheck(row.subRows, row.checked);
//     // }
//     // if (parentCheck) {
//     //     row = onParentCheck(rows, row);
//     // }
//     // setRows(
//     //     rows.map((item) => {
//     //         if (item._index === row._index) {
//     //             return row;
//     //         }
//     //         return item;
//     //     })
//     // );
//     return data?.map((row: GenericTableRow<T>) => {
//         if (row[rowUniqueKey] && row[rowUniqueKey] === rowId) {
//             const newRow: GenericTableRow<T> = { ...row };
//             newRow.checked = target.checked;
//             newRow.indeterminate = target.indeterminate && !newRow.checked;
//             const subRowConfig: SubRowSelectionConfig<T, K> = config?.subRowConfig;
//             if (subRowConfig && newRow[subRowConfig.accessor]) {
//                 newRow[subRowConfig.accessor] = onSubRowCheck(newRow[subRowConfig.accessor as string], newRow.checked);
//                 row = newRow;
//             }
//             if (config?.parentId) {
//                 row = onParentCheck(rows, row);
//             }
//         }
//         return row;
//     })
// };

// export const onSelectAll = <T = any>(event: React.ChangeEvent<HTMLInputElement>, rows: Array<T>) => {
//     const target: HTMLInputElement = event.target;
//     const checked: boolean = target.checked;
//     return rows.map((item: TableRowProps<T>) => ({
//         ...item,
//         checked,
//         indeterminate: false,
//         subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
//     }));
// };

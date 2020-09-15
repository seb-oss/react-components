import { TableRow, sortDirectionTypes, TableHeader, Cell } from "../Table";

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
export function sortArray(items: Array<TableRow> = [], columnName: string, sortDirection: sortDirectionTypes): Array<TableRow> {
    const languages: Readonly<Array<string>> = window.navigator?.languages || ["sw", "en"];

    const sortedItems: Array<any> = [...items].sort((firstItem: TableRow, secondItem: TableRow) => {
        let result: number = 0;
        if (sortDirection === sortDirectionTypes.Ascending) {
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
 * @param items the table rows array
 * @param columns the rable columns array
 */
export function filterArray(items: Array<TableRow>, columns: Array<TableHeader>): Array<TableRow> {
    return [...items].filter((row: TableRow) => {
        return columns.some((column: TableHeader) => {
            return column.filters?.some((filterValue: string) => {
                const currentColumn: Cell = row?.cells.find((cell: Cell) => cell?.accessor === column?.accessor);
                return currentColumn.value === filterValue;
            });
        });
    });
}

/**
 * search text in array of table row
 * @param items the array of table rows
 * @param keyword The keyword to search in the array
 * @param searchFields the target field to search
 */
export function searchTextInArray(items: Array<TableRow>, keyword: string, searchFields: Array<string>): Array<TableRow> {
    return [...items].filter((row: TableRow) => {
        const searchText: string = String(keyword);

        return searchFields.some((searchColumn: string) => {
            let result: boolean = false;
            const searchField: string = searchColumn;
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

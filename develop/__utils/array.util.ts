import { sortDirectionTypes } from "./enum.util";

/**
 * sort array of tabke rows
 * @param items table rows array
 * @param columnName the target column name
 * @param sortDirection the sort direction
 */
export function sortArray(items: Array<Object> = [], columnName: string, sortDirection: sortDirectionTypes): Array<Object> {
    const languages: Readonly<Array<string>> = window.navigator?.languages || ["sw", "en"];

    const sortedItems: Array<any> = [...items].sort((firstItem: Object, secondItem: Object) => {
        let result: number = 0;
        if (sortDirection === sortDirectionTypes.Ascending) {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(firstItem[columnName]).localeCompare(String(secondItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = (firstItem[columnName] - secondItem[columnName]);
            }
        } else {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(secondItem[columnName]).localeCompare(String(firstItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = (secondItem[columnName] - firstItem[columnName]);
            }
        }
        return result;

    });
    return sortedItems;
}
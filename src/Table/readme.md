---
title: Table
componentid: component-table
variantid: default
guid: 'table-guid-default-component-react'
---

## Element name
```javascript
Name: Table Component
Module: "Table"
Selector: "<Table/>"
Import: "@sebgroup/react-components/dist/Table"
Type: UI Component
```

## Element Information 
This React component supports customization and configurations. The component name is `Table` and the selector is `<Table/>`.

## Basic use
```html
 <Table
    columns={columns}
    data={data}
/>
```

## Properties
These are the current available properties:

| Property             | Type                              | Description                                                                                   |
|----------------------|-----------------------------------|-----------------------------------------------------------------------------------------------|
| className?           | `string`                          | Custom class                                                                                  |
| columns              | `Array<Column>`                   | Array of the table columns                                                                    |
| data                 | `Array<object>`                   | Array of the objects that make of the rows                                                    |
| searchProps?         | `SearcProps`                      | The search properties, use this if you wanht to enable searching. See below                   |
| offset?              | `number`                          | number of rows in a page, this is used in pagination                                          |
| currentpage?         | `number`                          | The current page, also use in pagination                                                      |
| usePagination?       | `boolean`                         | This property along with the above two constitutes the pagination                             |
| primaryActionButton? | `PrimaryActionButton`             | The primary button under action column                                                        |
| actionLinks?         | `Array<ActionLinkItem>`           | The array list of the clickable links to be made available under action                       |
| sortProps?           | `SortProps`                       | The sorting props, see the props below                                                        |
| onRowSelection?      | `(rows: Array<TableRow>) => void` | Call when user select a row by checking a textBox. This props enable the row selection option |
| onRowExpanded?       | `(rows: Array<TableRow>) => void` | The event for row collapse. Adding this prop enable subrows and inline row detail             |
| footer?              | `React.ReactNode`                 | Incase you want to display something in the table footer, you can render your element here    |

### SearchProps properties
| Property         | Type                               | Description                                                                          |
|------------------|------------------------------------|--------------------------------------------------------------------------------------|
| searchInColumns  | `Array<string>`                    | Array for the columns to consider during searching                                   |
| triggerSearchOn  | `Change \| Submit`                 | During search, you can either trigger search on Submit or onChange                   |
| onSearch?        | ` (rows: Array<TableRow>) => void` | The onSearch event. This along with the three props on top consitutes search feature |
| searchText?      | `string`                           | The text to search                                                                   |
| searchTriggered? | `boolean`                          | if you are searching on button clicked, you toggle click with this prop              |

### SortProps properties

| Property        | Type                                                                                              | Description                                                                |
|-----------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| onAfterSorting? | `(rows: Array<TableRow>, sortByColumn: TableHeader) => void`                                      | The onsort event, triggered when you click sort. This props enable sorting |
| onSort?         | `(rows: Array<TableRow>, accessor: string, sortDirection: sortDirectionTypes) => Array<TableRow>` | A custom sorting function that can be alternatively passed by user         |
| useServerSorting | `boolean` | when this is enable, the front end sorting is disable, sorting will take place on the backend and the data should be updated |

### FilterProps properties

| Property        | Type  | Description |
|-----------------|-------|----------------------------------------------------------------------------|
| filterItems | `Array<FilterItem>` | Array of the filter items, onsists of multiple columns|
| onAfterFilter | `(rows: Array<TableRow>) => void;` |A callback that returns filtered table rows |
| onRemoveFilter | `(item: { accessor: string; value: string }) => void` | A callBack that returns the filter item to be deleted |

### FilterItem properties
| Property        | Type  | Description |
|-----------------|-------|----------------------------------------------------------------------------|
| accessor | `string` | The name of the column or accessor |
| filters | `Array<string>` | The array of the filter values |


## Footnote
1. `Column`, `TableRow`, `PrimaryActionButton`, `ActionLinkItem`, `TableHeader`, `SortProps`, `Data`, `FilterItem`, `FilterProps` and `SearchProps` interfaces/types are all importable from the component;



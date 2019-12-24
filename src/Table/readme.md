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
    offset={pageSize}
    currentpage={paginationValue}
    usePagination={true}
    searchInColumns={dropDownList1Selected ? dropDownList1Selected.map((item: DropdownItem) => item.value) : []}
    searchText={textBoxValue2}
    triggerSearchOn="Change"
    primaryActionButton={primaryButton}
    actionLinks={actionLinks}
    searchTriggered={searchTriggered}
    onSearch={(searchResults: Array<TableRow>) => { console.log("the search is now ", searchResults); }}
    onSort={(rows: Array<TableRow>, sortByColumn: TableHeader) => { console.log("The sorted rows are ", rows); }}
    onRowSelection={(rows: Array<TableRow>) => { console.log("The selected rows are ", rows); }}
    onRowExpanded={(rows: Array<TableRow>) => { console.log("the expanded ros are ", rows); }}
    footer={
        <Pagination
            value={paginationValue}
            onChange={setPagination}
            size={3}
            offset={3}
            useFirstAndLast={true}
        />
    }
/>
```

## Properties
These are the current available properties:

| Property             | Type                                                         | Description                                                                                   |
|----------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| className?           | `string`                                                     | Custom class                                                                                  |
| columns              | `Array<Column>`                                              | Array of the table columns                                                                    |
| data                 | `Array<object>`                                              | Array of the objects that make of the rows                                                    |
| offset?              | `number`                                                     | number of rows in a page, this is used in pagination                                          |
| currentpage?         | `number`                                                     | The current page, also use in pagination                                                      |
| usePagination?       | `boolean`                                                    | This property along with the above two constitutes the pagination                             |
| searchInColumns      | `Array<string>`                                              | Array for the columns to consider during searching                                            |
| searchText?          | `string`                                                     | The text to search                                                                            |
| triggerSearchOn      | `Change | Submit`                                            | During search, you can either trigger search on Submit or onChange                            |
| onSearch?            | ` (rows: Array<TableRow>) => void`                           | The onSearch event. This along with the three props on top consitutes search feature          |
| searchTriggered?     | `boolean`                                                    | if you are searching on button clicked, you toggle click with this prop                       |
| primaryActionButton? | `PrimaryActionButton`                                        | The primary button under action column                                                        |
| actionLinks?         | `Array<ActionLinkItem>`                                      | The array list of the clickable links to be made available under action                       |
| onSort?              | `(rows: Array<TableRow>, sortByColumn: TableHeader) => void` | the onsort event, triggered when you click sort. This props enable sorting                    |
| onRowSelection?      | `(rows: Array<TableRow>) => void`                            | Call when user select a row by checking a textBox. This props enable the row selection option |
| onRowExpanded?       | `(rows: Array<TableRow>) => void`                            | The event for row collapse. Adding this prop enable subrows and inline row detail             |
| footer?              | `React.ReactNode`                                            | Incase you want to display something in the table footer, you can render your element here    |

## Footnote
1. `Column`, `TableRow`, `PrimaryActionButton`, `ActionLinkItem`, `TableHeader` and `Data` interfaces/types are all importable from the component;



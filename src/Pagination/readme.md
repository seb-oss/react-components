---
title: Pagination
componentid: component-pagination
variantid: default
guid: 'pagination-guid-default-component-react'
---

## Element name
```javascript
Name: Pagination Component
Component: "Pagination"
Selector: "<Pagination/>"
Import: "@sebgroup/react-components/dist/Pagination"
Type: UI Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Pagination` and the selector is `<Pagination/>`.

## Basic use
```html
<Pagination
    value={this.state.paginationValue}
    onChange={(value: number) => { this.setState({ paginationValue: value }) }}
    size={20}
    offset={5}
/>
```

## Properties
These are the current available properties:

| Property         | Type                      | Description                                              |
| ---------------- | ------------------------- | -------------------------------------------------------- |
| className?       | `string`                  | Custom class can be passed here                          |
| firstText?       | `string`                  | First text value (default: `'First'`)                    |
| lastText?        | `string`                  | Last text value (default: `'Last'`)                      |
| nextText?        | `string`                  | Next text value (default: `'Next'`)                      |
| offset?          | `number`                  | Maximum number of buttons to show (default: `10`)        |
| onChange?        | `(value: number) => void` | Change event passes the number of page to be displayed   |
| previousText?    | `string`                  | Previous text value (default: `'Previous'`)              |
| size             | `number`                  | maximum number of pages                                  |
| useDotNav?       | `boolean`                 | Use dot-navigation<sup>1</sup>                           |
| useFirstAndLast? | `boolean`                 | Use first and last navigation buttons (default: `false`) |
| useTextNav?      | `boolean`                 | Use text-base navigation buttons (default: `false`)      |
| value            | `number`                  | Current page                                             |
| pagingLength     | `number`                  | The length of the pagination or number of pages          |


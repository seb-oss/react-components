---
title: Dropdown
componentid: component-dropdown
variantid: default
guid: 'dropdown-guid-default-component-react'
---

## Element name
```javascript
Name: Dropdown Component
Component: "DropDown"
Selector: "<DropDown/>"
Import: "@sebgroup/react-components/dist/DropDown"
Type: Form Component
```

## Element information 
This React component supports customization and configurations. The component name is `DropDown` and the selector is `<DropDown/>`.

## Basic use
```html
<DropDown
    list={this.state.list}
    selectedValue={this.state.selectedValue}
    onChange={(value: any) => { this.setState({ selectedValue: value }) }}
/>
```

## Properties
These are the current available properties:

| Property       | Type                                                     | Description                                                              |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| selectedValue  | `Array<DropdownItem> \| DropDownItem` <sup>1</sup>       | an array of the currently selected dropdown item(s)                     |
| list           | `Array<DropdownItem>` <sup>1</sup>                       | an array of all the dropdown items to display                           |
| onChange       | `(value: any) => void`                                   | a callback passing the updated selectedValue list (multi) or item. In `native` mode the calback is the native onChange event |
| className?     | `string`                                                 | custom class                                                            |
| label?         | `string`                                                 | optional label to display above the dropdown                            |
| placeholder?   | `string`                                                 | optional text to display inside the toggle button when no item selected |
| error?         | `string`                                                 | optional error string to be displayed under the dropdown                |
| native?        | `boolean`                                                | a mobile friendly version using native `<select>` html element          |
| searchable?    | `boolean`                                                | enables searching                                                       |
| searchPlaceholder?| `string`                                              | optional text to display inside the empty search bar                    |
| multi?         | `boolean`                                                | enables selecting multiple choices                                      |
| clearable?     | `boolean`                                                | enables clearning the value, ignored if `multi` is enabled              |
| disabled?      | `boolean`                                                | disabled status                                                         |
| more?          | `boolean`                                                | version of the component with a more menu button alligned to the right  |

## Footnote
1. `list` items has an exported interface named `DropdownItem`
```javascript
{
      label = string,
      value = any
}
```

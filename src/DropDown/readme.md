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

| Property           | Type                                               | Description                                                                                                                  |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| className?         | `string`                                           | Custom class                                                                                                                 |
| clearable?         | `boolean`                                          | Enables clearning the value, ignored if `multi` is enabled                                                                   |
| disabled?          | `boolean`                                          | Disabled status                                                                                                              |
| error?             | `string`                                           | Optional error string to be displayed under the dropdown                                                                     |
| id?                | `string`                                           | Element id                                                                                                                   |
| label?             | `string`                                           | Optional label to display above the dropdown                                                                                 |
| list               | `Array<DropdownItem>` <sup>1</sup>                 | An array of all the dropdown items to display                                                                                |
| more?              | `boolean`                                          | Version of the component with a more menu button alligned to the right                                                       |
| multi?             | `boolean`                                          | Enables selecting multiple choices                                                                                           |
| name?              | `string`                                           | Element name                                                                                                                 |
| native?            | `boolean`                                          | A mobile friendly version using native `<select>` html element                                                               |
| onChange           | `(value: any) => void`                             | A callback passing the updated selectedValue list (multi) or item. In `native` mode the calback is the native onChange event |
| placeholder?       | `string`                                           | Optional text to display inside the toggle button when no item selected                                                      |
| searchable?        | `boolean`                                          | Enables searching                                                                                                            |
| searchPlaceholder? | `string`                                           | Optional text to display inside the empty search bar                                                                         |
| selectedValue      | `Array<DropdownItem> \| DropDownItem` <sup>1</sup> | An array of the currently selected dropdown item(s)                                                                          |

## Footnote
1. `list` items has an exported interface named `DropdownItem`
```javascript
{
      label = string,
      value = any
}
```

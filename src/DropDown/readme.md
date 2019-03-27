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
This React component is based on `react-select`. Supports customization and configurations. The component name is `DropDown` and the selector is `<DropDown/>`.

## Basic use
```html
<DropDown
    selectedValue={this.state.dropDownSelected}
    list={this.state.dropDownList}
    onChange={(selectedItem: DropDownItem) => { this.setState({ dropDownSelected: selectedItem }) }}
    placeholder="dropdown placeholder"
/>
```

## Properties
These are the current available properties:

| Property       | Type                               | Descrition                                                     |
| -------------- | ---------------------------------- | -------------------------------------------------------------- |
| list           | `Array<DropdownItem>` <sup>1</sup> | an array of DropdownItem                                       |
| selectedValue  | `DropdownItem`                     | selected object from list                                      |
| onChange       | `(event: any) => void`             | on change event                                                |
| className?     | `string`                           | custom class                                                   |
| native?        | `boolean`                          | it renders the native dropdown, default false                  |
| searchable?    | `boolean`                          | works only with non-native ver                                 |
| multi?         | `boolean`                          | enables searching, works only with non-native                  |
| clearable?     | `boolean`                          | enables clearning the value, work only with non-native         |
| error?         | `string`                           | error message (if any)                                         |
| disabled?      | `boolean`                          | disabled status                                                |

## Reference
This component is a wrapper around [react-select](https://github.com/JedWatson/react-select)

## Footnote
1. `list` items has an exported interface named `DropdownItem`
```javascript
{
      label = string,
      value = any
}
```

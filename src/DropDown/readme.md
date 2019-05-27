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
    list={this.state.list}
    onChange={(list: Array<DropdownItem>, name: string) => { this.setState({ list }) }}
    placeholder="dropdown placeholder"
/>
```

## Properties
These are the current available properties:

| Property       | Type                                                     | Descrition                                                              |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| list           | `Array<DropdownItem>` <sup>1</sup>                       | an array of DropdownItem                                                |
| onChange       | `(list: Array<DropdownItem>, name: string) => void`      | on change event passing the updated list and the name of the list       |
| className?     | `string`                                                 | custom class                                                            |
| searchable?    | `boolean`                                                | enables searching                                                       |
| multi?         | `boolean`                                                | enables selecting multiple choices                                      |
| clearable?     | `boolean`                                                | enables clearning the value, ignored if `multi` is enabled              |
| disabled?      | `boolean`                                                | disabled status                                                         |
| more?          | `boolean`                                                | version of the component with a more menu button alligned to the right  |

## Reference
This component is a wrapper around [react-select](https://github.com/JedWatson/react-select)

## Footnote
1. `list` items has an exported interface named `DropdownItem`
```javascript
{
      label = string,
      value = any,
      selected = boolean
}
```

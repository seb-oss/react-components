---
title: Dropdown
componentid: component-dropdown
variantid: default
guid: "dropdown-guid-default-component-react"
---

## Element name

```javascript
Name: Dropdown Component
Component: "Dropdown"
Selector: "<Dropdown/>"
Import: "@sebgroup/react-components/dist/Dropdown"
Type: Form Component
```

## Element information

This React component supports customization and configurations. The component name is `Dropdown` and the selector is `<Dropdown/>`.

## Basic use

```html
<Dropdown
    list={this.state.list}
    selectedValue={this.state.selectedValue}
    onChange={(value: DropdownItem) => {
        this.setState({ selectedValue: value })
    }
/>
```

## Properties

These are the current available properties:

| Property           | Type                                               | Description                                                             |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------------- |
| className?         | `string`                                           | Custom class                                                            |
| clearable?         | `boolean`                                          | Enables clearning the value, ignored if `multi` is enabled              |
| disabled?          | `boolean`                                          | Disabled status                                                         |
| error?             | `string`                                           | Optional error string to be displayed under the dropdown                |
| id?                | `string`                                           | Element id                                                              |
| label?             | `string`                                           | Optional label to display above the dropdown                            |
| list               | `Array<DropdownItem>` <sup>1</sup>                 | An array of all the dropdown items to display                           |
| more?              | `boolean`                                          | Version of the component with a more menu button alligned to the right  |
| multi?             | `boolean`                                          | Enables selecting multiple choices                                      |
| name?              | `string`                                           | Element name                                                            |
| native?            | `boolean`                                          | A mobile friendly version using native `<select>` html element          |
| onChange           | `(value: DropdownChangeEvent) => void`<sup>2</sup> | On change event callback                                                |
| placeholder?       | `string`                                           | Optional text to display inside the toggle button when no item selected |
| searchable?        | `boolean`                                          | Enables searching                                                       |
| searchPlaceholder? | `string`                                           | Optional text to display inside the empty search bar                    |
| selectAllText?    | `string`                                           | Optional text to display as select all label if `multi` is enabled      |
| selectedValue      | `Array<DropdownItem> \| DropdownItem`              | An array of the currently selected dropdown item(s)                     |

## Important
When `multi` and `native` props are used together the change event will return a change event as normal, however, setting the value will required processing of the change event. This is a sample implementation of it:
```html
<Dropdown
    list={this.state.list}
    selectedValue={this.state.selectedValue}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e && e.currentTarget.selectedOptions) {
            const values: Array<DropdownItem> = [];
            let option: HTMLOptionElement;
            for (let i = 0; i < e.currentTarget.selectedOptions.length; i++) {
                option = e.currentTarget.selectedOptions[i];
                values.push({ label: option.label, value: option.value });
            }
            this.setState({ selectedValue: values });
        }
    }}
/>
```
We recommend moving this process to a method for reusability

## Footnote

1. `list` items has an exported interface named `DropdownItem`

```typescript
interface DropdownItem<T = any> {
    value: T;
    label: string;
}
```
2. Dropdown change event returns either of the following depending on the type:
    - Normal: `DropdownItem`
    - Multi: `Array<DropdownItem>`
    - Native: `React.ChangeEvent<HTMLSelectElement>`



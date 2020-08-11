---
title: Radio Group
componentid: component-radiogroup
variantid: default
guid: "radiogroup-guid-default-component-react"
---

## Element name

```javascript
Name: Radio Group Component
Component: "RadioGroup"
Selector: "<RadioGroup/>"
Import: "@sebgroup/react-components/dist/RadioGroup"
Type: Form Component
```

## Element Information

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `RadioGroup` and the selector is `<RadioGroup/>`.

## Basic use

```html
<RadioGroup
    name="radioGroupName"
    list={this.state.radioList}
    value={this.state.radioListSelected}
    onChange={(event) => this.setState({ radioValue: event.target.value })}
/>
```

## Properties

These are the current available properties:

| Property    | Type                                                   | Description                     |
| ----------- | ------------------------------------------------------ | ------------------------------- |
| className?  | `string`                                               | Custom class can be passed here |
| condensed?  | `boolean`                                              | Disable all radio items         |
| disableAll? | `boolean`                                              | Display condensed radio group   |
| id?         | `string`                                               | Element id                      |
| inline?     | `boolean`                                              | Display radio items inline      |
| label?      | `string`                                               | The label for the whole group   |
| list        | `Array<RadioListModel>`<sup>1</sup>                    | The list of radio items         |
| name?       | `boolean`                                              | Element name                    |
| onChange    | `(event: React.ChangeEvent<HTMLInputElement>) => void` | On change event                 |
| value       | `T`                                                    | String or number                |

## Footnote

1. `list` array has an exported interface named `RadioGroupItem`:

```typescript
interface RadioGroupItem<T = any> {
      description?: string;
      disabled?: boolean;
      label: string;
      value: T;
}
```

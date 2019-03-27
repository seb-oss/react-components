---
title: Radio Group
componentid: component-radiogroup
variantid: default
guid: 'radiogroup-guid-default-component-react'
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
    onChange={(value) => { this.setState({ radioListSelected: value }) }}
/>   
```

## Properties
These are the current available properties:

| Property    | Type                                | Descrition                      |
| ----------- | ----------------------------------- | ------------------------------- |
| value       | `any`                               | string or number                |
| list        | `Array<RadioListModel>`<sup>1</sup> | The list of radio items         |
| onChange    | `(event: any) => void`              | on change event                 |
| name?       | `boolean`                           | element name                    |
| label?      | `string`                            | The label for the whole group   |
| error?      | `string`                            | Error message (if any)          |
| className?  | `string`                            | Custom class can be passed here |
| disableAll? | `boolean`                           | Disable all radio items         |
| inline?     | `boolean`                           | Display radio items inline      |

## Footnote
1. `list` array has an exported interface named `RadioGroupItem`:
```typescript
{
      group: string;
      value: any;
      label: string;
      description?: string;
      disabled?: boolean;
}
```
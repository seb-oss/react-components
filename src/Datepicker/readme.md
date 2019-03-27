---
title: Datepicker
componentid: component-datepicker
variantid: default
guid: 'datepicker-guid-default-component-react'
---

## Element name
```javascript
Name: Datepicker Component
Component: "Datepicker"
Selector: "<Datepicker/>"
Import: "@sebgroup/react-components/dist/Datepicker"
Type: Form Component
```

## Element information 
This React component is based on `react-date-picker`. Supports customization and configurations. The component name is `Datepicker` and the selector is `<Datepicker/>`.

## Basic use
```html
<Datepicker
    name="datepicker"
    value={this.state.datepicker}
    onChange={(date) => this.setState({ datepicker: date })}
    minDate={new Date('1970-10-10')}
    maxDate={new Date()}
/>
```

## Properties
These are the current available properties:

| Property     | Type                   | Descrition                                                         |
| ------------ | ---------------------- | ------------------------------------------------------------------ |
| value        | js `Date` obj          | date obj                                                           |
| name         | `string`               | name value                                                         |
| onChange     | `(event: any) => void` | on change event                                                    |
| className?   | `string`               | custom class                                                       |
| label?       | `string`               | label text                                                         |
| placeHolder? | `string`               | placeholder value                                                  |
| readOnly?    | `boolean`              | default set to false                                               |
| disabled?    | `boolean`              | default set to false                                               |
| minDate      | `Date`                 | min date range                                                     |
| maxDate?     | `Date`                 | max date range                                                     |
| locale?      | `string`               | can be any IETF language tag. defaults to user's browser settings. |

## Reference
This component is a wrapper around [react-date-picker](https://www.npmjs.com/package/react-date-picker)

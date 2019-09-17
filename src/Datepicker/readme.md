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

| Property          | Type                    | Description                                                                                   |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| value             | `Date`                  | Value                                                                                         |
| name              | `string`                | Input element name                                                                            |
| onChange          | `(value: Date) => void` | On change event                                                                               |
| className?        | `string`                | Custom class                                                                                  |
| id?               | `string`                | Element id                                                                                    |
| label?            | `string`                | Label text                                                                                    |
| error?            | `string`                | Error message                                                                                 |
| placeHolder?      | `string`                | Placeholder value                                                                             |
| disabled?         | `boolean`               | Default set to false                                                                          |
| minDate?          | `Date`                  | Min date range                                                                                |
| maxDate?          | `Date`                  | Max date range                                                                                |
| locale?           | `string`                | Can be any IETF language tag. defaults to user's browser settings.                            |
| format?           | `string`                | Date format (e.g. `YYYY-DD-MM`)                                                               |
| showLeadingZeros? | `boolean`               | Show leading zeroes for values less that 10 (e.g. show `01` instead of `1`) (default: `true`) |
| clearable?        | `boolean`               | Shows a clear button (default: `false`)                                                       |
| clearIcon?        | `JSX.ELement`           | Custom clear icon                                                                             |
| calendarIcon?     | `JSX.ELement`           | Custom calednar icon                                                                          |

## Reference
This component is a wrapper around [react-date-picker](https://www.npmjs.com/package/react-date-picker)

---
title: Timepicker
componentid: component-timepicker
variantid: default
guid: "timepicker-guid-default-component-react"
---

## Element name

```javascript
Name: Timepicker Component
Component: "Timepicker"
Selector: "<Timepicker/>"
Import: "@sebgroup/react-components/dist/Timepicker"
Type: Form Component
```

## Element information

This React component supports customization and configurations. The component name is `Timepicker` and the selector is `<Timepicker/>`.

## Basic use

```html
<Timepicker name="myTimepicker" value={timerpickerValueObj} onChange={(newValue: TimepickerValue) => { this.setState({
timerpickerValue: { ...newValue } }); }} />
```

## Properties

These are the current available properties:

| Property   | Type                               | Description                 |
| ---------- | ---------------------------------- | --------------------------- |
| className? | `string`                           | custom class                |
| name       | `string`                           | element name                |
| onChange   | `(value: TimepickerValue) => void` | Timepicker change event     |
| value      | `TimepickerValue`<sup>1</sup>      | the value of the timepicker |

## Footnote

1. `value` has an exported interface named `TimepickerValue`:

```typescript
interface TimepickerValue {
    hours: number;
    minutes: number;
    dayperiod: TimepickerDayperiodTypes;
}
```

```typescript
enum TimepickerDayperiodTypes {
    AM = "AM",
    PM = "PM",
}
```

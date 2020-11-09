---
title: Stepper
componentid: component-stepper
variantid: default
guid: "stepper-guid-default-component-react"
---

## Element name

```javascript
Name: Stepper Component
Module: "Stepper"
Selector: "<Stepper/>"
Import: "@sebgroup/react-components/dist/Stepper"
Type: Form Component
```

## Element Information

This React component supports customization and configurations. The component name is `Stepper` and the selector is `<Stepper/>`.

## Basic use

```html
<Stepper value={this.state.stepperValue} min={0} max={10} onIncrease={() => { this.setState({ stepperValue:
this.state.stepperValue + 1 } }} onDecrease={() => { this.setState({ stepperValue: this.state.stepperValue - 1 } }} />
```

## Properties

These are the current available properties:

| Property   | Type                                                | Description                     |
| ---------- | --------------------------------------------------- | ------------------------------- |
| className? | `string`                                            | Custom class can be passed here |
| disabled?  | `boolean`                                           | Disable                         |
| error?     | `string`                                            | Error message                   |
| id?        | `string`                                            | Id property                     |
| label?     | `string`                                            | Element label                   |
| max        | `number`                                            | Max value                       |
| min        | `number`                                            | Min value                       |
| name?      | `string`                                            | Name property                   |
| onDecrease | `(event: React.MouseEvent<HTMLDivElement>) => void` | On decrease event               |
| onIncrease | `(event: React.MouseEvent<HTMLDivElement>) => void` | On increase event               |
| reference? | `React.RefObject<any>`                              | React Ref obj                   |
| value      | `number`                                            | The current value               |
| warning?   | `string`                                            | Warning message                 |

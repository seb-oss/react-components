---
title: Stepper
componentid: component-stepper
variantid: default
guid: 'stepper-guid-default-component-react'
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
This Angular component supports customization and configurations. The component name is `Stepper` and the selector is `<Stepper/>`.

## Basic use
```html
<Stepper
    value={this.state.stepperValue}
    min={0}
    max={10}
    onIncrease={() => { this.setState({ stepperValue: this.state.stepperValue + 1 }  }}
    onDecrease={() => { this.setState({ stepperValue: this.state.stepperValue - 1 }  }}
/> 
```

## Properties
These are the current available properties:

| Property   | Type                   | Description                     |
| ---------- | ---------------------- | ------------------------------- |
| value      | `number`               | The current value               |
| onIncrease | `() => void`           | On increase event               |
| onDecrease | `() => void`           | On decrease event               |
| min        | `number`               | Min value                       |
| max        | `number`               | Max value                       |
| id?        | `string`               | Id property                     |
| name?      | `string`               | Name property                   |
| label?     | `string`               | Element label                   |
| className? | `string`               | Custom class can be passed here |
| disabled?  | `boolean`              | Disable                         |
| error?     | `string`               | Error message                   |
| warning?   | `string`               | Warning message                 |
| reference? | `React.RefObject<any>` | React Ref obj                   |

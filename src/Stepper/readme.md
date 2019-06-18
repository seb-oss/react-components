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

| Property   | Type                     | Description                      |
| ---------- | ------------             | ------------------------------- |
| value      | `number`                 | The current value               |
| min        | `number`                 | min value                       |
| max        | `number`                 | max value                       |
| onIncrease | `() => void`             | on increase event               |
| onDecrease | `() => void`             | on decrease event               |
| className? | `string`                 | Custom class can be passed here |
| name?      | `string`                 | element name                    |
| label?     | `string`                 | element label                   |
| disabled?  | `boolean`                | disable                         |
| error?     | `string`                 | error message                   |
| warning?   | `string`                 | warning message                 |
| reference?       | `React.RefObject<any>`   | React Ref obj                   |

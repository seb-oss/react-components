---
title: Toggle
componentid: component-toggleswitch
variantid: default
guid: "toggleswitch-guid-default-component-react"
---

## Element name

```javascript
Name: Toggle Component
Component: "Toggle"
Selector: "<Toggle/>"
Import: "@sebgroup/react-components/dist/Toggle"
Type: Form Component
```

## Element information

This React component supports customization and configurations. The component name is `Toggle` and the selector is `<Toggle/>`.

## Basic use

```html
<Toggle name="myToggle" value={this.state.toggleValue} onChange={(event) => { this.setState({ toggleValue:
event.target.checked }); }} />
```

## Properties

These are the current available properties:

| Property   | Type                   | Description             |
| ---------- | ---------------------- | ----------------------- |
| className? | `string`               | Custom class            |
| disabled?  | `boolean`              | Element disabled state  |
| id?        | `string`               | Id property             |
| label?     | `string`               | Element label           |
| name       | `string`               | Element name            |
| onChange   | `(event: any) => void` | Checkbox event          |
| reference? | `React.RefObject<any>` | React Ref obj           |
| value      | `boolean`              | The value of the toggle |

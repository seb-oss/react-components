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
| className? | `string`               | custom class            |
| id?        | `string`               | id property             |
| label?     | `string`               | Element label           |
| name       | `string`               | element name            |
| onChange   | `(event: any) => void` | checkbox event          |
| reference? | `React.RefObject<any>` | React Ref obj           |
| value      | `boolean`              | the value of the toggle |

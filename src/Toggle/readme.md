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

This component extends all native attributes of `HTMLInputElement`, while offering the following customizations:

## Basic use

```html
<Toggle
    checked={this.state.toggleValue}
    onChange={(e) => setToggleValue(e.target.checked)}
/>
```

## Properties

These are the current available properties:

| Property     | Type             | Description                  |
| ------------ | ---------------- | ---------------------------- |
| inline?      | `boolean`        | Displays the checkbox inline |
| label?       | `string`         | Element label                |
| wrapperProps | `HTMLDivElement` | Div wrapper props            |


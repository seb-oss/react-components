---
title: ButtonGroup
componentid: component-button-group
variantid: default
guid: "button-group-guid-default-component-react"
---

## Element name

```javascript
Name: ButtonGroup Component
Component: "ButtonGroup"
Selector: "<ButtonGroup/>"
Import: "@sebgroup/react-components/dist/ButtonGroup"
Type: UI Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `ButtonGroup` and the selector is `<ButtonGroup/>`.

## Basic use

```html
<ButtonGroup size="sm">
    <Button theme="outline-primary">First</Button>
    <Button theme="outline-primary">Second</Button>
    <Button theme="outline-primary">Third</Button>
</ButtonGroup>
```

## Properties

This component extends all native attributes of `HTMLDivElement`, while offering the following customizations:

| Property | Type                 | Description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| size?    | `string`<sup>1</sup> | Based on Bootstrap predefined sizes. (default: `md`) |
| vertial? | `boolean`            | Renders the buttons vertically                       |

## Footnote
1. Supported size: `sm` | `md` | `lg`
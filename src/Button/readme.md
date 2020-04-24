---
title: Button
componentid: component-button
variantid: default
guid: "button-guid-default-component-react"
---

## Element name

```javascript
Name: Button Component
Component: "Button"
Selector: "<Button/>"
Import: "@sebgroup/react-components/dist/Button"
Type: UI Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Button` and the selector is `<Button/>`.

## Basic use

```html
<Button label="Test Label" onClick={() => { alert('Button Clicked') }} />
```

## Properties

This component extends all native attributes of `HTMLButtonElement`, while offering the following customizations:

| Property | Type                 | Description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| size?    | `string`<sup>1</sup> | Based on Bootstrap predefined sizes. (default: `md`) |
| theme?   | `string`<sup>2</sup> | Based on SEB predefined colors. (default: `primary`) |
| block?   | `boolean`            | Extends the width of the button to its container     |

## Footnote

1. Supported size: `sm` | `md` | `lg`
2. Supported themes: `primary` | `secondary` | `danger` | `outline-primary` | `outline-danger` | `dark` | `light` | `link`

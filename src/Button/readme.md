---
title: Button
componentid: component-button
variantid: default
guid: 'button-guid-default-component-react'
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
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Button` and the selector is `<Button/>`. This component support custom svg icon, which can be fully style via css classes. We use SVG code directly as we can change its color or size at any moment, like when you are hover over. Rememer to change the color of SVG, you should target svg and use `fill` property instead of `color`.

## Basic use
```html
<Button
    label="Test Label"
    onClick={() => { alert('Button Clicked') }}
/>
```

## Properties
These are the current available properties:

| Property   | Type                   | Descrition                                                       |
| ---------- | ---------------------- | ---------------------------------------------------------------- |
| label      | `string`               | button name                                                      |
| onClick    | `() => void`           | click action                                                     |
| className? | `string`               | custom class                                                     |
| disabled?  | `boolean`              | disabled status                                                  |
| theme?     | `string`               | Based on SEB predefined colors: (default: `primary`)<sup>1</sup> |
| icon?   | `any`    | you can pass SVG component or svg code directly|
| iconPosition?     | `string`               | to style the childern on `left` or `right`, default is `left` |


## Footnote
1. Supported themes: `primary`, `secondary`, `anchor`

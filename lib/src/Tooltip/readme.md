---
title: Tooltip
componentid: component-tooltip
variantid: default
guid: "tooltip-guid-default-component-react"
---

## Element name

```javascript
Name: Tooltip Component
Component: "Tooltip"
Selector: "<Tooltip/>"
Import: "@sebgroup/react-components/dist/Tooltip"
Type: UI Component
```

## Element information

This React component supports customization and configurations. The component name is `Tooltip` and the selector is `<Tooltip/>`. this component can recieve custom svg as its icon.

## Basic use

```html
<Tooltip
    content="Tooltip message could be long, therefore, controlling the position and width is important"
    position="right"
/>
```

## Properties

These are the current available properties:

| Property        | Type                                                 | Description                                                                                    |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| children?      | `React.ReactNode`                                             | Custom tooltip reference if children is defined                                                                                 |
| className?      | `string`                                             | Custom class                                                                                  |
| content?        | `string \| React.ReactNode`                          | Tooltip content                                                                                  |
| id?             | `string`                                             | Element id                                                                                    |
| onVisibleChange | `(event: React.MouseEvent<HTMLDivElement> \| React.FocusEvent<HTMLElement>, visible: boolean) => void` |  callback on tooltip visibility status change                                                                                  |
| position?       | `string`                                             | Css style positions: top/bottom/left/right                                                    |
| theme?          | `string`                                             | Based on SEB predefined colors. (default: `'default'`)<sup>2</sup>                            |


2. Supported themes: `default`, `light`, `primary`, `warning`, `success`, `danger`, `purple`
3. Mouse event is used to determine if the clicked happened outside the tooltip to dismiss it. If you wanted to force it to dismiss regardless, you should not pass the event.

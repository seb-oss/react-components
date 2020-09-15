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
| customSvg?      | `any`                                                | **```[Deprecated]```** A direct svg code or a component with svg                                                     |
| disableAutoPosition?      | `boolean`                                  | Force tooltip to be at certain position                                                    |
| id?             | `string`                                             | Element id                                                                                    |
| message?        | `string`                                             | **```[Deprecated]```** Description **(will be replaced by `'content'`)**                                                                                  |
| messageGroup?   | `Array<TooltipMessageGroupItem>`<sup>1</sup>         | **```[Deprecated]```** Multiple titles/descriptions **(will be replaced by `'content'`)**                                                                  |
| onClick         | `(event?: React.MouseEvent<HTMLDivElement>) => void` | **```[Deprecated]```** click action **(will be replaced by `'onVisibleChange'`)**                                                                                  |
| onVisibleChange | `(event: React.MouseEvent<HTMLDivElement> \| React.FocusEvent<HTMLElement>, visible: boolean) => void` |  callback on tooltip visibility status change                                                                                  |
| position?       | `string`                                             | Css style positions: top/bottom/left/right                                                    |
| theme?          | `string`                                             | Based on SEB predefined colors. (default: `'default'`)<sup>2</sup>                            |
| title?          | `string`                                             | **```[Deprecated]```** Title **(will be replaced by `'content'`)**                                                                                        |
| trigger?          | `click \| hover \| focus`                          | Tooltip trigger mode (default: `'click'`)                                                                                        |
| triggerOnHover? | `boolean`                                            | **```[Deprecated]```** Enables the ability to show the tooltip on hover, click will be disabled (default: `'false'`) **(will be replaced by `'trigger'`)** |
| width?          | `number`                                             | **```[Deprecated]```** Width of the text holder                                                                      |

## Public Methods

 **```[Deprecated]```** These are the public methods accessible via [React ref](https://reactjs.org/docs/refs-and-the-dom.html)

| Name         | Parameters | type                     | Description                        |
| ------------ | ---------- | ------------------------ | ---------------------------------- |
| forceDismiss | event?     | `MouseEvent`<sup>3</sup> | Forces the tooltip to dismiss once |
| forceShow    |            |                          | Forces the tooltip to show once    |


## Footnote

1. `messageGroup` items has an exported interface named `TooltipMessageGroupItem`

```typescript
interface TooltipMessageGroupItem {
      title?: string,
      message: string
}
```

2. Supported themes: `default`, `light`, `primary`, `warning`, `success`, `danger`, `purple`
3. Mouse event is used to determine if the clicked happened outside the tooltip to dismiss it. If you wanted to force it to dismiss regardless, you should not pass the event.

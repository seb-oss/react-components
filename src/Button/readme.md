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

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Button` and the selector is `<Button/>`. This component support custom svg icon, which can be fully style via css classes. We use SVG code directly as we can change its color or size at any moment, like when you are hover over. Rememer to change the color of SVG, you should target svg and use `fill` property instead of `color`.

## Basic use

```html
<Button label="Test Label" onClick={() => { alert('Button Clicked') }} />
```

## Properties

These are the current available properties:

| Property      | Type                                               | Description                                          |
| ------------- | -------------------------------------------------- | ---------------------------------------------------- |
| className?    | `string`                                           | Element class                                        |
| disabled?     | `boolean`                                          | Disabled status                                      |
| icon?         | `ReactNode`                                        | Icon to be rendered inside the button                |
| iconPosition? | `string`<sup>1</sup>                               | Icon position. (default is `left`)                   |
| id?           | `string`                                           | Id property                                          |
| label         | `string`                                           | Button label                                         |
| name?         | `string`                                           | Name property                                        |
| onClick       | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Click action                                         |
| size?         | `string`<sup>2</sup>                               | Based on Bootstrap predefined sizes. (default: `md`) |
| theme?        | `string`<sup>3</sup>                               | Based on SEB predefined colors. (default: `primary`) |
| title?        | `string`                                           | Element title                                        |
| type?         | `string`<sup>4</sup>                               | Button type. (default: `button`)                     |

## Footnote

1. Supported icon positions: `left` | `right`
2. Supported size: `sm` | `md` | `lg`
3. Supported themes: `primary` | `outline-primary` | `secondary` | `danger` | `alternative` | `ghost-dark` | `ghost-light` | `link` /n(We only support these. Any other theme will default back to primary)
4. Supported button types: `button` | `submit` | `reset`

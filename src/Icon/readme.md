---
title: Icon
componentid: component-faicon
variantid: default
guid: 'icon-guid-default-component-react'
---

## Element name
```javascript
Name: Icon Component
Component: "Icon"
Selector: "<Icon/>"
Import: "@sebgroup/react-components/dist/Icon"
Type: Other Component
```

## Element information 
This is a SVG code base component. The component name is `Icon` and the selector is `<Icon/>`. This component support custom svg icon, which can be fully style via css classes. We use SVG code directly as we can change its color or size at any moment, like when you are hover over. Rememer to change the color of SVG, you should target svg and use `fill` property instead of `color`.

## Basic use
```html
<Icon src={<svg..... />} />
```

## Properties
These are the current available properties:

| Property   | Type         | Descrition                                                    |
| ---------- | ------------ | ------------------------------------------------------------- |
| src        | `any`        | A component which returns a `svg` or a svg directly.          |
| className? | `number`     | Custom class can be passed here                               |
| onClick?   | `() => void` | Click action                                                  |
| title?     | `string`     | HTML element title shown on hover and wait                    |
| size?      | `number`     | Icon size to be applied to both dimentions (width and height) |

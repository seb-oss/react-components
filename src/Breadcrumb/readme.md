---
title: Breadcrumb
componentid: component-breadcrumb
variantid: default
guid: "breadcrumb-guid-default-component-react"
---

## Element name

```javascript
Name: Breadcrumb Component
Component: "Breadcrumb"
Selector: "<Breadcrumb/>"
Import: "@sebgroup/react-components/dist/Breadcrumb"
Type: UI Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Breadcrumb` and the selector is `<Breadcrumb/>`.

## Basic use

```html
<Breadcrumb list="{breadcrumbListObj}" onClick="{clickHandler}" />
```

## Properties

These are the current available properties:

| Property   | Type                  | Description                                     |
| ---------- | --------------------- | ----------------------------------------------- |
| list       | `Array<string>`       | List of string representing stages of depth     |
| onClick    | `(i: number) => void` | Callback triggered when a breadcrumb is clicked |
| className? | `string`              | Element class                                   |
| id?        | `string`              | Element id                                      |

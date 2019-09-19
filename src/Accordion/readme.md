---
title: Accordion
componentid: component-accordion
variantid: default
guid: "accordion-guid-default-component-react"
---

## Element name

```javascript
Name: Accordion Component
Component: "Accordion"
Selector: "<Accordion/>"
Import: "@sebgroup/react-components/dist/Accordion"
Type: Form Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. Use this component mainly for text content. The module name of this component is `Accordion` and the selector is `<Accordion/>`.

## Basic use

```html
<Accordion list="accordionListObj" />
```

## Properties

These are the current available properties:

| Property   | Type                                   | Description             |
| ---------- | -------------------------------------- | ----------------------- |
| className? | `string`                               | Element class           |
| id?        | `string`                               | Element id              |
| list       | `Array<AccrodionListItem>`<sup>1</sup> | List of accordion items |

## Footnote

1. `list` has an exported interface named `AccordionListItem`:

```typescript
interface AccordionListItem {
    category: string;
    subHeaderText?: string;
    text?: AccordionText | Array<AccordionText>;
}
```

`AccordionListItem`'s memeber `text` has an exported interface name `AccordionText` and accepts a single `AccordionText` object or an array of `AccordionText` objects

```typescript
interface AccordionText {
    title?: string;
    desc?: string;
}
```

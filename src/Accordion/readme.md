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

| Property            | Type                                   | Description                                                                            |
| ------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| className?          | `string`                               | Element class                                                                          |
| customIcon?         | `JSX.Element`                          | Custom icon for the accordion trigger                                                  |
| customIconExpanded? | `JSX.Element`                          | Custom icon to be used when expanded. This will add a transition between the two icons |
| iconPosition?       | `string`                               | Accordion icon placement<sup>1</sup>                           |
| iconTransition?     | `string`                               | Icon transition rotation degree<sup>2</sup>                                             |
| id?                 | `string`                               | Element id                                                                             |
| list                | `Array<AccrodionListItem>`<sup>3</sup> | List of accordion items                                                                |

## Footnote

1. Icon positions supported are: `right` and `left`
2. Icon transitions supported are: `"deg-180"`, `"deg-180-counter"`, `"deg-90"`, `"deg-90-counter"`
3. Property `list` has an exported interface named `AccordionListItem`:

```typescript
interface AccordionListItem {
    header: string;
    subHeaderText?: string;
    content?: AccordionContent | Array<AccordionContent> | React.ReactNode;
}
```

`AccordionListItem`'s memeber `content` has an exported interface name `AccordionContent` and accepts a single `AccordionContent` object or an array of `AccordionContent` objects

```typescript
interface AccordionContent {
    title?: string;
    desc?: string;
}
```

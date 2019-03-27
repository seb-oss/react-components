---
title: Timeline
componentid: component-timeline
variantid: default
guid: 'timeline-guid-default-component-react'
---

## Element name
```javascript
Name: Timeline Component
Component: "Timeline"
Selector: "<Timeline/>"
Import: "@sebgroup/react-components/dist/Timeline"
Type: UI Component
```

## Element information 
This React component supports customization and configurations. The component name is `Timeline` and the selector is `<Timeline/>`.

## Basic use
```html
<Timeline
      list={timelineListObj}
/>
```

## Properties
These are the current available properties:

| Property    | Type                                  | Descrition                                                  |
| ----------  | ------------------------------------- | ----------------------------------------------------------- |
| list        | `Array<TimelineListItem>`<sup>1</sup> | Timeline list                                               |
| direction?  | `string`                              | Timeline direction. Accepts `'vertical'` and `'horizontal'` (default: `'vertical'`) |
| onClick?    | `(index: number)=>void`               | Click event returns the index of array item clicked         |
| className?  | `string`                              | custom class                                                |

## Footnote
1. List propery has an exported interface named `TimelineListItem`
```javascript
{
      title: string;
      time: string;
      desc?: string;
}
```
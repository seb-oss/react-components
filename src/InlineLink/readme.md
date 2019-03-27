---
title: Inline Link
componentid: component-inlinelinks
variantid: default
guid: 'inlinelinks-guid-default-component-react'
---

## Element name
```javascript
Name: Inline Link Component
Component: "InlineLink"
Selector: "<InlineLink/>"
Import: "@sebgroup/react-components/dist/InlineLink"
Type: Other Component
```

## Element information 
This React component replaces anchor tags. The component name is `InlineLink` and the selector is `<InlineLink/>`. Use it as a normal anchor tag except that you don't pass `href`, instead, you should pass an `onClick` handler to do any desired action.

## Basic use
```html
<InlineLink onClick={clickHandler}>Some text</InlineLink>
```

## Properties
These are the current available properties:

| Property   | Type       | Descrition    |
| ---------- | ---------- | ------------- |
| onClick?   | `()=>void` | Click handler |
| className? | `string`   | Custom class  |

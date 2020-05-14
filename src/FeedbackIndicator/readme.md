---
title: FeedbackIndicator
componentid: component-button
variantid: default
guid: "feedback-indicator-guid-default-component-react"
---

## Element name

```javascript
Name: Button Component
Component: "FeedbackIndicator"
Selector: "<FeedbackIndicator/>"
Import: "@sebgroup/react-components/dist/FeedbackIndicator"
Type: UI Component
```

## Element information

This component is used to wrap other elements with an indicator and a message. The component name is `FeedbackIndicator` and the selector is `<FeedbackIndicator/>`.

## Basic use

```html
<FeedbackIndicator type="danger" text="error message">
    <Checkbox label="conditions" />
    <Checkbox label="terms" />
</FeedbackIndicator>
```

## Properties

This component extends all native attributes of `HTMLDivElement`, while offering the following customizations:

| Property | Type                 | Description                                                |
| -------- | -------------------- | ---------------------------------------------------------- |
| type?    | `string`<sup>1</sup> | The type of the indicator.                                 |
| message? | `React.ReactNode`    | The indicator message. `children` can also be used instead |

## Footnote

1. Supported types: `danger` | `warning` | `success`

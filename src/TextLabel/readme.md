---
title: Text Label
componentid: component-textlabel
variantid: default
guid: 'textlabel-guid-default-component-react'
---

## Element name
```javascript
Name: Text Label Component
Component: "TextLabel"
Selector: "<TextLabel/>"
Import: "@sebgroup/react-components/dist/TextLabel"
Type: Form Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `TextLabel` and the selector is `<TextLabel/>`.

## Basic use
```html
<TextLabel
    name="textname"
    value="Some text value"
    label="Some text label"
/>
```

## Properties
These are the current available properties:

| Property   | Type     | Description                      |
| ---------- | -------- | ------------------------------- |
| value      | `string` | The current value               |
| name?      | `string` | element name                    |
| label?     | `string` | Element label                   |
| className? | `string` | Custom class can be passed here |

---
title: Dialogue
componentid: component-dialogue
variantid: default
guid: 'dialogue-guid-default-component-react'
---

## Element name
```javascript
Name: Dialogue Component
Component: "Dialogue"
Selector: "<Dialogue/>"
Import: "@sebgroup/react-components/dist/Dialogue"
Type: Other Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Dialogue` and the selector is `<Dialogue/>`.

## Basic use
```html
<Dialogue
    header="Are you sure?"
    desc="Lorem ipsum dolor sit amet, ius quis veniam ad, mea id nemore probatus sensibus. Sed  lorem everti menandri cu, habeo."
    toggle={this.state.dialogue}
    secondaryAction={() => { this.setState({ dialogue: false }) }}
    primaryAction={() => { this.setState({ dialogue: false }) }}
/>
```

## Properties
These are the current available properties:

| Property         | Type         | Description                                         |
| ---------------- | ------------ | -------------------------------------------------- |
| toggle           | `boolean`    | show or hide the popup                             |
| header?          | `string`     | header text                                        |
| desc?            | `string`     | description text                                   |
| primaryBtn?      | `string`     | primary btn text                                   |
| secondaryBtn?    | `string`     | secondary btn text                                 |
| primaryAction?   | `() => void` | click event fired when primary button is clicked   |
| secondaryAction? | `() => void` | click event fired when secondary button is clicked |
| className?       | `string`     | custom class                                       |

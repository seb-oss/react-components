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

| Property               | Type                                                | Description                                             |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| className?             | `string`                                            | Custom class                                            |
| desc?                  | `string | JSX.Element | React.ReactNode`            | Description text                                        |
| enableBackdropDismiss? | `boolean`                                           | Enables backdrop dismiss. Requires `onDismiss`          |
| enableCloseButton?     | `boolean`                                           | Enables close button. Requires `onDismiss`              |
| header?                | `string | JSX.Element | React.ReactNode`            | Header text                                             |
| id?                    | `string`                                            | Element id                                              |
| onDismiss?             | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | Click event fired when backdrop or close button clicked |
| primaryAction?         | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | Click event fired when primary button is clicked        |
| primaryBtn?            | `string | JSX.Element`                              | Primary btn text                                        |
| primaryBtnDisabled?    | `boolean`                                           | Disable primary button                                  |
| secondaryAction?       | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | Click event fired when secondary button is clicked      |
| secondaryBtn?          | `string | JSX.Element`                              | Secondary btn text                                      |
| secondaryBtnDisabled?  | `boolean`                                           | Disable secondary button                                |
| toggle                 | `boolean`                                           | Show or hide the popup                                  |

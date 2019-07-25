---
title: Radio Button
componentid: component-radiobutton
variantid: default
guid: 'radiobutton-guid-default-component-react'
---

## Element name
```javascript
Name: Radio Button Component
Component: "RadioButton"
Selector: "<RadioButton/>"
Import: "@sebgroup/react-components/dist/RadioButton"
Type: Form Component
```

## Element Information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `RadioButton` and the selector is `<RadioButton/>`.

## Basic use
```html
<RadioButton
    group="radioGroupName"
    radioValue="first"
    label="Single radio - first value"
    value={this.state.radioListSelected}
    onChange={(value) => { this.setState({ radioListSelected: value }) }}
/>  
```

## Properties
These are the current available properties:

| Property     | Type                   | Descrition                                            |
| ------------ | ---------------------- | ----------------------------------------------------- |
| value        | `any`                  | your state value, string or number                    |
| radioValue   | `any`                  | the value of the radiobtn, it can be string or number |
| onChange     | `(event: any) => void` | on change event                                       |
| name         | `string`               | the name property                                     |
| label        | `string`               | the label                                             |
| id?          | `string`               | the id property                                       |
| group?       | `string`               | the name of the group to group the radios together    |
| description? | `string`               | optional extra description                            |
| error?       | `string`               | error message (if any)                                |
| className?   | `string`               | Custom class can be passed here                       |
| disabled?    | `boolean`              | Disable the radio button                              |
| inline?      | `boolean`              | Display radio items inline                            |
| reference?   | `React.RefObject<any>` | React Ref obj                                         |

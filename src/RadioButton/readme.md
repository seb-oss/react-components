---
title: Radio Button
componentid: component-radiobutton
variantid: default
guid: "radiobutton-guid-default-component-react"
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
<RadioButton group="radioGroupName" radioValue="first" label="Single radio - first value"
value={this.state.radioListSelected} onChange={(value) => { this.setState({ radioListSelected: value }) }} />
```

## Properties

These are the current available properties:

| Property     | Type                   | Description                                           |
| ------------ | ---------------------- | ----------------------------------------------------- |
| className?   | `string`               | Custom class can be passed here                       |
| description? | `string`               | optional extra description                            |
| disabled?    | `boolean`              | Disable the radio button                              |
| error?       | `string`               | error message (if any)                                |
| group?       | `string`               | the name of the group to group the radios together    |
| id?          | `string`               | the id property                                       |
| inline?      | `boolean`              | Display radio items inline                            |
| label        | `string`               | the label                                             |
| name         | `string`               | the name property                                     |
| onChange     | `(event: any) => void` | on change event                                       |
| radioValue   | `any`                  | the value of the radiobtn, it can be string or number |
| reference?   | `React.RefObject<any>` | React Ref obj                                         |
| value        | `any`                  | your state value, string or number                    |

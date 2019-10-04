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

| Property     | Type                                                            | Description                                                       |
| ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| className?   | `string`                                                        | Custom class can be passed here                                   |
| condensed?   | `boolean`                                                       | Condenses the element. Great for rendering them below each others |
| description? | `string`                                                        | Optional extra description                                        |
| disabled?    | `boolean`                                                       | Disable the radio button                                          |
| group?       | `string`                                                        | The name of the group to group the radios together                |
| id?          | `string`                                                        | The id property                                                   |
| inline?      | `boolean`                                                       | Display radio items inline                                        |
| label        | `string`                                                        | The label                                                         |
| name         | `string`                                                        | The name property                                                 |
| onChange     | `(value: any, e?: React.ChangeEvent<HTMLInputElement>) => void` | On change event                                                   |
| radioValue   | `any`                                                           | The value of the radiobtn, it can be string or number             |
| reference?   | `React.RefObject<any>`                                          | React Ref obj                                                     |
| topLabel?    | `string`                                                        | A label which shows on top of component                           |
| value        | `any`                                                           | Your state value, string or number                                |

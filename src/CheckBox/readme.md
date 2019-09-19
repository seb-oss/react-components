---
title: Checkbox
componentid: component-checkbox
variantid: default
guid: 'checkbox-guid-default-component-react'
---

## Element name
```javascript
Name: CheckBox Component
Component: "CheckBox"
Selector: "<CheckBox/>"
Import: "@sebgroup/react-components/dist/CheckBox"
Type: Form Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `CheckBox` and the selector is `<CheckBox/>`.

## Basic use
```html
<CheckBox
    name="checkbox"
    label="Checkbox label"
    checked={this.state.checkbox}
    onChange={(event) => { this.setState({ checkbox: event.target.checked }); }}
/>
```

## Properties
These are the current available properties:

| Property     | Type                                                   | Description                             |
| ------------ | ------------------------------------------------------ | --------------------------------------- |
| checked      | `boolean`                                              | the checked value                       |
| className?   | `string`                                               | custom class                            |
| description? | `string`                                               | a option description                    |
| disabled?    | `boolean`                                              | Disabled status                         |
| error?       | `string`                                               | error message                           |
| id?          | `string`                                               | id property                             |
| inline?      | `boolean`                                              | Renders inline checkbox                 |
| label?       | `string`                                               | checkbox label                          |
| name         | `string`                                               | name property                           |
| onChange     | `(event: React.ChangeEvent<HTMLInputElement>) => void` | on change action                        |
| reference?   | `React.RefObject<HTMLInputElement>`                    | React Ref obj                           |
| topLabel?    | `string`                                               | a label which shows on top of component |

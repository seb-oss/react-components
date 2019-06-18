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

| Property       | Type                   | Descrition                              |
| -------------- | ---------------------- | --------------------------------------- |
| name           | `string`               | name property                           |
| checked        | `boolean`              | the checked value                       |
| label          | `string`               | checkbox label                          |
| topLabel       | `string`               | a label which shows on top of component |
| onChange       | `(event: any) => void` | on change action                        |
| id?            | `string`               | id property                             |
| className?     | `string`               | custom class                            |
| disabled?      | `boolean`              | Disabled status                         |
| description?   | `string`               | a option description                    |
| error?         | `string`               | error message                           |
| reference?     | `React.RefObject<any>` | React Ref obj                           |

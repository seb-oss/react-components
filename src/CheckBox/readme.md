---
title: Checkbox
componentid: component-checkbox
variantid: default
guid: "checkbox-guid-default-component-react"
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
<CheckBox name="checkbox" label="Checkbox label" checked={this.state.checkbox} onChange={(event) => { this.setState({
checkbox: event.target.checked }); }} />
```

## Properties

These are the current available properties:

| Property     | Type                                                   | Description                                                            |
| ------------ | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| checked      | `boolean`                                              | The checked value                                                      |
| className?   | `string`                                               | Custom class                                                           |
| description? | `string`                                               | A option description                                                   |
| disabled?    | `boolean`                                              | Disabled status                                                        |
| id?          | `string`                                               | Id property                                                            |
| inline?      | `boolean`                                              | Renders inline checkbox                                                |
| label        | `string`                                               | Checkbox label                                                         |
| name         | `string`                                               | Name property                                                          |
| onChange     | `(event: React.ChangeEvent<HTMLInputElement>) => void` | On change action                                                       |
| reference?   | `React.RefObject<HTMLInputElement>`                    | React Ref obj                                                          |
| topLabel?    | `string`                                               | A label which shows on top of component                                |
| condensed?   | `boolean`                                              | Condenses the checkboxes. Usefull when rendering them below each other |

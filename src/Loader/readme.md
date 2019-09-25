---
title: Loader
componentid: component-loader
variantid: default
guid: "loader-guid-default-component-react"
---

## Element name

```javascript
Name: Loader Component
Component: "Loader"
Selector: "<Loader/>"
Import: "@sebgroup/react-components/dist/Loader"
Type: UI Component
```

## Element information

This React component supports customization and configurations. The component name is `Loader` and the selector is `<Loader/>`.

## Basic use

```html
<Loader toggle="{true}" />
```

## Usage with button
```html
 <Button label="Test Label" onClick={() => { alert('Button Clicked') }}>
      <Loader toggle={true} fullscreen={false} />
</Button>
```

## Properties

These are the current available properties:

| Property       | Type      | Description                                                                                                       |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| className?     | `string`  | Element class                                                                                                     |
| fullscreen?    | `boolean` | Show the loader in fullscreen                                                                                     |
| id?            | `string`  | Element id                                                                                                        |
| toggle         | `boolean` | Toggle                                                                                                            |
| size?          | `Size`    | can be `large` , `small`, `medium`, `extraLarge` and `tiny`                                                       |
| sizeClassName? | `string`  | sizeClassName such as `loader-lg`, `loader-sm`, `loader-md`, `loader-xs`, `loader-xl` can be alternatively passed |


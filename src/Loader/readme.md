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

| Property    | Type      | Description                                              |
| ----------- | --------- | -------------------------------------------------------- |
| className?  | `string`  | Element class                                            |
| fullscreen? | `boolean` | Show the loader in fullscreen                            |
| id?         | `string`  | Element id                                               |
| size?       | `Size`    | Define the size of the loader<sup>1</sup>. (default: md) |
| toggle      | `boolean` | Toggle                                                   |

## Footnote

1. Supported sizes: `lg` , `md`, `sm`

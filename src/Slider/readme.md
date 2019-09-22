---
title: Slider
componentid: component-slider
variantid: default
guid: 'slider-guid-default-component-react'
---

## Element name
```javascript
Name: Slider Component
Component: "Slider"
Selector: "<Slider/>"
Import: "@sebgroup/react-components/dist/Slider"
Type: Form Component
```

## Element information 
This React component supports customization and configurations. The component name is `Slider` and the selector is `<Slider/>`.

## Basic use
```html
<Slider
    value={this.state.slider}
    min={0}
    max={100}
    step={5}
    labels={this.sliderLabels}
    name="sliderName"
    onChange={(event) => { this.setState({ slider: event.target.value }); }}
/>
```

## Properties
These are the current available properties:

| Property           | Type                                  | Description                                                         |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------- |
| alternative?       | `boolean`                             | Use an alternative version of the slider                            |
| alwaysShowTooltip? | `boolean`                             | Always Show tooltip (default: `false`)                              |
| className?         | `string`                              | Custom class can be passed here                                     |
| disabled?          | `string`                              | Disabled state                                                      |
| error?             | `string`                              | The component error message                                         |
| id?                | `string`                              | Id property                                                         |
| label?             | `string`                              | The component label                                                 |
| labels?            | `Array<RangeSliderLabel>`<sup>1</sup> | Labels to be displayed below the slider                             |
| max?               | `number`                              | Maximum value (default: `10`)                                       |
| min?               | `number`                              | Minimum value (default: `0`)                                        |
| name               | `string`                              | Name of slider                                                      |
| onChange           | `(event: any) => void`                | Change action                                                       |
| reference?         | `React.RefObject<any>`                | React Ref obj                                                       |
| showTicks?         | `boolean`                             | Show ticks with labels (default: `false`)                           |
| step?              | `number`                              | Step value (default: `1`)                                           |
| theme?             | `string`                              | Based on SEB predefined colors. (default: `'primary'`)<sup>2</sup>  |
| tooltipTheme?      | `string`                              | Based on SEB predefined colors. (default: `'inverted'`)<sup>2</sup> |
| value              | `number`                              | Value of slider                                                     |


## Footnote
1. `labels` items has an exported interface named `RangeSliderLabel`
```javascript
{
    position: number;
    text: string;
}
```
2. Supported themes: `'primary'`, `'inverted'`, `'success'`, `'danger'`, `'warning'`, `'purple'`
   
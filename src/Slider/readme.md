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

| Property           | Type                                  | Description                                                          |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------- |
| value              | `number`                              | value of slider                                                     |
| name               | `string`                              | name of slider                                                      |
| onChange           | `(event: any) => void`                | change action                                                       |
| id?                | `string`                              | id property                                                         |
| min?               | `number`                              | Minimum value (default: `0`)                                        |
| max?               | `number`                              | Maximum value (default: `10`)                                       |
| step?              | `number`                              | Step value (default: `1`)                                           |
| className?         | `string`                              | Custom class can be passed here                                     |
| labels?            | `Array<RangeSliderLabel>`<sup>1</sup> | Labels to be displayed below the slider                             |
| label?             | `string`                              | the component label                                                 |
| error?             | `string`                              | the component error message                                         |
| showTicks?         | `boolean`                             | Show ticks with labels (default: `false`)                           |
| alwaysShowTooltip? | `boolean`                             | Always Show tooltip (default: `false`)                              |
| theme?             | `string`                              | Based on SEB predefined colors. (default: `'primary'`)<sup>2</sup>  |
| tooltipTheme?      | `string`                              | Based on SEB predefined colors. (default: `'inverted'`)<sup>2</sup> |
| alternative?       | `boolean`                             | Use an alternative version of the slider                            |
| reference?         | `React.RefObject<any>`                | React Ref obj                                                       |


## Footnote
1. `labels` items has an exported interface named `RangeSliderLabel`
```javascript
{
    position: number;
    text: string;
}
```
2. Supported themes: `'primary'`, `'inverted'`, `'success'`, `'danger'`, `'warning'`, `'purple'`
   
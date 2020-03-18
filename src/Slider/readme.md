---
title: Slider
componentid: component-slider
variantid: default
guid: "slider-guid-default-component-react"
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
| disabled?          | `boolean`                             | Disabled state                                                      |
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
| appearance?        | `string`                              | Thumb appearance (size and shape) (default: `'normal'`)<sup>3</sup> |
| tooltipTheme?      | `string`                              | Based on SEB predefined colors. (default: `'inverted'`)<sup>2</sup> |
| value              | `number`                              | Value of slider                                                     |

## Footnote

1. `labels` items has an exported interface named `RangeSliderLabel`

```typescript
interface RangeSliderLabel {
    position: number;
    text: string;
}
```

2. Supported themes: `'primary'`, `'inverted'`, `'success'`, `'danger'`, `'warning'`, `'purple'`
3. Supported appearance: `'normal'`, `'smaller'`
4. This is an example of how to achieve a combination of a `textbox` with a `slider` like it's described in [SEB Design Library](https://designlibrary.sebgroup.com/components/slider/)

HTML (tsx) would look like this

```html
<div className="row">
    <div className="col"><label className="mt-2">Select a value</label></div>
    <div className="col">
        <TextBoxGroup
            name="seb-slider"
            type="text"
            rightText="kr"
            maxLength={4}
            value={Number(sebSlider)}
            onChange={handleSebSliderChange}
            error={sebSliderError}
            showErrorMessage={false}
        />
    </div>
</div>
<div className="row">
    <div className="col-12">
        <Slider
            name="seb-slider"
            value={sebSlider}
            onChange={handleSebSliderChange}
            showTicks={true}
            labels={currencySliderLabels}
            min={1000}
            max={3000}
            step={100}
            error={sebSliderError}
        />
    </div>
</div>
```

Typescript code would look like this:

```typescript
const currencySliderLabels: Array<{ position: number; text: string }> = [
    { position: 1000, text: "1 000 kr" },
    { position: 1500, text: "1 500 kr" },
    { position: 2000, text: "2 000 kr" },
    { position: 2500, text: "2 500 kr" },
    { position: 3000, text: "3 000 kr" },
];
function handleSebSliderChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value: number = Number(event.target.value);
    if (isNaN(value)) {
        this.setState({ sebSliderError: "Cannot be less the minimum", sebSlider: 0 });
    } else {
        const min: number = currencySliderLabels[0].position;
        const max: number = currencySliderLabels[currencySliderLabels.length - 1].position;
        const err: string = "";
        if (value < min) {
            err = "Cannot be less than the minimum";
        } else if (value > max) {
            err = "Cannot exceeded the maximum";
        }
        this.setState({ sebSliderError: err, sebSlider: value });
    }
}
```

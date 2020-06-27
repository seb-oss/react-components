---
title: DivImage
componentid: component-image
variantid: default
guid: 'div-image-guid-default-component-react'
---

## Element name
```javascript
Name: Image Component
Component: "DivImage"
Selector: "<DivImage/>"
Import: "@sebgroup/react-components/dist/DivImage"
Type: Other Component
```

## Element information 
This React component supports customization and configurations. The selector is `<DivImage/>`.

## Basic use
```html
<DivImage src={imgSrc} />
```

## Properties
These are the current available properties:

#### DivImageProps
This interface extends all native attributes of `HTMLDivElement`, while adding the following extra attributes:

| Property    | Type               | Description                                                      |
| ----------- | ------------------ | ---------------------------------------------------------------- |
| responsive? | `boolean`          | Making the image responsive and adaptive to its parent size      |
| rounded?    | `boolean`          | Adds default border radius                                       |
| thumbnail?  | `boolean`          | Thumbnail layout                                                 |
| src?        | `string`           | Image source url or base64                                       |
| width?      | `string \| number` | Image width. Can also set using `style` attribute                |
| height?     | `string \| number` | Image height. Can also set using `style` attribute               |
| bgFixed?    | `boolean`          | Sets the background attachment to fixed to allow parallax effect |
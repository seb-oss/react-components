---
title: Image
componentid: component-image
variantid: default
guid: 'image-guid-default-component-react'
---

## Element name
```javascript
Name: Image Component
Component: "Img", "DivImage"
Selector: "<Img/>", "<DivImage/>"
Import: "@sebgroup/react-components/dist/Image"
Type: Other Component
```

## Element information 
This React component supports customization and configurations. There are two components to represent an image `Img` and `DivImage` and the selectors are `<Img/>` and `<DivImage/>` respectively.

## Basic use
```html
<Img src={imgSrc} />
<DivImage src={imgSrc} />
```

## Properties
These are the current available properties:

#### Common props
These are the common props shared between `Img` and `DivImage` components and can be used in both:

| Property    | Type      | Description                                                 |
| ----------- | --------- | ----------------------------------------------------------- |
| responsive? | `boolean` | Making the image responsive and adaptive to its parent size |
| rounded?    | `boolean` | Adds default border radius                                  |
| thumbnail?  | `boolean` | Thumbnail layout                                            |

#### ImageProps
This interface extends all native attributes of `HTMLImageElement`, and the aforementioned common props.

#### DivImageProps
This interface extends all native attributes of `HTMLDivElement`, and the aforementioned common props adding the following extra attributes:

| Property | Type              | Description                                                      |
| -------- | ----------------- | ---------------------------------------------------------------- |
| src?     | `string`          | Image source url or base64                                       |
| width?   | `string | number` | Image width. Can also set using `style` attribute                |
| height?  | `string | number` | Image height. Can also set using `style` attribute               |
| bgFixed? | `boolean`         | Sets the background attachment to fixed to allow parallax effect |
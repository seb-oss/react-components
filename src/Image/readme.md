---
title: Image
componentid: component-image
variantid: default
guid: 'image-guid-default-component-react'
---

## Element name
```javascript
Name: Image Component
Component: "Img"
Selector: "<Img/>"
Import: "@sebgroup/react-components/dist/Img"
Type: Other Component
```

## Element information 
This React component supports customization and configurations. The selector is `<Img/>`.

## Basic use
```html
<Img src={imgSrc} />
```

## Properties
These are the current available properties:

#### ImageProps
This interface extends all native attributes of `HTMLImageElement`, while adding the following extra attributes:

| Property    | Type      | Description                                                 |
| ----------- | --------- | ----------------------------------------------------------- |
| responsive? | `boolean` | Making the image responsive and adaptive to its parent size |
| rounded?    | `boolean` | Adds default border radius                                  |
| thumbnail?  | `boolean` | Thumbnail layout                                            |

---
title: Image
componentid: component-image
variantid: default
guid: 'image-guid-default-component-react'
---

## Element name
```javascript
Name: Image Holder Component
Component: "Image"
Selector: "<Image/>"
Import: "@sebgroup/react-components/dist/Image"
Type: Other Component
```

## Element information 
This React component supports customization and configurations. The component name is `Image` and the selector is `<Image/>`.

## Basic use
```html
<Image
    src={imgSrc}
    width="100%"
    height="200px"
/>
```

## Properties
These are the current available properties:

| Property         | Type                   | Description                                                     |
| ---------------- | ---------------------- | --------------------------------------------------------------- |
| alt?             | `string`               | Image `alt` attribute                                           |
| ariaDescribedBy? | `string`               | Element aria-describedby attribute                              |
| ariaLabel?       | `string`               | Element aria-label attribute                                    |
| className?       | `string`               | custom class                                                    |
| height           | `string`               | this is css height such as 100% or 300px                        |
| id?              | `string`               | Element id                                                      |
| onClick?         | `(event: any) => void` | click action with event                                         |
| onLoad?          | `(event: any) => void` | only works with `img` tag and returns when image is laoded      |
| src              | `string`               | your image source, it can be string or required then pass value |
| useImgTag?       | `boolean`              | this will switch between `div` and `img` tags. default is `div` |
| width            | `string`               | this is css width such as 100% or 300px                         |

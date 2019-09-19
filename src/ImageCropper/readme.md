---
title: ImageCropper
componentid: component-image-cropper
variantid: default
guid: 'image-cropper-guid-default-component-react'
---

## Element name
```javascript
Name: ImageCropper Component
Component: "ImageCropper"
Selector: "<ImageCropper/>"
Import: "@sebgroup/react-components/dist/ImageCropper"
Type: Form Component
```

## Element information 
This component is based on [cropperjs](https://github.com/fengyuanchen/cropperjs), Supports customization and configuration options, [see](https://github.com/fengyuanchen/cropperjs#options). The component name is `ImageCropper` and the selector is `<ImageCropper/>`.

## Basic use
```html
let cropperConfigs: {
    preview: ".image-preview",
    guides: false,
    checkCrossOrigin: false,
    responsive: true,
    zoomable: false,
    aspectRatio: (1 / 1),
    rotatable: false,
}

 <ImageCropper
    cropperConfigs={cropperConfigs}
    onCrop={this.setState({ cropResult: croppedData })}
/>
```

## Properties
These are the current available properties:

| Property               | Type                          | Description                                                                                                                                                                |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alt?                   | `string`                      | image `alt`                                                                                                                                                                |
| alwaysAlignedCropper?  | `boolean`                     | `alwaysAlignedCropper` when set to true ensure the cropper box doesn't escape out of the mmain box. Also the cropmove and cropend events of cropperjs cannot be listen to. |
| cancelText?            | `string`                      | the text displyed on the cancel crop UI                                                                                                                                    |
| canvasData?            | `CanvasData`                  | interface `canvasData` is available within the dist folder , `canvasData` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)            |
| cropBoxData?           | `CropBoxData`                 | interface `CropBoxData` is available within the component, `canvasData` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)              |
| cropButtonText?        | `string`                      | the text displayed on thr crop button, default text is `Crop`                                                                                                              |
| cropperConfigs         | `OptionProps`                 | interface OptionProps, solely based on cropperjs props, see references                                                                                                     |
| crossOrigin?           | `string`                      | `crossOrigin` is part of the image tag options that handle CORS. [see](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)                               |
| customButtonText?      | `string`                      | A custom button text,                                                                                                                                                      |
| enable                 | `boolean`                     | `scaleX` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |
| imageCropperClassName? | `string`                      | custom class for cropper UI                                                                                                                                                |
| moveTo?                | `number`                      | `moveTo` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |
| onCrop                 | `(imageData: string) => void` | the callBack to be called onCrop action, it passes `cropResult` string                                                                                                     |
| onCustomButtonClick?   | `(e: Event) => void`          | the callBack that is called when custom button is clicked                                                                                                                  |
| previewClassName?      | `string`                      | custom class name for the image preview                                                                                                                                    |
| previewSrc?            | `string`                      | your preview image source                                                                                                                                                  |
| reset?                 | `boolean`                     | `moveTo` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |
| rotateTo?              | `number`                      | `rotateTo`           is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                 |
| scaleX?                | `number`                      | `scaleX` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |
| scaleY?                | `number`                      | `scaleY` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |
| selectButtonText?      | `string`                      | The select or add add photo text                                                                                                                                           |
| showCustomButton?      | `boolean`                     | `showCustomButton` when set to true, and customButton call back provided, displays the custom button                                                                       |
| toggle?                | `boolean` <sup>1</sup>        | when true, the modal shows, hide otherwise. See [1](#/imagecropper#reference) from the footnote below.                                                                     |
| zoomTo?                | `number`                      | `zoomTo` is part of cropperjs options [see](https://github.com/fengyuanchen/cropperjs#options)                                                                             |

## Reference
This component is based on [cropperjs](https://github.com/fengyuanchen/cropperjs).

## Footnote
1. The props from the property above is the cropperjs options object. cropperjs support set of properties namely, `drapMode`, `initialMode` , `aspectRation` etc. These and many more options are described in the cropperjs documentation [here](https://github.com/fengyuanchen/cropperjs#options). 
`toggle` is an optional field. However, you need to pass toggle to be able to control the modal from your component.

---
title: Modal
componentid: component-modal
variantid: default
guid: 'modal-guid-default-component-react'
---

## Element name
```javascript
Name: Modal Component
Component: "Modal"
Selector: "<Modal/>"
Import: "seb-react-components/dist/Modal"
Type: Other Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Modal` and the selector is `<Modal/>`.

## Basic use
```html
<Modal
    toggle={toggle}
    onDismiss={() => setToggle(false)}
    header={<h3>Header</h3>}
    body={<p>this is the body</p>}
    footer={<Button
        label="Close Modal"
        onClick={() => setToggle(false)}
    />}
/>
```

## Properties
This component extends all native attributes of `HTMLDivElement`, while offering the following customizations:

| Property         | Type            | Descrition                                                                        |
| ---------------- | --------------- | --------------------------------------------------------------------------------- |
| header?          | `ReactNode`     | HTML element to be displayed on the header                                        |
| body?            | `ReactNode`     | HTML element to be displayed on the body                                          |
| footer?          | `ReactNode`     | HTML element to be displayed on the footer                                        |
| backdropDismiss? | `boolean`       | Enables dismissing the modal when the backdrop is clicked. Default: `true`        |
| escapeToDismiss? | `boolean`       | Enables dismissing the modal when the `escape` key is registered. Default: `true` |
| closeButton?     | `boolean`       | Shows a close button in the header. Default: `true`                               |
| fullscreen?      | `boolean`       | Toggle fullscreen modal, default is false                                         |
| onDismiss?       | `VoidFunction`  | Click event when modal is toggled                                                 |
| position?        | `right or left` | Stick modal to one of the sides, accepted values (right or left)                  |
| size?            | `lg or sm`      | Modal size, accepted values (`lg` or `sm`)                                        |
| toggle           | `boolean`       | Show or hide the modal, default is false                                          |
| centered         | `boolean`       | Aligns the modal in the middel of the screen. Doesn't work with aside             |

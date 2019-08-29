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
    toggle={this.state.dialogue}
    fullscreen={this.state.fullscreen}
    position={this.state.position}
    disableBackdropDismiss={this.state.disableBackdropDismiss}
    onDismiss={() => this.closeModal()}
    header={<h3>Header</h3>}
    body={<p>this is the body</p>}
    footer={<Button
        label="Close Modal"
        onClick={() => this.closeModal()}
    />}
/>
```

## Properties
These are the current available properties:

| Property                | Type           | Descrition                                                             |
| ----------------------- | -------------- | ---------------------------------------------------------------------- |
| toggle                  | `boolean`      | Show or hide the modal, default is false                               |
| id?                     | `string`       | the id property of the modal                                           |
| fullscreen?             | `boolean`      | Toggle fullscreen modal, default is false                              |
| position?               | `right or left`| Stick modal to one of the sides, accepted values (right or left)       |
| className?              | `string`       | Custom class                                                           |
| header?                 | `ReactNode`    | HTML element to be displayed on the header                             |
| body?                   | `ReactNode`    | HTML element to be displayed on the body                               |
| footer?                 | `ReactNode`    | HTML element to be displayed on the footer                             |
| ariaLabel?              | `string`       | Accessibility for label                                                |
| ariaDescribedby?        | `string`       | Accessibility for description                                          |
| disableBackdropDismiss? | `boolean`      | User cannot dismiss Dialog by clicking outside of it, default is false |
| onDismiss?           | `() => void`   | click event when modal is toggled                                      |
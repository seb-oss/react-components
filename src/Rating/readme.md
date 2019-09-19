---
title: Button
componentid: component-button
variantid: default
guid: 'button-guid-default-component-react'
---

## Element name
```javascript
Name: Rating Component
Component: "Rating"
Selector: "<Rating/>"
Import: "@sebgroup/react-components/dist/Rating"
Type: Form Component
```

## Element information 
This React component is based on `react-rating`. Supports customization and configurations. The component name is `Rating` and the selector is `<Rating/>`.

## Basic use
```html
<Rating
    initialValue={this.state.rating}
    onChange={(value: number): void => this.setState({ rating: value })}
/>
```

## Properties
These are the current available properties:

| Property      | Type                      | Description                                  |
| ------------- | ------------------------- | -------------------------------------------- |
| initialValue? | `any`                     | Intial value, string or number               |
| onChange?     | `(value: number) => void` | Onchange event, will return the value        |
| tooltipList?  | `Array<string>`           | Array of strings which reperesent each start |
| iconHeight?   | `number`                  | Height of icons                              |
| iconWidth?    | `number`                  | Width of icons                               |
| useHollow?    | `boolean`                 | Use empty icon                               |
| colors?       | `Array<string>`           | Array of strings which reperesent each color |
| readOnly?     | `boolean`                 | For viewing only, default false              |
| className?    | `string`                  | Custom class                                 |
| disabled?     | `string`                  | Disabled state                               |
| id?           | `string`                  | Element id                                   |


## Reference
This component is a wrapper around [react-rating](https://www.npmjs.com/package/react-rating)
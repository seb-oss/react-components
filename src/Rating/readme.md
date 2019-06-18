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

| Property      | Type                      | Description                                   |
| ------------- | ------------------------- | -------------------------------------------- |
| initialValue? | `any`                     | intial value, string or number               |
| onChange      | `(value: number) => void` | onchange event, will return the value        |
| className?    | `string`                  | custom class                                 |
| tooltipList?  | `Array<string>`           | array of strings which reperesent each start |
| colors?       | `Array<string>`           | array of strings which reperesent each color |
| iconHeight?   | `number`                  | height of icons                              |
| iconWidth?    | `number`                  | width of icons                               |
| useHollow?    | `boolean`                 | use empty icon                               |
| readOnly?     | `boolean`                 | for viewing only, default false              |


## Reference
This component is a wrapper around [react-rating](https://www.npmjs.com/package/react-rating)
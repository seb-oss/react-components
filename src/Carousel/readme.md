---
title: Carousel
componentid: component-carousel
variantid: default
guid: 'carousel-guid-default-component-react'
---

## Element name
```javascript
Name: Carousel Component
Component: "Carousel"
Selector: "<Carousel/>"
Import: "@sebgroup/react-components/dist/Carousel"
Type: UI Component
```

## Element information 
This React component is based on `react-slick`. Supports customization and configurations. The component name is `Carousel` and the selector is `<Carousel/>`.

## Basic use
```html
<Carousel list={this.state.list} />
```

## Properties
These are the current available properties:

| Property             | Type                               | Descrition                                        |
| -------------------- | ---------------------------------- | ------------------------------------------------- |
| list                 | `Array<CarouselItem>` <sup>1</sup> | an array of CarouselItem                          |
| carouselChanged      | `(index: number) => void`          | carousel change event                             |
| className?           | `string`                           | custom class                                      |
| height?              | `number`                           | height of carousel                                |
| autoPlay?            | `boolean`                          | enable auto change mode. default is `false`       |
| autoPlaySpeed?       | `number`                           | autoplay speed in milliseconds (default: 3000)    |
| backgroundPlacement? | `string`                           | it is based on css background, default is `cover` |


## Reference
This component is a wrapper around [react-slick](https://www.npmjs.com/package/react-slick) which uses [slick-carousel](https://www.npmjs.com/package/slick-carousel)

## Footnote
1. `list` items has an exported interface named `CarouselItem`
```javascript
{
    title?: string;
    desc?: string;
    image?: string;
}
```

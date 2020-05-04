---
title: Carousel
componentid: component-carousel
variantid: default
guid: "carousel-guid-default-component-react"
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

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Carousel` and the selector is `<Carousel/>`.

## Basic use

It can be used in these combinations
```html
{/* Passing the list as prop with common onToggle handler and default value (index number) to show which one is checked */}
<Carousel list="carouselList" onNavigate={commonToggleHandler} defaultValue={value} />

{/* Rendering a list of CarouselItem */}
<Carousel defaultValue={value}>
    {carouselList.map((item: CarouselItemProps, i: number) => {
        /** Do whatever logic before rendering */
        return (
            <CarouselItem key={i} {...item} onNavigate={individualToggleHandler}/>
        )
    })}
</Carousel>

{/* Rendering a bunch CarouselItem individually */}
<Carousel>
    <CarouselItem>Some content</CarouselItem>
    <CarouselItem>
        <h4>This is the second</h4>
        <p>Some rich content</p>
    </CarouselItem>
    <CarouselItem defaultChecked>
        <SomeComponent>content</SomeComponent>
    </CarouselItem>
</Carousel>
```
**onNavigate** handler can be passed to the parent as common handler, or passed to each individual child as a unique handler for each item
**defaultChecked** can be used to set the default state on items rendered individually

## Properties

#### CarouselProps
This interface extends all native attributes of `HTMLDivElement`, adding the following extra attributes:

| Property            | Type                               | Description                                                |
| ------------------- | ---------------------------------- | ---------------------------------------------------------- |
| afterChange?        | `(index: number) => void`          | Callback triggered after carousel is changed               |
| transitionDuration? | `number`                           | Transition duration in milliseconds. Default is `600ms`    |
| transitionStyle?    | `"slide" | "fade"`                 | Transition style. Default is `slide`                       |
| infinite?           | `boolean`                          | Enables the carousel to loop infinitely. default is `true` |
| showIndicators?     | `boolean`                          | Shows indicators at the bottom. default is `false`         |
| list                | `Array<CarouselItem>` <sup>1</sup> | An array of `CarouselItem`                                 |
| defaultValue?       | `number`                           | The index of the default active carousel                   |

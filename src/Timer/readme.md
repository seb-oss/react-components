---
title: Timer
componentid: component-timer
variantid: default
guid: "timer-guid-default-component-react"
---

## Element name

```javascript
Name: Timer Component
Component: "Timer"
Selector: "<Timer/>"
Import: "@sebgroup/react-components/dist/Timer"
Type: Other Component
```

## Element information

The component name is `Timer` and the selector is `<Timer/>`, it will support count down for hrs, mins and seconds.

## Basic use

```html
<Timer duration={60} onTimerEnded={() => console.log("TIMER ENDED callback")} />
```

## Properties

This component extends all native attributes of `HTMLTimeElement`, while offering the following customizations:

| Property     | Type           | Description                                           |
| ------------ | -------------- | ----------------------------------------------------- |
| duration     | `number`       | Duration in **seconds**                               |
| onTimerEnded | `VoidFunction` | This method will be triggered when timer reaches zero |

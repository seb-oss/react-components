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
<Timer duration={90000} callback={() => { console.log("TIMER ENDED callback"); }} />
```

## Properties

These are the current available properties:

| Property   | Type           | Description                                            |
| ---------- | -------------- | ------------------------------------------------------ |
| callback   | `VoidFunction` | This method will be triggered when timer reached ended |
| className? | `string`       | Custom class                                           |
| duration   | `number`       | Duration of timer in `Millisecond`                     |
| id?        | `string`       | Element id                                             |

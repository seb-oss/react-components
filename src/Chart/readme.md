---
title: Chart
componentid: component-chart
variantid: default
guid: "chart-guid-default-component-react"
---

## Element name

```javascript
Name: Chart Component
Module: "Chart"
Selector: "<Chart/>"
Import: "@sebgroup/react-components/dist/Chart"
Type: Other Component
```

## Element information

This React component is based on `Chart.js` with customization and configurations that comes with it. The module name of this component is `Chart` and the selector is `<Chart/>`. Please refer to their documantation regarding how to pass datasets, options, labels and so on.

## Basic use

```html
<Chart chartType="line" data="{data}" options="{options}" />
```

## Properties

These are the current available properties:

| Property   | Type                                             | Description                                 |
| ---------- | ------------------------------------------------ | ------------------------------------------- |
| chartType  | `string`                                         | type of charts based on chat.js<sup>1</sup> |
| data       | `ChartData`                                      | chart.js data object                        |
| options?   | `ExtendedChartOptions`                           | chart.js options object                     |
| onClick?   | `(event: React.MouseEvent<HTMLElement>) => void` | Click action                                |
| className? | `string`                                         | custom class                                |

## Reference

This component is a wrapper around [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2), which itself is based on [chart.js](http://www.chartjs.org), and as chartjs configuration is extandable via plugins, we have implemented the annotations via [chartjs-plugin-annotation](https://www.npmjs.com/package/chartjs-plugin-annotation). Further you should be able to add more plugin and pass new configrations via `options` property

## footnote

1. Supported charts: `line`, `bar`, `horizontalBar`, `pie`, `doughnut`, `polar`, `radar`, `bubble`, `scatter`

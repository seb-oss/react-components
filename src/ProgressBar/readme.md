---
title: Progressbar
componentid: component-progressbar
variantid: default
guid: 'progressbar-guid-default-component-react'
---

## Element name
```javascript
Name: Progress Bar Component
Component: "ProgressBar"
Selector: "<ProgressBar/>"
Import: "@sebgroup/react-components/dist/ProgressBar"
Type: UI Component
```

## Element information 
This React component supports customization and configurations. The component name is `ProgressBar` and the selector is `<ProgressBar/>`.

## Basic use
```html
<ProgressBar value={this.state.progress} />
```

## Properties
These are the current available properties:

| Property      | Type      | Descrition                             |
| ------------- | --------- | -------------------------------------- |
| value         | `number`  | the value of the progress bar          |
| showProgress? | `boolean` | Show progress percentage value in text |
| className?    | `string`  | custom class                           |

:::iframe(https://github.sebank.se/pages/DesignLibrary/ReactComponents/#/progressbar?mode=DL, 110)
---
title: Breadcrumb
componentid: component-breadcrumb
variantid: default
guid: 'breadcrumb-guid-default-component-react'
---

## Element name
```javascript
Name: Breadcrumb Component
Component: "Breadcrumb"
Selector: "<Breadcrumb/>"
Import: "@sebgroup/react-components/dist/Breadcrumb"
Type: UI Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Breadcrumb` and the selector is `<Breadcrumb/>`.

## Basic use
```html
<Breadcrumb
    list={breadcrumbListObj}
    onClick={clickHandler}
/>
```

## Properties
These are the current available properties:

| Property   | Type                  | Descrition                               |
| ---------- | --------------------- | ---------------------------------------- |
| list       | `Array<string>`       | List of paths                            |
| onClick    | `(i: number) => void` | Click action passed the index of the tab |
| className? | `string`              | custom class                             |

:::iframe(https://github.sebank.se/pages/DesignLibrary/ReactComponents/#/breadcrumb?mode=DL, 100)
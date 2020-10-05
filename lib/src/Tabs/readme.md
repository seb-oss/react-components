****---
title: Tabs
componentid: component-tab
variantid: default
guid: 'tab-guid-default-component-react'
---

## Element name
```javascript
Name: Tabs Component
Component: "Tabs"
Selector: "<Tabs/>"
Import: "@sebgroup/react-components/dist/Tabs"
Type: Form Component
```

## Element Information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `Tabs` and the selector is `<Tabs/>`.

## Basic use
```html
<Tabs
      list={tabsListObj}
      activeTab={index}
      onClick={clickHandler}
/>
```

## Properties
These are the current available properties:

| Property   | Type                              | Description                                            |
| ---------- | --------------------------------- | ------------------------------------------------------ |
| activeTab  | `number`                          | Index of the the current active tab                    |
| className? | `string`                          | Custom class                                           |
| id?        | `string`                          | Element id                                             |
| list       | `Array<TabsListItem>`<sup>1</sup> | List of tabs                                           |
| onClick    | `(index: number)=>void`           | Tab click handler, passes the index of the clicked tab |

## Footnote
1. `list` has an exported interface named `TabsListItem`
```typescript
interface TabsListItem {
      text: string;
      disabled?: boolean;
}
```

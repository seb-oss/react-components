---
title: Breadcrumb
componentid: component-breadcrumb
variantid: default
guid: "breadcrumb-guid-default-component-react"
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
<Breadcrumb list="{breadcrumbListObj}" onClick="{clickHandler}" />
```
```typescript
/** If you use hash router, you need to pass the hash in the href */
const breadcrumbListObj: Array<BreadcrumbItem> = [
    { text: "Home", href: "#/" },
    { text: "Second page", href: "#/second-page" }
];

function clickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefaults();
    /** In case you wanted to access the index of the item clicked */
    console.log("The index of the clicked is:" + e.currentTarget.dataset.value);
    /** remove the hash when you navigate */
    history.push(e.currentTarget.hash.replace("#", ""));
}
```

## Properties

These are the current available properties:

| Property   | Type                                            | Description                                              |
| ---------- | ----------------------------------------------- | -------------------------------------------------------- |
| className? | `string`                                        | Element class                                            |
| id?        | `string`                                        | Element id                                               |
| list       | `Array<BreadcrumbItem>`<sup>1</sup>             | List of breadcrumb objects respresenting stages of depth |
| onClick?   | `(e?: React.MouseEvent<HTMLLIElement>) => void` | Callback triggered when a breadcrumb is clicked          |

## Footnote
1. BreadcrumbItem interface
```typescript
interface BreadcrumbItem {
    text: React.ReactNode;
    href?: string;
    title?: string;
}
```
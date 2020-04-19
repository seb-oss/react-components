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

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `Breadcrumb` and the selector is `<Breadcrumb/>`. A supplimentary child component is also available for use `BreadcrumbItem`. See the examples below.

## Basic use

It can be used in these combinations
```html
<!-- Passing the list and one handler for all link clicks -->
<Breadcrumb list={breadcrumbList} onNavigate={onNavigateHandler} />

<!-- Rendering a list of BreadcrumbItem -->
<Breadcrumb>
    {breadcrumbList.map((item: BreadcrumbItemProps, i: number) => {
        /** Do whatever logic before rendering */
        return (
            <BreadcrumbItem key={i} {...item} onNavigate={onNavigateHandler}/>
        )
    })}
</Breadcrumb>

<!-- Rendering a bunch BreadcrumbItem individually -->
<Breadcrumb>
    <BreadcrumbItem href="#/"><HomeIcon/></BreadcrumbItem>
    <BreadcrumbItem href="#/user">User</BreadcrumbItem>
    <BreadcrumbItem href="#/edit">Edit</BreadcrumbItem>
</Breadcrumb>
```
```typescript
/** If you use hash router, you need to pass the hash in the href */
const breadcrumbListObj: Array<BreadcrumbItem> = [
    { children: "Home", href: "#/" },
    { children: "Second page", href: "#/second-page" }
];

function clickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    /**
     * In case you wanted to access the index of the item clicked
     * IMPORTANT: only available when a list is passed to Breadcrumb parent component
     */
    console.log("The index of the clicked is:" + e.currentTarget.dataset.value);
    /** remove the hash when you navigate */
    history.push(e.currentTarget.hash.replace("#", ""));
}
```

## Properties

These are the current available properties:

| Property    | Type                                         | Description                                              |
| ----------- | -------------------------------------------- | -------------------------------------------------------- |
| list        | `Array<BreadcrumbItemProps>`<sup>1</sup>     | List of breadcrumb objects respresenting stages of depth |
| onNavigate? | `React.MouseEventHandler<HTMLAnchorElement>` | Callback triggered when a breadcrumb link is clicked     |

## Footnote
1. BreadcrumbItem interface
```typescript
/** Extends all native attributes of LiHTMLElement with `children` */
interface BreadcrumbItemProps {
    href?: string;
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
}
```

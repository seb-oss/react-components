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
<Breadcrumb list={breadcrumbList} onNavigate={commonHandler} />

<!-- Rendering a list of BreadcrumbItem -->
<Breadcrumb>
    {breadcrumbList.map((item: BreadcrumbItemProps, i: number) => {
        /** Do whatever logic before rendering */
        return (
            <BreadcrumbItem key={i} {...item} onNavigate={individualHandler}/>
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

**onNavigate** handler can be passed to the parent as common handler, or passed to each individual child as a unique handler for each item

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
    console.log("The index of the clicked is:" + e.currentTarget.dataset.indexNumber);
    /** remove the hash when you navigate */
    history.push(e.currentTarget.hash.replace("#", ""));
}
```

## Properties

#### BreadcrumbProps
This interface extends all native attributes of `HTMLAttributes`, adding the following extra attributes:

| Property    | Type                                         | Description                                               |
| ----------- | -------------------------------------------- | --------------------------------------------------------- |
| list?       | `Array<BreadcrumbItemProps>`                 | List of breadcrumb objects respresenting stages of depth. |
| onNavigate? | `React.MouseEventHandler<HTMLAnchorElement>` | Event handler triggered when the links is clicked         |
| light?      | `boolean`                                    | Enables the light version of the Breadcrumb               |

#### BreadcrumbItemProps
This interface extends all native attributes of `LiHTMLAttributes`, adding the following extra attributes:

| Property        | Type                                         | Description                                                                                                                                                                  |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| href?           | `string`                                     | The link to where it navigates to. This is used to enable openning the link in new tab.<br/>Additionally, you can access it in the event passed with the onNavigate callback |
| onNavigate?     | `React.MouseEventHandler<HTMLAnchorElement>` | Event handler triggered when the links is clicked                                                                                                                            |

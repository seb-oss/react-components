---
title: Accordion
componentid: component-accordion
variantid: default
guid: "accordion-guid-default-component-react"
---

## Element name

```javascript
Name: Accordion Component
Component: "Accordion"
Selector: "<Accordion/>"
Import: "@sebgroup/react-components/dist/Accordion"
Type: Form Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. Use this component mainly for text content. The module name of this component is `Accordion` and the selector is `<Accordion/>`. A supplimentary child component is also available for use `AccordionItem`. See the examples below.

## Basic use

It can be used in these combinations
```html
{/* Passing the list as prop with common onToggle handler and default value (index number) to show which one is checked */}
<Accordion list="accordionList" onToggle={commonToggleHandler} defaultValue={value} />

{/* Rendering a list of AccordionItem */}
<Accordion defaultValue={value}>
    {accordionList.map((item: AccordionItemProps, i: number) => {
        /** Do whatever logic before rendering */
        return (
            <AccordionItem key={i} {...item} onToggle={individualToggleHandler}/>
        )
    })}
</Accordion>

{/* Rendering a bunch AccordionItem individually */}
<Accordion>
    <AccordionItem header="First">Some content</AccordionItem>
    <AccordionItem header="Second" subHeader="Some description">
        <h4>This is the second</h4>
        <p>Some rich content</p>
    </AccordionItem>
    <AccordionItem header="Third" defaultChecked>
        <SomeComponent>content</SomeComponent>
    </AccordionItem>
</Accordion>
```
**onToggle** handler can be passed to the parent as common handler, or passed to each individual child as a unique handler for each item
**defaultChecked** can be used to set the default state on items rendered individually
```jsx
/** If you use hash router, you need to pass the hash in the href */
const accordionList: Array<AccordionItemProps> = [
    { header: "First", children: "Some content" },
    { header: "Second", subHeader: "Some description", children: <><h4>This is the second</h4><p>Some rich content</p></> },
    { header: "Third", children: <SomeComponent>content</SomeComponent> },
];
function onToggle(e: React.MouseEvent<HTMLButtonElement>) {
    /** Run any necessary logic before setting the defaultValue */
    setValue(Number(e.currentTarget.dataset.indexNumber));
}
```

## Properties

#### AccordionProps
This interface extends all native attributes of `HTMLDivElement`, adding the following extra attributes:

| Property     | Type                                         | Description                                                    |
| ------------ | -------------------------------------------- | -------------------------------------------------------------- |
| alternative? | `boolean`                                    | Toggle alternative style of accordion                          |
| list?        | `Array<AccordionItemProps>`                  | List of accordion items                                        |
| onToggle?    | `React.MouseEventHandler<HTMLButtonElement>` | An event handler triggered when an accordion toggle is clicked |

#### AccordionItemProps
This interface extends all native attributes of `HTMLDivElement`, adding the following extra attributes:

| Property   | Type                                         | Description                                                    |
| ---------- | -------------------------------------------- | -------------------------------------------------------------- |
| header?    | `React.ReactNode`                            | The header of the accordion item                               |
| subHeader? | `React.ReactNode`                            | A sub-header description rendered under the header             |
| onToggle?  | `React.MouseEventHandler<HTMLButtonElement>` | An event handler triggered when an accordion toggle is clicked |


---
title: Tooltip
componentid: component-tooltip
variantid: default
guid: 'tooltip-guid-default-component-react'
---

## Element name
```javascript
Name: Tooltip Component
Component: "Tooltip"
Selector: "<Tooltip/>"
Import: "@sebgroup/react-components/dist/Tooltip"
Type: UI Component
```

## Element information 
This React component supports customization and configurations. The component name is `Tooltip` and the selector is `<Tooltip/>`. this component can recieve custom svg as its icon.

## Basic use
```html
<Tooltip
    message="Tooltip message could be long, therefore, controlling the position and width is important"
    position="right"
    width={200}
/>
```

## Properties
These are the current available properties:

| Property        | Type                                         | Descrition                                                                                    |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| title?          | `string`                                     | Title                                                                                         |
| message?        | `string`                                     | Description                                                                                   |
| messageGroup?   | `Array<TooltipMessageGroupItem>`<sup>1</sup> | Multiple titles/descriptions                                                                  |
| position?       | `string`                                     | Css style positions: top/bottom/left/right                                                    |
| customSvg?       | `any`                                     | A direct svg code or a component with svg                                                                       |
| className?      | `string`                                     | Custom class                                                                                  |
| width?          | `number`                                     | Width of the text holder                                                                      |
| theme?          | `string`                                     | Based on SEB predefined colors. (default: `'default'`)<sup>2</sup>                            |
| triggerOnHover? | `boolean`                                    | Enables the ability to show the tooltip on hover, click will be disabled (default: `'false'`) |

## Public Methods
These are the public methods accessible via [React ref](https://reactjs.org/docs/refs-and-the-dom.html)

| Name         | Parameters | type                     | Description                        |
| ------------ | ---------- | ------------------------ | ---------------------------------- |
| forceDismiss | event?     | `MouseEvent`<sup>3</sup> | Forces the tooltip to dismiss once |
| forceShow    |            |                          | Forces the tooltip to show once    |

##### Example usage of forceDismiss and ref. This example shows how to allow the tooltip to be dismissed when clicked outside
```javascript
const ExampleContainer: React.StatelessComponent = () => {
    MyTooltip: Tooltip;

    return (
        <div className="example-container" onClick={(e) => this.MyTooltip.forceDismiss(e)}>
            <Tooltip
                message="Tooltip message"
                ref={(el: Tooltip) => { this.MyTooltip = el; }}
            />
        </div>
    );
}
```

## Footnote
1. `messageGroup` items has an exported interface named `TooltipMessageGroupItem`
```typescript
{
      title: string,
      message: string
}
```
2. Supported themes: `default`, `light`, `primary`, `warning`, `success`, `danger`, `purple`
3. Mouse event is used to determine if the clicked happened outside the tooltip to dismiss it. If you wanted to force it to dismiss regardless, you should not pass the event.

:::iframe(https://github.sebank.se/pages/DesignLibrary/ReactComponents/#/tooltip?mode=DL, 350)
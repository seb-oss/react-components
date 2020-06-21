---
title: Checkbox
componentid: component-checkbox
variantid: default
guid: "checkbox-guid-default-component-react"
---

## Element name

```javascript
Name: CheckBox Component
Component: "CheckBox"
Selector: "<CheckBox/>"
Import: "@sebgroup/react-components/dist/CheckBox"
Type: Form Component
```

## Element information

This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `CheckBox` and the selector is `<CheckBox/>`.

## Basic use

```html
<CheckBox
    label="Checkbox label"
    checked={checkboxValue}
    onChange={onChangeHandler}
/>
```

## Properties

This component extends all native attributes of `HTMLInputElement`, while offering the following customizations:

| Property     | Type                    | Description                                                 |
| ------------ | ----------------------- | ----------------------------------------------------------- |
| description? | `string`                | Description to be displayed underneath the checkbox element |
| inline?      | `boolean`               | Displays the checkbox inline                                |
| label        | `string`                | Label to be displayed next to the checkbox                  |
| indicator    | `Indicator`<sup>1</sup> | Indicator for error, warning or success                     |
| wrapperProps | `HTMLDivElement`        | Div wrapper props                                           |

## Footnote

1. `Indicator` interface
   ```typescript
   interface Indicator {
       type: "danger" | "warning" | "success";
       message?: React.ReactNode;
   }
   ```
2. To wrap multiple checkbox with a single indicator, use `FeedbackIndicator` component like such ([output](#footnote-2-example)):
   ```html
   <FeedbackIndicator type="danger" message="Error message here">
       <CheckBox label="First" />
       <CheckBox label="Second" />
    </FeedbackIndicator>
   ```
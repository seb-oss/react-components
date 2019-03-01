---
title: Notification
componentid: component-notification
variantid: default
guid: 'notification-guid-default-component-react'
---

## Element name
```javascript
Name: Notification Component
Component: "Notification"
Selector: "<Notification/>"
Import: "@sebgroup/react-components/dist/Notification"
Type: UI Component
```

## Element information 
This React component supports customization and configurations. The component name is `Notification` and the selector is `<Notification/>`.

## Basic use
```html
<Notification
      toggle={notificationToggle}
      title="Some title"
      message="This is a description"
      onDismiss={dismissHandler}
/>
```

## Properties
These are the current available properties:

| Property        | Type                                    | Descrition                                                                                      |
| --------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| toggle          | `boolean`                               | element toggle                                                                                  |
| style?          | `string`                                | notification style<sup>1</sup> (default: `slide-in`)                                            |
| position?       | `string`                                | element position<sup>2</sup> (default: `bottom-left` on `slide-in` style, `top` on `bar` style) |
| theme?          | `string`                                | notification theme<sup>3</sup> (default: `purple`)                                              |
| title? *        | `string`                                | notification title                                                                              |
| message         | `string`                                | notification message                                                                            |
| persist?        | `boolean`                               | persist notification until dismissed (default: `false`)                                         |
| dismissable?    | `boolean`                               | enable dismiss in UI (default: `false`)                                                         |
| dismissTimeout? | `number`                                | dismiss timeout in miliseconds if not `dismissable` and not `persistant` (default: `5000`)      |
| actions? *      | `Array<NotificationAction>`<sup>4</sup> | display action buttons - max: 2 actions                                                         |
| onClick?        | `() => void`                            | click handler                                                                                   |
| onDismiss       | `() => void`                            | dismiss handler                                                                                 |
| className?      | `string`                                | custom class                                                                                    |

## Footnote
1. Styles supported: `slide-in`, `bar`
2. Positions supported: `bottom-left`, `bottom-right`, `top-left`, `top-right` for `slide-in` style - `top`, `bottom` for `bar` style
3. Themes supported: `purple`, `primary`, `danger`, `success`, `warning`, `inverted`
4. `actions` has an exported interface named `NotificationAction`

```typescript
{
      text: string;
      action: () => void;
}
```

\* **Title and actions do not work when `bar` style is selected. Use your own code inside. Example:**
```html
<Notification
      toggle={toggler}
      style="bar"
      onDismiss={handler}>
      <div>content</div>
</Notification
```

:::iframe(https://github.sebank.se/pages/DesignLibrary/ReactComponents/#/notification?mode=DL, 260)
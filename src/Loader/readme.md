---
title: Loader
componentid: component-loader
variantid: default
guid: "loader-guid-default-component-react"
---

## Element name

```javascript
Name: Loader Component
Component: "Loader"
Selector: "<Loader/>"
Import: "@sebgroup/react-components/dist/Loader"
Type: UI Component
```

## Element information

This React component supports customization and configurations. The component name is `Loader` and the selector is `<Loader/>`.

## Basic use

```html
<!-- Basic -->
<Loader />
<!-- fullscreen with a text -->
<Loader fullscreen>Loading, please wait...</Loader>
<!-- inside a button -->
<Button disabled>Saving...<Loader className="ml-2" /></Button>
```

## Properties

This component extends all native attributes of `HTMLDivElement`, while offering the following customizations:

| Property    | Type      | Description                                                                |
| ----------- | --------- | -------------------------------------------------------------------------- |
| size?       | `string`  | Loader size. Supported sizes: `xs`, `sm`, `md`, `lg`                       |
| type?       | `string`  | Loader types. Supportes types: `spinner`, `square`                         |
| cover?      | `boolean` | Have the loader take over it's parent                                      |
| fullscreen? | `boolean` | Have the loader take over the screen                                       |
| backdrop?   | `boolean` | Dims the background the background to indicate UI interactions are blocked |
| srText?     | `string`  | Screen reader text. Default is `Loading...`                                |
| toggle?     | `boolean` | Show or hide the loader. Default is `true`                                 |

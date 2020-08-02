---
title: Video Holder
componentid: component-videoholder
variantid: default
guid: "videoholder-guid-default-component-react"
---

## Element name

```javascript
Name: Video Holder Component
Component: "Video"
Selector: "<Video/>"
Import: "@sebgroup/react-components/dist/Video"
Type: Other Component
```

## Element information

This React component supports customization and configurations. The component name is `Video` and the selector is `<Video/>`.

## Basic use

```html
<video
    name="myYoutubeVideo"
    src="{youtubeVideoSrc}"
    width="535px"
    height="300px"
    sourceType="stream"
    showControls="{true}"
/>
```

## Properties

These are the current available properties:

| Property         | Type      | Description                                                   |
| ---------------- | --------- | ------------------------------------------------------------- |
| allowFullScreen? | `boolean` | Allow toggling full screen (default: `false`)                 |
| autoplay?        | `boolean` | Enable autoplay (some browser don't support this feature)     |
| className?       | `string`  | Custom class                                                  |
| height           | `string`  | This is css height such as 100% or 300px                      |
| id?              | `string`  | Element id                                                    |
| loop?            | `boolean` | Enable loop after video is finished                           |
| name             | `string`  | Element name                                                  |
| showControls?    | `boolean` | Show controls (default: `false`)                              |
| showInfo?        | `boolean` | Show video information (`stream` only) (default: `false`)     |
| sourceType       | `string`  | `local` for locally stored video, `stream` for streamed video |
| src              | `string`  | Your image source, it can be string<sup>1</sup>               |
| width            | `string`  | This is css width such as 100% or 300px                       |

## Footnote

1. Video source is obtained either:
    - `Local`: use `require()` method to require the video into your source code and use the returned string as `src`.
    - `Stream`: grab only the url from the **embed** sharing option and use it as `src`.

---
title: Video Holder
componentid: component-videoholder
variantid: default
guid: 'videoholder-guid-default-component-react'
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
<Video
    name="myYoutubeVideo"
    src={youtubeVideoSrc}
    width="535px"
    height="300px"
    sourceType="stream"
    showControls={true}
/>
```

## Properties
These are the current available properties:

| Property         | Type      | Descrition                                                    |
| ---------------- | --------- | ------------------------------------------------------------- |
| src              | `string`  | your image source, it can be string<sup>1</sup>               |
| width            | `string`  | this is css width such as 100% or 300px                       |
| height           | `string`  | this is css height such as 100% or 300px                      |
| name             | `string`  | element name                                                  |
| sourceType       | `string`  | `local` for locally stored video, `stream` for streamed video |
| className?       | `string`  | custom class                                                  |
| autoplay?        | `boolean` | enable autoplay (some browser don't support this feature)     |
| loop?            | `boolean` | enable loop after video is finished                           |
| showControls?    | `boolean` | show controls (default: `false`)                              |
| showInfo?        | `boolean` | show video information (`stream` only) (default: `false`)     |
| allowFullScreen? | `boolean` | allow toggling full screen (default: `false`)                 |

## Footnote
1. Video source is obtained either:
      * `Local`: use `require()` method to require the video into your source code and use the returned string as `src`.
      * `Stream`: grab only the url from the **embed** sharing option and use it as `src`.

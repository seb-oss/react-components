---
title: TextArea
componentid: component-textarea
variantid: default
guid: 'textarea-guid-default-component-react'
---

## Element name
```javascript
Name: TextArea Component
Component: "TextArea"
Selector: "<TextArea/>"
Import: "@sebgroup/react-components/dist/TextArea"
Type: Form Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `TextArea` and the selector is `<TextArea/>`.

## Basic use
```html
<TextArea
    name="textArea"
    placeHolder="Text Area PlaceHolder"
    value={this.state.textBoxValue}
    cols={30}
    rows={5}
    onChange={(event) => { this.setState({ textBoxValue: event.target.value }); }}
/>
```

## Properties
These are the current available properties:

| Property     | Type                                                        | Description                                 |
| ------------ | ----------------------------------------------------------- | ------------------------------------------- |
| value        | `string`                                                    | Value string                                |
| name         | `string`                                                    | Name string                                 |
| onChange     | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void`   | On `'change'` event                         |
| onKeyDown?   | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keydown'` event                        |
| onKeyUp?     | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keyup'` event                          |
| onKeyPress?  | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keypress'` event                       |
| onFocus?     | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'focus'` event                          |
| onBlur?      | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'blur'` event                           |
| label?       | `string`                                                    | The small label on top of the textbox       |
| error?       | `string`                                                    | Error text                                  |
| placeHolder? | `string`                                                    | Placeholder text                            |
| className?   | `string`                                                    | Custom class                                |
| id?          | `string`                                                    | Element id                                  |
| focus?       | `boolean`                                                   | Enable autofocus. (default: `false`)        |
| readonly?    | `boolean`                                                   | Make textatrea readonly. (default: `false`) |
| disabled?    | `boolean`                                                   | Disable textarea. (default: `false`)        |
| cols?        | `number`                                                    | Jumber of cols                              |
| rows?        | `number`                                                    | Number of rows                              |
| resizable?   | `boolean`                                                   | Disable textarea resize. (default: `true`)  |
| max?         | `number`                                                    | Input max length                            |
| reference?   | `React.RefObject<HTMLTextAreaElement>`                      | React Ref obj                               |

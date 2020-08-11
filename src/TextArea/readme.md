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
    placeholder="Text Area Placeholder"
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
| className?   | `string`                                                    | Custom class                                |
| cols?        | `number`                                                    | Jumber of cols                              |
| disabled?    | `boolean`                                                   | Disable textarea. (default: `false`)        |
| error?       | `string`                                                    | Error text                                  |
| focus?       | `boolean`                                                   | Enable autofocus. (default: `false`)        |
| id?          | `string`                                                    | Element id                                  |
| label?       | `string`                                                    | The small label on top of the textbox       |
| max?         | `number`                                                    | Input max length                            |
| name         | `string`                                                    | Name string                                 |
| onBlur?      | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'blur'` event                           |
| onChange     | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void`   | On `'change'` event                         |
| onFocus?     | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'focus'` event                          |
| onKeyDown?   | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keydown'` event                        |
| onKeyPress?  | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keypress'` event                       |
| onKeyUp?     | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keyup'` event                          |
| placeholder? | `string`                                                    | Placeholder text                            |
| readonly?    | `boolean`                                                   | Make textatrea readonly. (default: `false`) |
| reference?   | `React.RefObject<HTMLTextAreaElement>`                      | React Ref obj                               |
| resizable?   | `boolean`                                                   | Disable textarea resize. (default: `true`)  |
| rows?        | `number`                                                    | Number of rows                              |
| value        | `string`                                                    | Value string                                |

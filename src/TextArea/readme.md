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

| Property     | Type                                                        | Descrition                                  |
| ------------ | ----------------------------------------------------------- | ------------------------------------------- |
| value        | `string`                                                    | Value string                                |
| name         | `string`                                                    | Name string                                 |
| onChange     | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void`   | On `'change'` event                         |
| onKeyDown?   | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keydown'` event                        |
| onKeyUp?     | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keyup'` event                          |
| onKeyPress?  | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void` | On `'keypress'` event                       |
| onFocus?     | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'focus'` event                          |
| onBlur?      | `(event: React.FocusEvent<HTMLTextAreaElement>) => void`    | On `'blur'` event                           |
| cols?        | `number`                                                    | Jumber of cols                              |
| rows?        | `number`                                                    | Number of rows                              |
| className?   | `string`                                                    | Custom class                                |
| placeHolder? | `string`                                                    | Placeholder text                            |
| label?       | `string`                                                    | The small label on top of the textbox       |
| resizable?   | `boolean`                                                   | Disable textarea resize. (default: `true`)  |
| error?       | `string`                                                    | Error text                                  |
| disabled?    | `boolean`                                                   | Disable textarea. (default: `false`)        |
| focus?       | `boolean`                                                   | Enable autofocus. (default: `false`)        |
| readonly?    | `boolean`                                                   | Make textatrea readonly. (default: `false`) |
| max?         | `number`                                                    | Input max length                            |
| reference?   | `React.RefObject<HTMLTextAreaElement>`                      | React Ref obj                               |

:::iframe(https://github.sebank.se/pages/DesignLibrary/ReactComponents/#/textarea?mode=DL, 400)
---
title: TextBox
componentid: component-input
variantid: default
guid: 'input-textbox-guid-default-component-react'
---

## Element name
```javascript
Name: TextBox Component
Component: "TextBox"
Selector: "<TextBox/>"
Import: "@sebgroup/react-components/dist/TextBox"
Type: Form Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `TextBox` and the selector is `<TextBox/>`.

## Basic use
```html
<TextBox
    name="textInput"
    placeholder="Text Box placeholder"
    value={this.state.textBox}
    onChange={(event) => { this.setState({ textBoxValue: event.target.value }); }}
/>
```

## Properties
These are the current available properties:

| Property      | Type                                                     | Description                                     |
| ------------- | -------------------------------------------------------- | ----------------------------------------------- |
| value         | `string`                                                 | Value string                                    |
| name          | `string`                                                 | Name string                                     |
| id?           | `string`                                                 | Id string                                       |
| pattern?      | `string`                                                 | Pattern string                                  |
| required?     | `boolean`                                                | Required atribute                               |
| minLength?    | `number`                                                 | Input min length                                |
| maxLength?    | `number`                                                 | Input max length                                |
| onChange      | `(event: React.ChangeEvent<HTMLInputElement>) => void`   | On `'change'` event                             |
| onKeyDown?    | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keydown'` event                            |
| onKeyUp?      | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keyup'` event                              |
| onKeyPress?   | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keypress'` event                           |
| onFocus?      | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'focus'` event                              |
| onBlur?       | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'blur'` event                               |
| type?         | `string`                                                 | Input type. (default: `'text'`)                 |
| label?        | `string`                                                 | The small label on top of the textbox           |
| error?        | `string`                                                 | Error text                                      |
| placeHolder?  | `string`                                                 | Placeholder text                                |
| className?    | `string`                                                 | Custom class                                    |
| focus?        | `boolean`                                                | Enable autofocus. (default: `false`)            |
| readonly?     | `boolean`                                                | Make input element readonly. (default: `false`) |
| disabled?     | `boolean`                                                | Disable input element. (default: `false`)       |
| autoComplete? | `boolean`                                                | Enable autocomplete. (default: `false`)         |
| reference?    | `React.RefObject<HTMLInputElement>`                      | React Ref obj                                   |

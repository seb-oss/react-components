---
title: TextBox
componentid: component-input
variantid: default
guid: "input-textbox-guid-default-component-react"
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
<TextBox name="textInput" placeholder="Text Box placeholder" value={this.state.textBox} onChange={(event) => {
this.setState({ textBoxValue: event.target.value }); }} />
```

## Properties

These are the current available properties:

| Property          | Type                                                     | Description                                                 |
| ----------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| autoComplete?     | `on` or `off`                                            | Enable autocomplete                                         |
| className?        | `string`                                                 | Custom class                                                |
| disabled?         | `boolean`                                                | Disable input element. (default: `false`)                   |
| error?            | `string`                                                 | Error text                                                  |
| focus?            | `boolean`                                                | Enable autofocus. (default: `false`)                        |
| id?               | `string`                                                 | Id string                                                   |
| label?            | `string`                                                 | The small label on top of the textbox                       |
| maxLength?        | `number`                                                 | Input max length                                            |
| minLength?        | `number`                                                 | Input min length                                            |
| name              | `string`                                                 | Name string                                                 |
| onBlur?           | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'blur'` event                                           |
| onChange          | `(event: React.ChangeEvent<HTMLInputElement>) => void`   | On `'change'` event                                         |
| onFocus?          | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'focus'` event                                          |
| onKeyDown?        | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keydown'` event                                        |
| onKeyPress?       | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keypress'` event                                       |
| onKeyUp?          | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keyup'` event                                          |
| pattern?          | `string`                                                 | Pattern string                                              |
| placeholder?      | `string`                                                 | Placeholder text                                            |
| readOnly?         | `boolean`                                                | Make input element readonly. (default: `false`)             |
| reference?        | `React.RefObject<HTMLInputElement>`                      | React Ref obj                                               |
| required?         | `boolean`                                                | Required atribute                                           |
| showErrorMessage? | `boolean`                                                | Show or hide the error message<sup>1</sup>(default: `true`) |
| success           | `boolean`                                                | Success status                                              |
| type?             | `string`                                                 | Input type. (default: `'text'`)                             |
| value             | `string`                                                 | Value string                                                |

## Footnote

1. Showing or hiding the error message does not affect the <span style="color: red">red</span> border indicator for the property `error`

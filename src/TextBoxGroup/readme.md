---
title: TextBoxGroup
componentid: component-input
variantid: group
guid: 'input-textboxgroup-guid-default-component-react'
---

## Element name
```javascript
Name: TextBoxGroup Component
Component: "TextBoxGroup"
Selector: "<TextBoxGroup/>"
Import: "@sebgroup/react-components/dist/TextBoxGroup"
Type: Form Component
```

## Element information 
This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `TextBoxGroup` and the selector is `<TextBoxGroup/>`. This component support custom svg icon, which can be fully style via css classes. We use SVG code directly as we can change its color or size at any moment, like when you are hover over. Rememer to change the color of SVG, you should target svg and use `fill` property instead of `color`.

## Basic use
```html
<TextBoxGroup
    name="textInput"
    placeholder="Text Box placeholder"
    value={this.state.textBox}
    onChange={(event) => { this.setState({ textBoxGroupValue: event.target.value }); }}
/>
```

## Properties
These are the current available properties:

| Property      | Type                                                     | Description                                              |
| ------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| autoComplete? | `boolean`                                                | Enable autocomplete. (default: `false`)                  |
| className?    | `string`                                                 | Custom class                                             |
| disabled?     | `boolean`                                                | Disable input element. (default: `false`)                |
| error?        | `string`                                                 | Error text                                               |
| focus?        | `boolean`                                                | Enable autofocus. (default: `false`)                     |
| id?           | `string`                                                 | Id string                                                |
| label?        | `string`                                                 | The small label on top of the textbox                    |
| leftIcon?     | `any`                                                    | Left, You can pass a component or a `SVG` directly here  |
| leftText?     | `string`                                                 | Left side text                                           |
| leftTitle?    | `string`                                                 | Left side HTML title                                     |
| maxLength?    | `number`                                                 | Input max length                                         |
| minLength?    | `number`                                                 | Input min length                                         |
| name          | `string`                                                 | Name string                                              |
| onBlur?       | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'blur'` event                                        |
| onChange      | `(event: React.ChangeEvent<HTMLInputElement>) => void`   | On `'change'` event                                      |
| onFocus?      | `(event: React.FocusEvent<HTMLInputElement>) => void`    | On `'focus'` event                                       |
| onKeyDown?    | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keydown'` event                                     |
| onKeyPress?   | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keypress'` event                                    |
| onKeyUp?      | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | On `'keyup'` event                                       |
| onLeftClick?  | `(event: React.MouseEvent<HTMLDivElement>) => void`      | Click event on Left icon                                 |
| onRightClick? | `(event: React.MouseEvent<HTMLDivElement>) => void`      | Click event on Right icon                                |
| pattern?      | `string`                                                 | Pattern string                                           |
| placeHolder?  | `string`                                                 | Placeholder text                                         |
| readonly?     | `boolean`                                                | Make input element readonly. (default: `false`)          |
| reference?    | `React.RefObject<HTMLInputElement>`                      | React Ref obj                                            |
| required?     | `boolean`                                                | Required atribute                                        |
| rightIcon?    | `any`                                                    | Right, You can pass a component or a `SVG` directly here |
| rightText?    | `string`                                                 | Right side text                                          |
| rightTitle?   | `string`                                                 | Right side HTML title                                    |
| type?         | `string`                                                 | Input type. (default: `'text'`)                          |
| value         | `string | number`                                        | Value string                                             |

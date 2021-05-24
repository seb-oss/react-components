import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@common/Layout";
import { CodeSnippet } from "@common/CodeSnippet";
import { useDynamicForm, DynamicFormSection, DynamicFormItem, DynamicFormOption } from "@sebgroup/react-components/hooks";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@sebgroup/react-components/Table";
import { Button } from "@sebgroup/react-components/Button";
import { isEmpty } from "@sebgroup/frontend-tools";

const DynamicForms: React.FC = React.memo(() => {
    return (
        <Layout>
            <Helmet>
                <title>Dynamic Forms - SEB React Components</title>
            </Helmet>
            <div className="container">
                <h1 className="pt-5 pb-3">Dynamic Forms</h1>
                <h4 className="font-weight-normal">How to use Dynamic Forms Custom Hook to speed up building simple forms.</h4>

                <div role="alert" className="alert alert-warning rounded mt-3 py-3">
                    <strong>⚠ Dynamic Forms custom hook is still in beta stage so expect things to change (please provide feedback if you can)</strong>
                </div>

                <h2 className="pt-3 pb-3">Basic Usage</h2>
                <p>
                    Import the hook, define the <code>DynamicFormSection</code>s and render the form.
                </p>
                <CodeSnippet language="javascript">
                    {`
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const Component = () => {
  const sections = [
    {
      title: "Login",
      key: "section-1-login",
      items: [
        {
          key: "name",
          label: "Name",
          order: 1,
          controlType: "Text"
        },
        {
          key: "email",
          label: "Email",
          placeholder: "name@domain.com",
          order: 2,
          controlType: "Text"
        },
        {
          key: "user-accepted",
          label: "I understand",
          order: 3,
          value: true,
          controlType: "Checkbox"
        }
      ]
    }
  ];

  const [renderForm, state] = useDynamicForm(sections);

  // the state of the form with all the current values
  console.log(state)

  return <div>{renderForm()}</div>;
};

export default Component;
                    `}
                </CodeSnippet>

                <div className="p-3 rounded bg-white">
                    <Component />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Conditional rendering example</h2>
                <p>
                    Define the <b>condition</b> and the <b>rulerKey</b> of the <code>DynamicFormItem</code> to render that item based on the value of another item.
                </p>
                <CodeSnippet language="javascript">
                    {`
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const ComponentConditionalRender: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            title: "Extra Info",
            key: "section-2-extra-info",
            items: [
                {
                    key: "have-additional-info",
                    label: "I have additional information",
                    order: 1,
                    value: false,
                    controlType: "Checkbox"
                },
                {
                    key: "info",
                    order: 2,
                    placeholder: "Additional information",
                    controlType: "Text",
                    // this component will be shown only when 
                    // "have-additional-info" component's value is true
                    rulerKey: "have-additional-info",
                    condition: true
                }
            ],
        },
    ];

    const [renderForm, state] = useDynamicForm(sections);

    return <div>{renderForm()}</div>;
};

export default ComponentConditionalRender;
                    `}
                </CodeSnippet>
                <div className="p-3 rounded bg-white">
                    <ComponentConditionalRender />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Form errors example</h2>
                <p>Every form element defined can display an error message based on any validation rules you define yourself. Simply set the errors for that key as shown in the code snippet below.</p>
                <CodeSnippet language="javascript">
                    {`
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { isEmpty } from "@sebgroup/frontend-tools";

const FormWithErrors: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            key: "section-3-errors",
            items: [
                {
                    key: "normal",
                    label: "Non mandatory field",
                    order: 1,
                    value: false,
                    controlType: "Checkbox",
                },
                {
                    key: "with-error",
                    order: 2,
                    label: "Mandatory field",
                    controlType: "Text",
                },
            ],
        },
    ];

    const [renderForm, state, , setErrors] = useDynamicForm(sections);

    const validate = () => {
        if (!isEmpty(state) && !isEmpty(state["section-3-errors"])) {
            setErrors((existing) => {
                return {
                    ...existing,
                    "section-3-errors": {
                        ...existing["section-3-errors"],
                        "with-error": !state["section-3-errors"]["with-error"] ? "Please fill in this field" : null,
                    },
                };
            });
        }
    };

    return (
        <>
            <div>{renderForm()}</div>
            <Button className="mt-3" onClick={validate}>Validate</Button>
        </>
    );
};

export default FormWithErrors;
                    `}
                </CodeSnippet>
                <div className="p-3 rounded bg-white">
                    <FormWithErrors />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Full example</h2>
                <p>A complete example of every form element with label, description and optional error message. All form elements use responsive layout.</p>
                <CodeSnippet language="javascript">
                    {`
import { useDynamicForm, DynamicFormSection, DynamicFormItem, DynamicFormOption } from "@sebgroup/react-components/hooks";

const ShowMeEverything: React.FC = () => {
    const COMMON_ITEM: Partial<DynamicFormItem> = {
        wrappingElement: "div",
        additionalProps: {
            className: "col-12 col-sm-6 col-md-4 mb-2",
        },
    };

    const valueItems: DynamicFormItem[] = (["Text", "Textarea", "Datepicker", "Stepper", "Checkbox"] as DynamicFormItem["controlType"][]).map(
        (controlType: DynamicFormItem["controlType"], i: number) => {
            return {
                key: controlType,
                label: \`\${controlType} label\`,
                description: \`\${controlType} description\`,
                order: i,
                controlType,
                ...COMMON_ITEM,
            };
        }
    );

    const options: DynamicFormOption[] = [
        { key: "one", label: "One", value: "1" },
        { key: "two", label: "Two", value: "2" },
        { key: "three", label: "Three", value: "3" },
    ];

    const multiSingleItems: DynamicFormItem[] = (["Radio", "Dropdown"] as DynamicFormItem["controlType"][]).map((controlType: DynamicFormItem["controlType"], i: number) => {
        return {
            key: controlType,
            label: \`\${controlType} label\`,
            description: \`\${controlType} description\`,
            multi: false,
            order: i,
            options: [
                ...options.map((e) => {
                    return { ...e, key: \`\${e.key}-multi-single\` };
                }),
            ],
            controlType,
            ...COMMON_ITEM,
        };
    });

    const multiManyItems: DynamicFormItem[] = (["Dropdown", "Option"] as DynamicFormItem["controlType"][]).map((controlType: DynamicFormItem["controlType"], i: number) => {
        return {
            key: controlType,
            label: \`\${controlType} label\`,
            description: \`\${controlType} description\`,
            multi: true,
            order: i,
            options: [
                ...options.map((e) => {
                    return { ...e, key: \`\${e.key}-multi-many\` };
                }),
            ],
            controlType,
            ...COMMON_ITEM,
        };
    });

    const COMMON_SECTION: Partial<DynamicFormItem> = {
        wrappingElement: "section",
        additionalProps: {
            className: "row d-flex flex-wrap mb-2",
        },
    };

    const sections: DynamicFormSection[] = [
        {
            key: "value-items-section",
            title: "Simple single values only",
            items: valueItems,
            ...COMMON_SECTION,
        },
        {
            key: "multi-single-items-section",
            title: "Choose one of many options",
            items: multiSingleItems,
            ...COMMON_SECTION,
        },
        {
            key: "multi-many-items-section",
            title: "Choose any of multiple options",
            items: multiManyItems,
            ...COMMON_SECTION,
        },
    ];

    const [renderForm, state,, setErrors] = useDynamicForm(sections);

    const validate = () => {
        setErrors({
            "value-items-section": {
                Text: "Text error message",
                Textarea: "Textarea error message",
                Checkbox: "Checkbox error message",
                Datepicker: "Datepicker error message",
                Stepper: "Stepper error message",
            },
            "multi-single-items-section": {
                Radio: "Radio error message",
                Dropdown: "Dropdown error message",
            },
            "multi-many-items-section": {
                Dropdown: "Dropdown error message",
                Option: "Option error message",
            },
        });
    };

    return (
        <>
            <div>{renderForm()}</div>
            <div>
                <Button onClick={validate}>
                    Show errors
                </Button>
                <Button className="ml-3" onClick={() => alert(JSON.stringify(state, null, 4))}>
                    Show current values
                </Button>
            </div>
        </>
    );
};

export default ShowMeEverything;
                    `}
                </CodeSnippet>
                <div className="p-3 rounded bg-white">
                    <ShowMeEverything />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Dynamic forms API</h2>
                <h3 className="pt-3 pb-3">
                    <code>DynamicFormSection</code>
                </h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Property name</TableHeaderCell>
                            <TableHeaderCell>Optional</TableHeaderCell>
                            <TableHeaderCell>Value type</TableHeaderCell>
                            <TableHeaderCell>Info</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>key</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>Required unique id of this element</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>title</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>The title of the header of the section</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>order</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>number</code>
                            </TableCell>
                            <TableCell>
                                Optional order of the section. Any number, lower number will be displayed before. If order is not provided the original order of the array will be used.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>items</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`Array<DynamicFormItem>`}</code>
                            </TableCell>
                            <TableCell>The form items that belong to that section.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>wrappingElement</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`"div" | "section" | "none"`}</code>
                            </TableCell>
                            <TableCell>The wrapping element (if any) for the form items of that section. Defaut: "none"'.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>additionalProps</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`{ [k: string]: any; }`}</code>
                            </TableCell>
                            <TableCell>Any additional element props to be mapped to the wrappingElement (if one is enabled).</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h3 className="pt-3 pb-3">
                    <code>DynamicFormItem</code>
                </h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Property name</TableHeaderCell>
                            <TableHeaderCell>Optional</TableHeaderCell>
                            <TableHeaderCell>Value type</TableHeaderCell>
                            <TableHeaderCell>Info</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>key</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>Required unique id of this element</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>controlType</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <code>"Hidden" | "Text" | "Textarea" | "Checkbox" | "Dropdown" | "Datepicker" | "Radio" | "Option" | "ErrorLabel" | "Stepper"</code>
                            </TableCell>
                            <TableCell>Required type of element (or control). Default: "Text".</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>value</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`string | string[] | Date | boolean | number | null`}</code>
                            </TableCell>
                            <TableCell>Optional initial value of the element when it gets created.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>order</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>number</code>
                            </TableCell>
                            <TableCell>The order of this item. Any number, lower number will be displayed before.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>label</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>An optional label displayead above the form field.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>description</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>An optional description displayed below the form field.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>multi</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>boolean</code>
                            </TableCell>
                            <TableCell>
                                This will enable 'multiple' property for the <code>Dropdown</code> component
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>min</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`number | Date`}</code>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The 'min' property which will applied to the following components: <code>Stepper</code>, <code>Datepicker</code>
                                </p>
                                <p>
                                    This will also apply the 'minLength' property of <code>Text</code> and <code>TextArea</code>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>max</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`number | Date`}</code>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The 'max' property which will applied to the following components: <code>Stepper</code>, <code>Datepicker</code>
                                </p>
                                <p>
                                    This will also apply the 'maxLength' property of <code>Text</code> and <code>TextArea</code>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>placeholder</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>
                                The 'placeholder' property which will applied to the following components: <code>Text</code>, <code>Textarea</code>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>options</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`Array<DynamicFormOption>`}</code>
                            </TableCell>
                            <TableCell>
                                Defines all the available options for the following components: <code>Dropdown</code>, <code>Radio</code>, <code>Option</code>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>valueType</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`"string" | "number"`}</code>
                            </TableCell>
                            <TableCell>
                                Sets the <code>type</code> property of the <code>Text</code> component.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>rulerKey</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>
                                <b>Conditional rendering:</b> The key of the element within the same section to check and decide if this element should be visible. The <b>condition</b> property must
                                also be set.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>condition</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`string | string[] | Date | boolean | number | null`}</code>
                            </TableCell>
                            <TableCell>
                                <b>Conditional rendering:</b> The exact value of the <b>rulerKey</b> element, as the condition for this element to be rendered. The type of value must be the same as
                                the <b>rulerKey</b> item.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>additionalProps</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`{ [k: string]: any; }`}</code>
                            </TableCell>
                            <TableCell>
                                Any additional element props to be mapped to the element. Depends on the <b>controlType</b>. Must be a valid prop for that element.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>wrappingElement</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`"div" | "section" | "none"`}</code>
                            </TableCell>
                            <TableCell>The wrapping element (if any) for the form item. It wraps the label, element, error message and description in the chosen element. Defaut: "none"'.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>additionalProps</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`{ [k: string]: any; }`}</code>
                            </TableCell>
                            <TableCell>Any additional element props to be mapped to the wrappingElement (if one is enabled).</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h3 className="pt-3 pb-3">
                    <code>{`DynamicFormOption<T = any>`}</code>
                </h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Property name</TableHeaderCell>
                            <TableHeaderCell>Optional</TableHeaderCell>
                            <TableHeaderCell>Value type</TableHeaderCell>
                            <TableHeaderCell>Info</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>key</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>Required unique id of this option</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>value</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>T</code>
                            </TableCell>
                            <TableCell>The value of the option.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>label</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>The label of the option.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>description</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>string</code>
                            </TableCell>
                            <TableCell>
                                An optional description displayed below the label for the <code>Radio</code> component.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>formElementAdditionalProps</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`{ [k: string]: any; }`}</code>
                            </TableCell>
                            <TableCell>
                                Any additional element props to be mapped to the element. Depends on the <b>controlType</b>. Must be a valid prop for that element.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
});

export default DynamicForms;

const Component: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            title: "Login",
            key: "section-1-login",
            items: [
                {
                    key: "name",
                    label: "Name",
                    order: 1,
                    controlType: "Text",
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "name@domain.com",
                    order: 2,
                    controlType: "Text",
                },
                {
                    key: "user-accepted",
                    label: "I understand",
                    order: 3,
                    value: true,
                    controlType: "Checkbox",
                },
            ],
        },
    ];

    const [renderForm, state] = useDynamicForm(sections);

    return <div>{renderForm()}</div>;
};

const ComponentConditionalRender: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            title: "Extra Info",
            key: "section-2-extra-info",
            items: [
                {
                    key: "have-additional-info",
                    label: "I have additional information",
                    order: 1,
                    value: false,
                    controlType: "Checkbox",
                },
                {
                    key: "info",
                    order: 2,
                    placeholder: "Additional information",
                    controlType: "Text",
                    rulerKey: "have-additional-info",
                    condition: true,
                },
            ],
        },
    ];

    const [renderForm, state] = useDynamicForm(sections);

    return <div>{renderForm()}</div>;
};

const FormWithErrors: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            key: "section-3-errors",
            items: [
                {
                    key: "normal",
                    label: "Non mandatory field",
                    order: 1,
                    value: false,
                    controlType: "Checkbox",
                },
                {
                    key: "with-error",
                    order: 2,
                    label: "Mandatory field",
                    controlType: "Text",
                },
            ],
        },
    ];

    const [renderForm, state, , setErrors] = useDynamicForm(sections);

    const validate = () => {
        if (!isEmpty(state) && !isEmpty(state["section-3-errors"])) {
            setErrors((existing) => {
                return {
                    ...existing,
                    "section-3-errors": {
                        ...existing["section-3-errors"],
                        "with-error": !state["section-3-errors"]["with-error"] ? "Please fill in this field" : null,
                    },
                };
            });
        }
    };

    return (
        <>
            <div>{renderForm()}</div>
            <Button className="mt-3" onClick={validate}>
                Validate
            </Button>
        </>
    );
};

const ShowMeEverything: React.FC = () => {
    const COMMON_ITEM: Partial<DynamicFormItem> = {
        wrappingElement: "div",
        additionalProps: {
            className: "col-12 col-sm-6 col-md-4 mb-2",
        },
    };

    const valueItems: DynamicFormItem[] = (["Text", "Textarea", "Datepicker", "Stepper", "Checkbox"] as DynamicFormItem["controlType"][]).map(
        (controlType: DynamicFormItem["controlType"], i: number) => {
            return {
                key: controlType,
                label: `${controlType} label`,
                description: `${controlType} description`,
                order: i,
                controlType,
                ...COMMON_ITEM,
            };
        }
    );

    const options: DynamicFormOption[] = [
        { key: "one", label: "One", value: "1" },
        { key: "two", label: "Two", value: "2" },
        { key: "three", label: "Three", value: "3" },
    ];

    const multiSingleItems: DynamicFormItem[] = (["Radio", "Dropdown"] as DynamicFormItem["controlType"][]).map((controlType: DynamicFormItem["controlType"], i: number) => {
        return {
            key: controlType,
            label: `${controlType} label`,
            description: `${controlType} description`,
            multi: false,
            order: i,
            options: [
                ...options.map((e) => {
                    return { ...e, key: `${e.key}-multi-single` };
                }),
            ],
            controlType,
            ...COMMON_ITEM,
        };
    });

    const multiManyItems: DynamicFormItem[] = (["Dropdown", "Option"] as DynamicFormItem["controlType"][]).map((controlType: DynamicFormItem["controlType"], i: number) => {
        return {
            key: controlType,
            label: `${controlType} label`,
            description: `${controlType} description`,
            multi: true,
            order: i,
            options: [
                ...options.map((e) => {
                    return { ...e, key: `${e.key}-multi-many` };
                }),
            ],
            controlType,
            ...COMMON_ITEM,
        };
    });

    const COMMON_SECTION: Partial<DynamicFormItem> = {
        wrappingElement: "section",
        additionalProps: {
            className: "row d-flex flex-wrap mb-2",
        },
    };

    const sections: DynamicFormSection[] = [
        {
            key: "value-items-section",
            title: "Simple single values only",
            items: valueItems,
            ...COMMON_SECTION,
        },
        {
            key: "multi-single-items-section",
            title: "Choose one of many options",
            items: multiSingleItems,
            ...COMMON_SECTION,
        },
        {
            key: "multi-many-items-section",
            title: "Choose any of multiple options",
            items: multiManyItems,
            ...COMMON_SECTION,
        },
    ];

    const [renderForm, state, , setErrors] = useDynamicForm(sections);

    const validate = () => {
        setErrors({
            "value-items-section": {
                Text: "Text error message",
                Textarea: "Textarea error message",
                Checkbox: "Checkbox error message",
                Datepicker: "Datepicker error message",
                Stepper: "Stepper error message",
            },
            "multi-single-items-section": {
                Radio: "Radio error message",
                Dropdown: "Dropdown error message",
            },
            "multi-many-items-section": {
                Dropdown: "Dropdown error message",
                Option: "Option error message",
            },
        });
    };

    return (
        <>
            <div>{renderForm()}</div>
            <div>
                <Button onClick={validate}>Show errors</Button>
                <Button className="ml-3" onClick={() => alert(JSON.stringify(state, null, 4))}>
                    Show current values
                </Button>
            </div>
        </>
    );
};

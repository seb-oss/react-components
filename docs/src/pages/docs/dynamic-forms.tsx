import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "@common/Layout";
import { CodeSnippet } from "@common/CodeSnippet";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@sebgroup/react-components/Table";
import { Indicator } from "@sebgroup/react-components/FeedbackIndicator";

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
const Component: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            title: "Login",
            key: "section-1-login",
            items: [
                {
                    key: "name",
                    label: "Name",
                    controlType: "Text",
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "name@domain.com",
                    controlType: "Text",
                },
                {
                    key: "user-accepted",
                    label: "I understand",
                    initialValue: true,
                    controlType: "Checkbox",
                },
            ],
        },
    ];

    const { renderForm } = useDynamicForm(sections);

    return <div>{renderForm()}</div>;
};
                    `}
                </CodeSnippet>

                <div className="p-3 rounded bg-white">
                    <Component />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Conditional rendering example</h2>
                <p>Every form element can be hidden based on any condition you define yourself. Simply set the visibility for that key as shown in the code snippet below.</p>
                <CodeSnippet language="javascript">
                    {`
const ComponentConditionalRender: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            title: "Extra Info",
            key: "section-2-extra-info",
            items: [
                {
                    key: "have-additional-info",
                    label: "I have additional information",
                    controlType: "Checkbox",
                },
                {
                    key: "info",
                    placeholder: "Additional information",
                    controlType: "Text",
                },
            ],
        },
    ];

    const { 
        renderForm, 
        meta: {
            "section-2-extra-info": {
                "have-additional-info": { hasTruthyValue }
            }
        }, 
        setHidden,
    } = useDynamicForm(sections);

    useEffect(() => {
        setHidden("section-2-extra-info", "info", !hasTruthyValue)
    }, [hasTruthyValue])

    return <div>{renderForm()}</div>;
};
                    `}
                </CodeSnippet>
                <div className="p-3 rounded bg-white">
                    <ComponentConditionalRender />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Form errors example</h2>
                <p>
                    Every form element defined can display an error message based on any validation rules you define yourself. Simply set the indicator for that key as shown in the code snippet below.
                </p>
                <CodeSnippet language="javascript">
                    {`
const FormWithErrors: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            key: "section",
            items: [
                {
                    key: "field",
                    description: "This is a mandatory field, but it shouldn't be too long",
                    controlType: "Text",
                },
            ],
        },
    ];

    const {
        renderForm,
        state: {
            "section": {
                "field": value
            }
        },
        setIndicator
    } = useDynamicForm(sections);

    useEffect(() => {
        let indicator: Indicator = {
            type: "success",
            message: "Perfect :)"
        };
        if (!value) {
            indicator = {
                type: "danger",
                message: "Please fill in this field!"  
            }
        } else if ((value as string)?.length > 15) {
            indicator = {
                type: "warning",
                message: "Too long :("  
            }
        }

        setIndicator("section", "field", indicator);
    }, [value]);

    return (
            <div>{renderForm()}</div>
    );
};
                    `}
                </CodeSnippet>
                <div className="p-3 rounded bg-white">
                    <FormWithErrors />
                </div>

                <hr />

                <h2 className="pt-3 pb-3">Dynamic forms API</h2>

                <h3 className="pt-3 pb-3">
                    <code>useDynamicForm</code>
                </h3>
                <p>
                    <code>type DynamicFormInternalStateValue = string | string[] | Date | boolean | number | null;</code>
                </p>
                <p>
                    <code>{`type DynamicFormMetaDataItem = { isVisible: boolean; hasIndicator: boolean; hasTruthyValue: boolean; }`}</code>
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Property name</TableHeaderCell>
                            <TableHeaderCell>Value type</TableHeaderCell>
                            <TableHeaderCell>Info</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>renderForm</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
() => JSX.Element
                                `}</pre>
                                </code>
                            </TableCell>
                            <TableCell>The callback function which will render the entire form.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>state</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
[k: string]: {
    [k: string]: DynamicFormInternalStateValue;
};
                                `}</pre>
                                </code>
                            </TableCell>
                            <TableCell>The current state of the form.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>patchState</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
(section: string, key: string, value: DynamicFormInternalStateValue) => void;
`}</pre>
                                </code>
                            </TableCell>
                            <TableCell>A helper utility to change the value of a particular item.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>setIndicator</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
(section: string, key: string, indicator: FeedbackIndicatorProps) => void;
`}</pre>
                                </code>
                            </TableCell>
                            <TableCell>A helper utility to set a feedback indicator of a particular item.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>setHidden</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
(section: string, key: string, hidden: boolean) => void;
`}</pre>
                                </code>
                            </TableCell>
                            <TableCell>A helper utility to set visibility of a particular item.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>meta</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
[k: string]: {
    [k: string]: DynamicFormMetaDataItem;
};
                                `}</pre>
                                </code>
                            </TableCell>
                            <TableCell>The metadata of each current field value in the form. Shows if each field is visible, has an indicator active or has a truthy value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>info</b>
                            </TableCell>
                            <TableCell>
                                <code>
                                    <pre style={{ color: "currentcolor" }}>{`
{ dirty: boolean; hasIndicators: boolean; isAllTruthy: boolean; }
                                `}</pre>
                                </code>
                            </TableCell>
                            <TableCell>Additional information about current state of the form.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

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
                                <b>initialValue</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`string | string[] | Date | boolean | number | null`}</code>
                            </TableCell>
                            <TableCell>Optional initial value of the element when it gets created.</TableCell>
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
                            <TableCell>An optional description displayed below the label and above the form field.</TableCell>
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
                                <b>additionalProps</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`{ [k: string]: any; }`}</code>
                            </TableCell>
                            <TableCell>
                                Any additional element props to be mapped to the underlying option element. Depends on the <b>controlType</b>. Must be a valid prop for that element.
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
                    controlType: "Text",
                },
                {
                    key: "email",
                    label: "Email",
                    placeholder: "name@domain.com",
                    controlType: "Text",
                },
                {
                    key: "user-accepted",
                    label: "I understand",
                    initialValue: true,
                    controlType: "Checkbox",
                },
            ],
        },
    ];

    const { renderForm } = useDynamicForm(sections);

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
                    controlType: "Checkbox",
                },
                {
                    key: "info",
                    placeholder: "Additional information",
                    controlType: "Text",
                },
            ],
        },
    ];

    const {
        renderForm,
        meta: {
            "section-2-extra-info": {
                "have-additional-info": { hasTruthyValue },
            },
        },
        setHidden,
    } = useDynamicForm(sections);

    useEffect(() => {
        setHidden("section-2-extra-info", "info", !hasTruthyValue);
    }, [hasTruthyValue]);

    return <div>{renderForm()}</div>;
};

const FormWithErrors: React.FC = () => {
    const sections: DynamicFormSection[] = [
        {
            key: "section",
            items: [
                {
                    key: "field",
                    description: "This is a mandatory field, but it shouldn't be too long",
                    controlType: "Text",
                },
            ],
        },
    ];

    const {
        renderForm,
        state: {
            section: { field: value },
        },
        setIndicator,
    } = useDynamicForm(sections);

    useEffect(() => {
        let indicator: Indicator = {
            type: "success",
            message: "Perfect :)",
        };
        if (!value) {
            indicator = {
                type: "danger",
                message: "Please fill in this field!",
            };
        } else if ((value as string)?.length > 15) {
            indicator = {
                type: "warning",
                message: "Too long :(",
            };
        }

        setIndicator("section", "field", indicator);
    }, [value]);

    return <div>{renderForm()}</div>;
};

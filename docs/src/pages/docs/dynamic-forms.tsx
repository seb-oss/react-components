import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@common/Layout";
import { CodeSnippet } from "@common/CodeSnippet";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@sebgroup/react-components/Table";

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
                <hr />

                <h3 className="pt-3 pb-3">Result</h3>
                <p>The above code produces this form:</p>

                <Component />

                {/**TODO: Add simple conditional render section */}

                <hr />

                <h2 className="pt-3 pb-3">DynamicForm APIs</h2>
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
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>order</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>number</code>
                            </TableCell>
                            <TableCell>The order of the section. Any number, lower number will be displayed before.</TableCell>
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
                                <b>value</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>{`string | string[] | DynamicFormOption | DynamicFormOption[] | Date | boolean | number`}</code>
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
                            <TableCell>
                                This optional property will be applied to the following components: <code>Checkbox</code>, <code>Radio</code>, <code>Text</code>
                            </TableCell>
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
                                The 'min' property which will applied to the following components: <code>Stepper</code>, <code>Datepicker</code>
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
                                The 'max' property which will applied to the following components: <code>Stepper</code>, <code>Datepicker</code>
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
                                <b>inline</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>boolean</code>
                            </TableCell>
                            <TableCell>
                                Shows the <code>Radio</code> options inlined.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>indent</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>boolean</code>
                            </TableCell>
                            <TableCell>
                                Shows the following components as indented: <code>Text</code>,<code>Radio</code>, <code>Checkbox</code>
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
                                <code>{`string | string[] | DynamicFormOption | DynamicFormOption[] | Date | boolean | number`}</code>
                            </TableCell>
                            <TableCell>
                                <b>Conditional rendering:</b> The exact value of the <b>rulerKey</b> element, as the condition for this element to be rendered. The type of value must be the same as
                                the <b>rulerKey</b> item.
                            </TableCell>
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
                                <b>disabled</b>
                            </TableCell>
                            <TableCell>&#10004;</TableCell>
                            <TableCell>
                                <code>boolean</code>
                            </TableCell>
                            <TableCell>If this option should be displayed as disabled or not (on supporting Components).</TableCell>
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
                                An optional description displayed below the label for the following components: <code>Checkbox</code>, <code>Radio</code>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
});

export default DynamicForms;

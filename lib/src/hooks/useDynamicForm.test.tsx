import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { DynamicFormItem, DynamicFormSection, useDynamicForm } from "./useDynamicForm";

type WrapperElementTestCase = Pick<DynamicFormSection, "wrappingElement"> & {
    statement: string;
    result: string;
};

type WrapperElementItemTestCase = Pick<DynamicFormItem, "wrappingElement"> & {
    statement: string;
    result: "div" | "section" | "none";
};

type DynamicFormFieldTestCase = DynamicFormItem & {
    result: string | number | boolean | string[] | Date;
};

type ConditionalFormFieldTestCase = {
    statement: string;
    sections: DynamicFormSection[];
    onChange: () => void;
};

const TestHook: React.FC<{
    sections: DynamicFormSection[];
    onFormChange?: (state: any) => void;
    hidePath?: [string, string];
    indicatorPath?: [string, string];
}> = ({ sections, onFormChange, hidePath, indicatorPath }) => {
    const { renderForm, state, setHidden, setIndicator } = useDynamicForm(sections);

    React.useEffect(() => {
        onFormChange && onFormChange(state);
    }, [state]);

    React.useEffect(() => {
        // hide the element if path provided
        hidePath && setHidden(...hidePath, true);
    }, [hidePath]);

    React.useEffect(() => {
        // give element an error indicator if path provided
        indicatorPath && setIndicator(...indicatorPath, { type: "danger" });
    }, [indicatorPath]);

    return <div>{renderForm()}</div>;
};

describe("hook: useDynamicForm", () => {
    let container: HTMLDivElement = null;
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

    /** To disable Collapse setTimeout calls */
    beforeAll(() => jest.useFakeTimers());

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render form", () => {
        act(() => {
            render(<TestHook sections={sections} />, container);
        });
        sections.map((section: DynamicFormSection, index: number) => {
            expect(container.querySelectorAll("h4")[index].innerHTML).toBe(section.title);
        });
    });

    describe("Should render form section with desired wrapper element", () => {
        const testCases: WrapperElementTestCase[] = [
            {
                statement: "Should render div",
                wrappingElement: "div",
                result: "div",
            },
            {
                statement: "Should render section",
                wrappingElement: "section",
                result: "section",
            },
            {
                statement: "Should render with no wrapper",
                wrappingElement: "none",
                result: "label",
            },
        ];
        testCases.map(({ statement, wrappingElement, result }: WrapperElementTestCase) => {
            it(statement, () => {
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], wrappingElement }]} />, container);
                });
                expect(container.querySelector("h4.dynamic-form-section-header").nextElementSibling.tagName.toLowerCase()).toBe(result);
            });
        });
    });

    describe("Should render form items with desired wrapper element", () => {
        const testCases: WrapperElementItemTestCase[] = [
            {
                statement: "Should render div",
                wrappingElement: "div",
                result: "div",
            },
            {
                statement: "Should render section",
                wrappingElement: "section",
                result: "section",
            },
            {
                statement: "Should render with no wrapper",
                wrappingElement: "none",
                result: "section",
            },
        ];
        testCases.map((testCase: WrapperElementItemTestCase, i: number) => {
            it(testCase.statement, () => {
                act(() => {
                    const sections: DynamicFormSection[] = [
                        {
                            key: "section-key",
                            wrappingElement: testCases[2].result,
                            items: [
                                {
                                    key: "item-key",
                                    controlType: "LabelOnly",
                                    label: "Hello",
                                    wrappingElement: testCase.wrappingElement,
                                },
                            ],
                        },
                    ];
                    render(<TestHook sections={sections} />, container);
                });
                expect(container.querySelector("label").parentElement.tagName.toLowerCase()).toBe(testCase.result);
            });
        });
    });

    describe("Should render field correctly", () => {
        const testCases: DynamicFormFieldTestCase[] = [
            { key: "name", label: "Name", controlType: "Checkbox", result: "checkbox" },
            { key: "name", label: "Name", controlType: "Datepicker", result: "seb-datepicker-native" },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: "custom-dropdown",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
            },
            { key: "name", label: "Name", controlType: "LabelOnly", result: "" },
            {
                key: "name",
                label: "Name",
                controlType: "Option",
                result: "d-flex ",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
            },
            {
                key: "name",
                label: "Name",
                controlType: "Radio",
                result: "radio-group",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
            },
            { key: "name", label: "Name", controlType: "Stepper", result: "custom-stepper" },
            { key: "name", label: "Name", controlType: "Text", result: "input-box-group" },
            { key: "name", label: "Name", controlType: "Textarea", result: "text-area" },
        ];
        testCases.map((testCase: DynamicFormFieldTestCase) => {
            const { result, ...props } = testCase;
            it(props.controlType, () => {
                const isLabelOnly: boolean = props.controlType === "LabelOnly";
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], items: [{ ...props }] }]} />, container);
                });

                if (props.controlType === "Checkbox") {
                    // get the last label element since chekbox is wrapped in a label to fix the hitbox issue
                    const labelElements = container.querySelectorAll("label");
                    expect(labelElements.item(labelElements.length - 1).innerHTML).toBe(props.label);
                } else {
                    // just get the first label element normally
                    expect(container.querySelector("label").innerHTML).toBe(props.label);
                }

                if (!isLabelOnly) {
                    expect(container.querySelector(`.${result}`)).not.toBeNull();
                }
            });
        });
    });

    describe("Should render field with initial value correctly", () => {
        const testCases: DynamicFormFieldTestCase[] = [
            { key: "name", label: "Name", controlType: "Checkbox", result: "", initialValue: true },
            { key: "name", label: "Name", controlType: "Datepicker", result: "2020-11-20", initialValue: "2020-11-20" },
            { key: "name", label: "Name", controlType: "Datepicker", result: "", initialValue: "aa" },
            { key: "name", label: "Name", controlType: "Datepicker", result: "2020-11-20", initialValue: new Date("2020-11-20") },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: "item 1",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: "item 1",
            },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                multi: true,
                initialValue: ["item 1"],
                result: "item 1",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
            },
            {
                key: "name",
                label: "Name",
                controlType: "Radio",
                result: "item 1",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: "item 1",
            },
            { key: "name", label: "Name", controlType: "Stepper", result: "1", initialValue: "1" },
            { key: "name", label: "Name", controlType: "Text", result: "test", initialValue: "test" },
            { key: "name", label: "Name", controlType: "Textarea", result: "test", initialValue: "test" },
        ];
        testCases.map((testCase: DynamicFormFieldTestCase) => {
            const { result, ...props } = testCase;
            it(`${props.controlType} with value: ${props.initialValue}`, () => {
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], items: [{ ...props }] }]} />, container);
                });
                switch (props.controlType) {
                    case "Checkbox":
                        expect(container.querySelector(`input`).hasAttribute("checked")).toBeTruthy();
                        break;
                    case "Textarea":
                        expect(container.querySelector(`textarea`).innerHTML).toBe(result);
                        break;
                    case "Dropdown":
                        expect(container.querySelector(`select`).value).toBe(result);
                        break;
                    default:
                        expect(container.querySelector(`input`).value).toBe(result);
                }
            });
        });
    });

    describe("Should be able to update field", () => {
        const testCases: DynamicFormFieldTestCase[] = [
            { key: "name", label: "Name", controlType: "Checkbox", result: true, initialValue: true },
            { key: "name", label: "Name", controlType: "Datepicker", result: new Date("2020-11-20T00:00:00.000Z"), initialValue: "2020-11-20" },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: "item 1",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: "item 1",
            },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: ["item 1"],
                multi: true,
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: ["item 1"],
            },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: [],
                multi: true,
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
            },
            {
                key: "name",
                label: "Name",
                controlType: "Option",
                result: ["item 1"],
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: "item 1",
            },
            {
                key: "name",
                label: "Name",
                controlType: "Radio",
                result: "item 1",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                initialValue: "item 1",
            },
            { key: "name", label: "Name", controlType: "Stepper", result: 1, initialValue: 1 },
            { key: "name", label: "Name", controlType: "Stepper", result: -1, initialValue: -1, min: -2 },
            { key: "name", label: "Name", controlType: "Text", result: "test", initialValue: "test" },
            { key: "name", label: "Name", controlType: "Textarea", result: "test", initialValue: "test" },
        ];
        testCases.map((testCase: DynamicFormFieldTestCase) => {
            const onChange: jest.Mock = jest.fn();
            const { result, initialValue: value, ...props } = testCase;
            it(`${props.controlType} with value: ${value}`, async () => {
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], items: [{ ...props }] }]} onFormChange={onChange} />, container);
                });
                await act(async () => {
                    switch (props.controlType) {
                        case "Checkbox":
                            Simulate.change(container.querySelector("input"), { target: { checked: true } as any });
                            break;
                        case "Textarea":
                            Simulate.change(container.querySelector("textarea"), { target: { value } } as any);
                            break;
                        case "Dropdown":
                            Simulate.change(container.querySelector("select"), { target: { value } } as any);
                            break;
                        case "Stepper":
                            Simulate.click(document.querySelector(`.stepper-${value > 0 ? "increment" : "decrement"}`));
                            break;
                        case "Option":
                            Simulate.click(document.querySelector(`button`));
                            break;
                        default:
                            Simulate.change(container.querySelector("input"), { target: { value } } as any);
                    }
                });

                expect(onChange).toBeCalledWith({ [sections[0].key]: { [props.key]: result } });
            });
        });
    });

    describe("Should hide the form element if the setHidden utility is used", () => {
        const testSections: DynamicFormSection[] = [
            {
                title: "Hidden examples",
                key: "section",
                items: [
                    {
                        key: "not-hidden",
                        controlType: "Text",
                        initiallyHidden: false,
                    },
                    {
                        key: "initially-hidden",
                        controlType: "Text",
                        initiallyHidden: true,
                    },
                ],
            },
        ];

        it("should not be shown", () => {
            act(() => {
                render(<TestHook sections={testSections} />, container);
            });
            expect(container.querySelector(`input[name='not-hidden']`)).toBeTruthy();
            expect(container.querySelector(`input[name='initially-hidden']`)).toBeNull();

            act(() => {
                render(<TestHook sections={testSections} hidePath={[testSections[0].key, testSections[0].items[0].key]} />, container);
            });
            expect(container.querySelector(`input[name='not-hidden']`)).toBeNull();
            expect(container.querySelector(`input[name='initially-hidden']`)).toBeNull();
        });
    });

    describe("Should show an indicastor if the setIndicator utility is used", () => {
        const testSections: DynamicFormSection[] = [
            {
                title: "Feedback examples",
                key: "section",
                items: [
                    {
                        key: "indicator",
                        controlType: "Text",
                    },
                    {
                        key: "no-indicator",
                        controlType: "Text",
                    },
                ],
            },
        ];

        it("Indicator should be visible", () => {
            act(() => {
                render(<TestHook sections={testSections} />, container);
            });
            expect(container.querySelector(`.feedback.feedback-10`)).toBeNull();

            act(() => {
                render(<TestHook sections={testSections} indicatorPath={[testSections[0].key, testSections[0].items[0].key]} />, container);
            });
            expect(container.querySelector(`.feedback.feedback-10`)).toBeTruthy();
        });
    });

    describe("Should show label and description only for unsupported control types", () => {
        const testSections: any[] = [
            {
                title: "Extra Info",
                key: "section-2-extra-info",
                items: [
                    {
                        key: "i-have-unknown-control",
                        label: "TestLabel",
                        description: "TestDescription",
                        controlType: "UNKNOWN",
                    },
                ],
            },
        ];
        testSections[0].items.map((item: DynamicFormItem) => {
            it("Error should be shown", () => {
                act(() => {
                    render(<TestHook sections={testSections} />, container);
                });
                expect(container.querySelector(".dynamic-form-label")).toBeTruthy();
                expect(container.querySelector(".dynamic-form-description")).toBeTruthy();
                expect(container.querySelector("input")).toBeFalsy();
            });
        });
    });
});

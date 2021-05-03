import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { DynamicFormItem, DynamicFormSection, useDynamicForm } from "./useDynamicForm";

type WrapperElementTestCase = Pick<DynamicFormSection, "wrappingElement"> & {
    statement: string;
    result: string;
};

type DynamicFormFieldTestCase = DynamicFormItem & {
    result: string;
};

const TestHook: React.FC<{ sections: DynamicFormSection[] }> = ({ sections }) => {
    const [renderForm] = useDynamicForm(sections);
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
                result: "div",
            },
        ];
        testCases.map((testCase: WrapperElementTestCase) => {
            it(testCase.statement, () => {
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], wrappingElement: testCase.wrappingElement }]} />, container);
                });
                expect(container.querySelector("h4").nextElementSibling.tagName.toLowerCase()).toBe(testCase.result);
                if (testCase.wrappingElement === "none") {
                    expect(container.querySelector("h4").nextElementSibling.classList).toContain("rc");
                }
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
            { key: "name", label: "Name", controlType: "Hidden", result: "" },
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
                const isHidden: boolean = props.controlType === "Hidden";
                const isLabelOnly: boolean = props.controlType === "LabelOnly";
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], items: [{ ...props }] }]} />, container);
                });
                if (isHidden) {
                    expect(container.querySelector("h4").nextElementSibling).toBeNull();
                }

                if (!isHidden) {
                    expect(container.querySelector("label").innerHTML).toBe(props.label);
                }

                if (!isLabelOnly && !isHidden) {
                    expect(container.querySelector(`.${result}`)).not.toBeNull();
                }
            });
        });
    });

    describe("Should render field with initial value correctly", () => {
        const testCases: DynamicFormFieldTestCase[] = [
            { key: "name", label: "Name", controlType: "Checkbox", result: "checkbox", value: true },
            { key: "name", label: "Name", controlType: "Datepicker", result: "seb-datepicker-native", value: "2020-11-20" },
            {
                key: "name",
                label: "Name",
                controlType: "Dropdown",
                result: "custom-dropdown",
                options: [
                    { label: "item 1", value: "item 1", key: "item 1" },
                    { label: "item 2", value: "item 2", key: "item 2" },
                ],
                value: "item 1",
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
                value: "item 1",
            },
            { key: "name", label: "Name", controlType: "Stepper", result: "custom-stepper", value: "1" },
            { key: "name", label: "Name", controlType: "Text", result: "input-box-group", value: "test" },
            { key: "name", label: "Name", controlType: "Textarea", result: "text-area", value: "test" },
        ];
        testCases.map((testCase: DynamicFormFieldTestCase) => {
            const { result, ...props } = testCase;
            it(props.controlType, () => {
                act(() => {
                    render(<TestHook sections={[{ ...sections[0], items: [{ ...props }] }]} />, container);
                });
                console.log(container.innerHTML);
                switch (props.controlType) {
                    case "Checkbox":
                        expect(container.querySelector(`input`).hasAttribute("checked")).toBeTruthy();
                        break;
                    case "Textarea":
                        expect(container.querySelector(`textarea`).innerHTML).toBe(props.value);
                        break;
                    case "Dropdown":
                        expect(container.querySelector(`select`).value).toBe(props.value);
                        break;
                    default:
                        expect(container.querySelector(`input`).value).toBe(props.value);
                }
            });
        });
    });
});

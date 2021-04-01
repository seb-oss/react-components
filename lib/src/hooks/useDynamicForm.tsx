import React, { useState, ReactNode, useCallback } from "react";
import classnames from "classnames";

import { Checkbox } from "../Checkbox";
import { Textbox } from "../Textbox";
import { Textarea } from "../Textarea";
import { Dropdown, getValueOfMultipleSelect } from "../Dropdown";
import { Datepicker } from "../Datepicker";
import { Stepper } from "../Stepper";
import { RadioButton, RadioGroup } from "../RadioButton";
import { isEmpty } from "@sebgroup/frontend-tools/isEmpty";

type DynamicFormInternalStateValue = string | string[] | DynamicFormOption | DynamicFormOption[] | Date | boolean | number;
export interface DynamicFormItem {
    key: string;
    controlType: DynamicFormType;
    value?: DynamicFormInternalStateValue;
    label?: string;
    description?: string;
    multi?: boolean;
    min?: any;
    max?: any;
    order?: number;
    placeholder?: string;
    options?: Array<DynamicFormOption>;
    inline?: boolean;
    valueType?: "string" | "number";
    rulerKey?: string;
    condition?: DynamicFormInternalStateValue;
}

export type DynamicFormType = "Hidden" | "Text" | "Textarea" | "Checkbox" | "Dropdown" | "Datepicker" | "Radio" | "Option" | "ErrorLabel" | "Stepper";

export interface DynamicFormSection {
    title?: string;
    key: string;
    order?: number;
    items?: Array<DynamicFormItem>;
}

export interface DynamicFormOption<T = any> {
    value?: T;
    label?: string;
    description?: string;
    key: string;
    disabled?: boolean;
}

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | Date | number;
interface DynamicFormInternalStateSection {
    [k: string]: DynamicFormInternalStateValue;
}
interface DynamicFormInternalState {
    [k: string]: DynamicFormInternalStateSection;
}
type OnChangeFormSection = (section: DynamicFormSection) => OnChangeFormItem;
type OnChangeFormItem = (item: DynamicFormItem) => OnChangeInput;
type OnChangeInput = (e: InputChange) => void;
type ShouldRenderFormItem = (sectionKey: string, itemKey: string) => boolean;

export function useDynamicForm(sections: DynamicFormSection[]): [() => JSX.Element, any, React.Dispatch<React.SetStateAction<DynamicFormInternalState>>] {
    // TODO: change return from `any` to DynamicFormInternalState when implemented multi sections
    const initialState: DynamicFormInternalState = {};
    sections?.map((section) => {
        initialState[section?.key] = {};
        section.items?.map((item) => {
            if (Array.isArray(initialState[section?.key])) {
                // TODO: map through the array and do the same as below for each element
            } else {
                const { key, value }: DynamicFormItem = item;
                (initialState[section?.key] as DynamicFormInternalStateSection)[key] = value;
            }
        });
    });
    const [state, setState] = useState<DynamicFormInternalState>(initialState);

    /**
     * SHOULD RENDER CONTROL:
     * Determines if the form control should be rendered or not.
     * @param sectionKey section key
     * @param itemKey section key
     */
    const shouldRender: ShouldRenderFormItem = useCallback<ShouldRenderFormItem>(
        (sectionKey: string, itemKey: string): boolean => {
            const { rulerKey, condition, controlType }: Partial<DynamicFormItem> =
                sections?.find((item: DynamicFormSection) => item.key === sectionKey)?.items?.find((item: DynamicFormItem) => item.key === itemKey) || {};
            if (controlType === "Hidden") {
                // Marked as hidden, don't render
                return false;
            }
            if (typeof rulerKey === "string" && !!rulerKey.length) {
                let rulerState: DynamicFormInternalStateValue;

                if (!isEmpty(state) && !isEmpty(state[sectionKey])) {
                    rulerState = (state[sectionKey] as DynamicFormInternalStateSection)[rulerKey];
                }

                if (rulerState === undefined || condition === undefined) {
                    return false;
                }

                if (typeof rulerState === "string" && rulerState === condition) {
                    return shouldRender(sectionKey, rulerKey);
                } else if (rulerState && condition && typeof condition === "object" && Array.isArray(condition)) {
                    for (const conditionItem of condition as any[]) {
                        if (conditionItem) {
                            if (typeof rulerState === "object" && Array.isArray(rulerState)) {
                                for (const rulerValueItem of rulerState) {
                                    if (rulerValueItem && typeof rulerValueItem === "object" && rulerValueItem.value === conditionItem.value && rulerValueItem.key === conditionItem.key) {
                                        return shouldRender(sectionKey, rulerKey);
                                    } else if (rulerValueItem && typeof rulerValueItem === "string" && rulerValueItem === conditionItem) {
                                        return shouldRender(sectionKey, rulerKey);
                                    }
                                }
                            } else if (typeof rulerState === "object" && !Array.isArray(rulerState)) {
                                if (rulerState && (rulerState as DynamicFormOption)?.value === conditionItem.value && (rulerState as DynamicFormOption)?.key === conditionItem.key) {
                                    return shouldRender(sectionKey, rulerKey);
                                }
                            }
                        }
                    }
                } else if (rulerState && typeof rulerState === "object" && !Array.isArray(rulerState) && (rulerState as DynamicFormOption)?.value === (condition as DynamicFormOption)?.value) {
                    return shouldRender(sectionKey, rulerKey);
                } else if (rulerState && typeof rulerState === "boolean") {
                    return shouldRender(sectionKey, rulerKey);
                }
                return false;
            }
            return true;
        },
        [state, sections]
    );

    const onChange: OnChangeFormSection = useCallback<OnChangeFormSection>(
        (section: DynamicFormSection) => (item: DynamicFormItem) => (e: InputChange) => {
            // TODO: Add support for DynamicFormInternalStateSection as array
            const sectionState: DynamicFormInternalStateSection = state && state.hasOwnProperty(section.key) ? state[section.key] : {};
            const controlType: DynamicFormType = item?.controlType || "Text";
            let newValue: DynamicFormInternalStateValue = null;

            switch (controlType) {
                case "Text":
                case "Textarea":
                    newValue = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target.value;
                    newValue = item.valueType === "number" ? Number(newValue) : newValue;
                    break;
                case "Option": {
                    let newOptions: DynamicFormOption[] = [...(((sectionState as DynamicFormInternalStateSection)[item.key] as DynamicFormOption[]) || [])];
                    const targetId: string = (e as React.ChangeEvent<HTMLInputElement>).target.id;
                    if (newOptions.find((o) => o.key === targetId)) {
                        newOptions = [...newOptions.filter((o) => o.key !== targetId)];
                    } else {
                        const targetOption: DynamicFormOption | undefined = item.options?.find((o) => o.key === targetId);
                        if (targetOption) {
                            newOptions.push(targetOption);
                        }
                    }
                    newValue = newOptions;
                    break;
                }
                case "Radio": {
                    const targetValue: string = (e as React.ChangeEvent<HTMLInputElement>).target.value;
                    const targetOption: DynamicFormOption | undefined = item.options?.find((o) => o.value === targetValue);
                    if (targetOption) {
                        newValue = targetOption.value;
                    }
                    break;
                }
                case "Checkbox": {
                    const targetValue: boolean = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
                    newValue = targetValue;
                    break;
                }
                case "Dropdown": {
                    const target = (e as React.ChangeEvent<HTMLSelectElement>).target;
                    newValue = target.multiple ? getValueOfMultipleSelect(target) : target.value;
                    break;
                }

                default: {
                    newValue = e as any;
                    break;
                }
            }

            setState({
                ...state,
                [section.key]: {
                    ...sectionState,
                    [item.key]: newValue,
                },
            });
        },
        [state]
    );
    const renderForm = useCallback(() => <DynamicFormComponent sections={sections} state={state} onChange={onChange} shouldRender={shouldRender} />, [sections, state, onChange, shouldRender]);

    return [renderForm, state, setState];
}

const DynamicFormComponent: React.FC<{
    sections: DynamicFormSection[];
    state: DynamicFormInternalState;
    onChange: OnChangeFormSection;
    shouldRender: ShouldRenderFormItem;
}> = (props) => {
    return (
        <>
            {props.sections?.map((section, i) => (
                <React.Fragment key={i}>
                    {!!section?.title ? <h4>{section.title}</h4> : null}
                    <DynamicFormSectionComponent
                        key={i}
                        section={section}
                        shouldRender={props.shouldRender}
                        onChange={props.onChange(section)}
                        state={props.state && props.state.hasOwnProperty(section.key) ? props.state[section.key] : null}
                    />
                </React.Fragment>
            ))}
        </>
    );
};

const DynamicFormSectionComponent: React.FC<{
    section: DynamicFormSection;
    state: DynamicFormInternalStateSection;
    onChange: OnChangeFormItem;
    shouldRender: ShouldRenderFormItem;
}> = (props) => {
    return (
        <>
            {props.section?.items?.map((item, i) => {
                if (props.shouldRender(props.section.key, item.key)) {
                    return <DynamicFormItemComponent key={i} item={item} onChange={props.onChange(item)} state={props.state ? (props.state as DynamicFormInternalStateSection)[item.key] : null} />;
                }
            })}
        </>
    );
};

const DynamicFormItemComponent: React.FC<{
    item: DynamicFormItem;
    state: DynamicFormInternalStateValue;
    onChange: OnChangeInput;
}> = (props) => {
    const controlType: DynamicFormType = props.item?.controlType || "Text";
    const commonProps: {
        name: string;
        label: string;
        value: any;
        minLength: number;
        maxLength: number;
        placeholder: string;
        onChange: (...args: any[]) => void;
    } = {
        name: props.item?.key || "",
        label: props.item?.label || "",
        value: (props.state as string) || "",
        minLength: props.item?.min,
        maxLength: props.item?.max,
        placeholder: props.item?.placeholder,
        onChange: props.onChange,
    };

    let formItem: ReactNode;

    const descriptionItem: ReactNode = props.item?.description ? <p className="text-muted m-0">{props.item?.description}</p> : <></>;

    switch (controlType) {
        case "Textarea": {
            // TODO: Map min and max and minLength and Maxlength to Textarea and Text?
            formItem = (
                <>
                    <Textarea {...commonProps} />
                    {descriptionItem}
                </>
            );
            break;
        }
        case "Text": {
            formItem = (
                <>
                    <Textbox {...commonProps} type={props.item.valueType || "text"} />
                    {descriptionItem}
                </>
            );
            break;
        }

        case "Radio": {
            const { name, onChange, value, label } = commonProps;
            formItem = (
                <>
                    {label && <label>{label}</label>}
                    <RadioGroup {...{ name, onChange, value }}>
                        {props.item?.options?.map((item, i) => (
                            <RadioButton key={i} value={item.value} wrapperProps={{ className: props.item.inline ? "d-inline-block" : null }}>
                                {item.label}
                                {item.description && <p className="text-muted m-0">{item.description}</p>}
                            </RadioButton>
                        ))}
                    </RadioGroup>
                    {descriptionItem}
                </>
            );
            break;
        }

        case "Dropdown": {
            const { name, onChange, placeholder, value, label } = commonProps;

            formItem = (
                <>
                    {label && <label>{label}</label>}
                    <Dropdown {...{ name, onChange, placeholder, value }} multiple={props.item?.multi}>
                        {props.item?.options?.map((option, i) => (
                            <option key={i} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Dropdown>
                    {descriptionItem}
                </>
            );
            break;
        }

        case "Checkbox": {
            const { name, onChange } = commonProps;
            formItem = (
                <Checkbox {...{ name, onChange }} checked={!!props.state}>
                    {commonProps.label}
                    {descriptionItem}
                </Checkbox>
            );
            break;
        }

        case "Datepicker": {
            const { value, onChange, name, label } = commonProps;
            formItem = (
                <>
                    {label && <label>{label}</label>}
                    <Datepicker {...{ value, onChange, name }} min={props.item?.min} max={props.item?.max} />
                    {descriptionItem}
                </>
            );
            break;
        }

        case "Stepper": {
            const { value, label } = commonProps;

            formItem = (
                <>
                    <Stepper
                        {...{ value, label }}
                        min={props.item?.min}
                        max={props.item?.max}
                        onIncrease={() => props.onChange((props.state as number) + 1)}
                        onDecrease={() => props.onChange((props.state as number) - 1)}
                    />
                    {descriptionItem}
                </>
            );
            break;
        }

        case "Option": {
            formItem = (
                <>
                    <label>{props.item?.label}</label>
                    <div className="d-flex flex-wrap" role="group">
                        {props.item?.options?.map((option, i) => {
                            const active: boolean = !!(props.state as DynamicFormOption[])?.find((o) => option.key === o.key)?.value;
                            return (
                                <button
                                    key={i}
                                    onClick={props.onChange}
                                    type="button"
                                    id={option.key}
                                    name={props.item?.key}
                                    disabled={!!option.disabled}
                                    className={`btn btn-sm mr-1 mb-1 btn-outline-primary${active ? " active" : ""}`}
                                >
                                    {option?.label}
                                </button>
                            );
                        })}
                    </div>
                    {descriptionItem}
                </>
            );
            break;
        }

        default:
            formItem = (
                <div>
                    <label>{props.item?.label}</label>
                    {` ERORR: controlType: ${controlType} not recognised.`}
                </div>
            );
            break;
    }

    return <>{formItem}</>;
};

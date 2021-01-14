import React, { useState, ReactNode, useMemo, useCallback } from "react";
import classnames from "classnames";

import { Checkbox } from "@sebgroup/react-components/Checkbox";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { Textarea } from "@sebgroup/react-components/Textarea";
import { Dropdown, getValueOfMultipleSelect } from "@sebgroup/react-components/Dropdown";
import { Datepicker } from "@sebgroup/react-components/Datepicker";
import { Stepper } from "@sebgroup/react-components/Stepper";
import { RadioButton, RadioGroup } from "@sebgroup/react-components/RadioButton";

type DynamicFormInternalStateValue = string | string[] | DynamicFormOption | DynamicFormOption[] | Date | boolean | number;
export interface DynamicFormItem {
    key: string;
    value?: DynamicFormInternalStateValue;
    label?: string;
    description?: string;
    required?: boolean;
    multi?: boolean;
    min?: any;
    max?: any;
    order?: number;
    placeholder?: string;
    options?: Array<DynamicFormOption>;
    rulerKey?: string;
    condition?: DynamicFormInternalStateValue;
    controlType?: DynamicFormType;
    inline?: boolean;
    valueType?: "string" | "number";
    indent?: boolean;
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
    const shouldRender: ShouldRenderFormItem = useMemo<ShouldRenderFormItem>(
        () => (sectionKey: string, itemKey: string): boolean => {
            const { rulerKey, condition, controlType }: Partial<DynamicFormItem> =
                sections?.find((item: DynamicFormSection) => item.key === sectionKey)?.items?.find((item: DynamicFormItem) => item.key === itemKey) || {};
            if (controlType === "Hidden") {
                // Marked as hidden, don't render
                return false;
            }
            if (rulerKey) {
                const rulerState: DynamicFormInternalStateValue = (state[sectionKey] as DynamicFormInternalStateSection)[rulerKey];
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
                        newValue = targetOption;
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
    const commonProps: { name: string; label: string; onChange: (...args: any) => void } = {
        label: props.item?.label || "",
        name: props.item?.key || "",
        onChange: props.onChange,
    };

    let formItem: ReactNode;

    switch (controlType) {
        case "Textarea": {
            formItem = <Textarea {...commonProps} value={(props.state as string) || ""} />;
            break;
        }
        case "Text": {
            formItem = (
                <div className={props.item?.indent ? "indent pl-3 pt-2" : ""}>
                    <Textbox {...commonProps} type={props.item.valueType || "text"} value={(props.state as string) || ""} />
                    {props.item?.description ? (
                        <p>
                            <small>{props.item?.description}</small>
                        </p>
                    ) : null}
                </div>
            );
            break;
        }

        case "Radio": {
            formItem = (
                <RadioGroup className={classnames({ indent: props.item?.indent })} {...commonProps} name={props.item?.key} value={(props.state as DynamicFormOption)?.value || ""}>
                    {props.item?.options?.map((item, i) => (
                        <RadioButton key={i} value={item.value} wrapperProps={{ className: props.item.inline ? "d-inline-block" : null }}>
                            {item.label}
                            {item.description && <p className="text-muted m-0">{item.description}</p>}
                        </RadioButton>
                    ))}
                </RadioGroup>
            );
            break;
        }

        case "Dropdown": {
            console.log(props.state);
            formItem = (
                <>
                    {props.item?.label && <label>{props.item?.label}</label>}
                    <Dropdown name={props.item?.key} placeholder={props.item?.placeholder} onChange={props.onChange as any} multiple={props.item?.multi} value={props.state as string | string[]}>
                        {props.item?.options?.map((option, i) => (
                            <option key={i} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Dropdown>
                </>
            );
            break;
        }

        case "Checkbox": {
            formItem = (
                <Checkbox wrapperProps={{ className: classnames({ indent: props.item?.indent }) }} {...commonProps} checked={!!props.state}>
                    {commonProps.label}
                    {props.item?.description && <p className="text-muted m-0">{props.item?.description}</p>}
                </Checkbox>
            );
            break;
        }

        case "Datepicker": {
            formItem = <Datepicker {...commonProps} onChange={props.onChange} value={props.state as Date} />;
            break;
        }

        case "Stepper": {
            formItem = (
                <Stepper
                    label={props.item?.label}
                    min={props.item?.min}
                    max={props.item?.max}
                    onIncrease={() => props.onChange((props.state as number) + 1)}
                    onDecrease={() => props.onChange((props.state as number) - 1)}
                    value={props.state as number}
                />
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
                </>
            );
            break;
        }

        default:
            formItem = (
                <div>
                    <label>{props.item?.label}</label>
                    {" ---- "}
                </div>
            );
            break;
    }

    return <>{formItem}</>;
};

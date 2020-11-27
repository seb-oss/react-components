import React, { useState, ReactNode, useMemo, useCallback } from "react";

import { CheckBox } from "@sebgroup/react-components/CheckBox";
import { TextBox } from "@sebgroup/react-components/TextBox";
import { TextArea } from "@sebgroup/react-components/TextArea";
import { Dropdown } from "@sebgroup/react-components/Dropdown";
import { Datepicker } from "@sebgroup/react-components/Datepicker";
import { Stepper } from "@sebgroup/react-components/Stepper";
import { DropdownItem, DropdownChangeEvent } from "@sebgroup/react-components/Dropdown/Dropdown";
import { RadioButtonProps, RadioGroup } from "@sebgroup/react-components/RadioGroup";

export interface DynamicFormItem {
    key: string;
    value?: any;
    label?: string | null;
    description?: string | null;
    required?: boolean;
    multi?: boolean;
    min?: any;
    max?: any;
    order?: number;
    placeholder?: string | null;
    options?: Array<DynamicFormOption> | null;
    rulerKey?: string | null;
    condition?: any;
    controlType?: DynamicFormType;
}

export type DynamicFormType = "Hidden" | "Text" | "TextArea" | "Checkbox" | "Dropdown" | "Datepicker" | "Radio" | "Option" | "ErrorLabel" | "Stepper";

export interface DynamicFormSection {
    title?: string | null;
    key: string;
    order?: number;
    items?: Array<DynamicFormItem> | null;
}

export interface DynamicFormOption {
    value?: any;
    label?: string | null;
    key: string;
    disabled?: boolean | null;
}

export type DynamicFormDate = { day: number; month: number; year: number };

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | DropdownChangeEvent | Date | number;

type DynamicFormInternalStateValue = string | string[] | DynamicFormOption | DynamicFormOption[] | Date | boolean | number | null;

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

export function useDynamicForm(sections: DynamicFormSection[]): [() => JSX.Element, { [key: string]: any }, React.Dispatch<React.SetStateAction<DynamicFormInternalState>>] {
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
            // console.log("should render sectionKey: ", sectionKey, " itemKey: ", itemKey);
            const { rulerKey, condition, controlType }: Partial<DynamicFormItem> =
                sections?.find((item: DynamicFormSection) => item.key === sectionKey)?.items?.find((item: DynamicFormItem) => item.key === itemKey) || {};
            // console.log({ rulerKey, condition, controlType });
            if (controlType === "Hidden") {
                // Marked as hidden, don't render
                return false;
            }
            if (rulerKey) {
                const rulerState: DynamicFormInternalStateValue = (state[sectionKey] as DynamicFormInternalStateSection)[rulerKey];
                if (rulerState === undefined || condition === undefined) {
                    return false;
                }

                if (typeof rulerState === "string" && rulerState === (condition as any)) {
                    return shouldRender(sectionKey, rulerKey);
                } else if (rulerState && condition && typeof condition === "object" && Array.isArray(condition)) {
                    for (const conditionItem of condition as Array<any>) {
                        if (conditionItem) {
                            if (typeof rulerState === "object" && Array.isArray(rulerState)) {
                                for (const rulerValueItem of rulerState as Array<any>) {
                                    if (rulerValueItem && rulerValueItem.value === conditionItem.value && rulerValueItem.key === conditionItem.key) {
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
            // console.log(section, item, (e as any).target.value);

            // TODO: Add support for DynamicFormInternalStateSection as array
            const sectionState: DynamicFormInternalStateSection = state && state.hasOwnProperty(section.key) ? state[section.key] : {};
            const controlType: DynamicFormType = item?.controlType || "Text";
            let newValue: DynamicFormInternalStateValue = null;

            switch (controlType) {
                case "Text":
                case "TextArea":
                    newValue = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target.value;
                    break;
                case "Option": {
                    let newOptions: DynamicFormOption[] = [...(((sectionState as DynamicFormInternalStateSection)[item.key] as DynamicFormOption[]) || [])];
                    // console.log("target: ", (e as any).target);
                    // console.log("newOptions: ", newOptions);
                    const targetId: string = (e as React.ChangeEvent<HTMLInputElement>).target.id;
                    if (newOptions.find((o) => o.key === targetId)) {
                        newOptions = [...newOptions.filter((o) => o.key !== targetId)];
                        // console.log("removing  ...");
                        // console.log(newOptions);
                    } else {
                        const targetOption: DynamicFormOption | undefined = item.options?.find((o) => o.key === targetId);
                        if (targetOption) {
                            newOptions.push(targetOption);
                            // console.log("adding  ...");
                            // console.log(newOptions);
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

                default: {
                    newValue = e as any;
                    break;
                }
            }

            // console.log("newValue: ", newValue);

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
    state: DynamicFormInternalStateSection | null;
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
    state: DynamicFormInternalStateValue | null;
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
        case "TextArea": {
            formItem = <TextArea {...commonProps} value={(props.state as string) || ""} />;
            break;
        }
        case "Text": {
            formItem = (
                <>
                    <TextBox {...commonProps} value={(props.state as string) || ""} />
                    {props.item?.description ? (
                        <p>
                            <small>{props.item?.description}</small>
                        </p>
                    ) : null}
                </>
            );
            break;
        }

        case "Radio": {
            const list: RadioButtonProps[] =
                props.item?.options?.map((option) => {
                    return { label: option.label || "", value: option.value || "", disabled: !!option.disabled };
                }) || [];
            formItem = <RadioGroup condensed {...commonProps} value={(props.state as DynamicFormOption)?.value || ""} list={list} />;
            break;
        }

        case "Dropdown": {
            const list: DropdownItem[] =
                props.item?.options?.map((option) => {
                    return { label: option.label || "", value: option.value || "", disabled: !!option.disabled };
                }) || [];

            formItem = <Dropdown {...commonProps} multi={props.item?.multi} selectedValue={props.state as DropdownItem | DropdownItem[]} list={list} />;
            break;
        }

        case "Checkbox": {
            formItem = <CheckBox {...commonProps} description={props.item?.description} />;
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

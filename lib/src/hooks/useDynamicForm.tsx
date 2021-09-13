import React, { useState, ReactNode, useCallback, useMemo } from "react";

import { Checkbox } from "../Checkbox";
import { Textbox } from "../Textbox";
import { Textarea } from "../Textarea";
import { Dropdown, getValueOfMultipleSelect } from "../Dropdown";
import { Datepicker } from "../Datepicker";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import { Stepper } from "../Stepper";
import { RadioButton, RadioGroup } from "../RadioButton";
import { isEmpty } from "@sebgroup/frontend-tools/isEmpty";
import { isValidDate } from "@sebgroup/frontend-tools/isValidDate";

export type DynamicFormInternalStateValue = string | string[] | Date | boolean | number;
export interface DynamicFormItem {
    key: string;
    controlType: DynamicFormType;
    value?: DynamicFormInternalStateValue;
    order?: number;
    label?: string;
    description?: string;
    multi?: boolean;
    min?: any;
    max?: any;
    placeholder?: string;
    options?: Array<DynamicFormOption>;
    valueType?: "string" | "number";
    rulerKey?: string;
    condition?: DynamicFormInternalStateValue;
    formElementAdditionalProps?: {
        [k: string]: any;
    };
    wrappingElement?: "div" | "section" | "none";
    additionalProps?: {
        [k: string]: any;
    };
}

export type DynamicFormType = "Hidden" | "Text" | "Textarea" | "Checkbox" | "Dropdown" | "Datepicker" | "Radio" | "Option" | "LabelOnly" | "Stepper";

export interface DynamicFormSection {
    key: string;
    title?: string;
    order?: number;
    items?: Array<DynamicFormItem>;
    wrappingElement?: "div" | "section" | "none";
    additionalProps?: {
        [k: string]: any;
    };
}

export interface DynamicFormOption<T = any> {
    key: string;
    value?: T;
    label?: string;
    description?: string;
    additionalProps?: {
        [k: string]: any;
    };
}

export type InputChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | Date | number;
export interface DynamicFormInternalStateSection {
    [k: string]: DynamicFormInternalStateValue;
}
export interface DynamicFormInternalState {
    [k: string]: DynamicFormInternalStateSection;
}

export interface DynamicFormMetaData {
    [k: string]: {
        [k: string]: DynamicFormMetaDataItem;
    };
}

export interface DynamicFormMetaDataItem {
    /** This field is currently visible (based on conditional rendering) */
    isVisible: boolean;
    /** this field has an error message */
    hasError: boolean;
    /** this field has an error message */
    hasWarning: boolean;
    /** This field has a non empty, null, undefined or otherwise falsy value (based on its controlType) */
    hasTruthyValue: boolean;
}

export type DynamicFormWarnings = DynamicFormErrors;
export interface DynamicFormErrors {
    [k: string]: {
        [k: string]: string;
    };
}

type OnChangeFormSection = (section: DynamicFormSection) => OnChangeFormItem;
type OnChangeFormItem = (item: DynamicFormItem) => OnChangeInput;
type OnChangeInput = (e: InputChange) => void;
type ShouldRenderFormItem = (sectionKey: string, itemKey: string) => boolean;

export type FormRenderFunction = () => JSX.Element;
export type SetDynamicFormState = React.Dispatch<React.SetStateAction<DynamicFormInternalState>>;
export type SetDynamicFormErrors = React.Dispatch<React.SetStateAction<DynamicFormErrors>>;
export type SetDynamicFormWarnings = React.Dispatch<React.SetStateAction<DynamicFormErrors>>;
export interface FormInfo {
    dirty: boolean;
    hasErrors: boolean;
    hasWarnings: boolean;
}
export type UseDynamicForm = [FormRenderFunction, DynamicFormInternalState, SetDynamicFormState, SetDynamicFormErrors, SetDynamicFormWarnings, DynamicFormMetaData, FormInfo];
export function useDynamicForm(sections: DynamicFormSection[]): UseDynamicForm {
    const initialState: DynamicFormInternalState = useMemo(() => {
        const initialFormState: DynamicFormInternalState = {};
        sections?.map((section: DynamicFormSection) => {
            initialFormState[section?.key] = {};
            section.items?.map((item) => {
                const { key, value, multi, controlType }: DynamicFormItem = item;
                let initialValue: any;

                switch (controlType) {
                    case "Dropdown": {
                        if (multi) {
                            if (Array.isArray(value) && (value as any[]).every((x) => typeof x === "string")) {
                                initialValue = value as string[];
                            } else {
                                initialValue = [];
                            }
                        } else {
                            initialValue = typeof value === "string" ? value : "";
                        }
                        break;
                    }
                    case "Checkbox": {
                        initialValue = !!value;
                        break;
                    }
                    case "Datepicker": {
                        if (typeof value == "string" || typeof value == "number") {
                            initialValue = isValidDate(new Date(value)) ? new Date(value) : null;
                        } else if (value instanceof Date) {
                            initialValue = value as Date;
                        } else {
                            initialValue = null;
                        }
                        break;
                    }
                    case "Stepper": {
                        if (typeof value !== "number" && Number.isInteger(Number(value))) {
                            initialValue = Number(value);
                        } else {
                            initialValue = value;
                        }
                        break;
                    }
                    case "Option": {
                        initialValue = Array.isArray(value) ? value : [];
                        break;
                    }
                    case "Radio": {
                        if (typeof value === "string" || typeof value === "number") {
                            initialValue = value;
                        } else {
                            initialValue = "";
                        }
                        break;
                    }
                    default:
                        initialValue = value || "";
                        break;
                }

                (initialFormState[section?.key] as DynamicFormInternalStateSection)[key] = initialValue;
            });
        });

        return initialFormState;
    }, []);

    const [state, setState] = useState<DynamicFormInternalState>(initialState);
    const [errorMessages, setErrorMessages] = useState<DynamicFormErrors>({});
    const [warningMessages, setWarningMessages] = useState<DynamicFormWarnings>({});
    const [dirty, setDirty] = useState<boolean>(false);

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
                                    if (rulerValueItem && typeof rulerValueItem === "string" && rulerValueItem === conditionItem) {
                                        return shouldRender(sectionKey, rulerKey);
                                    }
                                }
                            }
                        }
                    }
                } else if (rulerState && typeof rulerState === "boolean") {
                    return shouldRender(sectionKey, rulerKey);
                }
                return false;
            }
            return true;
        },
        [state]
    );

    const onChange: OnChangeFormSection = useCallback<OnChangeFormSection>(
        (section: DynamicFormSection) => (item: DynamicFormItem) => (e: InputChange) => {
            !dirty && setDirty(true);
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
                    let newOptions: string[] = [...((sectionState[item.key] as string[]) || [])];
                    const targetValue: string = (e as React.ChangeEvent<HTMLInputElement>).target.value;

                    if (newOptions.find((e: string) => e === targetValue)) {
                        newOptions = [...newOptions.filter((e: string) => e !== targetValue)];
                    } else {
                        newOptions.push(targetValue);
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
                    newValue = target.multiple ? getValueOfMultipleSelect(Array.from(target.options)) : target.value;
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
        [state, dirty, setDirty]
    );

    const meta = useMemo(() => {
        let newMeta: DynamicFormMetaData = {};

        sections?.forEach(({ key: sectionKey, items }) => {
            newMeta[sectionKey] = {};
            items?.forEach(({ key, controlType }) => {
                const itemState: DynamicFormInternalStateValue | undefined | null = state && state[sectionKey] && state[sectionKey][key];
                const hasError: boolean = !!(errorMessages && errorMessages[sectionKey] && errorMessages[sectionKey][key]?.length);
                const hasWarning: boolean = !!(warningMessages && warningMessages[sectionKey] && warningMessages[sectionKey][key]?.length);
                const isVisible: boolean = shouldRender(sectionKey, key);
                let hasTruthyValue: boolean;

                switch (controlType) {
                    case "Datepicker":
                        hasTruthyValue = isValidDate(itemState as Date);
                        break;
                    case "Dropdown":
                    case "Radio":
                    case "Option":
                    case "Text":
                    case "Textarea":
                        hasTruthyValue = !!(itemState as string | any[])?.length;
                        break;
                    case "Checkbox":
                        hasTruthyValue = !!itemState;
                        break;
                    case "Stepper":
                        hasTruthyValue = Number.isInteger(itemState);
                        break;
                    default:
                        hasTruthyValue = null;
                        break;
                }

                newMeta[sectionKey][key] = {
                    hasError,
                    hasWarning,
                    isVisible,
                    hasTruthyValue,
                };
            });
        });

        return newMeta;
    }, [shouldRender, errorMessages, warningMessages]);

    const checkMetaDataIf = useCallback(
        (method: "some" | "every", condition: keyof DynamicFormMetaDataItem) => {
            return Object.values(meta)[method]((s: DynamicFormMetaData[string]) => Object.values(s)[method]((v: DynamicFormMetaDataItem) => v.isVisible && v[condition]));
        },
        [meta]
    );

    //** Does at least one of all the currently visible elements have an error message */
    const hasErrors: boolean = useMemo(() => {
        return checkMetaDataIf("some", "hasError");
    }, [checkMetaDataIf]);

    //** Does at least one of all the currently visible elements have a warning message */
    const hasWarnings: boolean = useMemo(() => {
        return checkMetaDataIf("some", "hasWarning");
    }, [checkMetaDataIf]);

    //** Does every currently visible form element have a truthy value */
    const isAllTruthy: boolean = useMemo(() => {
        return checkMetaDataIf("every", "hasTruthyValue");
    }, [checkMetaDataIf]);

    const renderForm = useCallback(() => {
        return <DynamicFormComponent sections={sections} errorMessages={errorMessages} warningMessages={warningMessages} state={state} onChange={onChange} shouldRender={shouldRender} />;
    }, [onChange, shouldRender, errorMessages, warningMessages]);

    const formInfo: FormInfo = useMemo(() => {
        return { dirty, hasErrors, hasWarnings, isAllTruthy };
    }, [dirty, hasErrors, hasWarnings, isAllTruthy]);

    return [renderForm, state, setState, setErrorMessages, setWarningMessages, meta, formInfo];
}

const DynamicFormComponent: React.FC<{
    sections: DynamicFormSection[];
    errorMessages: DynamicFormErrors;
    warningMessages: DynamicFormWarnings;
    state: DynamicFormInternalState;
    onChange: OnChangeFormSection;
    shouldRender: ShouldRenderFormItem;
}> = (props) => {
    return (
        <>
            {props.sections?.map((section, i) => (
                <React.Fragment key={i}>
                    {!!section?.title ? <h4 className="rc dynamic-form dynamic-form-section-header">{section.title}</h4> : null}
                    <DynamicFormSectionComponent
                        key={i}
                        section={section}
                        errors={!isEmpty(props.errorMessages) && !isEmpty(props.errorMessages[section.key]) ? props.errorMessages[section.key] : {}}
                        warnings={!isEmpty(props.warningMessages) && !isEmpty(props.warningMessages[section.key]) ? props.warningMessages[section.key] : {}}
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
    errors: { [k: string]: string };
    warnings: { [k: string]: string };
    onChange: OnChangeFormItem;
    shouldRender: ShouldRenderFormItem;
}> = (props) => {
    const { wrappingElement = "none", additionalProps = {} } = props.section;

    const getSections = (): JSX.Element[] =>
        props.section?.items?.map((item, i) => {
            if (props.shouldRender(props.section.key, item.key)) {
                return (
                    <DynamicFormItemComponent
                        key={i}
                        item={item}
                        errorMessage={!isEmpty(props.errors) && !isEmpty(props.errors[item.key]) ? props.errors[item.key] : null}
                        warningMessage={!isEmpty(props.warnings) && !isEmpty(props.warnings[item.key]) ? props.warnings[item.key] : null}
                        onChange={props.onChange(item)}
                        state={props.state ? (props.state as DynamicFormInternalStateSection)[item.key] : null}
                    />
                );
            }
        });

    switch (wrappingElement) {
        case "div":
            return <div {...additionalProps}>{getSections()}</div>;
        case "section":
            return <section {...additionalProps}>{getSections()}</section>;

        default:
            return <>{getSections()}</>;
    }
};

const DynamicFormItemComponent: React.FC<{
    item: DynamicFormItem;
    state: DynamicFormInternalStateValue;
    errorMessage: string | null;
    warningMessage: string | null;
    onChange: OnChangeInput;
}> = (props) => {
    const controlType: DynamicFormType = props.item?.controlType || "Text";
    const commonProps: {
        name: string;
        value: any;
        minLength: number;
        maxLength: number;
        placeholder: string;
        onChange: (...args: any[]) => void;
    } = {
        name: props.item?.key || "",
        value: props.state as any,
        minLength: props.item?.min,
        maxLength: props.item?.max,
        placeholder: props.item?.placeholder,
        onChange: props.onChange,
    };

    const { formElementAdditionalProps = {} }: DynamicFormItem = props.item;

    let formItem: ReactNode;

    const labelItem: ReactNode = props.item?.label ? <label className="rc dynamic-form dynamic-form-label m-0">{props.item?.label}</label> : <></>;
    const descriptionItem: ReactNode = props.item?.description ? <p className="rc dynamic-form dynamic-form-description text-muted m-0">{props.item?.description}</p> : <></>;

    const indicator: Indicator = React.useMemo(() => {
        return props.errorMessage
            ? { type: "danger", message: props.errorMessage }
            : props.warningMessage
            ? { type: "warning", message: props.warningMessage }
            : { type: "none", noBorder: true, message: "" };
    }, [props.errorMessage, props.warningMessage]);

    switch (controlType) {
        case "Textarea": {
            const { value = "", ...rest } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <Textarea {...rest} value={value} indicator={indicator} {...formElementAdditionalProps} />
                </>
            );
            break;
        }
        case "Text": {
            const { value = "", ...rest } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <Textbox {...rest} value={value} indicator={indicator} type={props.item.valueType || "text"} {...formElementAdditionalProps} />
                </>
            );
            break;
        }

        case "Radio": {
            const { name, onChange, value } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <FeedbackIndicator {...indicator}>
                        <RadioGroup {...{ name, onChange, value }} {...formElementAdditionalProps}>
                            {props.item?.options?.map((option: DynamicFormOption, i) => (
                                <RadioButton key={i} value={option?.value} {...(option?.additionalProps || {})}>
                                    {option?.label}
                                    {option?.description && <p className="text-muted m-0">{option?.description}</p>}
                                </RadioButton>
                            ))}
                        </RadioGroup>
                    </FeedbackIndicator>
                </>
            );
            break;
        }

        case "Dropdown": {
            const { name, onChange, placeholder, value } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <Dropdown {...{ name, onChange, placeholder, value }} indicator={indicator} multiple={props.item?.multi} {...formElementAdditionalProps}>
                        {props.item?.options?.map((option: DynamicFormOption, i) => (
                            <option key={i} value={option?.value} {...(option?.additionalProps || {})}>
                                {option?.label}
                            </option>
                        ))}
                    </Dropdown>
                </>
            );
            break;
        }

        case "Checkbox": {
            const { name, onChange, value } = commonProps;
            formItem = (
                <Checkbox {...{ name, onChange }} indicator={indicator} checked={!!value} {...formElementAdditionalProps}>
                    {props.item?.label}
                    {descriptionItem}
                </Checkbox>
            );
            break;
        }

        case "Datepicker": {
            const { onChange, name, value } = commonProps;
            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <FeedbackIndicator {...indicator}>
                        <Datepicker {...{ value, onChange, name }} min={props.item?.min} max={props.item?.max} {...formElementAdditionalProps} />
                    </FeedbackIndicator>
                </>
            );
            break;
        }

        case "Stepper": {
            const { value = 0 } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <Stepper
                        value={value}
                        indicator={indicator}
                        min={props.item?.min || 0}
                        max={props.item?.max || 100}
                        onIncrease={() => props.onChange(value + 1)}
                        onDecrease={() => props.onChange(value - 1)}
                        {...formElementAdditionalProps}
                    />
                </>
            );
            break;
        }

        case "Option": {
            const { value } = commonProps;

            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                    <FeedbackIndicator {...indicator}>
                        <div className="d-flex flex-wrap" role="group" {...formElementAdditionalProps}>
                            {props.item?.options?.map((option: DynamicFormOption, i) => {
                                const active: boolean = !!(value as string[])?.find((e: string) => option.value === e);
                                return (
                                    <button
                                        key={i}
                                        onClick={props.onChange}
                                        type="button"
                                        id={option.key}
                                        name={props.item?.key}
                                        className={`btn btn-sm mr-1 mb-1 btn-outline-primary${active ? " active" : ""}`}
                                        value={option.value}
                                        {...(option?.additionalProps || {})}
                                    >
                                        {option?.label}
                                    </button>
                                );
                            })}
                        </div>
                    </FeedbackIndicator>
                </>
            );
            break;
        }

        // used for LabelOnly and anything else
        default: {
            formItem = (
                <>
                    {labelItem}
                    {descriptionItem}
                </>
            );
            break;
        }
    }

    const { wrappingElement = "none", additionalProps = {} } = props.item;

    switch (wrappingElement) {
        case "div":
            return <div {...additionalProps}>{formItem}</div>;
        case "section":
            return <section {...additionalProps}>{formItem}</section>;

        default:
            return <>{formItem}</>;
    }
};

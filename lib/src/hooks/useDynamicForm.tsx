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

export type DynamicFormInternalStateValue = string | string[] | Date | boolean | number | null;
export interface DynamicFormItem {
    key: string;
    controlType: DynamicFormType;
    initialValue?: DynamicFormInternalStateValue;
    label?: string;
    description?: string;
    multi?: boolean;
    min?: any;
    max?: any;
    placeholder?: string;
    options?: Array<DynamicFormOption>;
    initiallyHidden?: boolean;
    formElementAdditionalProps?: {
        [k: string]: any;
    };
    wrappingElement?: "div" | "section" | "none";
    additionalProps?: {
        [k: string]: any;
    };
}

export type DynamicFormType = "Text" | "Textarea" | "Checkbox" | "Dropdown" | "Datepicker" | "Radio" | "Option" | "LabelOnly" | "Stepper";

export interface DynamicFormSection {
    key: string;
    title?: string;
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

export interface DynamicFormIndicatorState {
    [k: string]: {
        [k: string]: Indicator;
    };
}

export interface DynamicFormVisibilityState {
    [k: string]: {
        [k: string]: boolean;
    };
}
export interface DynamicFormMetaData {
    [k: string]: {
        [k: string]: DynamicFormMetaDataItem;
    };
}

export interface DynamicFormMetaDataItem {
    /** This field is currently visible (based on conditional rendering) */
    isVisible: boolean;
    /** this field has an indicator */
    hasIndicator: boolean;
    /** This field has a non empty, null, undefined or otherwise falsy value (based on its controlType) */
    hasTruthyValue: boolean;
}

type OnChangeFormSection = (section: DynamicFormSection) => OnChangeFormItem;
type OnChangeFormItem = (item: DynamicFormItem) => OnChangeInput;
type OnChangeInput = (e: InputChange) => void;

export type FormRenderFunction = () => JSX.Element;
export type SetDynamicFormState = React.Dispatch<React.SetStateAction<DynamicFormInternalState>>;
export interface FormInfo {
    dirty: boolean;
    hasIndicators: boolean;
    isAllTruthy: boolean;
}

export type PatchState = (section: string, key: string, value: DynamicFormInternalStateValue) => void;
export type SetIndicator = (section: string, key: string, indicator: Indicator) => void;
export type SetHidden = (section: string, key: string, hidden: boolean) => void;

export type UseDynamicForm = {
    renderForm: FormRenderFunction;
    state: DynamicFormInternalState;
    patchState: PatchState;
    setIndicator: SetIndicator;
    setHidden: SetHidden;
    meta: DynamicFormMetaData;
    info: FormInfo;
};
export function useDynamicForm(sections: DynamicFormSection[]): UseDynamicForm {
    const initialState: DynamicFormInternalState = useMemo(() => {
        const initialFormState: DynamicFormInternalState = {};
        sections?.map((section: DynamicFormSection) => {
            initialFormState[section?.key] = {};
            section.items?.map((item) => {
                const { key, initialValue: value, multi, controlType }: DynamicFormItem = item;
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

    const initialVisibility: DynamicFormVisibilityState = useMemo(() => {
        const initialVisibilityState: DynamicFormVisibilityState = {};
        sections?.map(({ key: sectionKey, items }: DynamicFormSection) => {
            initialVisibilityState[sectionKey] = {};
            items?.map(({ initiallyHidden, key }: DynamicFormItem) => {
                initialVisibilityState[sectionKey][key] = !initiallyHidden;
            });
        });

        return initialVisibilityState;
    }, [initialState]);

    const [state, setState] = useState<DynamicFormInternalState>(initialState);
    const [indicators, setIndicators] = useState<DynamicFormIndicatorState>({});
    const [visibility, setVisibility] = useState<DynamicFormVisibilityState>(initialVisibility);
    const [dirty, setDirty] = useState<boolean>(false);

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
                const hasIndicator: boolean = !!(indicators && indicators[sectionKey] && !isEmpty(indicators[sectionKey][key]));
                const isVisible: boolean = !!(visibility && visibility[sectionKey] && !!visibility[sectionKey][key]);
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
                    hasIndicator,
                    isVisible,
                    hasTruthyValue,
                };
            });
        });

        return newMeta;
    }, [state, visibility, indicators]);

    const checkMetaDataIf = useCallback(
        (method: "some" | "every", condition: keyof DynamicFormMetaDataItem) => {
            return Object.values(meta)[method]((s: DynamicFormMetaData[string]) => Object.values(s)[method]((v: DynamicFormMetaDataItem) => v.isVisible && v[condition]));
        },
        [meta]
    );

    //** Does at least one of all the currently visible elements have a warning message */
    const hasIndicators: boolean = useMemo(() => {
        return checkMetaDataIf("some", "hasIndicator");
    }, [checkMetaDataIf]);

    //** Does every currently visible form element have a truthy value */
    const isAllTruthy: boolean = useMemo(() => {
        return checkMetaDataIf("every", "hasTruthyValue");
    }, [checkMetaDataIf]);

    const renderForm = useCallback(() => {
        return <DynamicFormComponent sections={sections} indicators={indicators} state={state} onChange={onChange} visibility={visibility} />;
    }, [onChange, visibility, indicators]);

    const formInfo: FormInfo = useMemo(() => {
        return { dirty, hasIndicators, isAllTruthy };
    }, [dirty, hasIndicators, isAllTruthy]);

    const patchState: PatchState = useCallback(
        (section: string, key: string, value: DynamicFormInternalStateValue) => {
            setState((existingState) => ({
                ...existingState,
                [section]: {
                    ...(existingState[section] || {}),
                    [key]: value,
                },
            }));
        },
        [setState]
    );

    const setIndicator: SetIndicator = useCallback(
        (section: string, key: string, indicator: Indicator | null) => {
            setIndicators((existingState) => ({
                ...existingState,
                [section]: {
                    ...(existingState[section] || {}),
                    [key]: indicator,
                },
            }));
        },
        [setIndicators]
    );

    const setHidden: SetHidden = useCallback(
        (section: string, key: string, hidden: boolean) => {
            const visible: boolean = !hidden;

            setVisibility((existingState) => ({
                ...existingState,
                [section]: {
                    ...(existingState[section] || {}),
                    [key]: visible,
                },
            }));
        },
        [setVisibility]
    );

    return {
        renderForm,
        state,
        patchState,
        setIndicator,
        setHidden,
        meta,
        info: formInfo,
    };
}

const DynamicFormComponent: React.FC<{
    sections: DynamicFormSection[];
    indicators: DynamicFormIndicatorState;
    visibility: DynamicFormVisibilityState;
    state: DynamicFormInternalState;
    onChange: OnChangeFormSection;
}> = (props) => {
    return (
        <>
            {props.sections?.map((section, i) => (
                <React.Fragment key={i}>
                    {!!section?.title ? <h4 className="rc dynamic-form dynamic-form-section-header">{section.title}</h4> : null}
                    <DynamicFormSectionComponent
                        key={i}
                        section={section}
                        indicators={!isEmpty(props.indicators) && !isEmpty(props.indicators[section.key]) ? props.indicators[section.key] : {}}
                        visibility={!isEmpty(props.visibility) && !isEmpty(props.visibility[section.key]) ? props.visibility[section.key] : {}}
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
    indicators: { [k: string]: Indicator };
    visibility: { [k: string]: boolean };
    onChange: OnChangeFormItem;
}> = (props) => {
    const { wrappingElement = "none", additionalProps = {} } = props.section;

    const getSections = (): JSX.Element[] =>
        props.section?.items?.map((item, i) => {
            if (!!props.visibility[item.key]) {
                return (
                    <DynamicFormItemComponent
                        key={i}
                        item={item}
                        indicator={!isEmpty(props.indicators) && !isEmpty(props.indicators[item.key]) ? props.indicators[item.key] : null}
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
    indicator: Indicator;
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
        return !isEmpty(props.indicator) ? props.indicator : { type: "none", noBorder: true, message: "" };
    }, [props.indicator]);

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
                    <Textbox {...rest} value={value} indicator={indicator} {...formElementAdditionalProps} />
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
                        <RadioGroup {...{ name, onChange, value }} {...formElementAdditionalProps} className={`mt-0 ${formElementAdditionalProps?.className || ""}`}>
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

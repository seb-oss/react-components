import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";
import { RadioButton, RadioButtonProps } from "./RadioButton/RadioButton";
import "./radio-group-style.scss";
import { FeedbackIndicator, IndicatorType } from "../FeedbackIndicator";

export type RadioGroupProps<T = any> = Omit<JSX.IntrinsicElements["input"], "list"> & {
    condensed?: boolean;
    inline?: boolean;
    label?: string;
    list?: Array<RadioButtonProps<T>>;
    /** Hint message for stepper */
    hint?: string;
    /** Theme of text box hint */
    hintTheme?: IndicatorType;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ condensed, inline, label, list, children, className, id, hint, hintTheme = "danger", ...props }: RadioGroupProps) => {
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        constructIds();
    }, [list]);

    function constructIds(): void {
        const idListToSet: Array<string> = [];
        (list ? list : React.Children.toArray(children))?.map(() => idListToSet.push(randomId("radiogroup-")));
        setIdList(idListToSet);
    }

    return (
        <div className={classnames("rc radio-group", className, { inline: inline, condensed: condensed })} id={id}>
            <div className="input-field">
                {label && <label className="radio-group-label">{label}</label>}
                <FeedbackIndicator type={hintTheme} message={hint}>
                    {list?.map((item: RadioButtonProps, index: number) => {
                        const isDisabled: boolean = props.disabled || item.disabled;
                        return (
                            <RadioButton
                                key={index}
                                {...props}
                                {...item}
                                className={classnames(item.className, { [hintTheme]: !!hint, disabled: isDisabled })}
                                id={item.id || idList[index]}
                                checked={props.value === item.value}
                                inline={inline}
                                condensed={condensed}
                                disabled={isDisabled}
                            />
                        );
                    })}
                    {React.Children.map(children, (Child: React.ReactElement<RadioButtonProps>, index: number) => {
                        const disabled: boolean = props.disabled || Child.props.disabled;
                        return React.isValidElement<React.FC<RadioButtonProps>>(Child)
                            ? React.cloneElement<any>(Child, {
                                  ...props,
                                  ...Child.props,
                                  className: classnames(Child.props.className, { [hintTheme]: !!hint, disabled: disabled }),
                                  id: Child.props.id || idList[index],
                                  checked: props.value === Child.props.value,
                                  inline,
                                  condensed,
                                  disabled,
                              })
                            : Child;
                    })}
                </FeedbackIndicator>
            </div>
        </div>
    );
};

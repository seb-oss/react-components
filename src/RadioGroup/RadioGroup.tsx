import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./radio-group-style.scss";

export interface RadioListModel {
    description?: string;
    disabled?: boolean;
    group: string;
    label: string;
    value: any;
}

export interface RadioGroupProps {
    className?: string;
    condensed?: boolean;
    disableAll?: boolean;
    id?: string;
    inline?: boolean;
    label?: string;
    list: Array<RadioListModel>;
    name?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: any;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (props: RadioGroupProps): React.ReactElement<void> => {
    const [className, setClassName] = React.useState<string>("form-group custom-radio");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        let elementClassName: string = "form-group custom-radio";
        elementClassName += props.inline ? " inline" : "";
        elementClassName += props.condensed ? " condensed" : "";
        elementClassName += props.className ? ` ${props.className}` : "";
        setClassName(elementClassName);
    }, [props.className, props.inline, props.condensed]);

    React.useEffect(() => {
        constructIds();
    }, [props.list]);

    function constructIds(): void {
        const idListToSet: Array<string> = [];
        props.list.map(() => idListToSet.push(randomId("accordion-")));
        setIdList(idListToSet);
    }

    return (
        <div className={className} id={props.id}>
            <div className="input-field">
                {props.label && <label className="radio-group-label">{props.label}</label>}

                {props.list && props.list.map((item: RadioListModel, index: number) => {
                    return (
                        <div key={index} className="custom-control">
                            <input
                                className="custom-control-input"
                                type="radio"
                                value={item.value}
                                name={item.group}
                                id={idList[index]}
                                checked={props.value === item.value}
                                aria-labelledby={item.label}
                                disabled={props.disableAll || item.disabled}
                                onChange={props.onChange}
                            />
                            <label className="custom-control-label" htmlFor={idList[index]}>
                                {item.label}
                                {item.description && <span className="radio-description">{item.description}</span>}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

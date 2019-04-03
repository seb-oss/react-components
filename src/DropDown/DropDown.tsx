import * as React from "react";
import Select from "react-select";
import "./dropdown-style.scss";

export interface DropDownItem {
    value: any;
    label: string;
}

export interface DropDownProps {
    selectedValue: DropDownItem;
    list: Array<DropDownItem>;
    onChange: (event: any) => void;
    name?: string;
    className?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    native?: boolean;
    searchable?: boolean;
    multi?: boolean;
    clearable?: boolean;
    disabled?: boolean;
}

export const DropDown: React.FunctionComponent<DropDownProps> = (props: DropDownProps): React.ReactElement<void> => {
    return (
        <div
            className={"form-group custom-dropdown" + (props.className ? ` ${props.className}` : "")}
        >
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}

                {props.native &&
                    <select
                        className={"dropdown-input form-control"}
                        name={props.name}
                        value={props.selectedValue ? props.selectedValue.value : ""}
                        onChange={props.onChange}
                    >
                        {props.placeholder && <option key="default" value="DEFAULT">{props.placeholder}</option>}
                        {props.list.map((item) =>
                            <option key={item.value} value={item.value} >
                                {item.label}
                            </option>
                        )}
                    </select>
                }

                {!props.native &&
                    <Select
                        name={props.name}
                        placeholder={props.placeholder}
                        value={props.selectedValue}
                        onChange={props.onChange}
                        options={props.list}
                        isSearchable={props.searchable === undefined ? false : props.searchable}
                        isClearable={props.clearable === undefined ? false : props.searchable}
                        isMulti={props.multi}
                        isDisabled={props.disabled}
                        menuPlacement="bottom"
                        className="custom-dropdown"
                        classNamePrefix="custom-dropdown"
                    />
                }

                <div className="alert alert-danger">{props.error}</div>
            </div>
        </div>
    );
};

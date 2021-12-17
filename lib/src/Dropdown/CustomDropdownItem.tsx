import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";

export type CustomDropdownItemProps = JSX.IntrinsicElements["input"] & {
    focused?: boolean;
    multiple?: boolean;
};

export const CustomDropdownItem: React.FC<CustomDropdownItemProps> = ({ focused, multiple, children, ...props }: CustomDropdownItemProps) => {
    const [id] = React.useState<string>(randomId("ddi-"));

    return (
        <li className={classnames("custom-control", { "custom-checkbox": multiple, focused, selected: props.checked })} role="option" aria-selected={props.checked || null}>
            <input {...props} type={multiple ? "checkbox" : "radio"} id={id} className={classnames({ "custom-control-input": multiple }) || null} hidden={!multiple} />
            <label className={classnames({ "custom-control-label": multiple, "custom-radio": !multiple })} htmlFor={id}>
                {children}
            </label>
        </li>
    );
};

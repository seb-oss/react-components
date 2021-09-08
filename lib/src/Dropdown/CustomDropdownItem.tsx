import React from "react";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";

export type CustomDropdownItemProps = JSX.IntrinsicElements["input"] & {
    multiple?: boolean;
};

export const CustomDropdownItem: React.FC<CustomDropdownItemProps> = ({ multiple, children, ...props }: CustomDropdownItemProps) => {
    const [id] = React.useState<string>(randomId("ddi-"));

    return (
        <div className={classnames("custom-control", { "custom-checkbox": multiple })}>
            <input {...props} type={multiple ? "checkbox" : "radio"} id={id} className={classnames({ "custom-control-input": multiple }) || null} hidden={!multiple} />
            <label className={classnames({ "custom-control-label": multiple, "custom-radio": !multiple })} htmlFor={id}>
                {children}
            </label>
        </div>
    );
};

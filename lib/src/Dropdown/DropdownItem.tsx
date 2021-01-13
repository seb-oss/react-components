import React from "react";
import classnames from "classnames";

export type DropdownItemProps = JSX.IntrinsicElements["option"];

export const DropdownItem: React.FC<DropdownItemProps> = (props: DropdownItemProps) => {
    return <option {...props} className={classnames("rc dropdown-item", props.className)} />;
};

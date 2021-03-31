import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import "./toggle-selector-item.scss";

export type ToggleSelectorItemProps = JSX.IntrinsicElements["input"] & {
    wrapperProps?: JSX.IntrinsicElements["div"];
    children?: React.ReactNode;
};

export type ToggleSelectorItemComponent = React.FC<ToggleSelectorItemProps>;

export const ToggleSelectorItem: ToggleSelectorItemComponent = ({ wrapperProps, children, ...props }: ToggleSelectorItemProps) => {
    const [id, setId] = React.useState<string>(props.id);

    /** Sets custom id if the user din't pass any */
    React.useEffect(() => setId(props.id || randomId("toggle-selector-")), [props.id]);

    return (
        <div {...wrapperProps} className={classnames("rc", "toggle-selector-item", wrapperProps?.className)}>
            <input {...props} id={id} />
            <label htmlFor={id}>{children}</label>
        </div>
    );
};

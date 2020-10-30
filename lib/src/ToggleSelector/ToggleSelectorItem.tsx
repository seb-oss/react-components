import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";

export type ToggleSelectorItemProps = Omit<JSX.IntrinsicElements["input"], "type" | "value"> & {
    label: React.ReactNode;
    icon?: React.ReactNode;
    value: string;
};

export type ToggleSelectorItemComponent = React.FC<ToggleSelectorItemProps>;

export const ToggleSelectorItem: ToggleSelectorItemComponent = ({ className, label, icon, ...props }: ToggleSelectorItemProps) => {
    const [id, setId] = React.useState<string>(props.id);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (props.disabled) {
            return;
        }
        switch (event.keyCode) {
            case 32:
            case 13:
                (event.target as HTMLDivElement)?.previousElementSibling?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                break;
            default:
                break;
        }
    }, []);

    /** Sets custom id if the user din't pass any */
    React.useEffect(() => setId(props.id || randomId("toggle-selector-")), [props.id]);

    return (
        <label className={classnames("rc toggle-selector-item", className)} htmlFor={id} tabIndex={-1}>
            <input type={props.multiple ? "checkbox" : "radio"} {...props} id={id} />
            <div tabIndex={0} onKeyDown={onKeyDown} className={classnames("btn btn-outline-primary btn-block", { checked: props.checked, disabled: props.disabled })}>
                {icon && <div className="svg-holder">{icon}</div>}
                <div className="label-container">{label}</div>
            </div>
        </label>
    );
};

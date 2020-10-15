import React from "react";
import classnames from "classnames";

export type TabItemProps = JSX.IntrinsicElements["li"] & {
    disabled?: boolean;
    onItemClicked?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const TabItem: React.FC<TabItemProps> = React.memo(({ onItemClicked, disabled, ...props }: TabItemProps) => {
    return (
        <li {...props} className={classnames("nav-item", props.className)}>
            <a
                className={classnames("nav-link", { disabled, active: props.defaultChecked })}
                href="#"
                tabIndex={disabled ? -1 : null}
                aria-disabled={disabled}
                data-index={props["data-index"]}
                onClick={onItemClicked}
            >
                {props.children}
            </a>
        </li>
    );
});

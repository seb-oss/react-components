import React from "react";
import classnames from "classnames";

export type PageProps = JSX.IntrinsicElements["li"] & {
    href?: string;
};

export const Page: React.FC<PageProps> = React.memo(({ href, ...props }: PageProps) => {
    return (
        <li {...props} className={classnames("page-item", { active: props["data-active"], disabled: props["data-disabled"] }, props.className)}>
            <a className="page-link" href={href || "#"} onClick={(e) => e.preventDefault()}>
                {props.children}
            </a>
        </li>
    );
});

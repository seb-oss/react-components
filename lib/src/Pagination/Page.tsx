import React from "react";
import classnames from "classnames";

export type PageProps = JSX.IntrinsicElements["li"] & {
    /** The page's link. This is used to allow the user to open the page in a new browser tab. */
    href?: string;
};

export const Page: React.FC<PageProps> = React.memo(({ href, ...props }: PageProps) => {
    return (
        <li {...props} className={classnames("page-item", { active: props["data-active"], disabled: props["data-disabled"] }, props.className)}>
            <a className="page-link" href={href || "#"} onClick={(e) => e.preventDefault()} aria-disabled={props["data-disabled"]}>
                {props.children}
            </a>
        </li>
    );
});

import React from "react";
import classnames from "classnames";

export type BreadcrumbItemProps = JSX.IntrinsicElements["li"] & {
    /**
     * The link to where it navigates to. This is used to enable openning the link in new tab.
     * Additionally, you can access it in the event passed with the onNavigate callback
     */
    href?: string;
    /** Event handler triggered when the link is clicked */
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = React.memo(
    React.forwardRef(({ href = "#", onNavigate, ...props }: BreadcrumbItemProps, ref: React.ForwardedRef<HTMLLIElement>) => {
        const [className, setClassName] = React.useState<string>("breadcrumb-item");

        React.useEffect(() => setClassName(classnames(["breadcrumb-item", { active: props.defaultChecked }, props.className])), [props.defaultChecked, props.className]);

        return (
            <li {...props} ref={ref} className={className} aria-current={props.defaultChecked ? props["aria-current"] || "page" : null}>
                <a title={props.title} href={props.defaultChecked ? null : href} data-index-number={props["data-index-number"]} onClick={!props.defaultChecked ? onNavigate : null}>
                    {props.children}
                </a>
            </li>
        );
    })
);

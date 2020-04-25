import React from "react";
import classnames from "classnames";
import { BreadcrumbItemProps, BreadcrumbItem } from "./BreadcrumbItem";

export type BreadcrumbProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    /** List of BreadcrumbItemProps to be rendered */
    list?: Array<BreadcrumbItemProps>;
    /** Event handler triggered when one of the breadcrumb links is clicked */
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
    /** Enables the light version of the Breadcrumb */
    light?: boolean;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(({ onNavigate, ...props }: BreadcrumbProps) => {
    const [breadcrumbListClassName, setBreadcrumbListClassName] = React.useState<string>("seb breadcrumb");

    React.useEffect(() => setBreadcrumbListClassName(classnames(["seb", "breadcrumb", { "breadcrumb-light": props.light }])), [props.light]);

    /**
     * Find if a breadcrumb item is the last in the list so it can be disabled (active)
     * @param {"list" | "children"} source The source of the breadcrumb item which might be from list prop or children
     * @param {number} index The index of the item in its source
     * @returns {boolean} True if it's the absolute last in the parent
     */
    const isActive: (source: "list" | "children", index: number) => boolean = React.useCallback(
        (source: "list" | "children", index: number): boolean => {
            const listCount: number = props.list?.length || 0;
            const childrenCount: number = React.Children.toArray(props.children).length;
            switch (source) {
                case "children":
                    return index === childrenCount - 1;
                case "list":
                    return !childrenCount ? index === listCount - 1 : false;
            }
        },
        [props.children, props.list]
    );

    return (
        <nav {...props} aria-label="breadcrumb">
            <ol className={breadcrumbListClassName}>
                {props.list?.map((item: BreadcrumbItemProps, i: number) => (
                    <BreadcrumbItem onNavigate={item.onNavigate || onNavigate} data-index-number={i} active={isActive("list", i)} key={i} {...item} />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<BreadcrumbItemProps>, i: number) => {
                    return React.isValidElement<BreadcrumbItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              onNavigate: Child.props.onNavigate || onNavigate,
                              active: isActive("children", i),
                              "data-index-number": i,
                          })
                        : Child;
                })}
            </ol>
        </nav>
    );
});

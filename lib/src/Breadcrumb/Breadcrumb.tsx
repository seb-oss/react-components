import React from "react";
import classnames from "classnames";
import { BreadcrumbItemProps, BreadcrumbItem } from "./BreadcrumbItem";

export type BreadcrumbProps = JSX.IntrinsicElements["nav"] & {
    /** List of BreadcrumbItemProps to be rendered */
    list?: Array<BreadcrumbItemProps>;
    /** Event handler triggered when one of the breadcrumb links is clicked */
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
    /** Enables the light version of the Breadcrumb */
    light?: boolean;
};

type ItemsSource = "list" | "children";

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(({ onNavigate, list, light, ...props }: BreadcrumbProps) => {
    const [breadcrumbListClassName, setBreadcrumbListClassName] = React.useState<string>("seb breadcrumb");

    React.useEffect(() => setBreadcrumbListClassName(classnames(["rc", "breadcrumb", { "breadcrumb-light": light }])), [light]);

    /**
     * Find if a breadcrumb item is the last in the list so it can be disabled (active)
     * @param {"list" | "children"} source The source of the breadcrumb item which might be from list prop or children
     * @param {number} index The index of the item in its source
     * @returns {boolean} True if it's the absolute last in the parent
     */
    const isActive: (source: ItemsSource, index: number) => boolean = React.useCallback(
        (source: ItemsSource, index: number): boolean => {
            const listCount: number = list?.length || 0;
            const childrenCount: number = React.Children.toArray(props.children).length;
            if (source === "children") {
                return index === childrenCount - 1;
            } else {
                return childrenCount ? false : index === listCount - 1;
            }
        },
        [props.children, list]
    );

    return (
        <nav {...props} aria-label="breadcrumb">
            <ol className={breadcrumbListClassName}>
                {list?.map((item: BreadcrumbItemProps, i: number) => (
                    <BreadcrumbItem key={i} {...item} onNavigate={onNavigate} defaultChecked={isActive("list", i)} data-index-number={i} />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<BreadcrumbItemProps>, i: number) => {
                    return React.isValidElement<BreadcrumbItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              onNavigate: onNavigate,
                              defaultChecked: isActive("children", i),
                              "data-index-number": i + (list?.length || 0),
                          })
                        : Child;
                })}
            </ol>
        </nav>
    );
});

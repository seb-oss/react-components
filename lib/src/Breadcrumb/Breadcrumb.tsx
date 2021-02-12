import React from "react";
import classnames from "classnames";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";

export type BreadcrumbProps = JSX.IntrinsicElements["nav"] & {
    /** Event handler triggered when one of the breadcrumb links is clicked */
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
    /** Enables the light version of the Breadcrumb */
    light?: boolean;
};

/** A breadcrumb is a secondary navigation showing the website hierarchy. */
const Breadcrumb = ({ onNavigate, light, ...props }: BreadcrumbProps) => {
    return (
        <nav {...props} aria-label="breadcrumb">
            <ol className={classnames("breadcrumb", { "breadcrumb-light": light })}>
                {React.Children.map(props.children, (Child: React.ReactElement<BreadcrumbItemProps>, i: number) => {
                    return React.isValidElement<BreadcrumbItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              onNavigate: onNavigate,
                              defaultChecked: i === React.Children.toArray(props.children).length - 1,
                              "data-index-number": i,
                          })
                        : Child;
                })}
            </ol>
        </nav>
    );
};

Breadcrumb.Item = BreadcrumbItem;

export { Breadcrumb };

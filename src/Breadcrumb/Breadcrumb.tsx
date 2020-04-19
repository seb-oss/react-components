import React from "react";
import { BreadcrumbItemProps, BreadcrumbItem } from "./BreadcrumbItem";

export type BreadcrumbProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        /** List of BreadcrumbItemProps to be rendered */
        list?: Array<BreadcrumbItemProps>;
        /** Event handler triggered when one of the breadcrumb links is clicked */
        onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
    }
>;

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(({ onNavigate, ...props }: BreadcrumbProps) => {
    return (
        <nav {...props} aria-label="breadcrumb">
            <ol className="seb breadcrumb">
                {props.list?.map((item: BreadcrumbItemProps, i: number) => (
                    <BreadcrumbItem onNavigate={onNavigate} data-value={i} key={i} {...item} />
                ))}
                {props.children}
            </ol>
        </nav>
    );
});

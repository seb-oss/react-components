import React from "react";
import { isPrimitive } from "@sebgroup/frontend-tools/dist/isPrimitive";
import "./breadcrumb.scss";

export interface BreadcrumbProps {
    /** Element class name */
    className?: string;
    /** Element id */
    id?: string;
    /** The list of breadcrumb items */
    list: Array<BreadcurmbItem>;
    /** onClick callback */
    onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcurmbItem {
    /** The content to be displayed in each breadcrumb item */
    text: React.ReactNode;
    /**
     * The link to where it leats. This is used to enable openning the link in new tab.
     * Additionally, you can access it in the event passed with the onClick callback
     */
    href?: string;
    /** The title of the anchor tag, used for accessibility to describte where the link takes you */
    title?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(
    (props: BreadcrumbProps): React.ReactElement<void> => (
        <nav aria-label="breadcrumb" className={props.className} id={props.id}>
            <ol className="seb breadcrumb">
                {props.list.map((item: BreadcurmbItem, i: number) => {
                    const isLast: boolean = i === props.list.length - 1;

                    return (
                        <li key={i} className={"breadcrumb-item" + (isLast ? " active" : "")} aria-current={isLast ? "page" : null}>
                            <a title={item.title} href={isLast ? null : item.href || "#"} data-value={i} onClick={!isLast ? props.onClick : null}>
                                {React.isValidElement(item.text) || isPrimitive(item.text) ? item.text : null}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
);

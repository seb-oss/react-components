import React from "react";
import { Collapse } from "../Collapse/Collapse";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";

export type AccordionItemProps = JSX.IntrinsicElements["div"] & {
    /** The header of the accordion item */
    header: React.ReactNode;
    /** A sub-header description rendered under the header */
    subHeader?: React.ReactNode;
    /** An event handler triggered on an accordion button is clicked */
    onToggle?: React.MouseEventHandler<HTMLButtonElement>;
};

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({ header, subHeader, onToggle, ...props }: AccordionItemProps) => {
    const [uniqueId] = React.useState<string>(randomId("accordion-item-"));

    return (
        <div className={classnames("rc", "card", { collapsed: !props.defaultChecked }, props.className)} {...props}>
            <div className="card-header" id={uniqueId + "-header"}>
                <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    aria-expanded={props.defaultChecked}
                    data-target={`#${uniqueId}`}
                    aria-controls={uniqueId}
                    onClick={onToggle}
                    data-index-number={props["data-index-number"]}
                >
                    <h4>{header}</h4>
                    {subHeader && <h6>{subHeader}</h6>}
                </button>
            </div>
            <div
                id={uniqueId}
                className={classnames("collapse", { collapsed: !props.defaultChecked })}
                aria-labelledby={uniqueId + "--header"}
                data-parent={props["data-parent-id"] ? `#${props["data-parent-id"]}` : null}
            >
                <Collapse className="card-body" toggle={props.defaultChecked}>
                    <div className="content">{props.children}</div>
                </Collapse>
            </div>
        </div>
    );
});

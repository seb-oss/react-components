import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";
import { Collapse } from "../Collapse/Collapse";

export type AccordionItemProps = JSX.IntrinsicElements["div"] & {
    /** The header of the accordion item */
    header: React.ReactNode;
    /** A sub-header description rendered under the header */
    subHeader?: React.ReactNode;
    /** An event handler triggered on an accordion button is clicked */
    onToggle?: React.MouseEventHandler<HTMLButtonElement>;
};

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(
    React.forwardRef(({ header, subHeader, onToggle, ...props }: AccordionItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const [uniqueId] = React.useState<string>(randomId("accordion-item-"));
        const headerId: string = `${uniqueId}--header`;

        return (
            <div {...props} ref={ref} className={classnames("rc", "card", { collapsed: !props.defaultChecked }, props.className)}>
                <div className="card-header" id={headerId}>
                    <button
                        className="btn btn-link"
                        type="button"
                        aria-controls={uniqueId}
                        aria-disabled={props.defaultChecked}
                        aria-expanded={props.defaultChecked}
                        data-index-number={props["data-index-number"]}
                        data-target={`#${uniqueId}`}
                        data-toggle="collapse"
                        onClick={onToggle}
                    >
                        <h4>{header}</h4>
                        {subHeader && <h6>{subHeader}</h6>}
                    </button>
                </div>
                <section
                    id={uniqueId}
                    className={classnames("collapse", { collapsed: !props.defaultChecked })}
                    aria-labelledby={headerId}
                    data-parent={props["data-parent-id"] ? `#${props["data-parent-id"]}` : null}
                >
                    <Collapse className="card-body" toggle={props.defaultChecked}>
                        <div className="content">{props.children}</div>
                    </Collapse>
                </section>
            </div>
        );
    })
);

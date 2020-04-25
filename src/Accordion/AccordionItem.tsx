import React from "react";
import { Collapse } from "../__utils/Collapse";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

export interface AccordionItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** The header of the accordion item */
    header: React.ReactNode;
    /** A sub-header description rendered under the header */
    subHeader?: React.ReactNode;
    /** An event handler triggered when an accordion toggle is clicked. (Managed by Accordion) */
    onToggle?: React.MouseEventHandler<HTMLButtonElement>;
    /** The id of the parent component used to enable accessibility features. (Managed by Accordion) */
    parentId?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({ header, subHeader, onToggle, parentId, ...props }: AccordionItemProps) => {
    const [cardClassName, setCardClassName] = React.useState<string>("card");
    const [collapseClassName, setCollapseClassName] = React.useState<string>("collapse");
    const [uniqueId] = React.useState<string>(randomId("accordion-item-"));

    React.useEffect(() => {
        setCardClassName(classnames(["card", { collapsed: !props.defaultChecked }, props.className]));
        setCollapseClassName(classnames(["collapse", { collapsed: !props.defaultChecked }]));
    }, [props.defaultChecked, props.className]);

    return (
        <div className={cardClassName} {...props}>
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
            <div id={uniqueId} className={collapseClassName} aria-labelledby={uniqueId + "--header"} data-parent={parentId ? `#${parentId}` : null}>
                <Collapse className="card-body" toggle={props.defaultChecked}>
                    <div className="content">{props.children}</div>
                </Collapse>
            </div>
        </div>
    );
});

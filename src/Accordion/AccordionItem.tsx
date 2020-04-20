import React from "react";
import { Collapse } from "../__utils/Collapse";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

export interface AccordionItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** The header of the accordion item */
    header: React.ReactNode;
    /** A sub-header description rendered under the header */
    subHeader?: React.ReactNode;
    /** An event handler triggered when an accordion toggle is clicked */
    onToggle?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({ header, subHeader, onToggle, ...props }: AccordionItemProps) => {
    const [cardClassName, setCardClassName] = React.useState<string>("card");
    const [collapseClassName, setCollapseClassName] = React.useState<string>("collapse");
    const [uniqueId] = React.useState<string>(randomId("accordion-item-"));
    const parentId: string = props["data-parentid"];
    const active: boolean = props.defaultValue ? JSON.parse(props.defaultValue as string) : false;

    React.useEffect(() => {
        setCardClassName(classnames(["card", { collapsed: !active }, props.className]));
        setCollapseClassName(classnames(["collapse", { collapsed: !active }]));
    }, [active, props.className]);

    return (
        <div className={cardClassName} {...props}>
            <div className="card-header" id={uniqueId + "-header"}>
                <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    aria-expanded={active}
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
                <Collapse className="card-body" data-toggle={active}>
                    <div className="content">{props.children}</div>
                </Collapse>
            </div>
        </div>
    );
});

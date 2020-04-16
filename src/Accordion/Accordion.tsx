import React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { isPrimitive } from "@sebgroup/frontend-tools/dist/isPrimitive";
import classnames from "classnames";
import { AccordionItemBody } from "./AccordionItemBody";
import "./accordion.scss";

export interface AccrodionListItem {
    /** The header of the accordion item */
    header: React.ReactNode;
    /** A sub-header description rendered under the header */
    subHeader?: React.ReactNode;
    /** The content of the accordion item */
    content: React.ReactNode;
}

export interface AccordionProps {
    /** Element class name */
    className?: string;
    /** Element id */
    id?: string;
    /**
     * The accordion list of items
     * @see AccordionListItem interface
     */
    list: Array<AccrodionListItem>;
    /** An alternative version of the accordion */
    alternative?: boolean;
    /** The index of an item that would be set to be expanded by default  */
    defaultExpanded?: number;
}

const Accordion: React.FC<AccordionProps> = React.memo((props: AccordionProps) => {
    const [active, setActive] = React.useState<number>(props.defaultExpanded);
    const [idList, setIdList] = React.useState<Array<string>>([]);
    const [id, setId] = React.useState<string>("");
    const [className, setClassName] = React.useState<string>("");

    React.useEffect(() => constructIds(), [props.list]);
    React.useEffect(() => setActive(props.defaultExpanded), [props.defaultExpanded]);
    React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
    React.useEffect(() => setClassName(classnames(["seb", "accordion", { alternative: props.alternative }, props.className])), [props.className, props.alternative]);

    /** Constructs identifiers for accordion items to be used enable accessibility features */
    const constructIds: VoidFunction = React.useCallback(() => {
        const idListToSet: Array<string> = [];
        props.list?.map(() => idListToSet.push(randomId("accordion-item-")));
        setIdList(idListToSet);
    }, [props.list, setIdList]);

    /**
     * Handles accordion item click event
     * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
     */
    const onToggle: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            setActive(active === Number(e.currentTarget.value) ? null : Number(e.currentTarget.value));
        },
        [active, setActive]
    );

    return (
        <div className={className} id={id}>
            {props.list?.map((item: AccrodionListItem, index: number) => {
                const cardClassName: string = classnames(["card", { collapsed: active !== index }]);
                const collapseClassName: string = classnames(["collapse", { collapsed: active !== index }]);

                return (
                    <div className={cardClassName} key={index}>
                        <div className="card-header" id={idList[index] + "-header"}>
                            <button
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                aria-expanded={index === active ? "true" : "false"}
                                data-target={`#${idList[index]}`}
                                aria-controls={idList[index]}
                                onClick={onToggle}
                                value={index}
                            >
                                <h4>{React.isValidElement(item.header) || isPrimitive(item.header) ? item.header : null}</h4>
                                {item.subHeader && <h6>{React.isValidElement(item.subHeader) || isPrimitive(item.subHeader) ? item.subHeader : null}</h6>}
                            </button>
                        </div>
                        <div id={idList[index]} className={collapseClassName} aria-labelledby={idList[index] + "--header"} data-parent={`#${id}`}>
                            <AccordionItemBody toggle={active === index}>{item.content}</AccordionItemBody>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export { Accordion };

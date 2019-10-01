import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./accordion-style.scss";

const chevronDownIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" /></svg>;

export type AccordionIconRotation = "deg-180" | "deg-180-counter" | "deg-90" | "deg-90-counter";

export interface AccordionContent {
    title?: string;
    desc?: string;
}

export type AccordionContentType = AccordionContent | Array<AccordionContent> | React.ReactNode;

export interface AccrodionListItem {
    header: string;
    subHeaderText?: string;
    content?: AccordionContentType;
}

export interface AccordionProps {
    className?: string;
    customIcon?: JSX.Element;
    customIconExpanded?: JSX.Element;
    iconPosition?: "left" | "right";
    iconRotation?: AccordionIconRotation;
    id?: string;
    list: Array<AccrodionListItem>;
    alternative?: boolean;
}

const Accordion: React.FunctionComponent<AccordionProps> = (props: AccordionProps) => {
    const [active, setActive] = React.useState<number>(null);
    const [accordionClassName, setAccordionClassName] = React.useState<string>("custom-accordion");
    const [itemClassName, setItemClassName] = React.useState<string>("custom-accordion");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        constructIds();
        constructClassName();
        constructItemClassName();
    }, []);

    React.useEffect(() => {
        constructIds();
        constructClassName();
        constructItemClassName();
    }, [props.id, props.className, props.alternative, props.iconPosition, props.iconRotation, props.customIconExpanded, props.list]);

    /**
     * Constructs the component's `id` if `id` prop is passed
     */
    function constructIds(): void {
        const idListToSet: Array<string> = [];
        props.list.map(() => idListToSet.push(randomId("accordion-")));
        setIdList(idListToSet);
    }

    /**
     * Constructs the `classname` to be used in accordion wrapper
     */
    function constructClassName(): void {
        let cn: string = "custom-accordion";
        cn  += props.className ? ` ${props.className}` : "";
        if (props.alternative) {
            cn  += " alternate-accordion";
        }
        setAccordionClassName(cn);
    }

    /**
     * Constructs the `classname` to be used in accordion items
     */
    function constructItemClassName(): void {
        let cn: string = "accordion-item";
        cn += " " + (props.iconPosition ? props.iconPosition : "left");
        cn += " " + (props.iconRotation ? props.iconRotation : "deg-180");
        cn += props.customIconExpanded ? " transform" : "";
        setItemClassName(cn);
    }

    const toggle = (i: number): void => setActive(active === i ? null : i);

    /**
     * Activates the accordion when `space` or `enter` is registered
     * @param event: Keyboard event
     */
    function onKeyDown(index: number, e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key.toLowerCase() === " " || e.key.toLowerCase() === "space" || e.key.toLowerCase() === "enter") {
            toggle(index);
        }
    }

    return (
        <div className={accordionClassName} id={props.id} >
            {props.list && props.list.map((item: AccrodionListItem, index: number) => {
                return (
                    <div
                        className={itemClassName + (active === index ? " active" : "")}
                        key={index}
                        tabIndex={0}
                        id={idList[index]}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(index, e)}
                        aria-expanded={active === index}
                        aria-controls={`lbl-${idList[index]}`}
                        role="button"
                    >
                        <div
                            className={"header-wrapper" + (item.subHeaderText ? " with-sub-header" : "")}
                            onClick={() => setActive(active === index ? null : index)}
                        >
                            {props.customIcon || chevronDownIcon}
                            {props.customIconExpanded ? props.customIconExpanded : null}
                            <h4 className={"accordion-header"}>{item.header}</h4>
                            {item.subHeaderText && <h6 className="accordion-sub-header">{item.subHeaderText}</h6>}
                        </div>
                        <div className="content-wrapper" aria-labelledby={idList[index]} id={`lbl-${idList[index]}`} role="region">
                            {item && <AccordionContentRenderer {...item} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const AccordionContentRenderer: React.FunctionComponent<AccrodionListItem> = (props: AccrodionListItem) => {
    if (React.isValidElement(props.content)) {
        const nodeContent: React.ReactNode = props.content as React.ReactNode;
        return (
            <div className="text-wrapper">{nodeContent}</div>
        );
    } else if (props.content instanceof Array) {
        const arrayContent: Array<AccordionContent> = props.content as Array<AccordionContent>;
        return (
            <div className="text-wrapper">
                {arrayContent.map((text: AccordionContent, textIndex: number) =>
                    <div className="text-item" key={textIndex}>
                        {text.title && <div className="accordion-title">{text.title}</div>}
                        {text.desc && <div className="accordion-desc">{text.desc}</div>}
                    </div>
                )}
            </div>
        );
    } else {
        const objectContent: AccordionContent = props.content as AccordionContent;
        return (
            <div className="text-wrapper">
                <div className="text-item">
                    {objectContent.title && <div className="accordion-title">{objectContent.title}</div>}
                    {objectContent.desc && <div className="accordion-desc">{objectContent.desc}</div>}
                </div>
            </div>
        );
    }
};

export { Accordion };

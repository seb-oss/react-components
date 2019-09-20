import * as React from "react";
import "./accordion-style.scss";

const chevronDownIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" /></svg>;
const randomId = (): string => String((Math.random() * 1000) + (new Date()).getTime());

export type AccordionIconRotation = "deg-180" | "deg-180-counter" | "deg-90" | "deg-90-counter";

export interface AccordionText {
    title?: string;
    desc?: string;
}

export interface AccrodionListItem {
    category: string;
    subHeaderText?: string;
    text?: AccordionText | Array<AccordionText>;
}

export interface AccordionProps {
    className?: string;
    customIcon?: JSX.Element;
    customIconExpanded?: JSX.Element;
    iconPosition?: "left" | "right";
    iconRotation?: AccordionIconRotation;
    id?: string;
    list: Array<AccrodionListItem>;
}

const Accordion: React.FunctionComponent<AccordionProps> = (props: AccordionProps) => {
    const [active, setActive] = React.useState<number>(null);
    const [className, setClassName] = React.useState<string>("custom-accordion");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        constructIds();
        constructClassName();
    }, []);

    React.useEffect(() => {
        constructIds();
        constructClassName();
    }, [props.id, props.className, props.iconPosition, props.iconRotation, props.customIconExpanded, props.list]);

    function constructIds(): void {
        const idListToSet: Array<string> = [];
        props.list.map(() => idListToSet.push(randomId()));
        setIdList(idListToSet);
    }

    function constructClassName(): void {
        let cn: string = "accordion-item";
        cn += " " + (props.iconPosition ? props.iconPosition : "left");
        cn += " " + (props.iconRotation ? props.iconRotation : "deg-180");
        cn += props.customIconExpanded ? " transform" : "";
        setClassName(cn);
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
        <div className={"custom-accordion" + (props.className ? ` ${props.className}` : "")} id={props.id} >
            {props.list && props.list.map((item: AccrodionListItem, index: number) => {
                return (
                    <div
                        className={className + (active === index ? " active" : "")}
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
                            <div className={"accordion-header"}>{item.category}</div>
                            {item.subHeaderText && <div className="accordion-sub-header">{item.subHeaderText}</div>}
                        </div>
                        <div className="content-wrapper" aria-labelledby={idList[index]} id={`lbl-${idList[index]}`} role="region">
                            {!(item.text instanceof Array) &&
                                <div className="text-wrapper">
                                    <div className="text-item">
                                        {item.text.title && <div className="accordion-title">{item.text.title}</div>}
                                        {item.text.desc && <div className="accordion-desc">{item.text.desc}</div>}
                                    </div>
                                </div>
                            }
                            {(item.text instanceof Array) &&
                                <div className="text-wrapper">
                                    {item.text.map((text: AccordionText, textIndex: number) =>
                                        <div className="text-item" key={textIndex}>
                                            {text.title && <div className="accordion-title">{text.title}</div>}
                                            {text.desc && <div className="accordion-desc">{text.desc}</div>}
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { Accordion };

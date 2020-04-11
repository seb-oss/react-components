import * as React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import "./accordion-style.scss";

const chevronDownIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" />
    </svg>
);

export type AccordionIconRotation = "deg-180" | "deg-180-counter" | "deg-90" | "deg-90-counter";
export type AccordionContentType = AccordionContent | Array<AccordionContent> | React.ReactNode;
export type AccordionContent = { title?: string; desc?: string };

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
    activeIndex?: number;
}

const Accordion: React.FunctionComponent<AccordionProps> = (props: AccordionProps) => {
    const collapsableRef: React.MutableRefObject<Array<React.RefObject<HTMLDivElement>>> = React.useRef(props.list?.map(() => React.createRef<HTMLDivElement>()) || []);
    const [heightList, setHeightList] = React.useState<Array<number>>(Array(props.list?.length).fill(0) || []);
    const [active, setActive] = React.useState<number>(null);
    const [accordionClassName, setAccordionClassName] = React.useState<string>("custom-accordion");
    const [itemClassName, setItemClassName] = React.useState<string>("custom-accordion");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        constructIds();
    }, [props.list]);
    React.useEffect(() => constructClassName(), [props.className, props.alternative]);
    React.useEffect(() => constructItemClassName(), [props.iconPosition, props.customIconExpanded, props.iconRotation]);
    React.useEffect(() => toggle(props.activeIndex), [props.activeIndex]);

    /** Constructs `id`s for accordion items */
    function constructIds(): void {
        const idListToSet: Array<string> = [];
        props.list?.map(() => idListToSet.push(randomId("accordion-")));
        setIdList(idListToSet);
    }

    /** Constructs the `className` to be used in accordion wrapper */
    function constructClassName(): void {
        let cn: string = "custom-accordion";
        cn += props.className ? ` ${props.className}` : "";
        cn += props.alternative ? " alternative-accordion" : "";
        setAccordionClassName(cn);
    }

    /** Constructs the `className` to be used in accordion items */
    function constructItemClassName(): void {
        let cn: string = "accordion-item";
        cn += " " + (props.iconPosition ? props.iconPosition : "left");
        cn += " " + (props.iconRotation ? props.iconRotation : "deg-180");
        cn += props.customIconExpanded ? " transform" : "";
        setItemClassName(cn);
    }

    function expandOrCollapseSection(itemIndex: number): void {
        const updatedHeightList: Array<number> = Array(props.list?.length).fill(0) || [];
        updatedHeightList[itemIndex] = heightList[itemIndex] ? 0 : collapsableRef?.current[itemIndex]?.current?.scrollHeight;
        setHeightList(updatedHeightList);
    }

    function toggle(index: number): void {
        if (active === index) {
            // Section already expanded
            expandOrCollapseSection(index);
        } else {
            if (active !== null) {
                // Another section is already expanded
                expandOrCollapseSection(active);
            }
            expandOrCollapseSection(index);
        }
        setActive(active === index ? null : index);
    }

    /**
     * Handles accordion item click event
     * @param e MouseEvent
     * @param index list index
     */
    function onToggle(e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void {
        const index: number = Number(e.currentTarget.getAttribute("data-id"));
        if (e.type === "keydown") {
            const key: string = (e as React.KeyboardEvent<HTMLDivElement>).key;
            if ([" ", "space", "enter"].indexOf(key.toLowerCase()) !== -1) {
                toggle(index);
                e.preventDefault();
            }
        } else {
            toggle(index);
        }
    }

    return (
        <div className={accordionClassName} id={props.id}>
            {props.list?.map((item: AccrodionListItem, index: number) => {
                return (
                    <div
                        className={itemClassName + (active === index ? " active" : "")}
                        key={index}
                        tabIndex={0}
                        data-id={index}
                        id={idList[index]}
                        onKeyDown={onToggle}
                        aria-expanded={active === index}
                        aria-controls={`lbl-${idList[index]}`}
                        role="button"
                    >
                        <div className={"header-wrapper" + (item.subHeaderText ? " with-sub-header" : "")} data-id={index} onClick={onToggle}>
                            {props.customIcon || chevronDownIcon}
                            {props.customIconExpanded ? props.customIconExpanded : null}
                            <h4 className={"accordion-header"}>{item.header}</h4>
                            {item.subHeaderText && <h6 className="accordion-sub-header">{item.subHeaderText}</h6>}
                        </div>
                        <div className="content-wrapper" aria-labelledby={idList[index]} id={`lbl-${idList[index]}`} role="region">
                            {item && <AccordionContentRenderer {...item} height={heightList[index]} collapsableRef={collapsableRef?.current[index]} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface AccordionContentRendererProps extends AccrodionListItem {
    collapsableRef: React.RefObject<HTMLDivElement>;
    height?: number;
}

const AccordionContentRenderer: React.FunctionComponent<AccordionContentRendererProps> = (props: AccordionContentRendererProps) => {
    let content: AccordionContentType;
    if (React.isValidElement(props.content)) {
        content = props.content as React.ReactNode;
    } else if (props.content instanceof Array) {
        content = (props.content as Array<AccordionContent>).map((text: AccordionContent, textIndex: number) => (
            <div className="text-item" key={textIndex}>
                {text.title && <div className="accordion-title">{text.title}</div>}
                {text.desc && <div className="accordion-desc">{text.desc}</div>}
            </div>
        ));
    } else {
        const objectContent: AccordionContent = props.content as AccordionContent;
        content = (
            <div className="text-item">
                {objectContent.title && <div className="accordion-title">{objectContent.title}</div>}
                {objectContent.desc && <div className="accordion-desc">{objectContent.desc}</div>}
            </div>
        );
    }
    return (
        <div className="text-wrapper" ref={props.collapsableRef} data-collapsed={!!!props.height} aria-expanded={!!props.height} style={{ height: props.height }}>
            {content}
        </div>
    );
};

export { Accordion };

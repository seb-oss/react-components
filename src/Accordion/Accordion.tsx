import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./accordion-style.scss";

const chevronDownIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" /></svg>;

export type AccordionIconRotation = "deg-180" | "deg-180-counter" | "deg-90" | "deg-90-counter";
export type AccordionContentType = AccordionContent | Array<AccordionContent> | React.ReactNode;
export type AccordionContent = { title?: string; desc?: string; };

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
    const collapsableRef: React.MutableRefObject<Array<React.RefObject<HTMLDivElement>>> = React.useRef(props.list.map(() => React.createRef<HTMLDivElement>()));
    const [active, setActive] = React.useState<number>(null);
    const [accordionClassName, setAccordionClassName] = React.useState<string>("custom-accordion");
    const [itemClassName, setItemClassName] = React.useState<string>("custom-accordion");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => { constructRefs(); constructIds(); }, [props.list]);
    React.useEffect(() => constructClassName(), [props.className, props.alternative]);
    React.useEffect(() => constructItemClassName(), [props.iconPosition, props.customIconExpanded, props.iconRotation]);

    /** Constructs and initialize collapsable refs by index for each element in the list */
    function constructRefs(): void {
        for (let i = 0; i < props.list.length; i++) {
            if (collapsableRef.current && collapsableRef.current[i]) {
                collapseSection(collapsableRef.current[i]);
            }
        }
    }

    /** Constructs `id`s for accordion items */
    function constructIds(): void {
        const idListToSet: Array<string> = [];
        props.list.map(() => idListToSet.push(randomId("accordion-")));
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

    const toggle = (i: number): void => setActive(active === i ? null : i);

    /**
     * Activates the accordion when `space` or `enter` is registered
     * @param event: Keyboard event
     */
    function onKeyDown(index: number, e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key.toLowerCase() === " " || e.key.toLowerCase() === "space" || e.key.toLowerCase() === "enter") {
            if (active === index) {
                collapseSection(collapsableRef.current[index]);
            } else {
                if (active !== null) {
                    collapseSection(collapsableRef.current[active]);
                }
                expandSection(collapsableRef.current[index]);
            }

            toggle(index);
            e.preventDefault();
        }

    }

    /**
     * Handles accordion item click event
     * @param e MouseEvent
     * @param index list index
     */
    function onToggle(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number): void {
        if (active === index) {
            collapseSection(collapsableRef.current[index]);
        } else {
            if (active !== null) {
                collapseSection(collapsableRef.current[active]);
            }
            expandSection(collapsableRef.current[index]);
        }

        toggle(index);
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
                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onToggle(e, index)}
                        >
                            {props.customIcon || chevronDownIcon}
                            {props.customIconExpanded ? props.customIconExpanded : null}
                            <h4 className={"accordion-header"}>{item.header}</h4>
                            {item.subHeaderText && <h6 className="accordion-sub-header">{item.subHeaderText}</h6>}
                        </div>
                        <div className="content-wrapper" aria-labelledby={idList[index]} id={`lbl-${idList[index]}`} role="region">
                            {item && <AccordionContentRenderer {...item} collapsableRef={collapsableRef.current[index]} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const expandSection = (ref: React.RefObject<HTMLDivElement>): void => {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight: number = ref.current.scrollHeight;

    // have the element transition to the height of its inner content
    ref.current.style.height = sectionHeight + "px";

    // when the next css transition finishes (which should be the one we just triggered)

    const transitionendEvent = () => {
        // remove this event listener so it only gets triggered once
        ref.current.removeEventListener("transitionend", transitionendEvent);

        // remove "height" from the element's inline styles, so it can return to its initial value
        ref.current.style.height = null;
    };

    ref.current.addEventListener("transitionend", transitionendEvent);

    // mark the section as "currently not collapsed"
    ref.current.setAttribute("data-collapsed", "false");
    ref.current.setAttribute("aria-expanded", "true");
};

const collapseSection = (ref: React.RefObject<HTMLDivElement>): void => {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight: number = ref.current.scrollHeight;

    // temporarily disable all css transitions
    const elementTransition: string = ref.current.style.transition;
    ref.current.style.transition = "";

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(() => {
        if (ref && ref.current) {
            ref.current.style.height = sectionHeight + "px";
            ref.current.style.transition = elementTransition;
        }
        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(() => {
            // this is an event and can be triggered late hence the checking below
            if (ref && ref.current) {
                ref.current.style.height = 0 + "px";
            }
        });
    });

    // mark the section as "currently collapsed"
    ref.current.setAttribute("data-collapsed", "true");
    ref.current.setAttribute("aria-expanded", "false");
};

interface AccordionContentRendererProps extends AccrodionListItem {
    collapsableRef: React.RefObject<HTMLDivElement>;
}

const AccordionContentRenderer: React.FunctionComponent<AccordionContentRendererProps> = (props: AccordionContentRendererProps) => {
    if (React.isValidElement(props.content)) {
        const nodeContent: React.ReactNode = props.content as React.ReactNode;
        return (
            <div className="text-wrapper" ref={props.collapsableRef}>{nodeContent}</div>
        );
    } else if (props.content instanceof Array) {
        const arrayContent: Array<AccordionContent> = props.content as Array<AccordionContent>;
        return (
            <div className="text-wrapper" ref={props.collapsableRef}>
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
            <div className="text-wrapper" ref={props.collapsableRef}>
                <div className="text-item">
                    {objectContent.title && <div className="accordion-title">{objectContent.title}</div>}
                    {objectContent.desc && <div className="accordion-desc">{objectContent.desc}</div>}
                </div>
            </div>
        );
    }
};

export { Accordion };

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

interface TransitionProps {
    height?: string;
    transition?: string;
    dataCollapsed?: boolean;
    ariaExpanded?: boolean;
}

const Accordion: React.FunctionComponent<AccordionProps> = (props: AccordionProps) => {
    const collapsableRef: React.MutableRefObject<Array<React.RefObject<HTMLDivElement>>> = React.useRef(props.list.map(() => React.createRef<HTMLDivElement>()));
    const [transitionProperties, setTransitionProperty] = React.useState<Array<TransitionProps>>(() => props.list.map((): TransitionProps => ({
        height: "0px",
        dataCollapsed: true,
        ariaExpanded: false,
    })));
    const [active, setActive] = React.useState<number>(null);
    const [accordionClassName, setAccordionClassName] = React.useState<string>("custom-accordion");
    const [itemClassName, setItemClassName] = React.useState<string>("custom-accordion");
    const [idList, setIdList] = React.useState<Array<string>>([]);

    React.useEffect(() => { constructIds(); }, [props.list]);
    React.useEffect(() => constructClassName(), [props.className, props.alternative]);
    React.useEffect(() => constructItemClassName(), [props.iconPosition, props.customIconExpanded, props.iconRotation]);

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

    const expandSection = (ref: React.RefObject<HTMLDivElement>, itemIndex: number): void => {
        // get the height of the element's inner content, regardless of its actual size
        const sectionHeight: number = ref.current.scrollHeight;

        // mark the section as "currently not collapsed"
        // have the element transition to the height of its inner content
        const updatedTransitionProperties: Array<TransitionProps> = transitionProperties.map((item: TransitionProps, index: number) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    dataCollapsed: false,
                    ariaExpanded: true,
                    height: sectionHeight + "px"
                };
            }

            // reset previous selections
            return { ...item, height: "0px" };
        });

        setTransitionProperty(updatedTransitionProperties);
    };

    const collapseSection = (ref: React.RefObject<HTMLDivElement>, itemIndex: number): void => {
        // mark the section as "currently collapsed"
        // temporarily disable all css transitions
        const updatedTransitionProperties: Array<TransitionProps> = transitionProperties.map((item: TransitionProps, index: number) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    dataCollapsed: true,
                    ariaExpanded: false,
                    height: 0 + "px",
                };
            }
            return item;
        });
        setTransitionProperty(updatedTransitionProperties);
    };

    /**
     * Activates the accordion when `space` or `enter` is registered
     * @param event: Keyboard event
     */
    function onKeyDown(index: number, e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key.toLowerCase() === " " || e.key.toLowerCase() === "space" || e.key.toLowerCase() === "enter") {
            if (active === index) {
                collapseSection(collapsableRef.current[index], index);
            } else {
                if (active !== null) {
                    collapseSection(collapsableRef.current[active], active);
                }
                expandSection(collapsableRef.current[index], index);
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
            collapseSection(collapsableRef.current[index], index);
        } else {
            if (active !== null) {
                collapseSection(collapsableRef.current[active], active);
            }
            expandSection(collapsableRef.current[index], index);
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
                            {item && <AccordionContentRenderer {...item} transitionProperty={transitionProperties[index]} collapsableRef={collapsableRef.current[index]} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface AccordionContentRendererProps extends AccrodionListItem {
    collapsableRef: React.RefObject<HTMLDivElement>;
    transitionProperty: TransitionProps;
}

const AccordionContentRenderer: React.FunctionComponent<AccordionContentRendererProps> = (props: AccordionContentRendererProps) => {
    if (React.isValidElement(props.content)) {
        const nodeContent: React.ReactNode = props.content as React.ReactNode;
        return (
            <div
                className="text-wrapper"
                data-collapsed={props.transitionProperty && props.transitionProperty.dataCollapsed}
                aria-expanded={props.transitionProperty && props.transitionProperty.ariaExpanded}
                style={{ height: props.transitionProperty && props.transitionProperty.height }}
                ref={props.collapsableRef}
            >{nodeContent}
            </div>
        );
    } else if (props.content instanceof Array) {
        const arrayContent: Array<AccordionContent> = props.content as Array<AccordionContent>;
        return (
            <div
                className="text-wrapper"
                ref={props.collapsableRef}
                data-collapsed={props.transitionProperty && props.transitionProperty.dataCollapsed}
                aria-expanded={props.transitionProperty && props.transitionProperty.ariaExpanded}
                style={{ height: props.transitionProperty && props.transitionProperty.height }}
            >
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
            <div
                className="text-wrapper"
                ref={props.collapsableRef}
                data-collapsed={props.transitionProperty && props.transitionProperty.dataCollapsed}
                aria-expanded={props.transitionProperty && props.transitionProperty.ariaExpanded}
                style={{ height: props.transitionProperty && props.transitionProperty.height }}
            >
                <div className="text-item">
                    {objectContent.title && <div className="accordion-title">{objectContent.title}</div>}
                    {objectContent.desc && <div className="accordion-desc">{objectContent.desc}</div>}
                </div>
            </div>
        );
    }
};

export { Accordion };

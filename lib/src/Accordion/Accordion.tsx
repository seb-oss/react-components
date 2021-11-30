import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";
import { useCombinedRefs } from "../hooks/useCombinedRef";
import "./accordion.scss";
import { AccordionItemProps } from "./AccordionItem";

export type AccordionProps = JSX.IntrinsicElements["div"] & {
    /** An alternative version of the accordion */
    alternative?: boolean;
    /** An event handler triggered when an accordion toggle is clicked */
    onToggle?: React.MouseEventHandler<HTMLButtonElement>;
    /** Places the icon toggle on the right side */
    inverted?: boolean;
    /** The default `active` item. (Overriding the native type) */
    defaultValue?: number;
};

/** Accordions show and hide information that is not necessary at all time with one click. */
export const Accordion: React.FC<AccordionProps> = React.memo(
    React.forwardRef(({ alternative, onToggle, inverted, ...props }: AccordionProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const accordionRef: React.MutableRefObject<HTMLDivElement> = useCombinedRefs(ref);
        const [active, setActive] = React.useState<number>(props.defaultValue);
        const [id, setId] = React.useState<string>(props.id);

        /**
         * Handles accordion item click event
         * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
         */
        const onToggleInner: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            const index: number = Number(e.currentTarget.dataset.indexNumber);
            !isNaN(index) && setActive((val: number) => (val === index ? -1 : index));
        }, []);

        /**
         * handles accordion item click callback
         * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
         * @param {React.MouseEvent<HTMLButtonElement>} itemToggleFn item onToggle callback
         */
        const onAccordionItemToggle = React.useCallback(
            (e: React.MouseEvent<HTMLButtonElement>, itemToggleFn?: React.MouseEventHandler<HTMLButtonElement>) => {
                if (onToggle) {
                    onToggle(e);
                } else {
                    onToggleInner(e);
                }
                itemToggleFn && itemToggleFn(e); // allows user to pass specific on toggle function for each accordion item
            },
            [onToggle, onToggleInner]
        );

        /**
         * handles accordion keyboard support @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
         */
        const onAccordionKeyDown = React.useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                const accordionHeaderRefs: HTMLElement[] = Array.from(accordionRef.current.querySelectorAll<HTMLElement>(".card-header > .btn"));
                const isAccordionHeader: boolean = accordionHeaderRefs.includes(e.target as HTMLElement);

                if (isAccordionHeader) {
                    const eventKeyCode: string = e.key;
                    const headerLength: number = accordionHeaderRefs.length;
                    const currentFocusedIndex: number = accordionHeaderRefs.indexOf(e.target as HTMLElement);

                    switch (eventKeyCode) {
                        case "ArrowDown":
                        case "ArrowUp": {
                            e.preventDefault();
                            const direction: number = eventKeyCode === "ArrowDown" ? 1 : -1;
                            const nextFocusIndex: number = (currentFocusedIndex + headerLength + direction) % headerLength;
                            accordionHeaderRefs[nextFocusIndex].focus();
                            break;
                        }
                        case "Home": {
                            e.preventDefault();
                            accordionHeaderRefs[0].focus();
                            break;
                        }
                        case "End": {
                            e.preventDefault();
                            accordionHeaderRefs[headerLength - 1].focus();
                            break;
                        }
                    }
                }
            },
            [accordionRef]
        );

        /** Sets custom id if the user din't pass any */
        React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
        React.useEffect(() => {
            typeof props.defaultValue === "number" && setActive(props.defaultValue);
        }, [props.defaultValue]);

        return (
            <div {...props} ref={accordionRef} className={classnames(["rc", "accordion", { alternative }, { inverted }, props.className])} id={id} onKeyDown={onAccordionKeyDown}>
                {React.Children.map(props.children, (Child: React.ReactElement<AccordionItemProps>, i: number) => {
                    return React.isValidElement<React.FC<AccordionItemProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              onToggle: (e: React.MouseEvent<HTMLButtonElement>) => onAccordionItemToggle(e, Child.props.onToggle),
                              defaultChecked: typeof active !== "number" ? Child.props.defaultChecked : active === i,
                              "data-parent-id": id,
                              "data-index-number": i,
                          })
                        : Child;
                })}
            </div>
        );
    })
);

import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import classnames from "classnames";
import { AccordionItemProps, AccordionItem } from "./AccordionItem";
import "./accordion.scss";

export type AccordionProps = JSX.IntrinsicElements["div"] & {
    /**
     * The accordion list of items
     * @see AccordionItemProps interface
     */
    list?: Array<AccordionItemProps>;
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
export const Accordion: React.FC<AccordionProps> = React.memo(({ list, alternative, onToggle, inverted, ...props }: AccordionProps) => {
    const [active, setActive] = React.useState<number>(Number(props.defaultValue));
    const [id, setId] = React.useState<string>(props.id);
    const [className, setClassName] = React.useState<string>("seb accordion");

    /** Sets custom id if the user din't pass any */
    React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
    React.useEffect(() => setClassName(classnames(["rc", "accordion", { alternative }, { inverted }, props.className])), [props.className, alternative, inverted]);
    React.useEffect(() => {
        typeof props.defaultValue === "number" && setActive(props.defaultValue);
    }, [props.defaultValue]);

    /**
     * Handles accordion item click event
     * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
     */
    const onToggleInner: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const index: number = Number(e.currentTarget.dataset.indexNumber);
            !isNaN(index) && setActive(active === index ? -1 : index);
        },
        [active]
    );

    if (isNaN(active)) {
        /**
         * `active` is not initialized with `props.defaultValue` (`Number(undefined) === NaN`).
         * Should only run once. The active state will never be set to NaN.
         *
         * At least one child is needed to determine the default.
         */
        if (list?.length || React.Children.count(props.children)) {
            // Trying to find an item set to active in the list prop first
            // If the default value is set from the parent, it should override anything else
            let defaultValue: number = list ? list.findIndex((item: AccordionItemProps) => item.defaultChecked) : -1;
            if (defaultValue === -1) {
                // If the active is not found in one of the list items maybe it's one of the children
                defaultValue = React.Children.toArray(props.children).findIndex((Child: React.ReactElement<AccordionItemProps>) => Child.props?.defaultChecked);
                if (list) {
                    defaultValue += list.length;
                }
            }
            // Set the active to the found child, else it's `-1`
            setActive(defaultValue);
        }
    }

    return (
        <div {...props} className={className} id={id}>
            {list?.map((item: AccordionItemProps, i: number) => (
                <AccordionItem key={i} {...item} onToggle={onToggle || onToggleInner} defaultChecked={active === i} data-index-number={i} data-parent-id={id} />
            ))}
            {React.Children.map(props.children, (Child: React.ReactElement<AccordionItemProps>, i: number) => {
                return React.isValidElement<React.FC<AccordionItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          onToggle: onToggle || onToggleInner,
                          defaultChecked: active === i + (list?.length || 0),
                          "data-parent-id": id,
                          "data-index-number": i + (list?.length || 0),
                      })
                    : Child;
            })}
        </div>
    );
});

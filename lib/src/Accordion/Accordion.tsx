import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import classnames from "classnames";
import { AccordionItemProps } from "../AccordionItem";
import "./accordion.scss";

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
export const Accordion: React.FC<AccordionProps> = React.memo(({ alternative, onToggle, inverted, ...props }: AccordionProps) => {
    const [active, setActive] = React.useState<number>(props.defaultValue);
    const [id, setId] = React.useState<string>(props.id);

    /** Sets custom id if the user din't pass any */
    React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
    React.useEffect(() => {
        typeof props.defaultValue === "number" && setActive(props.defaultValue);
    }, [props.defaultValue]);

    /**
     * Handles accordion item click event
     * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
     */
    const onToggleInner: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const index: number = Number(e.currentTarget.dataset.indexNumber);
        !isNaN(index) && setActive((val: number) => (val === index ? -1 : index));
    }, []);

    return (
        <div {...props} className={classnames(["rc", "accordion", { alternative }, { inverted }, props.className])} id={id}>
            {React.Children.map(props.children, (Child: React.ReactElement<AccordionItemProps>, i: number) => {
                return React.isValidElement<React.FC<AccordionItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          onToggle: onToggle || onToggleInner,
                          defaultChecked: typeof active !== "number" ? Child.props.defaultChecked : active === i,
                          "data-parent-id": id,
                          "data-index-number": i,
                      })
                    : Child;
            })}
        </div>
    );
});

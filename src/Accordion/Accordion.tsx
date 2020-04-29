import React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import classnames from "classnames";
import { AccordionItemProps, AccordionItem } from "./AccordionItem";
import "./accordion.scss";

export type AccordionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
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

export const Accordion: React.FC<AccordionProps> = React.memo(({ list, alternative, onToggle, inverted, ...props }: AccordionProps) => {
    const [active, setActive] = React.useState<number>(Number(props.defaultValue));
    const [id, setId] = React.useState<string>(props.id);
    const [className, setClassName] = React.useState<string>("seb accordion");

    /** Sets custom id if the user din't pass any */
    React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
    React.useEffect(() => setClassName(classnames(["seb", "accordion", { alternative }, { inverted }, props.className])), [props.className, alternative, inverted]);
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

    /**
     * Hijacks `onAuxClick` from the child element and uses it to pass `onToggle` event handler
     * when the accordion item button is clicked. It will also work if the user wanted to pass an
     * `onAuxClick` event to the AccordionItem element.
     * @param {React.MouseEvent<any>} e The click event
     * The reason why this is used instead of a custom `onNavigate` is because any element passed
     * will receive data injected by the Breadcrumb, if the element is not an AccordionItem, it
     * will throw an error in the console that `onNavigate` is not a valid attribute.
     */
    const onToggleHandler: React.MouseEventHandler<any> = React.useCallback(
        (e: React.MouseEvent<any>) => {
            if (e.currentTarget.tagName === "BUTTON") {
                onToggle ? onToggle(e) : onToggleInner(e);
            } else {
                // This will only run if the user passed `onAuxClick` to an `AccordionItem`
                let index: number = Number(e.currentTarget.dataset.indexNumber);
                if (list && index < list.length && list[index].onAuxClick) {
                    list[index].onAuxClick(e);
                } else {
                    const children: Array<any> = React.Children.toArray(props.children);
                    children.filter((child: any) => React.isValidElement(child));
                    index -= list?.length || 0;
                    children[index] && children[index].props.onAuxClick && children[index].props.onAuxClick(e);
                }
            }
        },
        [onToggle, onToggleInner, list, props.children]
    );

    if (isNaN(active)) {
        /**
         * `active` is not initialized with `props.defaultValue` (`Number(undefined) === NaN`).
         * Should only run once. The active state will never be set to NaN.
         *
         * At least one child is needed to determine the default.
         */
        if (list?.length || React.Children.count(props.children)) {
            // If the default value is set from the parent, it should override anything else
            let defaultValue: number = -1;
            // Trying to find an item set to active in the list prop first
            defaultValue = list ? list.findIndex((item: AccordionItemProps) => item.defaultChecked) : -1;
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
        <div className={className} id={id}>
            {list?.map((item: AccordionItemProps, i: number) => (
                <AccordionItem key={i} {...item} onAuxClick={onToggleHandler} defaultChecked={active === i} data-index-number={i} data-parent-id={id} />
            ))}
            {React.Children.map(props.children, (Child: React.ReactElement<AccordionItemProps>, i: number) => {
                return React.isValidElement<React.FC<AccordionItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          onAuxClick: onToggleHandler,
                          defaultChecked: active === i + (list?.length || 0),
                          "data-parent-id": id,
                          "data-index-number": i + (list?.length || 0),
                      })
                    : Child;
            })}
        </div>
    );
});

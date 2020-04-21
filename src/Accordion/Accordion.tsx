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
};

export const Accordion: React.FC<AccordionProps> = React.memo(({ list, alternative, onToggle, ...props }: AccordionProps) => {
    const [active, setActive] = React.useState<number>(Number(props.defaultValue));
    const [id, setId] = React.useState<string>(props.id);
    const [className, setClassName] = React.useState<string>("seb accordion");

    React.useEffect(() => {
        let defaultChecked: number;
        defaultChecked = list?.findIndex((item: AccordionItemProps) => item.defaultChecked);
        defaultChecked = React.Children.toArray(props.children).findIndex((Child: React.ReactElement<AccordionItemProps>) => Child.props?.defaultChecked);
        setActive(defaultChecked >= 0 ? defaultChecked : props.defaultValue === null ? undefined : Number(props.defaultValue));
    }, [props.defaultValue, list, props.children]);
    React.useEffect(() => setId(props.id || randomId("accordion-")), [props.id]);
    React.useEffect(() => setClassName(classnames(["seb", "accordion", { alternative }, props.className])), [props.className, alternative]);

    /**
     * Handles accordion item click event
     * @param {React.MouseEvent<HTMLButtonElement>} e MouseEvent
     */
    const onToggleInner: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            setActive(active === Number(e.currentTarget.dataset.indexNumber) ? null : Number(e.currentTarget.dataset.indexNumber));
        },
        [active]
    );

    return (
        <div className={className} id={id}>
            {list?.map((item: AccordionItemProps, i: number) => (
                <AccordionItem key={i} {...item} onToggle={item.onToggle || onToggle || onToggleInner} defaultChecked={active === i} data-index-number={i} data-parentid={id} />
            ))}
            {React.Children.map(props.children, (Child: React.ReactElement<AccordionItemProps>, i: number) => {
                return React.isValidElement<AccordionItemProps>(Child)
                    ? React.cloneElement<any>(Child, {
                          onToggle: Child.props.onToggle || onToggle || onToggleInner,
                          defaultChecked: active === i,
                          "data-index-number": i,
                          "data-parentid": id,
                      })
                    : Child;
            })}
        </div>
    );
});

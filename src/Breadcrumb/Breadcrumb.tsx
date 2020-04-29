import React from "react";
import classnames from "classnames";
import { BreadcrumbItemProps, BreadcrumbItem } from "./BreadcrumbItem";

export type BreadcrumbProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    /** List of BreadcrumbItemProps to be rendered */
    list?: Array<BreadcrumbItemProps>;
    /** Event handler triggered when one of the breadcrumb links is clicked */
    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
    /** Enables the light version of the Breadcrumb */
    light?: boolean;
};

type ItemsSource = "list" | "children";

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(({ onNavigate, list, light, ...props }: BreadcrumbProps) => {
    const [breadcrumbListClassName, setBreadcrumbListClassName] = React.useState<string>("seb breadcrumb");

    React.useEffect(() => setBreadcrumbListClassName(classnames(["seb", "breadcrumb", { "breadcrumb-light": light }])), [light]);

    /**
     * Find if a breadcrumb item is the last in the list so it can be disabled (active)
     * @param {"list" | "children"} source The source of the breadcrumb item which might be from list prop or children
     * @param {number} index The index of the item in its source
     * @returns {boolean} True if it's the absolute last in the parent
     */
    const isActive: (source: ItemsSource, index: number) => boolean = React.useCallback(
        (source: ItemsSource, index: number): boolean => {
            const listCount: number = list?.length || 0;
            const childrenCount: number = React.Children.toArray(props.children).length;
            if (source === "children") {
                return index === childrenCount - 1;
            } else {
                return childrenCount ? false : index === listCount - 1;
            }
        },
        [props.children, list]
    );

    /**
     * Hijacks `onSeeked` from the child element and uses it to pass `onToggle` event handler
     * when the breadcrumb item button is clicked. It will also work if the user wanted to pass an
     * `onSeeked` event to the BreadcrumbItem element.
     * @param {React.MouseEvent<any>} e The click event
     * The reason why this is used instead of a custom `onNavigate` is because any element passed
     * will receive data injected by the Breadcrumb, if the element is not an BreadcrumbItem, it
     * will throw an error in the console that `onNavigate` is not a valid attribute.
     */
    const onToggleHandler: React.MouseEventHandler<any> = React.useCallback(
        (e: React.MouseEvent<any>) => {
            if (e.currentTarget.tagName === "A") {
                onNavigate && onNavigate(e);
            } else {
                // This will only run if the user passed `onSeeked` to an `breadcrumbItem`
                let index: number = Number(e.currentTarget.dataset.indexNumber);
                if (list && index < list.length && list[index].onSeeked) {
                    list[index].onSeeked(e);
                } else {
                    const children: Array<any> = React.Children.toArray(props.children);
                    children.filter((child: any) => React.isValidElement(child));
                    index -= list?.length || 0;
                    children[index] && children[index].props.onSeeked && children[index].props.onSeeked(e);
                }
            }
        },
        [onNavigate, list, props.children]
    );

    return (
        <nav {...props} aria-label="breadcrumb">
            <ol className={breadcrumbListClassName}>
                {list?.map((item: BreadcrumbItemProps, i: number) => (
                    <BreadcrumbItem key={i} {...item} onSeeked={onToggleHandler} defaultChecked={isActive("list", i)} data-index-number={i} />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<BreadcrumbItemProps>, i: number) => {
                    return React.isValidElement<BreadcrumbItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              onSeeked: onToggleHandler,
                              defaultChecked: isActive("children", i),
                              "data-index-number": i + (list?.length || 0),
                          })
                        : Child;
                })}
            </ol>
        </nav>
    );
});

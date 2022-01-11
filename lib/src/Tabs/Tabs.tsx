import React from "react";
import { TabItemProps } from "./TabItem";
import classnames from "classnames";
import { useCombinedRefs } from "../hooks/useCombinedRef";
import { Key } from "../utils";

export type TabsProps = JSX.IntrinsicElements["ul"] & {
    /** Index of focsued tab */
    value?: number;
    /** set focused index to active index on focus */
    autoSelectOnFocus?: boolean;
    /** Callback on tab item changed */
    onTabChange?: (index: number) => void;
    /** Callback on tab item when delete key is triggered */
    onTabDelete?: (index: number) => void;
};
/** Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. */
export const Tabs: React.FC<TabsProps> = React.forwardRef(({ value, onTabChange, autoSelectOnFocus, onTabDelete, ...props }: TabsProps, ref: React.ForwardedRef<HTMLUListElement>) => {
    const tabsRef: React.MutableRefObject<HTMLUListElement> = useCombinedRefs(ref);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(value);
    const [listItems, setListItems] = React.useState<HTMLAnchorElement[]>([]);

    const navigateToTab = (target: HTMLAnchorElement, event: React.MouseEvent | React.KeyboardEvent) => {
        const nextFocusedIndex: number = parseInt(target.dataset.indexNumber);
        setFocusedIndex(nextFocusedIndex);
        target.href?.endsWith("#") && event.preventDefault();
        if (target.dataset.disabled !== "true") {
            onTabChange && onTabChange(nextFocusedIndex);
        }
    };
    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        navigateToTab(event.currentTarget, event);
    };

    const focusTab = (index: number, event: React.KeyboardEvent<HTMLUListElement>) => {
        setFocusedIndex(index);
        listItems[index]?.focus();
        if (autoSelectOnFocus) {
            navigateToTab(listItems[index], event);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        switch (event.key) {
            case Key.Enter:
            case Key.Space:
                navigateToTab(event.target as HTMLAnchorElement, event);
                break;
            case Key.ArrowLeft:
            case Key.ArrowRight:
                const direction: number = event.key === Key.ArrowLeft ? -1 : 1;
                const nextFocusedIndex: number = (focusedIndex + listItems.length + direction) % listItems.length;
                if (nextFocusedIndex >= 0 && nextFocusedIndex < listItems.length) {
                    focusTab(nextFocusedIndex, event);
                }
                break;
            case Key.Home:
                focusTab(0, event);
                break;
            case Key.End:
                focusTab(listItems.length - 1, event);
                break;
            case Key.Delete:
                onTabDelete && onTabDelete(focusedIndex);
                break;
        }
    };

    React.useLayoutEffect(() => {
        setListItems(tabsRef.current ? Array.from(tabsRef.current.querySelectorAll(".nav-tabs > .rc.nav-item > .nav-link")) : []);
    }, [tabsRef]);

    return (
        <ul {...props} ref={tabsRef} className={classnames("rc nav nav-tabs", props.className)} role={props.role || "tablist"} onKeyDown={onKeyDown}>
            {React.Children.map(props.children, (Child: React.ReactElement<TabItemProps>, index: number) => {
                return React.isValidElement<React.FC<TabItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          active: index === value,
                          onClick,
                          "data-index-number": index,
                      })
                    : Child;
            })}
        </ul>
    );
});

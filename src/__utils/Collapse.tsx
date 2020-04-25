import React from "react";

export interface CollapseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** True to expand, false to collapse */
    toggle?: boolean;
    /** Automatically search for tab enabled children and disable them when it's collapsed */
    autoDisableTabEnabledChildren?: boolean;
}

interface TabEnabledElement {
    nativeElement: HTMLElement;
    originalTabindex: number;
}

export const Collapse: React.FC<CollapseProps> = React.memo(({ toggle, autoDisableTabEnabledChildren, ...props }: CollapseProps) => {
    const collapseRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    const [height, setHeight] = React.useState<string | number>(0);
    const tabEnabledElements = React.useRef<Array<TabEnabledElement>>([]);

    /** Finds and stores all tab enabled elements */
    React.useEffect(() => {
        if (autoDisableTabEnabledChildren !== false && !tabEnabledElements.current.length) {
            tabEnabledElements.current = findAllTabEnabledElements(collapseRef.current).map(
                (el: HTMLElement): TabEnabledElement => {
                    return { nativeElement: el, originalTabindex: el.tabIndex };
                }
            )
        }
    }, [props.children]);

    /** Event handler triggered after collapse transition ended */
    const afterTransition: React.TransitionEventHandler<HTMLDivElement> = React.useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
        e.propertyName === "height" && height && toggle && setHeight("auto");
    }, [height]);

    /**
     * Sets the height to zero when it's time to collapse and there height is specified.
     * The timeout is used to allow enough time for browser to recognize height is not `auto` anymore
     */
    React.useEffect(() => {
        !toggle && height && setTimeout(() => setHeight(0), 50);
    }, [height]);

    /**
     * Enables or disabled tab enabled elements on toggle
     * Height is always set to scroll height when toggle changes to enable transition
     */
    React.useEffect(() => {
        if (autoDisableTabEnabledChildren !== false && tabEnabledElements.current.length) {
            if (toggle) {
                tabEnabledElements.current.map((el: TabEnabledElement) => {
                    el.nativeElement.setAttribute("tabindex", el.originalTabindex.toString());
                });
            } else {
                tabEnabledElements.current.map((el: TabEnabledElement) => {
                    el.nativeElement.setAttribute("tabindex", "-1");
                });
            }
        }
        setHeight(collapseRef.current.scrollHeight);
    }, [toggle]);

    return (
        <div {...props} ref={collapseRef} style={{ height, opacity: height ? 1 : 0 }} onTransitionEnd={afterTransition}>
            {props.children}
        </div>
    );
});

// TODO: Should be removed once frontend-tools is updated with this utility
function findAllTabEnabledElements(element: HTMLElement): Array<HTMLElement> {
    const tabEnabledElements: Array<HTMLElement> = [];
    if (element && element.hasChildNodes && element.hasChildNodes()) {
        element.childNodes.forEach((child: HTMLElement) => {
            if (typeof child.tabIndex === "number" && child.tabIndex !== -1) {
                tabEnabledElements.push(child);
            }
            if (child.hasChildNodes()) {
                tabEnabledElements.push(...findAllTabEnabledElements(child));
            }
        });
    }
    return tabEnabledElements;
}

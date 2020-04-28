import React from "react";

export interface CollapseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** True to expand, false to collapse */
    toggle?: boolean;
}

export const Collapse: React.FC<CollapseProps> = React.memo(({ toggle, ...props }: CollapseProps) => {
    const collapseRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    const [height, setHeight] = React.useState<"auto" | number>(0);
    const [display, setDisplay] = React.useState<"block" | "none">("none");

    /** Event handler triggered after collapse transition ended */
    const afterTransition: React.TransitionEventHandler<HTMLDivElement> = React.useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName === "height") {
            switch(true) {
                /** After expand, the height is set to auto to enable responsiveness */
                case toggle && height && height !== "auto": setHeight("auto"); break;
                /** After collapse, the display is set to none to disable tab navigation inside the hidden collapse */
                case !height && !toggle: setDisplay("none");
            }
        }
    }, [height, toggle]);

    /** Handle changing the values of height and display based on toggle changes */
    React.useLayoutEffect(() => {
        switch (true) {
            /** Expanding: Starting point of height 0 and display none, first change is to enable display */
            case toggle && display === "none" && !height: setDisplay("block"); break;
            /** Expanding: Second stage of height 0 and display block, it should transition to scroll height */
            case toggle && display === "block" && !height: setTimeout(() => setHeight(collapseRef.current.scrollHeight), 10); break;
            /** Collapsing: Starting point of height auto and display block, first change is to set height to scroll height */
            case !toggle && display === "block" && height === "auto": setHeight(collapseRef.current.scrollHeight); break;
            /** Collapsing: Second stage of height equal to scroll height and display block is to set height to 0 */
            case !toggle && display === "block" && height && height !== "auto": setTimeout(() => setHeight(0), 10); break;
        }
    }, [toggle, display, height]);

    return (
        <div {...props} ref={collapseRef} style={{ height, display, opacity: +toggle }} onTransitionEnd={afterTransition}>
            {props.children}
        </div>
    );
});

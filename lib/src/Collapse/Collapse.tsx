import React from "react";
import classnames from "classnames";
import "./collapse.scss";
import { useCombinedRefs } from "../hooks";

export type CollapseProps = JSX.IntrinsicElements["div"] & {
    /** True to expand, false to collapse */
    toggle?: boolean;
};

/** A helper component for collapsing any content placed inside of it */
export const Collapse: React.FC<CollapseProps> = React.memo(
    React.forwardRef(({ toggle = false, ...props }: CollapseProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const collapseRef: React.MutableRefObject<HTMLDivElement> = useCombinedRefs(ref);
        const [styles, setStyles] = React.useState<React.CSSProperties>({
            height: toggle ? "auto" : 0,
            display: toggle ? "block" : "none",
            opacity: +toggle,
        });

        /** Expand the content */
        const expand = React.useCallback((): void => {
            /** Cannot transition when display is set to `none`, we need to change it to `block` */
            setStyles({ ...styles, display: "block" });
            /** This async delay is needed for the height change to take effect */
            setTimeout(() => {
                setStyles({ display: "block", height: collapseRef.current.scrollHeight, opacity: 1 });
            }, 10);
        }, [styles]);

        /** Collapse the content */
        const collapse = React.useCallback((): void => {
            /** Since height `auto` will not transition, we need to change it to pixels */
            setStyles({ ...styles, height: collapseRef.current.scrollHeight });
            /** This async delay is needed for the height change to take effect */
            setTimeout(() => {
                setStyles({ ...styles, height: 0, opacity: 0 });
            }, 10);
        }, [styles]);

        /**
         * An event handler triggered after collapse/expand transition ends
         * @param e The transition event
         */
        const afterTransition = React.useCallback(
            (e: React.TransitionEvent<HTMLDivElement>): void => {
                if (e.propertyName === "height") {
                    if (toggle) {
                        setStyles({ ...styles, height: "auto" });
                    } else {
                        setStyles({ ...styles, display: "none" });
                    }
                }
                props.onTransitionEnd && props.onTransitionEnd(e);
            },
            [styles, toggle, props.onTransitionEnd]
        );

        React.useEffect(() => {
            switch (true) {
                case toggle && styles.opacity == 0:
                    expand();
                    break;
                case !toggle && styles.opacity == 1:
                    collapse();
                    break;
            }
        }, [toggle]);

        return (
            <div {...props} className={classnames("custom-collapse", props.className)} ref={collapseRef} style={styles} onTransitionEnd={afterTransition}>
                {props.children}
            </div>
        );
    })
);

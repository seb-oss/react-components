import React from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";

export type SortableItemProps = JSX.IntrinsicElements["div"] & {
    isActive?: boolean;
    ghostRef: React.ForwardedRef<HTMLDivElement>;
    index: string;
};

// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;

const SortableItem: React.FC<SortableItemProps> = React.forwardRef(
    ({ isActive, className, children, ghostRef, index, ...props }: React.PropsWithChildren<SortableItemProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <>
                <div {...props} ref={ref} data-value={index} className={classnames("rc", "sortable-item", className, { hidden: isActive })}>
                    {children}
                </div>
                {/* {
            isActive && createPortal(
                <div {...props} data-value={index} onMouseLeave={props.onMouseUp} ref={ghostRef} className={classnames("rc", "sortable-item", "ghost-item", className)}>
                    {children}
                </div>,
                safeDocument.body
            )
        } */}
            </>
        );
    }
);

export { SortableItem };

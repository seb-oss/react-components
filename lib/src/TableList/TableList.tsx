import classnames from "classnames";
import React from "react";
import "./table-list.scss";

export type TableListProps = JSX.IntrinsicElements["dl"] & {
    /** Heading for list */
    header: string;
    /** Props for the list's wrapper (figure) */
    wrapperProps?: JSX.IntrinsicElements["figure"];
};

export const TableList: React.FC<TableListProps> = React.memo(
    React.forwardRef(({ children, className, header, role, wrapperProps, ...props }: TableListProps, ref: React.ForwardedRef<HTMLDListElement>) => {
        return (
            <figure {...wrapperProps} className={classnames("rc", "table-list", "bg-white", wrapperProps?.className)}>
                <figcaption>{header}</figcaption>
                <dl {...props} ref={ref} className={className} role={role || "list"}>
                    {children}
                </dl>
            </figure>
        );
    })
);

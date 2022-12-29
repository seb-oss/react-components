import classnames from "classnames";
import React from "react";

export type TableListItemProps = JSX.IntrinsicElements["div"] & {
    /** Name of the item */
    name: string;
    /** Values of the item */
    values: string[];
};

export const TableListItem: React.FC<TableListItemProps> = React.memo(
    React.forwardRef(({ name, role, values, ...props }: TableListItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <div ref={ref} {...props} className={classnames("rc", "table-list-item", "d-flex flex-column flex-md-row border-bottom p-3", props?.className)} role={role || "group"}>
                <dt>{name}</dt>
                {values.map((description: string, index: number) => (
                    <dd key={`${index}-${description}`}>{description}</dd>
                ))}
            </div>
        );
    })
);

import classnames from "classnames";
import React from "react";

export type TableListItemProps = JSX.IntrinsicElements["div"] & {
    /** Display the values inline */
    inline?: boolean;
    /** Name of the item */
    name: string;
    /** Values of the item */
    values: string[];
};

export const TableListItem: React.FC<TableListItemProps> = React.memo(
    React.forwardRef(({ inline, name, role, values, ...props }: TableListItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <div
                ref={ref}
                {...props}
                className={classnames(
                    "rc",
                    "table-list-item",
                    {
                        "table-list-item--inline": inline,
                    },
                    props.className
                )}
                role={role || "group"}
            >
                <dt>{name}</dt>
                <div className="table-list-item__values">
                    {values.map((description: string, index: number) => (
                        <dd key={`${index}-${description}`}>{description}</dd>
                    ))}
                </div>
            </div>
        );
    })
);

import React from "react";
import classnames from "classnames";

export type SortableItemProps = Omit<JSX.IntrinsicElements["div"], "onDragStart" | "onDragOver" | "onDragEnd"> & {
    uniqueKey: string;
    disabled?: boolean;
};

const SortableItem: React.FC<SortableItemProps> = React.forwardRef(
    ({ className, disabled, children, uniqueKey, ...props }: React.PropsWithChildren<SortableItemProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <div {...props} ref={ref} className={classnames("rc", "sortable-item", className)}>
                {React.Children.map(children, (Child: React.ReactElement) => {
                    const isDisabled: boolean = disabled || Child.props?.disabled;
                    return React.isValidElement<React.FC<any>>(Child)
                        ? React.cloneElement(Child, {
                              disabled: isDisabled,
                              "aria-disabled": isDisabled,
                          } as any)
                        : Child;
                })}
            </div>
        );
    }
);

SortableItem.displayName = "SortableItem";

export { SortableItem };

import classnames from "classnames";
import React from "react";

export type CarouselIndicatorsProps = JSX.IntrinsicElements["ol"] & {
    /** Active state. (Managed by Carousel) */
    active?: number;
    /** The full size of the carousel. (Managed by Carousel) */
    size?: number;
    /** The parent ID, used to enable accessibility features. (Managed by Carousel) */
    parentId?: string;
    /** A event handler triggered when and indicator is clicked. (Managed by Carousel) */
    onIndicatorClicked?: React.MouseEventHandler<HTMLLIElement>;
};

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = React.memo(
    React.forwardRef(({ active, size, parentId, onIndicatorClicked, ...props }: CarouselIndicatorsProps, ref: React.ForwardedRef<HTMLOListElement>) => (
        <ol {...props} ref={ref} className={classnames("carousel-indicators", props.className)}>
            {[...Array(size)].map((v: undefined, i: number) => {
                const isActive: boolean = active === i;
                return (
                    <li key={i} className={classnames({ active: isActive })} data-slide-to={i} data-target={parentId ? `#${parentId}` : null} onClick={!isActive ? onIndicatorClicked : null}>
                        {isActive && <span className="sr-only">(Current)</span>}
                    </li>
                );
            })}
        </ol>
    ))
);

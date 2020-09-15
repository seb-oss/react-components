import React from "react";
import classnames from "classnames";

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

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = React.memo(({ active, size, parentId, onIndicatorClicked, ...props }: CarouselIndicatorsProps) => {
    const [className, setClassName] = React.useState<string>("carousel-indicators");

    React.useEffect(() => setClassName(classnames("carousel-indicators", props.className)), [props.className]);

    return (
        <ol {...props} className={className}>
            {[...Array(size)].map((v: undefined, i: number) => (
                <li key={i} data-target={parentId ? `#${parentId}` : null} data-slide-to={i} className={classnames({ active: active === i })} onClick={active !== i ? onIndicatorClicked : null} />
            ))}
        </ol>
    );
});

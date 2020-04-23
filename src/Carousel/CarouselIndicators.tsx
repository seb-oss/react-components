import React from "react";
import classnames from "classnames";

interface CarouselIndicatorsProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {
    active?: number;
    size?: number;
    parentId?: string;
    onIndicatorClicked?: React.MouseEventHandler<HTMLLIElement>;
}

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = React.memo(({ active, size, parentId, onIndicatorClicked, ...props }: CarouselIndicatorsProps) => {
    const [className, setClassName] = React.useState<string>("carousel-indicators");

    React.useEffect(() => setClassName(classnames("carousel-indicators", props.className)), [props.className]);

    return (
        <ol {...props} className={className}>
            {[...Array(size)].map((v: undefined, i: number) => (
                <li key={i} data-target={parentId ? `#${parentId}` : null} data-slide-to={i} className={classnames({ active: active === i })} onClick={onIndicatorClicked} />
            ))}
        </ol>
    );
});

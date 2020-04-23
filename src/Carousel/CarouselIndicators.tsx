import React from "react";
import classnames from "classnames";

interface CarouselIndicatorsProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {
    "data-active"?: number;
    "data-size"?: number;
    "data-parentid"?: string;
}

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = React.memo((props: CarouselIndicatorsProps) => {
    const [active, setActive] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(0);

    React.useEffect(() => setActive(props["data-active"]), [props["data-active"]]);
    React.useEffect(() => setSize(props["data-size"]), [props["data-size"]]);

    console.log(active, size);

    return (
        <ol className="carousel-indicators">
            {[...Array(size)].map((v: undefined, i: number) => {
                return <li key={i} data-target={props["data-parentid"] || null} data-slide-to={i} className={classnames({ active: active === i })} />;
            })}
        </ol>
    );
});

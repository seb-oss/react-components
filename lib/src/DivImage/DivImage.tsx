import React from "react";
import classnames from "classnames";
import "./div-image.scss";

type DivAttributes = JSX.IntrinsicElements["div"];
type ImgAttributes = JSX.IntrinsicElements["img"];

export interface DivImageProps extends DivAttributes, Pick<ImgAttributes, "src" | "width" | "height"> {
    /** Sets the background attachment to fixed to allow parallax effect */
    bgFixed?: boolean;
    /** Making the image responsive and adaptive to its parent size */
    responsive?: boolean;
    /** Adds default border radius */
    rounded?: boolean;
    /** Thumbnail layout */
    thumbnail?: boolean;
}

/** Image component that uses native `div` element */
export const DivImage: React.FC<DivImageProps> = React.memo(({ responsive, rounded, thumbnail, src, width, height, bgFixed, ...props }: DivImageProps) => {
    const [naturalWidth, setNaturalWidth] = React.useState<number>();
    const [naturalHeight, setNaturalHeight] = React.useState<number>();
    const [styles, setStyles] = React.useState<React.CSSProperties>({});
    const [className, setClassName] = React.useState<string>("");

    /**
     * Retreives the image's meta information
     * @param {string} url The image URL
     */
    const getMeta = React.useCallback(
        (url: string): void => {
            var img: HTMLImageElement = new Image();
            img.onload = (ev: Event) => {
                const target: HTMLImageElement = ev.currentTarget as any;
                setNaturalWidth(target.naturalWidth);
                setNaturalHeight(target.naturalHeight);
                props.onLoad && props.onLoad(ev as any);
            };
            img.onerror = (ev: Event) => {
                props.onError && props.onError(ev as any);
            };
            img.src = url;
        },
        [props.onLoad, props.onError]
    );

    React.useEffect(() => getMeta(src), [src]);
    React.useEffect(() => {
        setStyles({
            ...props.style,
            width: width || props.style?.width || naturalWidth,
            height: height || props.style?.height || naturalHeight,
            backgroundImage: props.style?.backgroundImage || `url(${src})`,
        });
    }, [width, height, props.style, naturalWidth, naturalHeight, src]);
    React.useEffect(() => {
        setClassName(
            classnames(
                "rc",
                "img",
                {
                    "img-fluid": responsive,
                    "img-rounded": rounded,
                    "img-thumbnail": thumbnail,
                    "img-fixed": bgFixed,
                },
                props.className
            )
        );
    }, [responsive, rounded, thumbnail, bgFixed, props.className]);

    return <div {...props} className={className} style={styles} />;
});

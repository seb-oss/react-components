import React from "react";
import classnames from "classnames";
import "./img.scss";

interface CommonProps {
    /** Making the image responsive and adaptive to its parent size */
    responsive?: boolean;
    /** Adds default border radius */
    rounded?: boolean;
    /** Thumbnail layout */
    thumbnail?: boolean;
}

type ImageProps = JSX.IntrinsicElements["img"] &
    CommonProps & {
        type?: "img";
    };

type DivImageProps = JSX.IntrinsicElements["div"] &
    CommonProps & {
        type?: "div";
        /** Sets the background attachment to fixed to allow parallax effect */
        bgFixed?: boolean;
        /** Image Source */
        src?: string;
        /** Image width */
        width?: React.ReactText;
        /** Image height */
        height?: React.ReactText;
    };

export type ImgProps = ImageProps | DivImageProps;

/** Image component that uses native `img` element */
export const Img: React.FC<ImgProps> = React.memo(
    React.forwardRef(
        ({ type, responsive, rounded, thumbnail, bgFixed, src, width, height, children, ...props }: ImageProps & DivImageProps, ref: React.ForwardedRef<HTMLDivElement | HTMLImageElement>) => {
            if (type === "div") {
                const [naturalWidth, setNaturalWidth] = React.useState<number>();
                const [naturalHeight, setNaturalHeight] = React.useState<number>();

                /**
                 * Retreives the image's meta information
                 * @param {string} url The image URL
                 */
                const getMeta = React.useCallback(
                    (url: string): void => {
                        if (url) {
                            var img: HTMLImageElement = new Image();
                            img.onload = (ev: Event) => {
                                const target: HTMLImageElement = ev.currentTarget as any;
                                setNaturalWidth(target.naturalWidth);
                                setNaturalHeight(target.naturalHeight);
                                props.onLoad && props.onLoad(ev as any);
                            };
                            img.onerror = props.onError as any;
                            img.src = url;
                        }
                    },
                    [props.onLoad, props.onError]
                );

                React.useEffect(() => getMeta(src), [src]);

                return (
                    <div
                        role="img"
                        {...(props as DivImageProps)}
                        ref={ref}
                        className={classnames(
                            "rc",
                            "img",
                            {
                                "img-fluid": responsive,
                                "img-rounded": rounded,
                                "img-thumbnail": thumbnail,
                                "img-fixed": bgFixed,
                            },
                            props.className
                        )}
                        style={{
                            ...props.style,
                            width: width || props.style?.width || naturalWidth,
                            height: height || props.style?.height || React.Children.toArray(children).length ? "auto" : responsive || thumbnail ? "100%" : naturalHeight,
                            backgroundImage: props.style?.backgroundImage || `url(${src})`,
                        }}
                    >
                        {children}
                    </div>
                );
            } else {
                return (
                    <img
                        src={src}
                        ref={ref as React.ForwardedRef<HTMLImageElement>}
                        width={width}
                        height={height}
                        {...(props as ImageProps)}
                        className={classnames(
                            "rc",
                            "img",
                            {
                                "img-fluid": responsive,
                                "img-rounded": rounded,
                                "img-thumbnail": thumbnail,
                            },
                            props.className
                        )}
                    />
                );
            }
        }
    )
);

import * as React from "react";
import "./image-style.scss";

export interface ImageProps {
    alt?: string;
    ariaDescribedBy?: string;
    ariaLabel?: string;
    className?: string;
    height: string;
    id?: string;
    onClick?: (event: any) => void;
    onLoad?: (event: any) => void;
    src: string;
    useImgTag?: boolean;
    width: string;
}

export const Image: React.FunctionComponent<ImageProps> = React.memo(
    (props: ImageProps): React.ReactElement<void> => {
        const [imageClassName, setImageClassName] = React.useState<string>("");

        React.useEffect(() => {
            let className: string = "";
            if (!props?.useImgTag) {
                className += "div-tag";
            } else {
                className += "img-tag";
            }

            if (props?.onClick) {
                className += ` link`;
            }

            if (props?.className) {
                className += ` ${props.className}`;
            }

            setImageClassName(className);
        }, [props?.className, props?.onClick]);

        return (
            <>
                {!props.useImgTag ? (
                    <div
                        id={props.id}
                        className={imageClassName}
                        style={{
                            backgroundImage: "url(" + props.src + ")",
                            width: props.width,
                            height: props.height,
                        }}
                        onClick={props.onClick}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        title={props.alt}
                    />
                ) : (
                    <img
                        id={props.id}
                        className={imageClassName}
                        src={props.src}
                        alt={props.alt ? props.alt : ""}
                        style={{
                            width: props.width,
                            height: props.height,
                        }}
                        onClick={props.onClick}
                        onLoad={props.onLoad}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                    />
                )}
            </>
        );
    }
);

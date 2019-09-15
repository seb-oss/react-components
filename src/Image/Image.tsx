import * as React from "react";
import "./image-style.scss";

export interface ImageProps {
    src: string;
    width: string;
    height: string;
    onClick?: (event: any) => void;
    onLoad?: (event: any) => void;
    className?: string;
    useImgTag?: boolean;
    alt?: string;
    id?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

export const Image: React.FunctionComponent<ImageProps> = React.memo((props: ImageProps): React.ReactElement<void> => {
    return (
        <>
            {!props.useImgTag &&
                <div
                    id={props.id}
                    className={"div-tag" + (props.className ? ` ${props.className}` : "")}
                    style={{
                        backgroundImage: "url(" + props.src + ")",
                        width: props.width,
                        height: props.height
                    }}
                    onClick={props.onClick}
                    aria-label={props.ariaLabel}
                    aria-describedby={props.ariaDescribedBy}
                    title={props.alt}
                />
            }
            {props.useImgTag &&
                <img
                    id={props.id}
                    className={"img-tag" + (props.className ? ` ${props.className}` : "")}
                    src={props.src}
                    alt={props.alt ? props.alt : ""}
                    style={{
                        width: props.width,
                        height: props.height
                    }}
                    onClick={props.onClick}
                    onLoad={props.onLoad}
                    aria-label={props.ariaLabel}
                    aria-describedby={props.ariaDescribedBy}
                />
            }
        </>
    );
});

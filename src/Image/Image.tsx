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
}

export const Image: React.StatelessComponent<ImageProps> = (props: ImageProps): React.ReactElement<void> => {
    return (
        <>
            {!props.useImgTag &&
                <div
                    className={"div-tag " + (props.className ? props.className : "")}
                    style={{
                        backgroundImage: "url(" + props.src + ")",
                        width: props.width,
                        height: props.height
                    }}
                    onClick={props.onClick}
                />
            }
            {props.useImgTag &&
                <img
                    className={"img-tag " + (props.className ? props.className : "")}
                    src={props.src}
                    style={{
                        width: props.width,
                        height: props.height
                    }}
                    onClick={props.onClick}
                    onLoad={props.onLoad}
                />
            }
        </>
    );
};

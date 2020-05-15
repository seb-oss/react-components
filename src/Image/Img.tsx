import React from "react";
import classnames from "classnames";
import { CommonImageProps } from "./CommonType";
import "./img.scss";

type ImgProps = JSX.IntrinsicElements["img"] & CommonImageProps;

/** Image component that uses native `img` element */
export const Img: React.FC<ImgProps> = React.memo(({ responsive, rounded, thumbnail, ...props }: ImgProps) => (
    <img {...props} className={classnames("seb", { "img-fluid": responsive, "img-rounded": rounded, "img-thumbnail": thumbnail }, props.className)} />
));

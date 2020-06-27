import React from "react";
import classnames from "classnames";
import "./img.scss";

export type ImgProps = JSX.IntrinsicElements["img"] & {
    /** Making the image responsive and adaptive to its parent size */
    responsive?: boolean;
    /** Adds default border radius */
    rounded?: boolean;
    /** Thumbnail layout */
    thumbnail?: boolean;
};

/** Image component that uses native `img` element */
export const Img: React.FC<ImgProps> = React.memo(({ responsive, rounded, thumbnail, ...props }: ImgProps) => (
    <img {...props} className={classnames("rc", { "img-fluid": responsive, "img-rounded": rounded, "img-thumbnail": thumbnail }, props.className)} />
));

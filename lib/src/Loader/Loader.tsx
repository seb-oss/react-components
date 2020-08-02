import React from "react";
import classnames from "classnames";
import "./loader.scss";

export type LoaderSize = "xs" | "sm" | "md" | "lg";
export type LoaderType = "spinner" | "square";
export type LoaderProps = JSX.IntrinsicElements["div"] & {
    /** Loader size. Supported sizes: `xs`, `sm`, `md`, `lg` */
    size?: LoaderSize;
    /** Loader types. Supportes types: `spinner`, `square` */
    type?: LoaderType;
    /** Have the loader take over it's parent */
    cover?: boolean;
    /** Have the loader take over the screen */
    fullscreen?: boolean;
    /** Dims the background to indicate UI interactions are blocked */
    backdrop?: boolean;
    /** Screen reader text. Default is `Loading...` */
    srText?: string;
    /** Show or hide the loader. Default is `true` */
    toggle?: boolean;
};

export const Loader: React.FC<LoaderProps> = React.memo(({ size = "md", type = "spinner", srText = "Loading...", toggle = true, fullscreen, cover, backdrop, ...props }: LoaderProps) => {
    const [className, setClassName] = React.useState<string>("");

    React.useEffect(() => {
        setClassName(
            classnames(
                "rc",
                "loader",
                {
                    "loader-cover": cover,
                    "loader-fullscreen": fullscreen && !cover,
                    "loader-backdrop": backdrop,
                    [`loader-${size}`]: size,
                    [`loader-${type}`]: type,
                },
                props.className
            )
        );
    }, [props.className, cover, fullscreen, size, type]);

    return (
        toggle && (
            <div {...props} className={className} role={props.role || "status"}>
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    {type === "spinner" && <circle cx="33" cy="33" r="30" fill="none" />}
                    {type === "square" && <rect x="0" y="0" width="100%" height="100%" />}
                </svg>
                {props.children}
                <span className="sr-only">{srText}</span>
            </div>
        )
    );
});

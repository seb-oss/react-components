import React from "react";
import "./loader-style.scss";

export interface LoaderProps {
    className?: string;
    fullscreen?: boolean;
    id?: string;
    size?: LoaderSize;
    toggle: boolean;
}

export type LoaderSize = "lg" | "md" | "sm";

export const Loader: React.FunctionComponent<LoaderProps> = React.memo(
    (props: LoaderProps): React.ReactElement<void> => {
        const [size, setSize] = React.useState<string>("");
        const [className, setClassName] = React.useState<string>("seb-loader-wrapper");

        React.useEffect(() => {
            let classNameToSet: string = "seb-loader-wrapper";
            classNameToSet += props.fullscreen !== undefined ? (props.fullscreen ? " fullscreen" : "") : "";
            classNameToSet += props.className ? ` ${props.className}` : "";
            setClassName(classNameToSet);
        }, [props.className, props.fullscreen]);

        React.useEffect(() => {
            setSize(`loader-${props.size || "md"}`);
        }, [props.size]);

        return props.toggle ? (
            <div className={className} id={props.id}>
                <div className={"seb-loader" + (size ? ` ${size}` : "")}>
                    <div className="seb-loader-container">
                        <div className="seb-loader-rotator">
                            <div className="seb-loader-left">
                                <div className="seb-loader-circle" />
                            </div>
                            <div className="seb-loader-right">
                                <div className="seb-loader-circle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }
);

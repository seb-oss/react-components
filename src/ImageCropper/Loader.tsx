import * as React from "react";
import "./loader-style.scss";

export interface LoaderProps {
    toggle: boolean;
    fullscreen?: boolean;
    className?: string;
}

export const Loader: React.StatelessComponent<LoaderProps> = (props: LoaderProps): React.ReactElement<void> => {
    const fullscreen: boolean = props.fullscreen === undefined ? true : props.fullscreen;
    let loaderWrapper: string = "loader-cropper ";
    if (fullscreen) { loaderWrapper += "fullscreen "; }

    return (
        <div className={loaderWrapper + (props.className ? props.className : "")}>
            {props.toggle &&
                <div className="loader-holder">
                    <div className="loader" />
                </div>
            }
        </div>
    );
};

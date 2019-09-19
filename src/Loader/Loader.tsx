import * as React from "react";
import "./loader-style.scss";

export interface LoaderProps {
    className?: string;
    fullscreen?: boolean;
    id?: string;
    toggle: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = React.memo((props: LoaderProps): React.ReactElement<void> => {
    const fullscreen: boolean = props.fullscreen === undefined ? false : props.fullscreen;
    let loaderWrapper: string = "loaderWrapper ";
    if (fullscreen) { loaderWrapper += "fullscreen "; }

    return (
        <div className={loaderWrapper + (props.className ? props.className : "")} id={props.id}>
            {props.toggle &&
                <div className="loader-holder">
                    <div className="loader" />
                </div>
            }
        </div>
    );
});

import * as React from "react";
import "./video-style.scss";

export interface VideoProps {
    src: string;
    width: string;
    height: string;
    name: string;
    sourceType: string;
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    showControls?: boolean;
    showInfo?: boolean;
    allowFullScreen?: boolean;
}

export const Video: React.StatelessComponent<VideoProps> = (props: VideoProps): React.ReactElement<void> => {
    return (
        <div className={"video-holder-component" + (props.className ? ` ${props.className}` : "")}>
            {props.sourceType === "local" &&
                <video
                    width={props.width}
                    height={props.height}
                    controls={props.showControls}
                    autoPlay={props.autoplay}
                    loop={props.loop}
                    muted={props.autoplay ? true : false}
                >
                    <source src={props.src} />
                    Your browser does not support the video tag.
                </video>
            }
            {props.sourceType === "stream" &&
                <iframe
                    src={
                        props.src
                        + "?html5=1&amp;rel=0" // YouTube Only - disabled showing suggestions after video is finished
                        + (props.showControls ? "&amp;controls=1" : "&amp;controls=0") // YouTube Only - Vimeo doesn't support it
                        + (props.showInfo ? "&amp;showinfo=1&amp;title=1&amp;byline=1&amp;portrait=1" : "&amp;showinfo=0&amp;title=0&amp;byline=0&amp;portrait=0")
                        + (props.loop ? "&amp;loop=1" : "&amp;loop=0")
                        + (props.autoplay ? "&amp;autoplay=1" : "&amp;autoplay=0")
                    }
                    width={props.width}
                    height={props.height}
                    frameBorder={0}
                    allowFullScreen={props.allowFullScreen}
                />
            }
        </div>
    );
};

import * as React from "react";
import { Video } from "../../../src/Video/Video";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Video/readme.md");
const videoSrc = require("../../assets/videos/sample.mp4");
const vimeoSrc = "https://player.vimeo.com/video/259422408";
const youtubeSrc = "https://www.youtube.com/embed/f19fctL72CY";

export default class VideoPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
                <div className="info-holder">

                    <div className="info">
                        <div className="md-file">
                            <Highlight innerHTML={true}>{docMD}</Highlight>
                        </div>
                    </div>

                    <div className="info">
                        <h2>Output</h2>
                        <p>Here are sample of a locally stored video (no controls, autoplay, loop)</p>
                        <div className="result wide">
                            <Video
                                name="myVideo"
                                src={videoSrc}
                                width="535px"
                                height="300px"
                                sourceType="local"
                                autoplay={true}
                                loop={true}
                            />
                        </div>
                        <p>Here are sample video streamed from <em><b>Vimeo&trade;</b></em></p>
                        <div className="result wide">
                            <Video
                                name="myVimeoVideo"
                                src={vimeoSrc}
                                width="535px"
                                height="300px"
                                sourceType="stream"
                            />
                        </div>
                        <p>Here are sample video streamed from <em><b>YouTube&trade;</b></em></p>
                        <div className="result wide">
                            <Video
                                name="myYoutubeVideo"
                                src={youtubeSrc}
                                width="535px"
                                height="300px"
                                sourceType="stream"
                                showControls={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

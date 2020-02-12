import * as React from "react";
import { Video } from "../../../src/Video/Video";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Video/readme.md");
const videoSrc: string = require("../../assets/videos/sample.mp4").default;
const vimeoSrc: string = "https://player.vimeo.com/video/259422408";
const youtubeSrc: string = "https://www.youtube.com/embed/f19fctL72CY";

const VideoPage: React.FunctionComponent = () => {
    return (
        <div className="route-template container">
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
};

export default VideoPage;

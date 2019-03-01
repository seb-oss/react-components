import * as React from "react";
import { ImageCropper, OptionProps } from "../../../src/ImageCropper";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/ImageCropper/readme.md");

interface ImageCropperPageState {
    cropperConfigs: OptionProps;
    cropResult: string;
}

export default class ImageCropperPage extends React.Component<any, ImageCropperPageState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            cropperConfigs: {
                preview: ".image-preview",
                checkCrossOrigin: false,
                guides: false,
                responsive: true,
                zoomable: false,
                aspectRatio: (1 / 1),
                rotatable: false,
            },
            cropResult: "",
        };

        this.onCrop = this.onCrop.bind(this);
    }

    onCrop(croppedData: string) {
        this.setState({ cropResult: croppedData });
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
                        <p>Here is sample output</p>
                        <div className="result">
                            <ImageCropper
                                cropperConfigs={this.state.cropperConfigs}
                                onCrop={this.onCrop}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

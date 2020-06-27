import React from "react";
import { ImageCropper, OptionProps } from "../../../src/ImageCropper";
import Highlight from "react-highlight";
import docMD from "../../../src/ImageCropper/readme.md";

const ImageCropperPage: React.FC = () => {
    const [cropResult, setCropResult] = React.useState<any>("");

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
                    <p>Here is sample output</p>
                    <div className="result">
                        <ImageCropper cropperConfigs={cropperConfigs} onCrop={(croppedData: any) => setCropResult(croppedData)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const cropperConfigs: OptionProps = {
    preview: ".image-preview",
    checkCrossOrigin: false,
    guides: false,
    responsive: true,
    zoomable: false,
    aspectRatio: 1 / 1,
    rotatable: false,
};

export default ImageCropperPage;

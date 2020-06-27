import React from "react";
import { Img, ImgProps } from "../../../src/Image";
import Highlight from "react-highlight";
import { CheckBox } from "../../../src/CheckBox";
import docMD from "../../../src/Image/readme.md";
import imgSrc from "../../assets/images/cactus-near-canister-and-box.jpg";

type ImagePageState = ImgProps;

const ImagePage: React.FC = React.memo(() => {
    const [state, setState] = React.useState<ImagePageState>({ responsive: false, rounded: false, thumbnail: false });

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, [e.target.name]: e.target.checked }), [state]);

    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h3>Output</h3>
                    <div className="result wide row">
                        <div className="col-md-6 col-12">
                            <Img src={imgSrc} responsive={state.responsive} rounded={state.rounded} thumbnail={state.thumbnail} />
                        </div>
                    </div>
                </div>

                <div className="info mt-3">
                    <h3>Options</h3>
                    <CheckBox name="responsive" label="Responsive" description="Resize window to see effect." checked={state.responsive} onChange={onChange} />
                    <CheckBox name="rounded" label="Rounded" checked={state.rounded} onChange={onChange} />
                    <CheckBox name="thumbnail" label="Thumbnail" description="Also have responsive effect." checked={state.thumbnail} onChange={onChange} />
                </div>
            </div>
        </div>
    );
});

export default ImagePage;

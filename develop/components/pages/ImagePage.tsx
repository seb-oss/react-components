import React from "react";
import { Img, DivImage } from "../../../src/Image";
import Highlight from "react-highlight";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { CommonImageProps } from "../../../src/Image/CommonType";
import { DivImageProps } from "../../../src/Image/DivImage";
import { loremIpsum } from "lorem-ipsum";
const docMD: string = require("../../../src/Image/readme.md");
const imgSrc: string = require("../../assets/images/cactus-near-canister-and-box.jpg");

interface ImagePageState extends CommonImageProps, Pick<DivImageProps, "bgFixed"> {
    hasContent?: boolean;
}

const ImagePage: React.FC = React.memo(() => {
    const [state, setState] = React.useState<ImagePageState>({ responsive: false, rounded: false, thumbnail: false, bgFixed: false, hasContent: false });

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
                    <p>Here are sample outputs using "div" tag (default)</p>
                    <div className="result wide row">
                        <div className="col-md-6 col-12">
                            <h4 className="mt-3">
                                Image (<code className="d-inline">{"<Img />"}</code>)
                            </h4>
                            <Img src={imgSrc} responsive={state.responsive} rounded={state.rounded} thumbnail={state.thumbnail} />
                        </div>
                        <div className="col-md-6 col-12">
                            <h4 className="mt-3">
                                Div Image (<code className="d-inline">{"<DivImage />"}</code>)
                            </h4>
                            <DivImage
                                src={imgSrc}
                                responsive={state.responsive}
                                rounded={state.rounded}
                                thumbnail={state.thumbnail}
                                bgFixed={state.bgFixed}
                                style={state.hasContent && { backgroundColor: "white", backgroundBlendMode: "luminosity" }}
                            >
                                {state.hasContent && content}
                            </DivImage>
                        </div>
                    </div>
                </div>

                <div className="info mt-3">
                    <h3>Options</h3>
                    <CheckBox name="responsive" label="Responsive" description="Resize window to see effect." checked={state.responsive} onChange={onChange} />
                    <CheckBox name="rounded" label="Rounded" checked={state.rounded} onChange={onChange} />
                    <CheckBox name="thumbnail" label="Thumbnail" description="Also have responsive effect." checked={state.thumbnail} onChange={onChange} />
                    <CheckBox name="bgFixed" label="Background Fixed" description="Scroll to see effect. (Only available for DivImage)." checked={state.bgFixed} onChange={onChange} />

                    <h3>Extra</h3>
                    <p>
                        You can render content inside the <code>DivImage</code> component.
                    </p>
                    <p className="small">
                        <b>Note</b>: The greyscale effect is added to showcase a use case. It's not included in the property.
                    </p>
                    <CheckBox name="hasContent" label="With content" checked={state.hasContent} onChange={onChange} />
                </div>
            </div>
        </div>
    );
});

const content: JSX.Element = (
    <div className="my-3 mx-4">
        <p>{loremIpsum({ units: "paragraph" })}</p>
        <p>{loremIpsum({ units: "paragraph" })}</p>
        <p>{loremIpsum({ units: "paragraph" })}</p>
        <p>{loremIpsum({ units: "paragraph" })}</p>
        <p>{loremIpsum({ units: "paragraph" })}</p>
        <div className="text-center">
            <button className="btn btn-primary">Read more</button>
        </div>
    </div>
);

export default ImagePage;

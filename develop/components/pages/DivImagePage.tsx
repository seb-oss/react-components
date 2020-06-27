import React from "react";
import { DivImage, DivImageProps } from "../../../src/DivImage";
import Highlight from "react-highlight";
import { CheckBox } from "../../../src/CheckBox";
import { loremIpsum } from "lorem-ipsum";
import docMD from "../../../src/DivImage/readme.md";
import imgSrc from "../../assets/images/cactus-near-canister-and-box.jpg";

interface ImagePageState extends DivImageProps {
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
                    <div className="result wide row">
                        <div className="col-md-6 col-12">
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

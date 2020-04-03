import * as React from "react";
import "./image-preview-style.scss";

export interface ImagePreviewProps {
    cropResult?: string;
    previewSrc?: string;
    handleUploadImage: (e: any, cropResult?: string) => void;
    selectButtonText?: string;
    previewClassName?: string;
}
export interface ImagePreviewState {
    cropDataResult: string;
}
export class ImagePreview extends React.Component<ImagePreviewProps, ImagePreviewState> {
    fileInput: HTMLInputElement;
    constructor(props: ImagePreviewProps) {
        super(props);
        this.state = {
            cropDataResult: ""
        };
        this.onFileInputClick = this.onFileInputClick.bind(this);
    }

    componentDidMount() {
        this.setState({ cropDataResult: this.props.previewSrc ? this.props.previewSrc : "" });
    }

    componentDidUpdate(prevProps: ImagePreviewProps) {
        if (prevProps.cropResult !== this.props.cropResult) {
            this.setState({ cropDataResult: this.props.cropResult });
        }
    }

    onFileInputClick(e: React.MouseEvent<HTMLButtonElement>) {
        const { previewSrc, handleUploadImage } = this.props;
        if (previewSrc) {
            handleUploadImage(e, previewSrc);
        } else {
            this.fileInput.click();
        }
    }

    get defaultProfileSvg() {
        return (
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 500" enableBackground="new 0 0 500 500;">
                <rect className="st0" width="500" height="500" fill="#B2B3B3" />
                <g>
                    <path
                        className="st1"
                        fill="#E6E6E5"
                        d="M252.7,279.13c-45.83,0-83.11-37.28-83.11-83.11v-50.2c0-45.83,37.28-83.11,83.11-83.11
                                    c45.83,0,83.11,37.28,83.11,83.11v50.2C335.81,241.85,298.52,279.13,252.7,279.13z"
                    />
                    <path
                        className="st1"
                        fill="#E6E6E5"
                        d="M321.65,295.64c-0.92-0.07-1.86,0.16-2.63,0.68l-66.33,44l-66.89-43.96c-0.78-0.51-1.7-0.74-2.64-0.66
        c-58.81,5.25-103.17,54.34-103.17,114.18V500h337.14h8.27v-90.13C425.41,350.71,379.83,300.53,321.65,295.64z"
                    />
                </g>
            </svg>
        );
    }

    render() {
        return (
            <div className={"profile-image-container " + this.props.previewClassName}>
                <div className="profile-image">
                    {this.state.cropDataResult && <img src={this.state.cropDataResult} alt="cropped image" id="profile-image" />}
                    {!this.state.cropDataResult && this.defaultProfileSvg}
                </div>
                <input
                    ref={(file) => {
                        this.fileInput = file;
                    }}
                    type="file"
                    id="fileInput"
                    name="profileImage"
                    accept="image/*"
                    onChange={this.props.handleUploadImage && this.props.handleUploadImage}
                    onClick={(e: any) => {
                        if (e.target && e.target.value) {
                            e.target.value = null;
                        }
                    }}
                />
                <button type="button" className="btn btn-primary custom-button" onClick={this.onFileInputClick}>
                    <span>{this.props.selectButtonText || "Select Image"}</span>
                </button>
            </div>
        );
    }
}

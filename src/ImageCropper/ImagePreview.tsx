import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import * as React from "react";
import "./image-preview-style.scss";

export interface ImagePreviewProps {
    cropResult?: string;
    previewSrc?: string;
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement> & React.DragEvent<HTMLInputElement>, cropResult?: string) => void;
    selectButtonText?: string;
    previewClassName?: string;
}

export const ImagePreview: React.FunctionComponent<ImagePreviewProps> = (props: ImagePreviewProps): React.ReactElement<void> => {
    let fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    const profileImageId = React.useMemo(() => randomId("profile-image"), []);
    const fileInputId = React.useMemo(() => randomId("file-input"), []);
    const [cropDataResult, setCropDataResult] = React.useState<string>(props.previewSrc || "");

    /**
     * Default image to show when there is no display
     */
    const defaultProfileSvg = React.useMemo(() => {
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
    }, []);

    /**
     * handle file click or select file click
     */
    const onFileInputClick = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement> & React.DragEvent<HTMLInputElement>) => {
            const { previewSrc, handleUploadImage } = props;
            if (previewSrc) {
                handleUploadImage(e, previewSrc);
            } else {
                fileInput.current.click();
            }
        },
        [fileInput]
    );

    React.useEffect(() => {
        if (props.cropResult) {
            setCropDataResult(props.cropResult);
        } else if (props.previewSrc) {
            setCropDataResult(props.previewSrc);
        }
    }, [props.cropResult, props.previewSrc]);

    return (
        <div className={"profile-image-container " + props.previewClassName}>
            <div className="profile-image">{cropDataResult ? <img src={cropDataResult} alt="cropped image" id={profileImageId} /> : defaultProfileSvg}</div>
            <input
                ref={fileInput}
                type="file"
                id={fileInputId}
                name="profileImage"
                accept="image/*"
                onChange={props.handleUploadImage}
                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    if ((e.target as HTMLInputElement).value) {
                        e.target["value"] = null;
                    }
                }}
            />
            <button type="button" className="btn btn-primary custom-button" onClick={onFileInputClick}>
                <span>{props.selectButtonText || "Select Image"}</span>
            </button>
        </div>
    );
};

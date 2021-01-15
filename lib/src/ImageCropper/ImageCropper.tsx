import React from "react";
import classnames from "classnames";
import { Modal } from "../Modal";
import { ResizeHandle } from "./ResizeHandle";
import { ImagePicker } from "./ImagePicker";
import { moveHandler, readImage, resizeHandler, Position, addListener, crop } from "./utils";
import "./image-cropper.scss";

interface ImageCropperText {
    select?: string;
    cancel?: string;
    crop?: string;
}

export type ImageCropperProps = Omit<JSX.IntrinsicElements["div"], "onChange"> & {
    /** The image value as string */
    value?: string;
    /** On change handler fired when image has been cropped or reset */
    onChange?: (image: string) => void;
    /** The size of the image cropper picker */
    size?: number;
    /** Texts used in the image cropper */
    text?: ImageCropperText;
};

export interface ClipRect {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export const ImageCropper: React.FC<ImageCropperProps> = React.memo(
    React.forwardRef(({ onChange, value, size = 200, text, ...props }: ImageCropperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const fileRef: React.MutableRefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();
        const imgRef: React.MutableRefObject<HTMLImageElement> = React.useRef<HTMLImageElement>();
        const [modalToggle, setModalToggle] = React.useState<boolean>(false);
        const [imgSrc, setImgSrc] = React.useState<string>();
        const [croppedImgSrc, setCroppedImgSrc] = React.useState<string>(value);
        const [pos, setPos] = React.useState<ClipRect>({ top: 0, left: 0, bottom: 180, right: 180 });

        /** Handles selecting a file */
        const handleInput = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
            readImage(event)
                .then((val: string) => {
                    setImgSrc(val);
                    setModalToggle(true);
                })
                .catch(console.error);
        }, []);

        /** Handles dragging the cropbox */
        const handleMove = React.useCallback((event: React.MouseEvent | React.TouchEvent) => {
            addListener(event, (ev) => {
                moveHandler(ev, imgRef.current, setPos);
            });
        }, []);

        /** Handles resizing the cropbox */
        const handleResize = React.useCallback((event: React.MouseEvent | React.TouchEvent) => {
            const position: Position = (event.target as HTMLElement).className.replace("handle", "").trim() as Position;

            addListener(event, (e: MouseEvent | TouchEvent) => {
                resizeHandler(e, position, imgRef.current, setPos);
            });
        }, []);

        /** Handles cropping the image to the cropbox */
        const handleCrop = () => {
            crop(imgSrc, pos.left, pos.top, pos.right - pos.left, pos.bottom - pos.top, imgRef.current).then((img: string) => {
                setModalToggle(false);
                onChange && onChange(img);
            });
        };

        /** Resets the image cropper */
        const reset = React.useCallback(() => {
            setCroppedImgSrc(null);
            setImgSrc(null);
            fileRef.current.value = fileRef.current.files = null;
            onChange && onChange(null);
        }, [props.onReset]);

        React.useEffect(() => setCroppedImgSrc(value), [value]);

        React.useEffect(() => {
            modalToggle && setPos({ top: 0, left: 0, bottom: 180, right: 180 });
        }, [modalToggle]);

        return (
            <div {...props} ref={ref} className={classnames("rc", "image-cropper", props.className)}>
                <input type="file" accept="image/*" ref={fileRef} onInput={handleInput} hidden />

                <ImagePicker
                    image={croppedImgSrc}
                    size={size}
                    onReset={reset}
                    onSelect={() => {
                        fileRef.current.value = fileRef.current.files = null;
                        fileRef.current.click();
                    }}
                >
                    {text?.select}
                </ImagePicker>

                <Modal toggle={modalToggle} size="lg" className="image-cropper-modal">
                    <div className="modal-body">
                        <div className="cropping-area">
                            <img src={imgSrc} draggable={false} ref={imgRef} />
                            <img
                                className="crop-box"
                                src={imgSrc}
                                style={{ clip: `rect(${pos.top}px, ${pos.right}px, ${pos.bottom}px, ${pos.left}px)` }}
                                draggable={false}
                                onMouseDown={handleMove}
                                onTouchStart={handleMove}
                            />
                            <ResizeHandle position="top-left" coordinates={pos} handleResize={handleResize} />
                            <ResizeHandle position="top-right" coordinates={pos} handleResize={handleResize} />
                            <ResizeHandle position="bottom-left" coordinates={pos} handleResize={handleResize} />
                            <ResizeHandle position="bottom-right" coordinates={pos} handleResize={handleResize} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div>
                            <button className="btn btn-outline-primary cancel" onClick={() => setModalToggle(false)} type="button">
                                {text?.cancel || "Cancel"}
                            </button>
                            <button className="btn btn-primary ml-3" onClick={handleCrop} type="button">
                                {text?.crop || "Crop"}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    })
);

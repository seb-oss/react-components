import * as React from "react";
import { ImagePreview } from "./ImagePreview";
import { Loader } from "./Loader";
import Cropper from "cropperjs";
import "./image-cropper-style.scss";

const unchangeableProps = [
    "dragMode",
    "aspectRatio",
    "data",
    "crop"
];

const optionProps = [
    "aspectRatio",
    "autoCrop",
    "autoCropArea",
    "background",
    "center",
    "checkCrossOrigin",
    "checkOrientation",
    "cropBoxMovable",
    "cropBoxResizable",
    "data",
    "dragMode",
    "guides",
    "highlight",
    "initialAspectRatio",
    "minCanvasHeight",
    "minCanvasWidth",
    "minContainerHeight",
    "minContainerWidth",
    "minCropBoxHeight",
    "minCropBoxWidth",
    "modal",
    "movable",
    "preview",
    "responsive",
    "restore",
    "rotatable",
    "scalable",
    "toggleDragModeOnDblclick",
    "viewMode",
    "wheelZoomRatio",
    "zoomOnTouch",
    "zoomOnWheel",
    "zoomable",
    "ready",
    "zoom",
    "crop",
    "cropend",
    "cropmove",
    "cropstart",
];

export interface OptionProps {
    aspectRatio?: number;
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    center?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    crop?: (event: CustomEvent) => void;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    cropend?: (event: CustomEvent) => void;
    cropmove?: (event: CustomEvent) => void;
    cropstart?: (event: CustomEvent) => void;
    data?: Cropper.Data;
    dragMode?: Cropper.DragMode;
    guides?: boolean;
    highlight?: boolean;
    initialAspectRatio?: number;
    minCanvasHeight?: number;
    minCanvasWidth?: number;
    minContainerHeight?: number;
    minContainerWidth?: number;
    minCropBoxHeight?: number;
    minCropBoxWidth?: number;
    modal?: boolean;
    movable?: boolean;
    preview?: Element | Array<Element> | NodeList | string;
    ready?: (event: CustomEvent) => void;
    responsive?: boolean;
    restore?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    viewMode?: Cropper.ViewMode;
    wheelZoomRatio?: number;
    zoom?: (event: CustomEvent) => void;
    zoomable?: boolean;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
}

export interface CanvasData {
    left: number;
    top: number;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
}

export interface CropBoxData {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface ImageCropperProps {
    toggle?: boolean;
    showCustomButton?: boolean;
    cropperConfigs: OptionProps;
    onCrop: (imageData: string) => void;
    onCustomButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    cropButtonText?: string;
    customButtonText?: string;
    cancelText?: string;
    selectButtonText?: string;
    previewClassName?: string;
    imageCropperClassName?: string;
    id?: string;

    // cropper options
    previewSrc?: string;
    alt?: string;
    crossOrigin?: "anonymous" | "use-credentials" | "";
    enable?: boolean;
    rotateTo?: number;
    scaleX?: number;
    scaleY?: number;
    zoomTo?: number;
    moveTo?: Array<number>;
    reset?: boolean;
    cropBoxData?: CropBoxData;
    canvasData?: CanvasData;
    alwaysAlignedCropper?: boolean;
}

interface ImageCropperState {
    cropResult: string;
    isLoading: boolean;
    isImageLoaded: boolean;
    src: string;
    toggle: boolean;
    cropBoxData?: CropBoxData;
    alignCropper: boolean;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
    private cropper: Cropper;
    private image: HTMLImageElement;
    constructor(props: ImageCropperProps) {
        super(props);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onCropClick = this.onCropClick.bind(this);
        this.dismissCropper = this.dismissCropper.bind(this);

        this.state = {
            isLoading: false,
            isImageLoaded: false,
            alignCropper: props.alwaysAlignedCropper !== undefined ? props.alwaysAlignedCropper : true,
            toggle: props.toggle || false,
            src: props.previewSrc,
            cropBoxData: props.cropBoxData && this.props.cropBoxData,
            cropResult: props.previewSrc ? this.props.previewSrc : ""
        };
    }

    /**
     *
     * @param e : cropmove and end canvas evenht
     * performs corpper box calculations, align box position
     */
    alignCropBox(e) {
        if (e.target && e.target.cropper) {
            const cropper: any = e.target.cropper;
            const cropBoxData: any = cropper.getCropBoxData();
            const canvasData: any & { naturalWidth: number; naturalHeight: number; } = { ...cropper.getCanvasData() };
            if (cropBoxData.left < canvasData.left) {
                const newCropBoxData = { ...this.state.cropBoxData, left: canvasData.left + 1 };
                this.setState({ cropBoxData: newCropBoxData });
            } else if ((cropBoxData.left + cropBoxData.width) > (canvasData.left + canvasData.width)) {
                const newCropBoxData = { ...this.state.cropBoxData, left: (canvasData.left + canvasData.width - cropBoxData.width - 1) };
                this.setState({ cropBoxData: newCropBoxData });
            }
            if ((cropBoxData.top + cropBoxData.height) > (canvasData.top + canvasData.height)) {
                const offset = (cropBoxData.top + cropBoxData.height) - (canvasData.top + canvasData.height);
                const newCropBoxData = { ...this.state.cropBoxData, top: (cropBoxData.top - offset), left: cropBoxData.left };
                this.setState({ cropBoxData: newCropBoxData });
            } else if (canvasData.top > cropBoxData.top) {
                const newCropBoxData = { ...this.state.cropBoxData, top: (canvasData.top), left: cropBoxData.left };
                this.setState({ cropBoxData: newCropBoxData });
            }
        }
    }

    componentDidMount() {
        const options: OptionProps = Object.keys(this.props.cropperConfigs || {})
            .filter((propKey) => optionProps.indexOf(propKey) !== -1)
            .reduce((prevOptions, propKey: keyof OptionProps) =>
                ({ ...prevOptions, [propKey]: this.props.cropperConfigs[propKey] })
                , {});
        const OptionalEvents = {
            cropend: this.alignCropBox.bind(this),
            cropmove: this.alignCropBox.bind(this)
        };
        const updatedOptions = this.state.alignCropper ? { ...options, ...OptionalEvents } : options;
        const cropper = Cropper ? Cropper : require("cropperjs");
        this.cropper = new cropper(this.image, updatedOptions);

        if (this.props.previewSrc) {
            this.cropper.reset().clear().replace(this.props.previewSrc);
        }

    }

    handleUploadImage(e: any, cropResult?: string) {
        e.preventDefault();
        if (cropResult) {
            this.setState({ src: cropResult.toString(), toggle: true });
        } else {
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }

            const file = files[0];
            // file type is only image.
            if (/^image\//.test(file.type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    this.setState({ src: result, toggle: true, isLoading: true }, () => {
                        setTimeout(() => {
                            this.onResfreshCropper(result, () => {
                                this.setState({ isLoading: false });
                            });
                        }, 100);
                    });

                };
                reader.readAsDataURL(file);
            } else {
                throw new Error("You could only upload images.");
            }
        }

    }

    stopProp(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }

    dismissCropper() {
        this.setState({ toggle: false });
    }

    setDragMode(mode: Cropper.DragMode): Cropper {
        return this.cropper.setDragMode(mode);
    }

    setAspectRatio(aspectRatio: number): Cropper {
        return this.cropper.setAspectRatio(aspectRatio);
    }

    getCroppedCanvas(options: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement {
        return this.cropper.getCroppedCanvas(options);
    }

    setCropBoxData(data: Cropper.SetCropBoxDataOptions): Cropper {
        return this.cropper.setCropBoxData(data);
    }

    getCropBoxData(): Cropper.CropBoxData {
        return this.cropper.getCropBoxData();
    }

    setCanvasData(data: Cropper.SetCanvasDataOptions): Cropper {
        return this.cropper.setCanvasData(data);
    }

    getCanvasData(): Cropper.CanvasData {
        return this.cropper.getCanvasData();
    }

    getImageData(): Cropper.ImageData {
        return this.cropper.getImageData();
    }

    getContainerData(): Cropper.ContainerData {
        return this.cropper.getContainerData();
    }

    setData(data: Cropper.SetDataOptions): Cropper {
        return this.cropper.setData(data);
    }

    getData(rounded: boolean): Cropper.Data {
        return this.cropper.getData(rounded);
    }

    crop(image: string, callBack: () => void) {

        if (this.props.onCrop) {
            this.props.onCrop(image);
        }
        this.setState({ cropResult: image }, () => {
            callBack();
        });
    }

    onResfreshCropper(image: string, callBack: () => void) {
        this.cropper.reset().clear().replace(image);

        return callBack();
    }

    onCropClick(e: React.MouseEvent<HTMLButtonElement>): Cropper {
        if (typeof this.cropper.getCroppedCanvas() === "undefined") {
            return;
        }
        this.setState({ cropResult: "", isLoading: true }, () => {
            setTimeout(() => {
                this.crop(this.cropper.getCroppedCanvas().toDataURL(), () => {
                    this.setState({ isLoading: false });
                    this.dismissCropper();
                });
            }, 100);
        });

        e.preventDefault();
    }

    onReset(): Cropper {
        this.setState({ cropResult: "", src: "" });
        if (this.props.onCrop) {
            this.props.onCrop(this.state.cropResult);
        }

        return this.cropper.reset();
    }

    move(offsetX: number, offsetY: number): Cropper {
        return this.cropper.move(offsetX, offsetY);
    }

    onMoveTo(x: number, y?: number): Cropper {
        return this.cropper.moveTo(x, y);
    }

    zoom(ratio: number): Cropper {
        return this.cropper.zoom(ratio);
    }

    onZoomTo(ratio: number): Cropper {
        return this.cropper.zoomTo(ratio);
    }

    rotate(degree: number): Cropper {
        return this.cropper.rotate(degree);
    }

    onRotateTo(degree: number): Cropper {
        return this.cropper.rotateTo(degree);
    }

    onEnable(): Cropper {
        return this.cropper.enable();
    }

    disable(): Cropper {
        return this.cropper.disable();
    }

    clear(): Cropper {
        return this.cropper.clear();
    }

    replace(url: string, onlyColorChanged: boolean): Cropper {
        return this.cropper.replace(url, onlyColorChanged);
    }

    scale(scaleX: number, scaleY: number): Cropper {
        return this.cropper.scale(scaleX, scaleY);
    }

    setXScale(scaleX: number): Cropper {
        return this.cropper.scaleX(scaleX);
    }

    setYScale(scaleY: number): Cropper {
        return this.cropper.scaleY(scaleY);
    }

    componentDidUpdate(prevProps: ImageCropperProps, prevState: ImageCropperState) {
        if (prevProps.previewSrc !== this.props.previewSrc) {
            this.setState({ cropResult: this.props.previewSrc.trim() });
            this.cropper.reset().clear().replace(this.props.previewSrc);
        }
        if (prevProps.alwaysAlignedCropper !== this.props.alwaysAlignedCropper) {
            this.setState({ alignCropper: this.props.alwaysAlignedCropper });
        }
        if (prevProps.cropperConfigs.aspectRatio !== this.props.cropperConfigs.aspectRatio) {
            this.setAspectRatio(this.props.cropperConfigs.aspectRatio);
        }
        if (prevProps.cropperConfigs.data !== this.props.cropperConfigs.data) {
            this.setData(this.props.cropperConfigs.data);
        }
        if (prevProps.cropperConfigs.dragMode !== this.props.cropperConfigs.dragMode) {
            this.setDragMode(this.props.cropperConfigs.dragMode);
        }
        if (prevProps.canvasData !== this.props.canvasData) {
            this.setCanvasData(this.props.canvasData);
        }
        if (prevProps.cropBoxData !== this.props.cropBoxData) {
            this.setCropBoxData(this.props.cropBoxData);
        }
        if (prevState.cropBoxData !== this.state.cropBoxData && this.state.alignCropper) {
            this.setCropBoxData(this.state.cropBoxData);
        }
        if (prevProps.moveTo !== this.props.moveTo) {
            if (this.props.moveTo.length > 1) {
                this.onMoveTo(this.props.moveTo[0], this.props.moveTo[1]);
            } else {
                this.onMoveTo(this.props.moveTo[0]);
            }
        }
        if (prevProps.zoomTo !== this.props.zoomTo) {
            this.onZoomTo(this.props.zoomTo);
        }
        if (prevProps.rotateTo !== this.props.rotateTo) {
            this.onRotateTo(this.props.rotateTo);
        }
        if (prevProps.scaleX !== this.props.scaleX) {
            this.setXScale(this.props.scaleX);
        }
        if (prevProps.scaleY !== this.props.scaleY) {
            this.setYScale(this.props.scaleY);
        }
        if (prevProps.enable !== this.props.enable) {
            if (this.props.enable) {
                this.onEnable();
            } else {
                this.disable();
            }
        }
        if (prevProps.reset !== this.props.reset) {
            if (this.props.reset) {
                this.onReset();
            }
        }
        if (prevProps.toggle !== this.props.toggle && this.props.toggle === false) {
            this.dismissCropper();
        }
        if (prevProps.cropperConfigs !== this.props.cropperConfigs) {
            Object.keys(this.props.cropperConfigs).forEach((propKey: keyof OptionProps) => {
                let isDifferentVal = prevProps.cropperConfigs[propKey] !== this.props.cropperConfigs[propKey];
                const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

                if (typeof prevProps.cropperConfigs[propKey] === "function" && typeof this.props.cropperConfigs[propKey] === "function") {
                    isDifferentVal = prevProps.cropperConfigs[propKey].toString() !== this.props.cropperConfigs[propKey].toString();
                }

                if (isDifferentVal && isUnchangeableProps) {
                    throw new Error(`config: ${propKey} can't be change after rendering`);
                }
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={"custom-cropper-dialogue" + (this.state.toggle ? " open-cropper-dialogue" : " close-cropper-dialogue")} id={this.props.id}>
                    <div className="cropper-dialogue-container">
                        <div className={"cropper-dialogue " + (this.props.imageCropperClassName ? this.props.imageCropperClassName : "")} onClick={this.stopProp}>

                            <div className="custom-react-cropper">
                                <Loader className="inner-loader" toggle={!this.state.isImageLoaded} fullscreen={false} />
                                <img
                                    crossOrigin={this.props.crossOrigin}
                                    ref={(img) => { this.image = img; }}
                                    src={this.state.src || "data:image/jpeg;base64,PHN2ZyKPC9zdmc+"}
                                    alt={this.props.alt}
                                    style={{ opacity: 0, width: "100%" }}
                                    id="image"
                                    onLoad={(e) => { this.setState({ isImageLoaded: true }); }}
                                />
                            </div>

                            <div className="cropper-dialogue-footer control-container d-flex flex-row">
                                <div className="btn-delete">
                                    {(this.props.onCustomButtonClick && this.props.showCustomButton) &&
                                        <button type="button" className="btn btn-default custom-button" onClick={this.props.onCustomButtonClick}>
                                            <span>{this.props.customButtonText || "Delete"}</span>
                                        </button>
                                    }
                                </div>
                                <div className="right-controls">
                                    <button type="button" id="cancelBtn" className="btn btn-outline-secondary custom-button" onClick={this.dismissCropper}>
                                        <span>{this.props.cancelText || "Dismiss"}</span>
                                    </button>
                                    <button type="button" id="cropBtn" className="btn btn-primary custom-button" onClick={this.onCropClick}>
                                        <span>{this.props.cropButtonText || "Crop"}</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                        {<Loader toggle={this.state.isLoading} />}
                    </div>
                </div>
                <ImagePreview
                    handleUploadImage={this.handleUploadImage}
                    previewClassName={this.props.previewClassName}
                    cropResult={this.state.cropResult}
                    previewSrc={this.props.previewSrc}
                    selectButtonText={this.props.selectButtonText}
                />
            </React.Fragment>
        );
    }
}

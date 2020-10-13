import * as React from "react";
import { ImagePreview } from "./ImagePreview";
import { Loader } from "./Loader";
import Cropper from "cropperjs";
import "./image-cropper-style.scss";

const unchangeableProps = ["dragMode", "aspectRatio", "data", "crop"];

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

export const ImageCropper: React.FunctionComponent<ImageCropperProps> = React.memo(
    (props: ImageCropperProps): React.ReactElement<void> => {
        let cropper: Cropper;
        let image: React.RefObject<HTMLImageElement> = React.createRef();

        // states
        const [isLoading, setIsLoading] = React.useState<boolean>(false);
        const [isImageLoaded, setIsImageLoaded] = React.useState<boolean>(false);
        const [toggle, setToggle] = React.useState<boolean>(false);
        const [cropBoxData, setCropBoxData] = React.useState<CropBoxData>(null);
        const [src, setSrc] = React.useState<string>("");
        const [cropResult, setCropResult] = React.useState<string>("");

        const alignCropper: boolean = React.useMemo(() => (props.alwaysAlignedCropper !== undefined ? props.alwaysAlignedCropper : true), [props.alwaysAlignedCropper]);

        /**
         * Callbacks and events---------------------------------------------------------
         */
        const stopProp = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        }, []);

        const dismissCropper = React.useCallback(() => {
            setToggle(false);
        }, []);

        // Cropper properties updates===============================================
        /**
         * set drag mode
         * @param mode
         */
        const setDragMode = React.useCallback((mode: Cropper.DragMode): Cropper => {
            return cropper.setDragMode(mode);
        }, []);

        const setAspectRatio = React.useCallback(
            (aspectRatio: number): Cropper => {
                return cropper.setAspectRatio(aspectRatio);
            },
            [cropper]
        );

        /**
         * get canvas equivalent of the cropped image
         */
        const getCroppedCanvas = React.useCallback(
            (options: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement => {
                return cropper.getCroppedCanvas(options);
            },
            [cropper]
        );

        const getCropBoxData = React.useCallback((): Cropper.CropBoxData => {
            return cropper.getCropBoxData();
        }, [cropper]);

        const setCanvasData = React.useCallback(
            (data: Cropper.SetCanvasDataOptions): Cropper => {
                return cropper.setCanvasData(data);
            },
            [cropper]
        );

        const getCanvasData = React.useCallback((): Cropper.CanvasData => {
            return cropper.getCanvasData();
        }, [cropper]);

        const getImageData = React.useCallback((): Cropper.ImageData => {
            return cropper.getImageData();
        }, [cropper]);

        const getContainerData = React.useCallback((): Cropper.ContainerData => {
            return cropper.getContainerData();
        }, [cropper]);

        const setData = React.useCallback(
            (data: Cropper.SetDataOptions): Cropper => {
                return cropper.setData(data);
            },
            [cropper]
        );

        const getData = React.useCallback((rounded: boolean): Cropper.Data => {
            return cropper.getData(rounded);
        }, []);

        const cropImage = React.useCallback((localImage: string, callBack: () => void) => {
            if (props.onCrop) {
                props.onCrop(localImage);
            }

            setCropResult(localImage);
            callBack();
        }, []);

        const onResfreshCropper = React.useCallback((localImage: string, callBack: () => void) => {
            cropper.reset().clear().replace(localImage);

            return callBack();
        }, []);

        const onCropClick = React.useCallback(
            (e: React.MouseEvent<HTMLButtonElement>): Cropper => {
                if (typeof cropper.getCroppedCanvas() === "undefined") {
                    return;
                }

                setIsLoading(true);
                cropImage("", () => {
                    setTimeout(() => {
                        cropImage(cropper.getCroppedCanvas().toDataURL(), () => {
                            setIsLoading(false);
                            dismissCropper();
                        });
                    });
                });

                e.preventDefault();
            },
            [cropImage, cropper]
        );

        const onReset = React.useCallback((): Cropper => {
            setCropResult("");
            setSrc("");
            if (props.onCrop) {
                props.onCrop(cropResult);
            }

            return cropper.reset();
        }, [cropper]);

        const move = React.useCallback(
            (offsetX: number, offsetY: number): Cropper => {
                return cropper.move(offsetX, offsetY);
            },
            [cropper]
        );

        const onMoveTo = React.useCallback(
            (x: number, y?: number): Cropper => {
                return cropper.moveTo(x, y);
            },
            [cropper]
        );

        const zoom = React.useCallback(
            (ratio: number): Cropper => {
                return cropper.zoom(ratio);
            },
            [cropper]
        );

        const onZoomTo = React.useCallback(
            (ratio: number): Cropper => {
                return cropper.zoomTo(ratio);
            },
            [cropper]
        );

        const rotate = React.useCallback(
            (degree: number): Cropper => {
                return cropper.rotate(degree);
            },
            [cropper]
        );

        const onRotateTo = React.useCallback((degree: number): Cropper => {
            return cropper.rotateTo(degree);
        }, []);

        const onEnable = React.useCallback((): Cropper => {
            return cropper.enable();
        }, []);

        const disable = React.useCallback((): Cropper => {
            return cropper.disable();
        }, [cropper]);

        const clear = React.useCallback((): Cropper => {
            return cropper.clear();
        }, []);

        const replace = React.useCallback((url: string, onlyColorChanged: boolean): Cropper => {
            return cropper.replace(url, onlyColorChanged);
        }, []);

        const scale = React.useCallback(
            (scaleX: number, scaleY: number): Cropper => {
                return cropper.scale(scaleX, scaleY);
            },
            [cropper]
        );

        const setXScale = React.useCallback(
            (scaleX: number): Cropper => {
                return cropper.scaleX(scaleX);
            },
            [cropper]
        );

        const setYScale = React.useCallback(
            (scaleY: number): Cropper => {
                return cropper.scaleY(scaleY);
            },
            [cropper]
        );

        // custom callbacks/helpers ===============================================
        /**
         *
         * @param e : cropmove and end canvas evenht
         * performs corpper box calculations, align box position
         */
        const alignCropBox = React.useCallback(
            (e) => {
                if (e.target && e.target.cropper) {
                    const cropper: Cropper = e.target.cropper;
                    const localCropBoxData: CropBoxData = cropper.getCropBoxData();
                    const canvasData: CanvasData = { ...cropper.getCanvasData() };
                    if (localCropBoxData.left < canvasData.left) {
                        const newCropBoxData = { ...localCropBoxData, left: canvasData.left + 1 };
                        setCropBoxData(newCropBoxData);
                    } else if (localCropBoxData.left + localCropBoxData.width > canvasData.left + canvasData.width) {
                        const newCropBoxData = { ...localCropBoxData, left: canvasData.left + canvasData.width - localCropBoxData.width - 1 };
                        setCropBoxData(newCropBoxData);
                    }
                    if (localCropBoxData.top + localCropBoxData.height > canvasData.top + canvasData.height) {
                        const offset = localCropBoxData.top + localCropBoxData.height - (canvasData.top + canvasData.height);
                        const newCropBoxData = { ...cropBoxData, top: localCropBoxData.top - offset, left: localCropBoxData.left };
                        setCropBoxData(newCropBoxData);
                    } else if (canvasData.top > localCropBoxData.top) {
                        const newCropBoxData = { ...cropBoxData, top: canvasData.top, left: localCropBoxData.left };
                        setCropBoxData(newCropBoxData);
                    }
                }
            },
            [cropBoxData]
        );

        // set image src and loader asycnronously
        const setResultCallBack = React.useCallback((result: string, toggle: boolean, loading: boolean, callBack: () => void) => {
            setSrc(result);
            setToggle(toggle);
            setIsLoading(loading);
            callBack();
        }, []);

        // handle image upload or cropping
        const handleUploadImage = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement> & React.DragEvent<HTMLInputElement>, cropResult?: string) => {
                e.preventDefault();
                if (cropResult) {
                    setSrc(cropResult.toString());
                    setToggle(true);
                } else {
                    let files: FileList;
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
                            setResultCallBack(result, true, true, () => {
                                setTimeout(() => {
                                    onResfreshCropper(result, () => {
                                        setIsLoading(false);
                                    });
                                });
                            });
                        };
                        reader.readAsDataURL(file);
                    } else {
                        throw new Error("You could only crop images.");
                    }
                }
            },
            [src]
        );

        /**
         * Initialises cropperjs with options
         */
        React.useEffect(() => {
            const options: OptionProps = Object.keys(props.cropperConfigs || {})
                .filter((propKey) => optionProps.indexOf(propKey) !== -1)
                .reduce((prevOptions, propKey: keyof OptionProps) => ({ ...prevOptions, [propKey]: props.cropperConfigs[propKey] }), {});
            const OptionalEvents = {
                cropend: alignCropBox,
                cropmove: alignCropBox,
            };
            const updatedOptions = alignCropper ? { ...options, ...OptionalEvents } : options;
            const newCropper = Cropper ? Cropper : require("cropperjs");
            cropper = new newCropper(image?.current, updatedOptions);

            if (props.previewSrc) {
                cropper.reset().clear().replace(props.previewSrc);
            }
        }, []);

        React.useEffect(() => {
            setToggle(props.toggle || false);
        }, [props.toggle]);

        React.useEffect(() => {
            if (props.cropBoxData) {
                setCropBoxData(props.cropBoxData);
            }
        }, [props.cropBoxData]);

        React.useEffect(() => {
            setSrc(props.previewSrc || "");
        }, [props.previewSrc]);

        React.useEffect(() => {
            if (props.previewSrc) {
                setSrc(props.previewSrc?.trim());
                cropper.reset().clear().replace(props.previewSrc);
            }
        }, [props.previewSrc]);

        React.useEffect(() => {
            if (props.cropperConfigs?.aspectRatio) {
                setAspectRatio(props.cropperConfigs?.aspectRatio);
            }
        }, [props.cropperConfigs?.aspectRatio]);

        React.useEffect(() => {
            if (props.cropperConfigs?.data) {
                setData(props.cropperConfigs?.data);
            }
        }, [props.cropperConfigs?.data]);

        React.useEffect(() => {
            if (props?.cropperConfigs?.dragMode) {
                setDragMode(props.cropperConfigs?.dragMode);
            }
        }, [props.cropperConfigs?.dragMode]);

        React.useEffect(() => {
            if (props.canvasData) {
                setCanvasData(props?.canvasData);
            }
        }, [props.canvasData]);

        React.useEffect(() => {
            if (props.cropBoxData) {
                setCropBoxData(props?.cropBoxData);
            }
        }, [props.cropBoxData, alignCropper]);

        React.useEffect(() => {
            if (props.moveTo) {
                if (props.moveTo.length > 1) {
                    onMoveTo(props.moveTo[0], props.moveTo[1]);
                } else {
                    onMoveTo(props.moveTo[0]);
                }
            }
        }, [props.moveTo]);

        React.useEffect(() => {
            if (props.zoomTo) {
                onZoomTo(props.zoomTo);
            }
        }, [props.zoomTo]);

        React.useEffect(() => {
            if (props.rotateTo) {
                onRotateTo(props.rotateTo);
            }
        }, [props.rotateTo]);

        React.useEffect(() => {
            if (props.scaleX) {
                setXScale(props.scaleX);
            }
        }, [props.scaleX]);

        React.useEffect(() => {
            if (props.scaleX) {
                setYScale(props.scaleY);
            }
        }, [props.scaleY]);

        React.useEffect(() => {
            if (props.enable) {
                onEnable();
            } else {
                disable();
            }
        }, [props.enable]);

        React.useEffect(() => {
            if (props.reset) {
                onReset();
            }
        }, [props.reset]);

        React.useEffect(() => {
            if (!props.toggle) {
                dismissCropper();
            }
        }, [props.toggle]);

        /**
         * When the cropper is mounted, there are some properties that cropperjs doesn't allow dynamic changing,
         *  restrict them there
         */
        React.useEffect(() => {
            Object.keys(props.cropperConfigs).forEach((propKey: keyof OptionProps) => {
                const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;
                if (isUnchangeableProps && props[propKey]) {
                    throw new Error(`config: ${propKey} can't be change after rendering`);
                }
            });
        }, [props.cropperConfigs]);

        return (
            <React.Fragment>
                <div className={"custom-cropper-dialogue" + (toggle ? " open-cropper-dialogue" : " close-cropper-dialogue")} id={props.id}>
                    <div className="cropper-dialogue-container">
                        <div className={"cropper-dialogue " + (props.imageCropperClassName ? props.imageCropperClassName : "")} onClick={stopProp}>
                            <div className="custom-react-cropper">
                                <Loader className="inner-loader" toggle={!isImageLoaded} fullscreen={false} />
                                <img
                                    crossOrigin={props.crossOrigin}
                                    ref={image}
                                    src={src || "data:image/jpeg;base64,PHN2ZyKPC9zdmc+"}
                                    alt={props.alt}
                                    style={{ opacity: 0, width: "100%" }}
                                    id="image"
                                    onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        setIsImageLoaded(true);
                                    }}
                                />
                            </div>

                            <div className="cropper-dialogue-footer control-container d-flex flex-row">
                                <div className="btn-delete">
                                    {props.onCustomButtonClick && props.showCustomButton && (
                                        <button type="button" className="btn btn-default custom-button" onClick={props.onCustomButtonClick}>
                                            <span>{props.customButtonText || "Delete"}</span>
                                        </button>
                                    )}
                                </div>
                                <div className="right-controls">
                                    <button type="button" id="cancelBtn" className="btn btn-outline-secondary custom-button" onClick={dismissCropper}>
                                        <span>{props.cancelText || "Dismiss"}</span>
                                    </button>
                                    <button type="button" id="cropBtn" className="btn btn-primary custom-button" onClick={onCropClick}>
                                        <span>{props.cropButtonText || "Crop"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {<Loader toggle={isLoading} />}
                    </div>
                </div>
                <ImagePreview
                    handleUploadImage={handleUploadImage}
                    previewClassName={props.previewClassName}
                    cropResult={cropResult}
                    previewSrc={props.previewSrc}
                    selectButtonText={props.selectButtonText}
                />
            </React.Fragment>
        );
    }
);

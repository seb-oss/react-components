import React from "react";
import Docs from "components/Docs";
import { ImageCropper, OptionProps } from "@sebgroup/react-components/ImageCropper/ImageCropper";
import { useDynamicForm } from "hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";

const ImageCropperPage: React.FC = () => {
    const [reset, setResetValue] = React.useState<boolean>(false);
    const [cropData, setCropData] = React.useState<string>("");

    const cropperConfigs: OptionProps = React.useMemo(
        () => ({
            preview: ".image-preview",
            checkCrossOrigin: false,
            guides: false,
            responsive: true,
            zoomable: false,
            aspectRatio: 1 / 1,
            rotatable: false,
        }),
        []
    );

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "previewSrc",
                    value: "",
                    label: "Preview Source",
                    placeholder: "Preview Src",
                    controlType: "Text",
                },
                {
                    key: "customButtonText",
                    value: "",
                    label: "Custom button text",
                    placeholder: "Custom button src",
                    controlType: "Text",
                },
                {
                    key: "cancelText",
                    value: "",
                    label: "Cancel button text",
                    placeholder: "Cancel button text",
                    controlType: "Text",
                },
                {
                    key: "selectButtonText",
                    value: "",
                    label: "Select button text",
                    placeholder: "Cancel button text",
                    controlType: "Text",
                },
                {
                    key: "cropButtonText",
                    value: "",
                    label: "Crop button text",
                    placeholder: "Crop button text",
                    controlType: "Text",
                },
                {
                    key: "toggle",
                    label: "Toggle",
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "alwaysAlignedCropper",
                    label: "Always align cropper",
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);

    const props: any = React.useMemo(
        () => ({
            cropperConfigs,
            toggle: controls?.toggle,
            customButtonText: controls?.customButtonText,
            cancelText: controls?.cancelText,
            selectButtonText: controls?.selectButtonText,
            previewSrc: controls?.previewSrc,
            alwaysAlignedCropper: controls?.alwaysAlignedCropper,
            cropButtonText: controls?.cropButtonText,
            reset: reset,
            showCustomButton: !!controls?.customButtonText,
            onCustomButtonClick:
                controls?.customButtonText &&
                (() => {
                    console.log("It has been clicked ");
                }),
        }),
        [controls, reset]
    );

    const importString: string = require("!raw-loader!@sebgroup/react-components/ImageCropper/ImageCropper");
    const importedFiles: Array<string> = [];
    const code: string = React.useMemo(() => require("!raw-loader!./imagecropper").default, []);

    React.useEffect(() => {
        if (reset) {
            setCropData("");
        }
    }, [cropData]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex flex-column justify-content-center">
                    <ImageCropper {...props} onCrop={(data: string) => setCropData(data)} />

                    {cropData ? (
                        <div className="my-2">
                            <Button id="btnReset" theme="outline-primary" name="btnReset" type="button" onClick={() => setResetValue(true)}>
                                Reset
                            </Button>
                        </div>
                    ) : null}
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ImageCropperPage;

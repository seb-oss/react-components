import React from "react";
import Docs from "@common/Docs";
import { ImageCropper } from "@sebgroup/react-components/ImageCropper/ImageCropper";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/ImageCropper/ImageCropper");
const code: string = `<ImageCropper value={image} onChange={setImage} />`;

const ImageCropperPage: React.FC = () => {
    const [image, setImage] = React.useState<string>("");

    const {
        renderForm,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "Size", description: "The size of the image cropper picker in pixels", controlType: "Text", initialValue: 200 },
                { key: "selectText", label: "Select text", description: "The text used for selecting an image", controlType: "Text", initialValue: "" },
                { key: "cropText", label: "Crop text", description: "The text used for crop action", controlType: "Text", initialValue: "" },
                { key: "cancelText", label: "Cancel text", description: "The text used to cancel the crop", controlType: "Text", initialValue: "" },
            ],
        },
    ]);

    const { size, selectText, cropText, cancelText } = controls as { [k: string]: any };

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="d-flex flex-column align-items-center mx-auto">
                    <ImageCropper value={image} onChange={setImage} size={parseInt(size) || 200} text={{ select: selectText, crop: cropText, cancel: cancelText }} />
                </div>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default ImageCropperPage;

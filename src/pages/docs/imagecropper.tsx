import React from "react";
import Docs from "components/Docs";
import { ImageCropper } from "@sebgroup/react-components/ImageCropper/ImageCropper";
import { useDynamicForm } from "hooks/useDynamicForm";

const ImageCropperPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/ImageCropper/ImageCropper");
    const importedFiles: Array<string> = [];
    const code: string = `<ImageCropper value={image} onChange={setImage} />`;
    const [image, setImage] = React.useState<string>("");

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "size",
                    label: "Size",
                    description: "The size of the image cropper picker",
                    controlType: "Text",
                    value: 200,
                },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="d-flex flex-column align-items-center mx-auto">
                    <ImageCropper value={image} onChange={setImage} size={parseInt(controls.size) || 200} />
                </div>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default ImageCropperPage;

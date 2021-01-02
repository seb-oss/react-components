import React from "react";
import Docs from "@common/Docs";
import { DivImage } from "@sebgroup/react-components/DivImage/DivImage";
import { useDynamicForm } from "@hooks/useDynamicForm";

const DivImagePage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "height",
                    label: "Height",
                    order: 10,
                    controlType: "Text",
                    value: 400,
                },
                {
                    key: "width",
                    label: "width",
                    order: 20,
                    controlType: "Text",
                    value: 500,
                },
                {
                    key: "bgFixed",
                    label: "Background fixed",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "responsive",
                    label: "Responsive",
                    order: 50,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "rounded",
                    label: "Rounded",
                    order: 60,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "thumbnail",
                    label: "Thumbnail",
                    order: 70,
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/DivImage/DivImage"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/DivImage/DivImage")], []);
    const code: string = `<DivImage src={imageSrc} />`;

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <DivImage
                        src={require("../../assets/images/cat-pet-animal-1.jpeg")}
                        bgFixed={controls.bgFixed}
                        responsive={controls.responsive}
                        rounded={controls.rounded}
                        thumbnail={controls.thumbnail}
                        height={`${controls.height}px`}
                        width={`${controls.width}px`}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default DivImagePage;

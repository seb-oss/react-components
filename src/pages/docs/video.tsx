import React from "react";
import Docs from "components/Docs";
import { Video } from "@sebgroup/react-components/Video";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const AccordionPage: React.FC = () => {
    const defaultSrc: string = require("!file-loader!../../../static/videos/sample.mp4").default;
    const importString: string = require("!raw-loader!@sebgroup/react-components/Video/Video");
    const defaultHeight: string = "300px";
    const defaultWidth: string = "535px";
    const defaultSourceType: DynamicFormOption = { label: "Local", value: "local", key: "local" };
    const defaultCheckboxControls: Array<DynamicFormOption> = [
        { label: "allowFullScreen", value: "allowFullScreen", key: "allowFullScreen" },
        { label: "loop", value: "loop", key: "loop" },
        { label: "autoplay", value: "autoplay", key: "autoplay" },
        { label: "showControls", value: "showControls", key: "showControls" },
        { label: "showInfo", value: "showInfo", key: "showInfo" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "srcType",
                    value: defaultSourceType,
                    label: "SourceType",
                    options: [
                        { label: "Local", value: "local", key: "local" },
                        { label: "Stream", value: "stream", key: "stream" },
                    ],
                    controlType: "Dropdown",
                },
                {
                    key: "src",
                    value: defaultSrc,
                    label: "Source",
                    placeholder: "Source of video",
                    controlType: "Text",
                },
                {
                    key: "width",
                    value: defaultWidth,
                    label: "Width",
                    placeholder: "Width of video",
                    controlType: "Text",
                },
                {
                    key: "height",
                    value: defaultHeight,
                    label: "Height",
                    placeholder: "Height of video",
                    controlType: "Text",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    value: defaultCheckboxControls,
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Video [src]="src"
        [sourceType]="sourceType"
        [width]="width"
        [height]="height"
    />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <Video
                    name="myVideo"
                    sourceType={(controls as any)?.srcType.value || defaultSourceType}
                    src={(controls as any)?.src || defaultSrc}
                    width={(controls as any)?.width || defaultWidth}
                    height={(controls as any)?.height || defaultHeight}
                    autoplay={checkSelectedKey("autoplay")}
                    allowFullScreen={checkSelectedKey("allowFullScreen")}
                    loop={checkSelectedKey("loop")}
                    showControls={checkSelectedKey("showControls")}
                    showInfo={checkSelectedKey("showInfo")}
                />
            }
            code={code}
            controls={
                <>
                    {renderForm()}
                    <div>
                        <label>Source samples</label>
                        <p>Vimeo: https://player.vimeo.com/video/259422408</p>
                        <p>Youtube: https://www.youtube.com/embed/f19fctL72CY</p>
                    </div>
                </>
            }
        />
    );
};

export default AccordionPage;

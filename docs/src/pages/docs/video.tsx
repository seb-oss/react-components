import React from "react";
import Docs from "@common/Docs";
import { Video } from "@sebgroup/react-components/Video";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";

const VideoPage: React.FC = () => {
    const defaultSrc: string = "https://www.youtube.com/embed/f19fctL72CY";
    const importString: string = require("!raw-loader!@sebgroup/react-components/Video/Video");
    const referenceString: Array<string> = [require("!raw-loader!@sebgroup/react-components/Video/types-definition")];
    const defaultHeight: string = "300px";
    const defaultWidth: string = "535px";
    const defaultCheckboxControls: Array<DynamicFormOption> = [
        { label: "allowFullScreen", value: "allowFullScreen", key: "allowFullScreen" },
        { label: "loop", value: "loop", key: "loop" },
        { label: "autoplay", value: "autoplay", key: "autoplay" },
        { label: "showControls", value: "showControls", key: "showControls" },
    ];
    const checkboxControls: Array<DynamicFormOption> = [
        ...defaultCheckboxControls,
        { label: "hideBranding", value: "hideBranding", key: "hideBranding" },
        { label: "showVideoAnnotations", value: "showVideoAnnotations", key: "showVideoAnnotations" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                { key: "src", value: defaultSrc, label: "Source", placeholder: "Source of video", controlType: "Text" },
                { key: "width", value: defaultWidth, label: "Width", placeholder: "Width of video", controlType: "Text" },
                { key: "height", value: defaultHeight, label: "Height", placeholder: "Height of video", controlType: "Text" },
                { key: "language", value: null, label: "Language", placeholder: "Language of video player", controlType: "Text" },
                { key: "startTime", value: null, label: "Start time of playback", placeholder: "Playback starts at", controlType: "Text" },
                { key: "endTime", value: null, label: "End time of playback", placeholder: "Playback ends at", controlType: "Text" },
                { label: "Optional configurations", key: "checkboxes", value: defaultCheckboxControls, controlType: "Option", options: checkboxControls },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Video [src]="src"
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
            importedFiles={referenceString}
            example={
                <Video
                    name="myVideo"
                    src={(controls as any)?.src || defaultSrc}
                    width={(controls as any)?.width || defaultWidth}
                    height={(controls as any)?.height || defaultHeight}
                    language={(controls as any)?.language}
                    startTime={(controls as any)?.startTime}
                    autoplay={checkSelectedKey("autoplay")}
                    allowFullScreen={checkSelectedKey("allowFullScreen")}
                    loop={checkSelectedKey("loop")}
                    showControls={checkSelectedKey("showControls")}
                    hideBranding={checkSelectedKey("hideBranding")}
                    showVideoAnnotations={checkSelectedKey("showVideoAnnotations")}
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

export default VideoPage;

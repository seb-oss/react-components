import React from "react";
import Docs from "@common/Docs";
import { Tooltip } from "@sebgroup/react-components/Tooltip";
import { Notification } from "@sebgroup/react-components/Notification";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";

const TooltipPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Tooltip/Tooltip");
    const [notificationToggle, setNotifcationToggle] = React.useState<boolean>(false);
    const defaultPosition: DynamicFormOption = { label: "Top", value: "top", key: "top" };
    const defaultTheme: DynamicFormOption = { label: "Primary", value: "primary", key: "primary" };
    const defaultTriggerMethod: DynamicFormOption = { label: "Click", value: "click", key: "click" };
    const defaultTooltipContent: string = "Tooltip content could be long, therefore, controlling the position and width is important";
    const nodeTooltipContent: React.ReactNode = (
        <div>
            <h1>Tooltip Header</h1>
            <div>tooltip content</div>
        </div>
    );
    const checkboxControls: Array<DynamicFormOption> = [
        { label: "Callback on visibility change", value: "isVisibleChanged", key: "isVisibleChanged" },
        { label: "Disable autoposition", value: "disableAutoPosition", key: "disableAutoPosition" },
        { label: "Render node as tooltip content", value: "isCustomContent", key: "isCustomContent" },
        { label: "Define custom tooltip reference", value: "isCustomReference", key: "isCustomReference" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "position",
                    value: defaultPosition.value,
                    label: "Position",
                    options: [
                        { label: "Top", value: "top", key: "top" },
                        { label: "Top-left", value: "top-left", key: "top-left" },
                        { label: "Top-right", value: "top-right", key: "top-right" },
                        { label: "Right", value: "right", key: "right" },
                        { label: "Right-top", value: "right-top", key: "right-top" },
                        { label: "Right-bottom", value: "right-bottom", key: "right-bottom" },
                        { label: "Bottom", value: "bottom", key: "bottom" },
                        { label: "Bottom-left", value: "bottom-left", key: "bottom-left" },
                        { label: "Bottom-right", value: "bottom-right", key: "bottom-right" },
                        { label: "Left", value: "left", key: "left" },
                        { label: "Left-top", value: "left-top", key: "left-top" },
                        { label: "Left-bottom", value: "left-bottom", key: "left-bottom" },
                    ],
                    controlType: "Dropdown",
                },
                {
                    key: "theme",
                    value: defaultTheme.value,
                    label: "Theme",
                    options: [
                        { label: "Primary", value: "primary", key: "primary" },
                        { label: "Danger", value: "danger", key: "danger" },
                        { label: "Default", value: "default", key: "default" },
                        { label: "Light", value: "light", key: "light" },
                        { label: "Purple", value: "purple", key: "purple" },
                        { label: "Success", value: "success", key: "success" },
                        { label: "Warning", value: "warning", key: "warning" },
                    ],
                    controlType: "Dropdown",
                },
                {
                    key: "trigger",
                    value: defaultTriggerMethod.value,
                    label: "Trigger method",
                    options: [
                        { label: "Click", value: "click", key: "click" },
                        { label: "Hover", value: "hover", key: "hover" },
                        { label: "Focus", value: "focus", key: "focus" },
                    ],
                    controlType: "Dropdown",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: checkboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Tooltip
        content="Tooltip message could be long, therefore, controlling the position and width is important"
        position="right"
    />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <>
            <Docs
                mainFile={importString}
                example={
                    <Tooltip
                        content={checkSelectedKey("isCustomContent") ? nodeTooltipContent : defaultTooltipContent}
                        position={(controls as any)?.position}
                        theme={(controls as any)?.theme}
                        trigger={(controls as any)?.trigger}
                        disableAutoPosition={checkSelectedKey("disableAutoPosition")}
                        onVisibleChange={checkSelectedKey("isVisibleChanged") && (() => setNotifcationToggle(true))}
                    >
                        {checkSelectedKey("isCustomReference") && <abbr className="custom-tooltip text-help">This is custom tooltip reference</abbr>}
                    </Tooltip>
                }
                code={code}
                controls={renderForm()}
            />
            <Notification toggle={notificationToggle} type="slide-in" dismissTimeout={3000} onDismiss={() => setNotifcationToggle(false)}>
                <div>Tooltip visibility changed!</div>
            </Notification>
        </>
    );
};

export default TooltipPage;

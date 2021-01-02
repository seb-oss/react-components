import React from "react";
import Docs from "@common/Docs";
import { Notification } from "@sebgroup/react-components/Notification";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";

const NotificationPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Notification/Notification");
    const [toggle, setToggle] = React.useState<boolean>(false);
    const styleList: Array<DynamicFormOption> = [
        { label: "slide-in", value: "slide-in", key: "slide-in" },
        { label: "bar", value: "bar", key: "bar" },
    ];
    const themeList: Array<DynamicFormOption> = [
        { label: "purple", value: "purple", key: "purple" },
        { label: "primary", value: "primary", key: "primary" },
        { label: "danger", value: "danger", key: "danger" },
        { label: "success", value: "success", key: "success" },
        { label: "warning", value: "warning", key: "warning" },
        { label: "inverted", value: "inverted", key: "inverted" },
    ];
    const positionList: Array<DynamicFormOption> = [
        { label: "bottom-left", value: "bottom-left", key: "bottom-left" },
        { label: "bottom-right", value: "bottom-right", key: "bottom-right" },
        { label: "top-left", value: "top-left", key: "top-left" },
        { label: "top-right", value: "top-right", key: "top-right" },
        { label: "top", value: "top", key: "top" },
        { label: "bottom", value: "bottom", key: "bottom" },
    ];
    const defaultCheckboxControls: Array<DynamicFormOption> = [
        { label: "with title", value: "withTitle", key: "withTitle" },
        { label: "dismissable", value: "dismissable", key: "dismissable" },
        { label: "persist", value: "persist", key: "persist" },
        { label: "with actions", value: "withActions", key: "withActions" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "type",
                    value: styleList[0].value,
                    label: "Type",
                    options: styleList,
                    controlType: "Dropdown",
                },
                {
                    key: "theme",
                    value: themeList[0].value,
                    label: "Theme",
                    options: themeList,
                    controlType: "Dropdown",
                },
                {
                    key: "position",
                    value: positionList[0].value,
                    label: "Position",
                    options: positionList,
                    controlType: "Dropdown",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    value: [defaultCheckboxControls[0]],
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Notification toggle={toggle} title="Notification title" message="message" onDismiss={() => setToggle(false)} />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button onClick={() => setToggle(true)}>Toggle notification</Button>
                    <Notification
                        toggle={toggle}
                        title={checkSelectedKey("withTitle") ? "Notification title" : null}
                        message="Notification message"
                        type={(controls as any)?.type}
                        theme={(controls as any)?.theme}
                        position={(controls as any)?.position}
                        onDismiss={() => setToggle(false)}
                        dismissable={checkSelectedKey("dismissable")}
                        persist={checkSelectedKey("persist")}
                        actions={
                            checkSelectedKey("withActions")
                                ? [
                                      { text: "Remind me later", action: () => setToggle(false) },
                                      { text: "Dismiss", action: () => setToggle(false) },
                                  ]
                                : null
                        }
                    />
                </>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default NotificationPage;

import React from "react";
import Docs from "@common/Docs";
import { Notification, NotificationProps } from "@sebgroup/react-components/Notification";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Notification/Notification");
const code: string = `<Notification toggle={toggle} onDismiss={() => setToggle(false)}>
    <div className="notification-header">Header content</div>
    <div className="notification-body">Body content</div>
</Notification>`;

const types: Array<DynamicFormOption<NotificationProps["type"]>> = [
    { label: "slide", value: "slide", key: "slide" },
    { label: "bar", value: "bar", key: "bar" },
];
const themes: Array<DynamicFormOption<NotificationProps["theme"]>> = [
    { label: "purple", value: "purple", key: "purple" },
    { label: "primary", value: "primary", key: "primary" },
    { label: "danger", value: "danger", key: "danger" },
    { label: "success", value: "success", key: "success" },
    { label: "warning", value: "warning", key: "warning" },
    { label: "inverted", value: "inverted", key: "inverted" },
];
const slidePositions: Array<DynamicFormOption<NotificationProps["position"]>> = [
    { label: "bottom-left", value: "bottom-left", key: "bottom-left" },
    { label: "bottom-right", value: "bottom-right", key: "bottom-right" },
    { label: "top-left", value: "top-left", key: "top-left" },
    { label: "top-right", value: "top-right", key: "top-right" },
];
const barPositions: Array<DynamicFormOption<NotificationProps["position"]>> = [
    { label: "top", value: "top", key: "top" },
    { label: "bottom", value: "bottom", key: "bottom" },
];

const NotificationPage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "theme", label: "theme", controlType: "Dropdown", options: themes, value: themes[0].value },
                { key: "persist", label: "persist", value: false, controlType: "Checkbox", description: "Disable timer and persist the notification until dismissed" },
                { key: "type", label: "type", controlType: "Radio", options: types, inline: true, value: types[0] },
                { key: "slidePosition", label: "position", controlType: "Radio", options: slidePositions, value: slidePositions[0], rulerKey: "type", condition: types[0] },
                { key: "barPosition", label: "position", controlType: "Radio", options: barPositions, inline: true, value: barPositions[0], rulerKey: "type", condition: types[1] },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button onClick={() => setToggle(!toggle)}>Toggle notification</Button>
                    <Notification
                        toggle={toggle}
                        type={controls.type?.value}
                        theme={controls.theme}
                        position={controls.type?.value === "slide" ? controls.slidePosition?.value : controls.barPosition?.value}
                        onDismiss={() => setToggle(false)}
                        persist={controls.persist}
                    >
                        <div className="notification-header">Sunt qui quasi nam.</div>
                        <div className="notification-body">
                            Eaque dolorem nisi qui ut nemo perferendis. Veniam voluptates alias voluptatum ratione. Et alias incidunt maiores provident rem ea molestiae ea.
                        </div>
                    </Notification>
                </>
            }
            code={code}
            controls={renderForm()}
            note={
                <>
                    <h3>Notification header and body</h3>
                    <p>
                        Defining the notification's header and body is done in a declarative style. Meaning that the developer is responsive for declaring these parts individually if needed. Remember
                        to pass the following class names:
                    </p>
                    <ul>
                        <li>
                            <code>notificaiton-header</code> for the <code>div</code> representing the header
                        </li>
                        <li>
                            <code>notificaiton-body</code> for the <code>div</code> representing the body
                        </li>
                    </ul>
                    An example can be found below:
                    <CodeSnippet language="jsx">
                        {`<Notification>
    <div className="notification-header">Header content here</div>
    <div className="notification-body">Body content here</div>
</Notification>`}
                    </CodeSnippet>
                </>
            }
        />
    );
};

export default NotificationPage;

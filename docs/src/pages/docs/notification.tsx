import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { Notification, NotificationProps } from "@sebgroup/react-components/Notification";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Notification/Notification");
const code: string = `<Notification toggle={toggle} onDismiss={() => setToggle(false)}>
    <div className="notification-header">Header content</div>
    <div className="notification-body">Body content</div>
</Notification>`;

const types: Array<DynamicFormOption<NotificationProps["type"]>> = [
    { label: "slide", value: "slide", key: "slide", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { label: "bar", value: "bar", key: "bar", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
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
    { label: "top", value: "top", key: "top", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { label: "bottom", value: "bottom", key: "bottom", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const NotificationPage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    const {
        renderForm,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "theme", label: "theme", controlType: "Dropdown", options: themes, initialValue: themes[0].value },
                { key: "persist", label: "persist", initialValue: false, controlType: "Checkbox", description: "Disable timer and persist the notification until dismissed" },
                { key: "type", label: "type", controlType: "Radio", options: types, initialValue: types[0].value },
                { key: "header", label: "header", controlType: "Text", initialValue: "Sunt qui quasi nam." },
                { key: "slidePosition", label: "position", controlType: "Dropdown", options: slidePositions, initialValue: slidePositions[0].value },
                { key: "barPosition", label: "position", controlType: "Radio", options: barPositions, initialValue: barPositions[0].value },
            ],
        },
    ]);

    useEffect(() => {
        setHidden("controls", "slidePosition", controls.type !== types[0].value);
        setHidden("controls", "barPosition", controls.type !== types[1].value);
    }, [controls.type]);

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button onClick={() => setToggle(!toggle)}>Toggle notification</Button>
                    <Notification
                        toggle={toggle}
                        type={controls.type as any}
                        theme={controls.theme as NotificationProps["theme"]}
                        position={(controls.type === "slide" ? controls.slidePosition : controls.barPosition) as NotificationProps["position"]}
                        onDismiss={() => setToggle(false)}
                        persist={controls.persist as NotificationProps["persist"]}
                        aria-live="polite"
                    >
                        <div className="notification-header">{controls.header}</div>
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

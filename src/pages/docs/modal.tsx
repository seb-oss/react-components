import React from "react";
import Docs from "components/Docs";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { Modal } from "@sebgroup/react-components/Modal";

const NotificationPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Modal/Modal");
    const [toggle, setToggle] = React.useState<boolean>(false);
    const modalSizeList: Array<DynamicFormOption> = [
        { label: "default", value: "default", key: "default" },
        { label: "modal-sm", value: "modal-sm", key: "modal-sm" },
        { label: "modal-lg", value: "modal-lg", key: "modal-lg" },
    ];
    const positionList: Array<DynamicFormOption> = [
        { label: "default", value: "default", key: "default" },
        { label: "left", value: "left", key: "left" },
        { label: "right", value: "right", key: "bottom" },
    ];
    const defaultCheckboxControls: Array<DynamicFormOption> = [
        { label: "centered", value: "centered", key: "centered" },
        { label: "fullscreen", value: "fullscreen", key: "fullscreen" },
        { label: "disable backdrop dismiss", value: "disablebackdropdismiss", key: "disablebackdropdismiss" },
        { label: "escape to dismiss", value: "escapeToDismiss", key: "escapeToDismiss" },
        { label: "trap focus", value: "trapfocus", key: "trapfocus" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "size",
                    value: modalSizeList[0].value,
                    label: "Size",
                    options: modalSizeList,
                    controlType: "Dropdown",
                },
                {
                    key: "position",
                    value: positionList[0],
                    label: "Position",
                    options: positionList,
                    controlType: "Dropdown",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Modal
        toggle={this.state.dialogue}
        fullscreen={this.state.fullscreen}
        position={this.state.position}
        disableBackdropDismiss={this.state.disableBackdropDismiss}
        onDismiss={() => this.closeModal()}
        header={<h3>Header</h3>}
        body={<p>this is the body</p>}
        footer={<Button
            label="Close Modal"
            onClick={() => this.closeModal()}
        />}
    />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button onClick={() => setToggle(true)}>Toggle Modal</Button>
                    <Modal
                        toggle={toggle}
                        fullscreen={checkSelectedKey("fullscreen")}
                        position={(controls as any)?.position === "default" ? null : (controls as any)?.position}
                        size={(controls as any)?.size === "default" ? null : (controls as any)?.size}
                        disableBackdropDismiss={checkSelectedKey("disablebackdropdismiss")}
                        escapeToDismiss={checkSelectedKey("escapeToDismiss")}
                        centered={checkSelectedKey("centered")}
                        trapFocus={checkSelectedKey("trapfocus")}
                        onDismiss={() => setToggle(false)}
                        header={<h3>Header</h3>}
                        body={<p>this is the body</p>}
                        footer={<Button onClick={() => setToggle(false)}>Close Modal</Button>}
                    />
                </>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default NotificationPage;

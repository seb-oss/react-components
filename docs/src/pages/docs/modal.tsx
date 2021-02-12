import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { Modal, ModalSize, ModalPosition } from "@sebgroup/react-components/Modal";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Modal/Modal");
const code: string = `<Modal toggle={toggle}>
    <Modal.Header>Header content</Modal.Header>
    <Modal.Body>Modal content here</Modal.Body>
    <Modal.Footer>Footer content</Modal.Footer>
</Modal>`;

const sizses: Array<DynamicFormOption<ModalSize>> = [
    { label: "sm", value: "sm", key: "sm" },
    { label: "md", value: "md", key: "md" },
    { label: "lg", value: "lg", key: "lg" },
];
const positions: Array<DynamicFormOption<ModalPosition>> = [
    { label: "default", value: "default", key: "default" },
    { label: "left", value: "left", key: "left" },
    { label: "right", value: "right", key: "bottom" },
];

const NotificationPage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "Size", controlType: "Radio", options: sizses, value: sizses[1], inline: true },
                { key: "position", label: "Position", controlType: "Radio", options: positions, value: positions[0], inline: true },
                { key: "centered", label: "centered", controlType: "Checkbox", value: false },
                { key: "fullscreen", label: "fullscreen", controlType: "Checkbox", value: false },
                { key: "trapfocus", label: "trapfocus", controlType: "Checkbox", value: false },
                { key: "autoFocus", label: "autoFocus", description: "Automatically focus on the first input element", controlType: "Checkbox", value: false },
                { key: "onEscape", label: "onEscape", controlType: "Checkbox", value: false },
                { key: "onBackdropDismiss", label: "onBackdropDismiss", controlType: "Checkbox", value: false },
            ],
        },
    ]);

    const dismiss = React.useCallback(() => setToggle(false), []);

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button onClick={() => setToggle(!toggle)}>Toggle Modal</Button>
                    <Modal
                        toggle={toggle}
                        position={controls.position?.value}
                        size={controls.size?.value}
                        fullscreen={controls.fullscreen}
                        centered={controls.centered}
                        trapFocus={controls.trapfocus}
                        onEscape={controls.onEscape ? dismiss : null}
                        onBackdropDismiss={controls.onBackdropDismiss ? dismiss : null}
                        autoFocus={controls.autoFocus}
                    >
                        <Modal.Header>
                            <h3>Header</h3>
                            <button className="close" type="button" onClick={dismiss} />
                        </Modal.Header>
                        <Modal.Body>
                            {controls.trapfocus || controls.autoFocus ? (
                                <form>
                                    <fieldset>
                                        <legend>Use tab to see focus trap in action</legend>
                                        <Textbox label="Firstname" />
                                        <Textbox label="Lastname" />
                                        <Button type="button">Submit</Button>
                                    </fieldset>
                                </form>
                            ) : (
                                <>
                                    <p>
                                        Voluptate beatae quo est perferendis quam ut illum repellat voluptatem. Saepe deleniti voluptas impedit quidem ut rerum. Voluptatibus laboriosam sit libero
                                        deleniti accusamus debitis quia nobis alias. Quod voluptatem id et consequatur suscipit odio cumque vero ut. Ut ullam nisi qui. Doloremque libero nihil omnis
                                        porro nihil quo.
                                    </p>
                                    <p>
                                        Maxime recusandae cum. Quisquam facere quia corporis debitis. Illo itaque vel magni est dolores ut voluptatem nisi ullam. Ea nihil ipsa et dolor non illum iste
                                        quis. Sunt dolores sunt non porro.
                                    </p>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={dismiss}>Close Modal</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
            code={code}
            controls={renderForm()}
            note={
                <>
                    <h3>Header close button</h3>
                    <p>
                        To add a close button to the modal's header just pass a button of class "close" and it will be aligned correctly. You don't need to pass any content inside the button as it
                        will be populated automatically with an &times; sign.
                    </p>
                    <CodeSnippet language="jsx">
                        {`<Modal>
    <div className="modal-header">
        <h3>Modal header text</h3>
        <button className="close" type="button" onClick={dismiss} />
    </div>
</Modal>`}
                    </CodeSnippet>
                </>
            }
        />
    );
};

export default NotificationPage;

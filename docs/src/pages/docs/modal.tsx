import { CodeSnippet } from "@common/CodeSnippet";
import Docs from "@common/Docs";
import { Button } from "@sebgroup/react-components/Button";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Modal, ModalPosition, ModalSize } from "@sebgroup/react-components/Modal";
import { Textbox } from "@sebgroup/react-components/Textbox";
import React from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/Modal/Modal");
const code: string = `<Modal toggle={toggle}>
    <div className="modal-header">Header content</div>
    <div className="modal-body">Modal content here</div>
    <div className="modal-footer">Footer content</div>
</Modal>`;

const sizses: Array<DynamicFormOption<ModalSize>> = [
    { key: "sm", label: "sm", value: "sm", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "md", label: "md", value: "md", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "lg", label: "lg", value: "lg", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];
const positions: Array<DynamicFormOption<ModalPosition>> = [
    { label: "default", value: "default", key: "default", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { label: "left", value: "left", key: "left", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { label: "right", value: "right", key: "bottom", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const NotificationPage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const toggleButtonRef: React.MutableRefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>();

    const {
        renderForm,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "Size", controlType: "Radio", options: sizses, initialValue: sizses[1].value },
                { key: "position", label: "Position", controlType: "Radio", options: positions, initialValue: positions[0].value },
                { key: "centered", label: "centered", controlType: "Checkbox", initialValue: false },
                { key: "fullscreen", label: "fullscreen", controlType: "Checkbox", initialValue: false },
                { key: "trapfocus", label: "trapfocus", description: "Deprecated. Trap focus would be enabled by default.", controlType: "Checkbox", initialValue: true },
                {
                    key: "autoFocus",
                    label: "autoFocus",
                    description: "Automatically focus on first focusable element. Auto focus will be enabled by default.",
                    controlType: "Checkbox",
                    initialValue: true,
                },
                { key: "onEscape", label: "onEscape", controlType: "Checkbox", initialValue: false },
                { key: "onBackdropDismiss", label: "onBackdropDismiss", controlType: "Checkbox", initialValue: false },
            ],
        },
    ]);

    const dismiss = React.useCallback(() => {
        setToggle(false);
        toggleButtonRef.current?.focus();
    }, []);

    const { position, size, fullscreen, centered, trapfocus, autoFocus } = controls as { [k: string]: any };

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <Button ref={toggleButtonRef} onClick={() => setToggle(!toggle)}>
                        Toggle Modal
                    </Button>
                    <Modal
                        toggle={toggle}
                        {...{ position, size, fullscreen, centered, trapfocus, autoFocus }}
                        onEscape={controls.onEscape ? dismiss : null}
                        onBackdropDismiss={controls.onBackdropDismiss ? dismiss : null}
                        aria-labelledby="modalHeader"
                        aria-describedby="modalDescription"
                    >
                        <div id="modalDescription" className="modal-body order-1">
                            {controls.trapfocus || controls.autoFocus ? (
                                <form>
                                    <fieldset>
                                        <legend>Use tab to see focus trap in action</legend>
                                        <Textbox label="Firstname" />
                                        <Textbox label="Lastname" />
                                        <Button className="mt-3" type="button">
                                            Submit
                                        </Button>
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
                        </div>
                        <div className="modal-footer order-2">
                            <Button onClick={dismiss}>Close Modal</Button>
                        </div>
                        <div className="modal-header order-0">
                            <h3 id="modalHeader">Header</h3>
                            <button className="close" type="button" onClick={dismiss} />
                        </div>
                    </Modal>
                </>
            }
            code={code}
            controls={renderForm()}
            note={
                <>
                    <h3>Modal header, body and footer</h3>
                    <p>
                        Defining the modal's header, body and footer is done in a declarative style. Meaning that the developer is responsive for declaring these parts individually if needed. Remember
                        to pass the following class names:
                    </p>
                    <ul>
                        <li>
                            <code>modal-header</code> for the <code>div</code> representing the header
                        </li>
                        <li>
                            <code>modal-body</code> for the <code>div</code> representing the body
                        </li>
                        <li>
                            <code>modal-footer</code> for the <code>div</code> representing the footer
                        </li>
                    </ul>
                    An example can be found below:
                    <CodeSnippet language="jsx">
                        {`<Modal>
    <div className="modal-header">Header content here</div>
    <div className="modal-body">Body content here</div>
    <div className="modal-footer">Footer content here</div>
</Modal>`}
                    </CodeSnippet>
                    <hr />
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

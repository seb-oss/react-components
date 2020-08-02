import React from "react";
import { Button } from "../../../src/Button";
import { Modal, ModalProps } from "../../../src/Modal";
import Highlight from "react-highlight";
import docMD from "../../../src/Modal/readme.md";
import { loremIpsum } from "lorem-ipsum";

const initialState: ModalProps = {
    toggle: false,
    fullscreen: false,
    position: null,
    centered: false,
    size: null,
    backdropDismiss: true,
    onDismiss: null,
};

const dialogueBodyText: string = loremIpsum({ units: "sentences", count: 2 });

const ModalPage: React.FC = React.memo(() => {
    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });
    const [dialogueToggle, setDialogueToggle] = React.useState<boolean>(false);

    const openModal = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, props: Partial<ModalProps> = {}) => {
            setModalProps({ ...initialState, ...props, toggle: true });
        },
        [modalProps]
    );

    const onDismiss = React.useCallback(() => setModalProps({ ...modalProps, toggle: false }), [modalProps]);

    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>Here are sample outputs</p>
                    <div className="result wide">
                        <p>Modal</p>
                        <Button onClick={openModal}>Trigger Modal</Button>
                        <p>Modal without backdrop dismiss</p>
                        <Button onClick={(e) => openModal(e, { backdropDismiss: false })}>No backdrop dismiss</Button>
                        <p>Modal Size</p>
                        <div className="d-flex">
                            <Button className="mr-5" onClick={(e) => openModal(e, { size: "lg" })}>
                                Large Modal
                            </Button>
                            <Button onClick={(e) => openModal(e, { size: "sm" })}>Small Modal</Button>
                        </div>
                        <p>Vertically Centered</p>
                        <Button onClick={(e) => openModal(e, { centered: true })}>Vertically Centered</Button>
                        <p>Aside Modal</p>
                        <div className="d-flex">
                            <Button className="mr-5" onClick={(e) => openModal(e, { position: "left" })}>
                                Open aside left
                            </Button>
                            <Button onClick={(e) => openModal(e, { position: "right" })}>Open aside right</Button>
                        </div>
                        <p>Aside Large Modal</p>
                        <div className="d-flex">
                            <Button className="mr-5" onClick={(e) => openModal(e, { position: "left", size: "lg" })}>
                                Open aside left
                            </Button>
                            <Button onClick={(e) => openModal(e, { position: "right", size: "lg" })}>Open aside right</Button>
                        </div>
                        <p>Fullscreen modal</p>
                        <Button onClick={(e) => openModal(e, { fullscreen: true })}>Open fullscreen modal</Button>
                        <p>Dialogue example</p>
                        <Button onClick={(e) => setDialogueToggle(true)}>Dialogue</Button>
                        <Modal
                            {...modalProps}
                            onDismiss={onDismiss}
                            header={<h3 className="m-0">Header</h3>}
                            body={
                                <div>
                                    <p>This is the body</p>
                                    {modalProps.size && modalProps.position && <img src={"https://unsplash.it/900"} width="100%" />}
                                </div>
                            }
                            footer={<Button onClick={onDismiss}>Close Modal</Button>}
                        />
                        <Modal
                            toggle={dialogueToggle}
                            onDismiss={() => setDialogueToggle(false)}
                            header={<h3 className="m-0">Are you sure?</h3>}
                            backdropDismiss={false}
                            body={
                                <>
                                    <p>{dialogueBodyText}</p>
                                    <div className="text-right">
                                        <Button className="mr-3" theme="outline-primary" onClick={() => setDialogueToggle(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => setDialogueToggle(false)}>Yes delete it!</Button>
                                    </div>
                                </>
                            }
                            centered
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModalPage;

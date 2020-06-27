import React from "react";
import { Button } from "../../../src/Button";
import { Modal, ModalProps } from "../../../src/Modal";
import Highlight from "react-highlight";
import docMD from "../../../src/Modal/readme.md";

const initialState: ModalProps = {
    toggle: false,
    fullscreen: false,
    position: null,
    centered: false,
    size: null,
    disableBackdropDismiss: false,
    onDismiss: null,
};

const ModalPage: React.FC = React.memo(() => {
    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

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
                        <Button onClick={(e) => openModal(e, { disableBackdropDismiss: true })}>No backdrop dismiss</Button>
                        <p>Modal Size</p>
                        <div className="d-flex">
                            <Button className="mr-5" onClick={(e) => openModal(e, { size: "modal-lg" })}>
                                Large Modal
                            </Button>
                            <Button onClick={(e) => openModal(e, { size: "modal-sm" })}>Small Modal</Button>
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
                            <Button className="mr-5" onClick={(e) => openModal(e, { position: "left", size: "modal-lg" })}>
                                Open aside left
                            </Button>
                            <Button onClick={(e) => openModal(e, { position: "right", size: "modal-lg" })}>Open aside right</Button>
                        </div>
                        <p>Fullscreen modal</p>
                        <Button onClick={(e) => openModal(e, { fullscreen: true })}>Open fullscreen modal</Button>
                        <Modal
                            {...modalProps}
                            onDismiss={onDismiss}
                            header={<h3>Header</h3>}
                            body={
                                <div>
                                    <p>This is the body</p>
                                    {modalProps.size && modalProps.position && <img src={"https://unsplash.it/900"} width="100%" />}
                                </div>
                            }
                            footer={<Button onClick={onDismiss}>Close Modal</Button>}
                            ariaLabel="My Label"
                            ariaDescribedby="My Description"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModalPage;

import React from "react";
import { Button } from "../../../src/Button/Button";
import { Modal, ModalProps } from "../../../src/Modal/Modal";
import Highlight from "react-highlight";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
const docMD: string = require("../../../src/Modal/readme.md");

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
    const [radioListSelected, setRadioListSelected] = React.useState<string>("second");

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
                        <Button label="Trigger Modal" onClick={openModal} />
                        <p>Modal without backdrop dismiss</p>
                        <Button label="No backdrop dismiss" onClick={(e) => openModal(e, { disableBackdropDismiss: true })} />
                        <p>Modal Size</p>
                        <div className="d-flex">
                            <Button className="mr-5" label="Large Modal" onClick={(e) => openModal(e, { size: "modal-lg" })} />
                            <Button label="Small Modal" onClick={(e) => openModal(e, { size: "modal-sm" })} />
                        </div>
                        <p>Vertically Centered</p>
                        <Button label="Vertically Centered" onClick={(e) => openModal(e, { centered: true })} />
                        <p>Aside Modal</p>
                        <div className="d-flex">
                            <Button className="mr-5" label="Open aside left" onClick={(e) => openModal(e, { position: "left" })} />
                            <Button label="Open aside right" onClick={(e) => openModal(e, { position: "right" })} />
                        </div>
                        <p>Aside Large Modal</p>
                        <div className="d-flex">
                            <Button className="mr-5" label="Open aside left" onClick={(e) => openModal(e, { position: "left", size: "modal-lg" })} />
                            <Button label="Open aside right" onClick={(e) => openModal(e, { position: "right", size: "modal-lg" })} />
                        </div>
                        <p>Fullscreen modal</p>
                        <Button label="Open fullscreen modal" onClick={(e) => openModal(e, { fullscreen: true })} />
                        <Modal
                            {...modalProps}
                            onDismiss={onDismiss}
                            header={<h3>Header</h3>}
                            body={
                                <div>
                                    <p>This is the body</p>
                                    <input className="form-control" type="text" placeholder="focus is kept within" />
                                    <RadioGroup
                                        name="radioGroupName"
                                        list={radioList}
                                        value={radioListSelected}
                                        condensed
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadioListSelected(e.target.value)}
                                    />
                                    {modalProps.size && modalProps.position && <img src={"http://via.placeholder.com/900x300"} width="100%" />}
                                </div>
                            }
                            footer={<Button label="Close Modal" onClick={onDismiss} />}
                            ariaLabel="My Label"
                            ariaDescribedby="My Description"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

const radioList: Array<RadioListModel> = [
    { value: "first", label: "Radio 1" },
    { value: "second", label: "Radio 2" },
    { value: "third", label: "Radio 3" },
];

export default ModalPage;

import React from "react";
import { Button } from "../../../src/Button/Button";
import { Modal, ModalProps } from "../../../src/Modal/Modal";
import { RouteComponentProps } from "react-router";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Modal/readme.md");

class ModalPage extends React.Component<RouteComponentProps, Partial<ModalProps>> {
    initialState: Partial<ModalProps> = {
        toggle: false,
        fullscreen: false,
        position: null,
        disableBackdropDismiss: false,
    };

    constructor(props: any) {
        super(props);
        this.state = { ...this.initialState };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e?: React.MouseEvent<HTMLButtonElement>, options?: Partial<ModalProps>): void {
        let props: Partial<ModalProps> = { ...this.initialState, toggle: !this.state.toggle };
        if (options) {
            props = { ...props, ...options };
        }
        this.setState({ ...props });
    }

    render() {
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
                        <div className="result">
                            <p>Modal</p>
                            <Button onClick={this.toggleModal}>Trigger Modal</Button>
                            <p>Modal without backdrop dismiss</p>
                            <Button
                                onClick={(e) => {
                                    this.toggleModal(e, { disableBackdropDismiss: true });
                                }}
                            >
                                No backdrop dismiss
                            </Button>
                            <p>Aside Modal</p>
                            <div className="d-flex">
                                <Button
                                    className="mr-5"
                                    onClick={(e) => {
                                        this.toggleModal(e, { position: "left" });
                                    }}
                                >
                                    Open aside left
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        this.toggleModal(e, { position: "right" });
                                    }}
                                >
                                    Open aside right
                                </Button>
                            </div>
                            <p>Fullscreen modal</p>
                            <Button
                                onClick={(e) => {
                                    this.toggleModal(e, { fullscreen: true });
                                }}
                            >
                                Open fullscreen modal
                            </Button>
                            <Modal
                                toggle={this.state.toggle}
                                fullscreen={this.state.fullscreen}
                                disableBackdropDismiss={this.state.disableBackdropDismiss}
                                position={this.state.position}
                                onDismiss={this.toggleModal}
                                header={<h3>Header</h3>}
                                body={<p>This is the body</p>}
                                footer={<Button onClick={this.toggleModal}>Close Modal</Button>}
                                ariaLabel="My Label"
                                ariaDescribedby="My Description"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalPage;

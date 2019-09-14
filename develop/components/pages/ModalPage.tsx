import * as React from "react";
import { Button } from "../../../src/Button/Button";
import { Modal, ModalProps } from "../../../src/Modal/Modal";
const docMD: string = require("../../../src/Modal/readme.md");
import { getParameterByName } from "../../utils/queryString";
import { RouteComponentProps } from "react-router";
const Highlight = (require("react-highlight")).default;

class ModalPage extends React.Component<RouteComponentProps, Partial<ModalProps>>  {
    initialState: Partial<ModalProps> = {
        toggle: false,
        fullscreen: false,
        position: null,
        disableBackdropDismiss: false
    };

    constructor(props: any) {
        super(props);
        this.state = { ...this.initialState };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(options?: Partial<ModalProps>): void {
        let props: Partial<ModalProps> = { ...this.initialState, toggle: !this.state.toggle };
        if (options) {
            props = { ...props, ...options };
        }
        this.setState({ ...props });
    }

    render() {
        const mode: string = getParameterByName(this.props.location.search, "mode");
        const brief: string = mode && mode.toLowerCase() === "dl" ? " brief" : "";
        return (
            <div className={"route-template" + brief}>
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
                            <Button
                                label="Trigger Modal"
                                onClick={this.toggleModal}
                            />
                            <p>Modal without backdrop dismiss</p>
                            <Button
                                label="No backdrop dismiss"
                                onClick={() => { this.toggleModal({ disableBackdropDismiss: true }); }}
                            />
                            <p>Aside Modal</p>
                            <div className="d-flex">
                                <Button
                                    className="mr-5"
                                    label="Open aside left"
                                    onClick={() => { this.toggleModal({ position: "left" }); }}
                                />
                                <Button
                                    label="Open aside right"
                                    onClick={() => { this.toggleModal({ position: "right" }); }}
                                />
                            </div>
                            <p>Fullscreen modal</p>
                            <Button
                                label="Open fullscreen modal"
                                onClick={() => { this.toggleModal({ fullscreen: true }); }}
                            />
                            <Modal
                                toggle={this.state.toggle}
                                fullscreen={this.state.fullscreen}
                                disableBackdropDismiss={this.state.disableBackdropDismiss}
                                position={this.state.position}
                                onDismiss={this.toggleModal}
                                header={<h3>Header</h3>}
                                body={<p>This is the body</p>}
                                footer={<Button label="Close Modal" onClick={this.toggleModal} />}
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

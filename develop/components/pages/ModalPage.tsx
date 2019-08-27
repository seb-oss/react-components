import * as React from "react";
import { Modal } from "../../../src/Modal/Modal";
import { Button } from "../../../src/Button/Button";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Modal/readme.md");

export default class ModalPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            dialogue: false,
            fullscreen: false,
            position: "",
            disableBackdropDismiss: false
        };
    }

    closeModal(): void {
        this.setState({ dialogue: false });
        this.resetModal();
    }

    resetModal(): void {
        this.setState({ fullscreen: false, position: "", disableBackdropDismiss: false });
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
                            <p>Modal with Backdrop</p>
                            <Button
                                label="Trigger Modal"
                                onClick={() => { this.setState({ dialogue: true }); }}
                            />
                            <p>Modal without backdrop dismiss</p>
                            <Button
                                label="No backdrop dismiss"
                                onClick={() => { this.setState({ dialogue: true, disableBackdropDismiss: true }); }}
                            />
                            <p>Aside Modal</p>
                            <div className="d-flex">
                                <Button
                                    className="mr-5"
                                    label="Open aside"
                                    onClick={() => { this.setState({ dialogue: true, position: "right" }); }}
                                />
                                <Button
                                    label="Open aside left"
                                    onClick={() => { this.setState({ dialogue: true, position: "left" }); }}
                                />
                            </div>
                            <p>Fullscreen modal</p>
                            <Button
                                label="Open fullscreen modal"
                                onClick={() => { this.setState({ dialogue: true, fullscreen: true }); }}
                            />
                            <Modal
                                toggle={this.state.dialogue}
                                fullscreen={this.state.fullscreen}
                                disableBackdropDismiss={this.state.disableBackdropDismiss}
                                position={this.state.position}
                                dismissModal={() => this.closeModal()}
                                header={<h3>Header</h3>}
                                body={<p>this is the body</p>}
                                footer={<Button
                                    label="Close Modal"
                                    onClick={() => this.closeModal()}
                                />}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

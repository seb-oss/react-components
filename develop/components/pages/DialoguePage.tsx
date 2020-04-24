import React from "react";
import { Dialogue } from "../../../src/Dialogue/Dialogue";
import { Button } from "../../../src/Button/Button";
import { loremIpsum } from "lorem-ipsum";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Dialogue/readme.md");

const DialoguePage: React.FC = () => {
    const [dialogue, setDialogue] = React.useState<boolean>(false);

    const show: VoidFunction = React.useCallback(() => setDialogue(true), [setDialogue]);
    const hide: VoidFunction = React.useCallback(() => setDialogue(false), [setDialogue]);

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
                        <Button onClick={show}>Trigger dialogue</Button>
                        <Dialogue
                            header="Are you sure?"
                            desc={loremIpsum({ units: "sentences", count: 2 })}
                            toggle={dialogue}
                            primaryBtn="Yes, delete it!"
                            secondaryBtn="Cancel"
                            secondaryAction={hide}
                            primaryAction={hide}
                            enableCloseButton
                            enableBackdropDismiss
                            onDismiss={hide}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialoguePage;

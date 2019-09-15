import * as React from "react";
import { Dialogue } from "../../../src/Dialogue/Dialogue";
import { Button } from "../../../src/Button/Button";
import { AppSharedProps } from "typings/generic.type";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Dialogue/readme.md");

const DialoguePage: React.FunctionComponent<AppSharedProps> = (props: AppSharedProps) => {
    const [dialogue, setDialogue] = React.useState(false);
    return (
        <div className={"route-template " + props.brief}>
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
                        <Button
                            label="Trigger dialogue"
                            onClick={() => setDialogue(true)}
                        />
                        <Dialogue
                            header="Are you sure?"
                            desc="Lorem ipsum dolor sit amet, ius quis veniam ad, mea id nemore probatus sensibus. Sed  lorem everti menandri cu, habeo."
                            toggle={dialogue}
                            primaryBtn="Yes, delete it!"
                            secondaryBtn="Cancel"
                            secondaryAction={() => setDialogue(false)}
                            primaryAction={() => setDialogue(false)}
                            enableCloseButton={true}
                            enableBackdropDismiss={true}
                            onDismiss={() => setDialogue(false)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DialoguePage;

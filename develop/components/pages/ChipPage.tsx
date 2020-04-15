import React from "react";
import { Chip } from "../../../src/Chip/Chip";
import Highlight from "react-highlight";
import { Button } from "../../../src/Button/Button";
import { loremIpsum } from "lorem-ipsum";
const docMD: string = require("../../../src/Chip/readme.md");

const generateWord = () => loremIpsum({ units: "words", count: 1 });

const ChipPage: React.FunctionComponent = () => {
    const [chips, setChips] = React.useState<Array<string>>([generateWord()]);

    const closeChip: (index: number) => void = React.useCallback(
        (index: number) => {
            const newChips: Array<string> = [...chips];
            newChips.splice(index, 1);
            setChips(newChips);
        },
        [chips, setChips]
    );

    const addChip: VoidFunction = React.useCallback(() => {
        setChips([...chips, generateWord()]);
    }, [chips, setChips]);

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
                    <div className="result wide">
                        {chips.map((chip: string, i: number) => (
                            <Chip key={i} className="m-2" onClose={() => closeChip(i)}>
                                {chip}
                            </Chip>
                        ))}
                    </div>

                    <p>Options</p>
                    <div className="row no-gutters">
                        <Button label="Insert Chip" onClick={addChip} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChipPage;
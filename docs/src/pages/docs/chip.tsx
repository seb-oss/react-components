import Docs from "@common/Docs";
import { Button } from "@sebgroup/react-components/Button";
import { Chip } from "@sebgroup/react-components/Chip";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/Chip/Chip");
const code: string = `<Chip onClose={handleClose}>I'm a chip</Chip>`;

const ChipPage: React.FC = (): React.ReactElement<void> => {
    const [chips, setChips] = React.useState<Array<string>>([loremIpsum({ units: "word" })]);

    const onClose = React.useCallback((removeIndex: number) => setChips((oldChips) => oldChips.filter((_, i: number) => i !== removeIndex)), []);
    const onAdd = React.useCallback(() => setChips((oldChips) => [...oldChips, loremIpsum({ units: "word" })]), []);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    {chips.map((chip: string, i: number) => (
                        <Chip key={i} className="m-2" data-id={i} onClose={() => onClose(i)}>
                            {chip}
                        </Chip>
                    ))}
                </div>
            }
            code={code}
            controls={<Button onClick={onAdd}>Insert Chip</Button>}
        />
    );
};

export default ChipPage;

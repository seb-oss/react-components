import React from "react";
import Docs from "@common/Docs";
import { Chip } from "@sebgroup/react-components/Chip";
import { loremIpsum } from "lorem-ipsum";
import { Button } from "@sebgroup/react-components/Button";

const ChipPage: React.FC = (): React.ReactElement<void> => {
    const [chips, setChips] = React.useState<Array<string>>([loremIpsum({ units: "word" })]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Chip/Chip"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Chip/Chip")], []);
    const code: string = `<Chip onClose={handleClose}>I'm a chip</Chip>`;

    const closeChip: (index: number) => void = React.useCallback(
        (index: number) => {
            const newChips: Array<string> = [...chips.slice(0, index), ...chips.slice(index + 1)];
            setChips(newChips);
        },
        [chips, setChips]
    );

    const addChip: VoidFunction = React.useCallback(() => setChips([...chips, loremIpsum({ units: "word" })]), [chips]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    {chips.map((chip: string, i: number) => (
                        <Chip key={i} className="m-2" onClose={() => closeChip(i)}>
                            {chip}
                        </Chip>
                    ))}
                </div>
            }
            code={code}
            controls={
                <>
                    <Button onClick={addChip}>Insert Chip</Button>
                </>
            }
        />
    );
};

export default ChipPage;

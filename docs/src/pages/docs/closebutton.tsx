import React from "react";
import Docs from "@common/Docs";
import { CloseButton } from "@sebgroup/react-components/CloseButton";
import { Slider } from "@sebgroup/react-components/Slider";
import { useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/CloseButton/CloseButton");
const code: string = `<CloseButton />`;

const ChipPage: React.FC = (): React.ReactElement<void> => {
    const [size, setSize] = React.useState<number>(30);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "disabled", label: "disabled", controlType: "Checkbox" }],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <CloseButton style={{ fontSize: size }} onClick={() => console.log("Clicked")} disabled={controls.disabled} />
                </div>
            }
            code={code}
            controls={
                <>
                    <p>You can scale up/down the size of the button using font-size</p>
                    <Slider min={10} max={50} step={10} value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
                    {renderControls()}
                </>
            }
        />
    );
};

export default ChipPage;

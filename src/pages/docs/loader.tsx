import Docs from "components/Docs";
import React from "react";

import { Loader } from "../../../lib/src/Loader";
import { TextBoxGroup } from "../../../lib/src/TextBoxGroup";

import { useDynamicForm } from "hooks/useDynamicForm";

const LoaderPage: React.FC = (): React.ReactElement<void> => {
    const [inlineText, setInlineText] = React.useState<string>("");

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "toggle",
                    label: "Toggle",
                    order: 10,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "size",
                    label: "Size",
                    order: 20,
                    options: [
                        { key: "sm", label: "small", value: "sm" },
                        { key: "md", label: "Medium", value: "md" },
                        { key: "lg", label: "Large", value: "lg" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "type",
                    label: "Loader type",
                    order: 30,
                    options: [
                        { key: "spinner", label: "Spinner", value: "spinner" },
                        { key: "square", label: "Square", value: "square" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "display",
                    label: "Display",
                    order: 40,
                    options: [
                        { key: "cover", label: "Cover", value: "cover" },
                        { key: "fullscreen", label: "Full screen", value: "fullscreen" },
                        { key: "backdrop", label: "Back drop", value: "backdrop" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "srText",
                    label: "Screen reader",
                    order: 50,
                    controlType: "Text",
                    value: "",
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!../../../lib/src/Loader/Loader"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!../../../lib/src/Loader/Loader")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./loader").default, []);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    <div className="result">
                        <Loader
                            {...controls}
                            size={controls?.size?.value}
                            type={controls?.type?.value}
                            backdrop={controls?.display?.value === "backdrop"}
                            fullscreen={controls?.display?.value === "fullscreen" && controls}
                            cover={controls?.display?.value === "cover"}
                        >
                            {controls?.srText}
                        </Loader>
                    </div>

                    <div className="result">
                        <TextBoxGroup name="text-box-1" value={inlineText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInlineText(e.target.value)} rightIcon={<Loader toggle={true} />} />
                    </div>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default LoaderPage;

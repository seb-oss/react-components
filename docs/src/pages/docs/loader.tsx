import Docs from "@common/Docs";
import React from "react";
import { Loader, LoaderSize, LoaderType } from "@sebgroup/react-components/Loader";
import { useDynamicForm, DynamicFormOption } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Loader/Loader");
const code: string = `<Loader toggle={toggle} />`;

const sizes: Array<DynamicFormOption<LoaderSize>> = [
    { key: "sm", label: "sm", value: "sm" },
    { key: "md", label: "md", value: "md" },
    { key: "lg", label: "lg", value: "lg" },
];

const types: Array<DynamicFormOption<LoaderType>> = [
    { key: "spinner", label: "spinner", value: "spinner" },
    { key: "square", label: "square", value: "square" },
];

const displayTypes: Array<DynamicFormOption> = [
    { key: "cover", label: "cover", value: "cover" },
    { key: "fullscreen", label: "fullscreen", value: "fullscreen" },
];

const LoaderPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }, setState] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "size", options: sizes, controlType: "Radio", inline: true },
                { key: "type", label: "type", options: types, controlType: "Radio", value: types[0], inline: true },
                { key: "display", label: "Display types", options: displayTypes, controlType: "Radio", inline: true, value: displayTypes[0] },
                { key: "backdrop", label: "backdrop", controlType: "Checkbox", value: false },
                { key: "children", label: "Render children to be displayed under the loader", controlType: "Checkbox", value: false },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <Loader
                    size={controls.size?.value}
                    type={controls.type?.value}
                    backdrop={controls.backdrop}
                    fullscreen={controls.display?.value === "fullscreen" && controls}
                    cover={controls.display?.value === "cover"}
                    onClick={() => {
                        controls.display?.value === "fullscreen" &&
                            setState((prevState) => {
                                return {
                                    controls: { ...prevState.controls, display: displayTypes[0] },
                                };
                            });
                    }}
                >
                    {controls.children && <p className="mt-2">Loading...</p>}
                </Loader>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default LoaderPage;

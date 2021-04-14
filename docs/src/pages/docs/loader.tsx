import Docs from "@common/Docs";
import React from "react";
import { Loader, LoaderSize, LoaderType } from "@sebgroup/react-components/Loader";
import { useDynamicForm, DynamicFormOption } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Loader/Loader");
const code: string = `<Loader toggle={toggle} />`;

const sizes: Array<DynamicFormOption<LoaderSize>> = [
    { key: "sm", label: "sm", value: "sm", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "md", label: "md", value: "md", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "lg", label: "lg", value: "lg", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const types: Array<DynamicFormOption<LoaderType>> = [
    { key: "spinner", label: "spinner", value: "spinner", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "square", label: "square", value: "square", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const displayTypes: Array<DynamicFormOption> = [
    { key: "cover", label: "cover", value: "cover", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "fullscreen", label: "fullscreen", value: "fullscreen", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const LoaderPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }, setState] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "size", options: sizes, controlType: "Radio", value: sizes[1].value },
                { key: "type", label: "type", options: types, controlType: "Radio", value: types[0].value },
                { key: "display", label: "Display types", options: displayTypes, controlType: "Radio", value: displayTypes[0].value },
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
                    size={controls.size}
                    type={controls.type}
                    backdrop={controls.backdrop}
                    fullscreen={controls.display === "fullscreen" && controls}
                    cover={controls.display === "cover"}
                    onClick={() => {
                        controls.display === "fullscreen" &&
                            setState((prevState) => {
                                return {
                                    controls: { ...prevState.controls, display: displayTypes[0].value },
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

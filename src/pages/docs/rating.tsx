import React from "react";
import Docs from "components/Docs";
import { Rating } from "@sebgroup/react-components/Rating";
import { useDynamicForm } from "hooks/useDynamicForm";

const RatingPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "initialValue",
                    label: "Initial value",
                    order: 30,
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "iconHeight",
                    label: "Icon height",
                    order: 10,
                    controlType: "Text",
                    value: 20,
                },
                {
                    key: "iconWidth",
                    label: "Icon width",
                    order: 20,
                    controlType: "Text",
                    value: 20,
                },
                {
                    key: "readOnly",
                    label: "Read only",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "useHollow",
                    label: "Use hollow",
                    order: 60,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disabled",
                    order: 70,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "colors",
                    label: "Colors",
                    order: 80,
                    options: [
                        { key: "default", label: "Default color", value: null },
                        { key: "greyandblack", label: "Grey & Black", value: "greyandblack" },
                        { key: "lightblueandblue", label: "Light blue & blue", value: "lightblueandblue" },
                        { key: "lightgreenandGreen", label: "Light green & green", value: "lg" },
                    ],
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const colors: [string, string] = React.useMemo(() => {
        switch (controls.colors?.key) {
            case "greyandblack":
                return ["grey", "black"];
            case "lightblueandblue":
                return ["lightblue", "blue"];
            case "lightgreenandGreen":
                return ["lightgreen", "green"];
            default:
                return null;
        }
    }, [controls.colors]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Rating/Rating"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Rating/Rating")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./divimage").default, []);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Rating
                        initialValue={controls.initialValue}
                        useHollow={controls.useHollow}
                        readOnly={controls.readOnly}
                        disabled={controls.disabled}
                        iconHeight={controls.icoHeight}
                        iconWidth={controls.iconWidth}
                        colors={colors}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default RatingPage;

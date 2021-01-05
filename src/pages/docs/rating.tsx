import React from "react";
import Docs from "components/Docs";
import { Rating } from "@sebgroup/react-components/Rating";
import { useDynamicForm } from "hooks/useDynamicForm";

const RatingPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "max",
                    label: "Max",
                    controlType: "Text",
                    value: 5,
                },
                {
                    key: "min",
                    label: "Min",
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "step",
                    label: "Step",
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "initialValue",
                    label: "Initial Value",
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "height",
                    label: "Icon height",
                    controlType: "Text",
                    value: 30,
                },
                {
                    key: "width",
                    label: "Icon width",
                    controlType: "Text",
                    value: 40,
                },
                {
                    key: "readOnly",
                    label: "Read only",
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disabled",
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "colors",
                    label: "Colors",
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
    const code: string = `
    <Rating
        id="some-id"
        className="custom-class"
        readOnly={boolean}
        disabled={boolean}
        height={React.ReactText}
        width={React.ReactText}
        max={React.ReactText}
        min={React.ReactText}
        step={React.ReactText}
        svgname={string}
        colors={[string, string]}
        customSVG={JSX.Element}
        initialValue={number}
        value={number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(Number(e.target.value));
        }}
    />`;

    const heartSVG = (
        <svg xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
    );

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Rating
                        id="some-id"
                        className="custom-class"
                        readOnly={controls.readOnly}
                        disabled={controls.disabled}
                        height={controls.height}
                        width={controls.width}
                        max={controls.max}
                        min={controls.min}
                        step={controls.step}
                        svgname="hello"
                        colors={colors}
                        customSVG={heartSVG}
                        initialValue={controls.initialValue}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(Number(e.target.value));
                        }}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default RatingPage;

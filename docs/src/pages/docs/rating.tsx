import React from "react";
import Docs from "@common/Docs";
import { Rating } from "@sebgroup/react-components/Rating";
import { useDynamicForm } from "@hooks/useDynamicForm";
import HeartSVG from "../../../static/icons/heart.svg";

const importString: string = require("!raw-loader!@sebgroup/react-components/Rating/Rating");
const code: string = `<Rating value={number} onChange={(e) => setValue(e.target.value)} />`;

const RatingPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "max", label: "Max", controlType: "Text", value: 5 },
                { key: "min", label: "Min", description: "Should no be smaller than step", controlType: "Text", value: 1 },
                { key: "step", label: "Step", controlType: "Text", value: 1 },
                { key: "dimension", label: "Icon Dimension", controlType: "Text", value: 30 },
                { key: "readOnly", label: "Read only", controlType: "Checkbox", value: false },
                { key: "disabled", label: "Disabled", controlType: "Checkbox", value: false },
                { key: "customSvg", label: "Custom SVG", controlType: "Checkbox", value: false },
                {
                    key: "colors",
                    label: "Colors",
                    options: [
                        { key: "default", label: "Default color", value: "" },
                        { key: "greyandblack", label: "Grey & Black", value: "greyandblack" },
                        { key: "lightblueandblue", label: "Light blue & blue", value: "lightblueandblue" },
                        { key: "lightgreenandGreen", label: "Light green & green", value: "lg" },
                    ],
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const getColor = React.useCallback((): [string, string] => {
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

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Rating
                        id="some-id"
                        className="custom-class"
                        readOnly={controls.readOnly}
                        disabled={controls.disabled}
                        dimension={controls.dimension}
                        max={controls.max}
                        min={controls.min}
                        step={controls.step}
                        svgname="custom name"
                        colors={getColor()}
                        customSVG={controls.customSvg ? <HeartSVG /> : null}
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

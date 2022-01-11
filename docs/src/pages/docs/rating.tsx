import React from "react";
import Docs from "@common/Docs";
import { Rating } from "@sebgroup/react-components/Rating";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import HeartSVG from "../../../static/icons/heart.svg";

const importString: string = require("!raw-loader!@sebgroup/react-components/Rating/Rating");
const code: string = `<Rating value={number} onChange={(e) => setValue(e.target.value)} />`;

const RatingPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);
    const {
        renderForm: renderControls,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "max", label: "Max", controlType: "Text", initialValue: 5 },
                { key: "min", label: "Min", description: "Should no be smaller than step", controlType: "Text", initialValue: 1 },
                { key: "step", label: "Step", controlType: "Text", initialValue: 1 },
                { key: "dimension", label: "Icon Dimension", controlType: "Text", initialValue: 30 },
                { key: "readOnly", label: "Read only", controlType: "Checkbox", initialValue: false },
                { key: "disabled", label: "Disabled", controlType: "Checkbox", initialValue: false },
                { key: "customSvg", label: "Custom SVG", controlType: "Checkbox", initialValue: false },
                {
                    key: "color",
                    label: "Color",
                    options: [
                        { key: "default", label: "Default color", value: "" },
                        { key: "greyandblack", label: "Grey & Black", value: "greyandblack" },
                        { key: "lightblueandblue", label: "Light blue & blue", value: "lightblueandblue" },
                        { key: "lightgreenandGreen", label: "Light green & green", value: "lightgreenandGreen" },
                    ],
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const { color, readOnly, disabled, dimension, max, min, step } = controls as { [k: string]: any };

    console.log(color);

    const getColor = React.useCallback((): [string, string] => {
        switch (color) {
            case "greyandblack":
                return ["grey", "black"];
            case "lightblueandblue":
                return ["lightblue", "blue"];
            case "lightgreenandGreen":
                return ["lightgreen", "green"];
            default:
                return null;
        }
    }, [color]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Rating
                        id="some-id"
                        className="custom-class"
                        {...{ readOnly, disabled, dimension, max, min, step }}
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

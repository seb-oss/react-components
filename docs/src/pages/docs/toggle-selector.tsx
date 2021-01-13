import React from "react";
import Docs from "@common/Docs";
import { ToggleSelector, ToggleSelectorItem } from "@sebgroup/react-components/ToggleSelector";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";
import LaughingIcon from "../../../static/icons/emoji-laughing-fill.svg";
import DizzyIcon from "../../../static/icons/emoji-dizzy-fill.svg";
import SmileUpsideDownIcon from "../../../static/icons/emoji-smile-upside-down-fill.svg";
import { CodeSnippet } from "@common/CodeSnippet";

const indicatorList: Array<DynamicFormOption<IndicatorType>> = [
    { label: "Danger", value: "danger", key: "danger" },
    { label: "Success", value: "success", key: "success" },
    { label: "Warning", value: "warning", key: "warning" },
];

const importString: string = require("!raw-loader!@sebgroup/react-components/ToggleSelector/ToggleSelector");
const code: string = `<ToggleSelector name="choices" value={value} onChange={setValue}>
    <ToggleSelectorItem>Yes</ToggleSelectorItem>
    <ToggleSelectorItem>No</ToggleSelectorItem>
    <ToggleSelectorItem>Maybe</ToggleSelectorItem>
</ToggleSelector>`;

const ToggleSelectorPage: React.FC = (): React.ReactElement<void> => {
    const [singleValue, setSingleValue] = React.useState<number>();
    const [multipleValues, setMultipleValues] = React.useState<number[]>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "multiple", label: "multiple", controlType: "Checkbox", description: "Select multiple items at the same time" },
                { key: "disabled", label: "disabled", description: "You can disable individual buttons or disable all toggles", controlType: "Checkbox" },
                { key: "indicator", label: "indicator", controlType: "Checkbox", value: false },
                { key: "indicatorType", label: "Indicator type", options: indicatorList, controlType: "Radio", inline: true, rulerKey: "indicator", condition: true },
                { key: "icons", label: "With icons as children", controlType: "Checkbox", description: "Find this example in the notes" },
            ],
        },
    ]);

    const indicator: Indicator = { type: controls.indicatorType?.value, message: "Indicator Message" };

    return (
        <Docs
            mainFile={importString}
            example={
                <ToggleSelector
                    className="m-auto"
                    value={controls.multiple ? multipleValues : (singleValue as any)}
                    onChange={(e: number | number[]) => (controls.multiple ? setMultipleValues(e as number[]) : setSingleValue(e as number))}
                    multiple={controls.multiple}
                    disabled={controls.disabled}
                    indicator={controls.indicator ? indicator : null}
                >
                    <ToggleSelectorItem>
                        {controls.icons && <LaughingIcon width="2em" height="2em" />}
                        <span className="mx-auto">Yes</span>
                    </ToggleSelectorItem>
                    <ToggleSelectorItem>
                        {controls.icons && <DizzyIcon width="2em" height="2em" />}
                        <span className="mx-auto">No</span>
                    </ToggleSelectorItem>
                    <ToggleSelectorItem>
                        {controls.icons && <SmileUpsideDownIcon width="2em" height="2em" />}
                        <span className="mx-auto">Maybe</span>
                    </ToggleSelectorItem>
                </ToggleSelector>
            }
            code={code}
            controls={renderControls()}
            note={
                <>
                    <h4>Toggle select with icons</h4>
                    <p>If you want to render a toggle selector group with icons just pass the icon with the text as children and align them correctly. Find an example below:</p>

                    <CodeSnippet language="jsx">
                        {`<ToggleSelector>
    <ToggleSelectorItem>
        <LaughingIcon />
        <span className="mx-auto">Yes</span>
    </ToggleSelectorItem>
    <ToggleSelectorItem>
        <DizzyIcon />
        <span className="mx-auto">No</span>
    </ToggleSelectorItem>
    <ToggleSelectorItem>
        <SmileUpsideDownIcon />
        <span className="mx-auto">Maybe</span>
    </ToggleSelectorItem>
</ToggleSelector>`}
                    </CodeSnippet>
                </>
            }
        />
    );
};

export default ToggleSelectorPage;

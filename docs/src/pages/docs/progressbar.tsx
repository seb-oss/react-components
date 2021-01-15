import React from "react";
import Docs from "@common/Docs";
import { ProgressBar, ProgressBarProps } from "@sebgroup/react-components/ProgressBar";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Slider } from "@sebgroup/react-components/Slider";

const importString: string = require("!raw-loader!@sebgroup/react-components/ProgressBar/ProgressBar");
const code: string = `<ProgressBar value={progress} />`;

const themes: Array<DynamicFormOption<ProgressBarProps["theme"]>> = [
    { label: "purple", value: "purple", key: "purple" },
    { label: "primary", value: "primary", key: "primary" },
    { label: "danger", value: "danger", key: "danger" },
    { label: "success", value: "success", key: "success" },
    { label: "warning", value: "warning", key: "warning" },
    { label: "inverted", value: "inverted", key: "inverted" },
];

const ProgressBarPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(50);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "theme", label: "theme", controlType: "Dropdown", options: themes, value: themes[0].value }],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <ProgressBar value={value} max={100} theme={controls.theme} />
                </div>
            }
            code={code}
            controls={
                <>
                    {renderControls()}
                    <br />
                    <Slider label="Value" min={0} max={100} value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
                </>
            }
        />
    );
};

export default ProgressBarPage;

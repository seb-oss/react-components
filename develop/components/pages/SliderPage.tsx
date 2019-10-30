import * as React from "react";
import { Slider, RangeSliderLabel, SliderTheme, SliderProps } from "../../../src/Slider/Slider";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import { RadioListModel, RadioGroup } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { TextBox } from "../../../src/TextBox/TextBox";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Slider/readme.md");

const SliderPage: React.FunctionComponent = () => {
    return (
        <div className="route-template p-5 container">
            <div className="info-holder">
                <SliderDocs />
                <SliderExamples />
            </div>

        </div>
    );
};

const SliderDocs: React.FunctionComponent = React.memo(() => {
    return (
        <div className="info">
            <div className="md-file">
                <Highlight innerHTML={true}>{docMD}</Highlight>
            </div>
        </div>
    );
});

const SliderExamples: React.FunctionComponent = () => {
    const [value, setValue] = React.useState<number>(25);
    const [theme, setTheme] = React.useState<SliderTheme>("primary");
    const [tooltipTheme, setTooltipTheme] = React.useState<SliderTheme>("primary");
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<boolean>(false);
    const [hasLabels, setHasLabels] = React.useState<boolean>(false);
    const [showTicks, setShowTicks] = React.useState<boolean>(false);
    const [alwaysShowTooltip, setAlwaysShowTooltip] = React.useState<boolean>(false);
    // With Input
    const [withInput, setWithInput] = React.useState<boolean>(false);
    const [withInputError, setWithInputError] = React.useState<string>("");
    // Min
    const [min, setMin] = React.useState<number>(0);
    const [minInputError, setMinInputError] = React.useState<string>("");
    // Max
    const [max, setMax] = React.useState<number>(100);
    const [maxInputError, setMaxInputError] = React.useState<string>("");
    // Step
    const [step, setStep] = React.useState<number>(1);
    const [stepInputError, setstepInputError] = React.useState<string>("");
    const [sliderLabels, setSliderLabels] = React.useState<Array<RangeSliderLabel>>();

    const themeList: Array<RadioListModel<SliderTheme>> = [
        { label: "Danger", value: "danger" },
        { label: "Inverted", value: "inverted" },
        { label: "Primary", value: "primary" },
        { label: "Purple", value: "purple" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
    ];

    React.useEffect(() => { hasLabels && setSliderLabels(generateLabels()); }, [hasLabels, min, max]);

    function generateLabels(): Array<RangeSliderLabel> {
        const size: number = Math.abs(max > min ? max - min : min - max);
        const middle: number = min + Math.ceil(size / 2);
        const list: Array<RangeSliderLabel> = [
            { text: String(min), position: min },
            { text: String(middle), position: middle },
            { text: String(max), position: max },
        ];
        if ((min !== 0 && min < 0 && max > 0) || (max !== 0 && max > 0 && min < 0)) {
            list[1].position !== 0 && list.push({ text: "0", position: 0 });
        }
        return list;
    }

    function handleSliderInputChange(event: React.ChangeEvent<HTMLInputElement>, setter: (val: number) => void, errorSetter: (err: string) => void): void {
        let processed: string = event.target.value.indexOf("-") !== -1
            ? "-" + event.target.value.replace(/(-)/gi, "")
            : event.target.value;
        processed = processed === "-" ? "-0" : processed;
        const newValue: number = Number(processed);
        if (isNaN(newValue)) {
            errorSetter("Invalid input");
            setter(0);
        } else {
            if (event.target.name === "with-slider") {
                const minValue: number = sliderLabels[0].position;
                const maxValue: number = sliderLabels[sliderLabels.length - 1].position;
                if (newValue < minValue) {
                    errorSetter("Cannot be less the minimum");
                } else if (newValue > maxValue) {
                    errorSetter("Cannot exceeded the maximum");
                } else {
                    errorSetter("");
                }
            } else {
                errorSetter("");
            }
            setter(newValue);
        }
    }

    return (
        <>
            <div className="info">
                <h2>Output</h2>
                <div className="result">
                    {withInput && <div className="row">
                        <div className="col"><label className="mt-2">Select a value</label></div>
                        <div className="col">
                            <TextBoxGroup
                                name="with-slider"
                                type="text"
                                rightText="kr"
                                maxLength={5}
                                value={value}
                                onChange={(e) => handleSliderInputChange(e, setValue, setWithInputError)}
                                error={withInputError}
                                showErrorMessage={false}
                            />
                        </div>
                    </div>}
                    <div className="row">
                        <div className="col">
                            <Slider
                                value={value}
                                min={min}
                                max={max}
                                step={step}
                                labels={sliderLabels}
                                name="slider"
                                showTicks={showTicks}
                                theme={theme}
                                error={withInputError || (hasError ? "Error message" : null)}
                                disabled={disabled}
                                tooltipTheme={tooltipTheme}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
                                alwaysShowTooltip={alwaysShowTooltip}
                            />
                        </div>
                    </div>

                </div>

                <p>Options</p>
                <div className="row">
                    <div className="col">
                        <TextBox
                            name="min"
                            label="Min"
                            value={min}
                            onChange={(e) => handleSliderInputChange(e, setMin, setMinInputError)}
                            error={minInputError}
                        />
                    </div>
                    <div className="col">
                        <TextBox
                            name="max"
                            label="Max"
                            value={max}
                            onChange={(e) => handleSliderInputChange(e, setMax, setMaxInputError)}
                            error={maxInputError}
                        />
                    </div>
                    <div className="col">
                        <TextBox
                            name="step"
                            label="Step"
                            value={step}
                            onChange={(e) => handleSliderInputChange(e, setStep, setstepInputError)}
                            error={stepInputError}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Themes</p>
                        <RadioGroup
                            name="theme"
                            list={themeList}
                            value={theme}
                            onChange={(e) => setTheme(e.currentTarget.value as SliderTheme)}
                            condensed
                        />
                    </div>
                    <div className="col">
                        <p>Tooltip Themes</p>
                        <RadioGroup
                            name="tooltip-themes"
                            list={themeList}
                            value={tooltipTheme}
                            onChange={(e) => setTooltipTheme(e.currentTarget.value as SliderTheme)}
                            condensed
                        />
                    </div>
                    <div className="col">
                        <p>Options</p>
                        <CheckBox label="Disabled" name="disabled" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} condensed />
                        <CheckBox label="Has error" name="error" checked={hasError} onChange={(e) => setHasError(e.target.checked)} condensed />
                        <CheckBox label="Has labels" name="labels" checked={hasLabels} onChange={(e) => setHasLabels(e.target.checked)} condensed />
                        <CheckBox label="Show ticks" name="ticks" checked={showTicks} onChange={(e) => setShowTicks(e.target.checked)} condensed />
                        <CheckBox label="With Input" name="with-input" checked={withInput} onChange={(e) => setWithInput(e.target.checked)} condensed />
                        <CheckBox label="Always Show tooltip" name="show-tooltip" checked={alwaysShowTooltip} onChange={(e) => setAlwaysShowTooltip(e.target.checked)} condensed />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SliderPage;

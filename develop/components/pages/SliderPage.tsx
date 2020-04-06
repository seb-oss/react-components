import * as React from "react";
import { Slider, RangeSliderLabel, SliderTheme, SliderProps } from "../../../src/Slider/Slider";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import { RadioListModel, RadioGroup } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { TextBox } from "../../../src/TextBox/TextBox";
import Highlight from "react-highlight";
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

type SliderPageProps = {};

interface SliderPageState {
    slider: number;
    theme: SliderTheme;
    tooltipTheme: SliderTheme;
    disabled: boolean;
    hasError: boolean;
    hasLabels: boolean;
    showTicks: boolean;
    alwaysShowTooltip: boolean;
    withInput: boolean;
    withInputError: string;
    min: number;
    minInputError: string;
    max: number;
    maxInputError: string;
    step: number;
    stepInputError: string;
    sliderLabels: Array<RangeSliderLabel>;
}

const SliderPageStateNames: { [K in keyof SliderPageState]: keyof SliderPageState } = {
    slider: "slider",
    theme: "theme",
    tooltipTheme: "tooltipTheme",
    disabled: "disabled",
    hasError: "hasError",
    hasLabels: "hasLabels",
    showTicks: "showTicks",
    alwaysShowTooltip: "alwaysShowTooltip",
    withInput: "withInput",
    withInputError: "withInputError",
    min: "min",
    minInputError: "minInputError",
    max: "max",
    maxInputError: "maxInputError",
    step: "step",
    stepInputError: "stepInputError",
    sliderLabels: "sliderLabels",
};

class SliderExamples extends React.Component<SliderPageProps, SliderPageState> {
    themeList: Array<RadioListModel<SliderTheme>> = [
        { label: "Danger", value: "danger" },
        { label: "Inverted", value: "inverted" },
        { label: "Primary", value: "primary" },
        { label: "Purple", value: "purple" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
    ];

    constructor(props: SliderPageProps) {
        super(props);

        this.state = {
            slider: 25,
            theme: "primary",
            tooltipTheme: "inverted",
            disabled: false,
            hasError: false,
            hasLabels: false,
            showTicks: false,
            alwaysShowTooltip: false,
            withInput: false,
            withInputError: "",
            min: 0,
            minInputError: "",
            max: 100,
            maxInputError: "",
            step: 1,
            stepInputError: "",
            sliderLabels: [],
        };

        this.onFormChange = this.onFormChange.bind(this);
    }

    /**
     * Generates labels for the slider
     * @returns {Array<RangeSliderLabel} The generated list of labels
     */
    generateLabels(min: number, max: number): Array<RangeSliderLabel> {
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

    onFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const newState: Partial<SliderPageState> = {};
        let sliderLabels: Array<RangeSliderLabel>;
        const { name, type, value, checked } = e.target;
        const min: number = name === SliderPageStateNames.min ? Number(value) || 0 : this.state.min;
        const max: number = name === SliderPageStateNames.max ? Number(value) || 100 : this.state.max;
        switch (type) {
            case "checkbox":
                newState[name] = checked;
                break;
            case "range":
                newState[name] = Number(value) || 0;
                break;
            case "number":
                newState[name] = Number(value) || value;
                break;
            default:
                newState[name] = value;
        }
        if ([SliderPageStateNames.min, SliderPageStateNames.max, SliderPageStateNames.hasLabels].indexOf(name as any) !== -1) {
            const hasLabels = name === SliderPageStateNames.hasLabels ? value : this.state.hasLabels;
            sliderLabels = hasLabels ? this.generateLabels(min, max) : [];
            sliderLabels && (newState.sliderLabels = sliderLabels);
        }
        if (name === SliderPageStateNames.slider) {
            if (newState[name] < min) {
                newState.withInputError = "Cannot be less the minimum";
            } else if (newState[name] > max) {
                newState.withInputError = "Cannot exceeded the maximum";
            } else {
                newState.withInputError = "";
            }
        }
        this.setState(newState as any);
    }

    render() {
        return (
            <>
                <div className="info">
                    <h2>Output</h2>
                    <div className="result">
                        {this.state.withInput && (
                            <div className="row">
                                <div className="col">
                                    <label className="mt-2">Select a value</label>
                                </div>
                                <div className="col">
                                    <TextBoxGroup
                                        name={SliderPageStateNames.slider}
                                        type="number"
                                        rightText="kr"
                                        maxLength={5}
                                        value={this.state.slider}
                                        onChange={this.onFormChange}
                                        error={this.state.withInputError}
                                        showErrorMessage={false}
                                        pattern="\d+"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col">
                                <Slider
                                    name={SliderPageStateNames.slider}
                                    value={this.state.slider}
                                    min={this.state.min}
                                    max={this.state.max}
                                    step={this.state.step}
                                    labels={this.state.hasLabels ? this.state.sliderLabels : null}
                                    showTicks={this.state.showTicks}
                                    theme={this.state.theme}
                                    error={this.state.withInputError || (this.state.hasError ? "Error message" : null)}
                                    disabled={this.state.disabled}
                                    tooltipTheme={this.state.tooltipTheme}
                                    onChange={this.onFormChange}
                                    alwaysShowTooltip={this.state.alwaysShowTooltip}
                                />
                            </div>
                        </div>
                    </div>

                    <p>Options</p>
                    <div className="row">
                        <div className="col">
                            <TextBox name={SliderPageStateNames.min} label="Min" type="number" value={this.state.min} onChange={this.onFormChange} error={this.state.minInputError} pattern="\d+" />
                        </div>
                        <div className="col">
                            <TextBox name={SliderPageStateNames.max} label="Max" type="number" value={this.state.max} onChange={this.onFormChange} error={this.state.maxInputError} pattern="\d+" />
                        </div>
                        <div className="col">
                            <TextBox name={SliderPageStateNames.step} label="Step" type="number" value={this.state.step} onChange={this.onFormChange} error={this.state.stepInputError} pattern="\d+" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Themes</p>
                            <RadioGroup name={SliderPageStateNames.theme} list={this.themeList} value={this.state.theme} onChange={this.onFormChange} condensed />
                        </div>
                        <div className="col">
                            <p>Tooltip Themes</p>
                            <RadioGroup name={SliderPageStateNames.tooltipTheme} list={this.themeList} value={this.state.tooltipTheme} onChange={this.onFormChange} condensed />
                        </div>
                        <div className="col">
                            <p>Options</p>
                            <CheckBox label="Disabled" name={SliderPageStateNames.disabled} checked={this.state.disabled} onChange={this.onFormChange} condensed />
                            <CheckBox label="Has error" name={SliderPageStateNames.hasError} checked={this.state.hasError} onChange={this.onFormChange} condensed />
                            <CheckBox label="Has labels" name={SliderPageStateNames.hasLabels} checked={this.state.hasLabels} onChange={this.onFormChange} condensed />
                            <CheckBox label="Show ticks" name={SliderPageStateNames.showTicks} checked={this.state.showTicks} onChange={this.onFormChange} condensed disabled={!this.state.hasLabels} />
                            <CheckBox label="With Input" name={SliderPageStateNames.withInput} checked={this.state.withInput} onChange={this.onFormChange} condensed />
                            <CheckBox label="Always Show tooltip" name={SliderPageStateNames.alwaysShowTooltip} checked={this.state.alwaysShowTooltip} onChange={this.onFormChange} condensed />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SliderPage;

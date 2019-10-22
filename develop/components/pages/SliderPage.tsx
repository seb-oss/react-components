import * as React from "react";
import { Slider, RangeSliderLabel } from "../../../src/Slider/Slider";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Slider/readme.md");

const SliderPage: React.FunctionComponent = () => {
    return (
        <div className="route-template container">
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
    const [slider, setSlider] = React.useState<number>(25);
    const [currencySlider, setCurrencySlider] = React.useState<number>(2500);
    const [disabledSlider1, setDisabledSlider1] = React.useState<number>(2500);
    const [sebSlider, setSebSlider] = React.useState<number>(0);
    const [sebSliderError, setSebSliderError] = React.useState<string>("");
    const [diverse, setDiverse] = React.useState<number>(diverseLabels[0].position);

    function handleSebSliderChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let processed: string = event.target.value.indexOf("-") !== -1
            ? "-" + event.target.value.replace(/(-)/gi, "")
            : event.target.value;
        processed = processed === "-" ? "-0" : processed;
        const value: number = Number(processed);
        if (isNaN(value)) {
            setSebSliderError("Cannot be less the minimum");
            setSebSlider(0);
        } else {
            const min: number = currencySliderLabels[0].position;
            const max: number = currencySliderLabels[currencySliderLabels.length - 1].position;
            if (value < min) {
                setSebSliderError("Cannot be less the minimum");
            } else if (value > max) {
                setSebSliderError("Cannot exceeded the maximum");
            } else {
                setSebSliderError("");
            }
            setSebSlider(value);
        }
    }

    return (
        <>
            <div className="info">
                <h2>Output</h2>
                <p>Here are sample outputs</p>
                <div className="result">
                    <Slider
                        value={slider}
                        min={0}
                        max={100}
                        step={1}
                        labels={sliderLabels}
                        name="normalSlider"
                        showTicks={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlider(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="info">
                <p>Slider with negative and positive values</p>
                <div className="result">
                    <Slider
                        name="test-slider"
                        value={diverse}
                        min={diverseLabels[0].position}
                        max={diverseLabels[diverseLabels.length - 1].position}
                        step={5}
                        onChange={(e) => setDiverse(Number(e.target.value))}
                        showTicks={true}
                        labels={diverseLabels}
                    />
                </div>
            </div>

            <div className="info">
                <p>Slider with label and error</p>
                <div className="result">
                    <Slider
                        value={currencySlider}
                        min={currencySliderLabels[0].position}
                        max={currencySliderLabels[currencySliderLabels.length - 1].position}
                        step={500}
                        name="advancedSlider"
                        labels={currencySliderLabels}
                        label="Slider label"
                        error="Some error message"
                        showTicks={true}
                        tooltipValue={currencySlider + " kr"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrencySlider(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="info">
                <p>Disabled</p>
                <div className="result">
                    <Slider
                        value={disabledSlider1}
                        min={currencySliderLabels[0].position}
                        max={currencySliderLabels[currencySliderLabels.length - 1].position}
                        step={500}
                        name="advancedSlider"
                        showTicks={true}
                        labels={currencySliderLabels}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabledSlider1(Number(e.target.value))}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="info">
                <p>Recreating SEB slider</p>
                <div className="result">
                    <div className="row">
                        <div className="col"><label className="mt-2">Select a value</label></div>
                        <div className="col">
                            <TextBoxGroup
                                name="seb-slider"
                                type="text"
                                rightText="kr"
                                maxLength={5}
                                value={sebSlider}
                                onChange={handleSebSliderChange}
                                error={sebSliderError}
                                showErrorMessage={false}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Slider
                                name="seb-slider"
                                value={sebSlider}
                                onChange={handleSebSliderChange}
                                showTicks={true}
                                labels={currencySliderLabels}
                                min={currencySliderLabels[0].position}
                                max={currencySliderLabels[currencySliderLabels.length - 1].position}
                                step={100}
                                error={sebSliderError}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const sliderLabels: Array<RangeSliderLabel> = [
    { position: 0, text: "0%" },
    { position: 25, text: "25%" },
    { position: 50, text: "50%" },
    { position: 75, text: "75%" },
    { position: 100, text: "100%" },
];
const currencySliderLabels: Array<RangeSliderLabel> = [
    { position: 1000, text: "1 000 kr" },
    { position: 1500, text: "1 500 kr" },
    { position: 2000, text: "2 000 kr" },
    { position: 2500, text: "2 500 kr" },
    { position: 3000, text: "3 000 kr" },
];

const diverseLabels: Array<RangeSliderLabel> = [
    { position: -30, text: "-30" },
    { position: -20, text: "-20" },
    { position: -10, text: "-10" },
    { position: 0, text: "0" },
    { position: 10, text: "10" },
    { position: 20, text: "20" },
    { position: 30, text: "30" },
];

export default SliderPage;

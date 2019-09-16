import * as React from "react";
import { Slider } from "../../../src/Slider/Slider";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Slider/readme.md");

const SliderPage: React.FunctionComponent = () => {
    const [slider, setSlider] = React.useState<number>(25);
    const [alternativeSlider, setAlternativeSlider] = React.useState<number>(50);
    const [currencySlider, setCurrencySlider] = React.useState<number>(25000);
    const [disabledSlider1, setDisabledSlider1] = React.useState<number>(25000);
    const [disabledSlider2, setDisabledSlider2] = React.useState<number>(20000);

    return (
        <div className="route-template">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlider(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="info">
                    <p>Alternative version with the step set to 5</p>
                    <div className="result">
                        <Slider
                            value={alternativeSlider}
                            min={0}
                            max={100}
                            step={5}
                            name="alternativeSlider"
                            labels={sliderLabels}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAlternativeSlider(Number(e.target.value))}
                            alternative={true}
                        />
                    </div>
                </div>

                <div className="info">
                    <p>Slider with label and error</p>
                    <div className="result">
                        <Slider
                            value={currencySlider}
                            min={10000}
                            max={30000}
                            step={5000}
                            name="advancedSlider"
                            labels={currencySliderLabels}
                            label="Slider label"
                            error="Some error message"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrencySlider(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="info">
                    <p>Disabled</p>
                    <div className="result">
                        <Slider
                            value={disabledSlider1}
                            min={10000}
                            max={30000}
                            step={5000}
                            name="advancedSlider"
                            labels={currencySliderLabels}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabledSlider1(Number(e.target.value))}
                            disabled={true}
                        />
                    </div>
                    <div className="result">
                        <Slider
                            value={disabledSlider2}
                            min={10000}
                            max={30000}
                            step={5000}
                            name="alternativeSlider"
                            labels={currencySliderLabels}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabledSlider2(Number(e.target.value))}
                            alternative={true}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

const sliderLabels: Array<{ position: number, text: string }> = [
    { position: 0, text: "0%" },
    { position: 25, text: "25%" },
    { position: 50, text: "50%" },
    { position: 75, text: "75%" },
    { position: 100, text: "100%" },
];
const currencySliderLabels: Array<{ position: number, text: string }> = [
    { position: 10000, text: "10 000 kr" },
    { position: 20000, text: "20 000 kr" },
    { position: 30000, text: "30 000 kr" }
];

export default SliderPage;

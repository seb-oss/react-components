import * as React from "react";
import { Slider } from "../../../src/Slider/Slider";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Slider/readme.md");

interface SliderPageState {
    slider: number;
    alternativeSlider: number;
    currencySlider: number;
}

export default class SliderPage extends React.Component<any, SliderPageState>  {
    sliderLabels: Array<{ position: number, text: string }>;
    currencySliderLabels: Array<{ position: number, text: string }>;
    constructor(props: any) {
        super(props);

        this.sliderLabels = [
            { position: 0, text: "0%" },
            { position: 25, text: "25%" },
            { position: 50, text: "50%" },
            { position: 75, text: "75%" },
            { position: 100, text: "100%" },
        ];

        this.currencySliderLabels = [
            { position: 10000, text: "10 000 kr" },
            { position: 20000, text: "20 000 kr" },
            { position: 30000, text: "30 000 kr" }
        ];

        this.state = {
            slider: 25,
            alternativeSlider: 50,
            currencySlider: 25000
        };
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
                                value={this.state.slider}
                                min={0}
                                max={100}
                                step={1}
                                labels={this.sliderLabels}
                                name="normalSlider"
                                onChange={(event) => { this.setState({ slider: event.target.value }); }}
                            />
                        </div>
                    </div>

                    <div className="info">
                        <p>Alternative version with the step set to 5</p>
                        <div className="result">
                            <Slider
                                value={this.state.alternativeSlider}
                                min={0}
                                max={100}
                                step={5}
                                name="alternativeSlider"
                                labels={this.sliderLabels}
                                onChange={(event) => { this.setState({ alternativeSlider: event.target.value }); }}
                                alternative={true}
                            />
                        </div>
                    </div>

                    <div className="info">
                        <p>Slider with label and error</p>
                        <div className="result">
                            <Slider
                                value={this.state.currencySlider}
                                min={10000}
                                max={30000}
                                step={5000}
                                name="advancedSlider"
                                labels={this.currencySliderLabels}
                                label="Slider label"
                                error="Some error message"
                                onChange={(event) => { this.setState({ currencySlider: event.target.value }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

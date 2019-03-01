import * as React from "react";
import { Chart } from "../../../src/Chart/Chart";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Chart/readme.md");

export default class ChartPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

    }

    randomScalingFactor() {
        return Math.round(Math.random() * 100);
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        const data: any = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: "rgba(255,99,132,0.5)"
                }
            ]
        };

        const pieData: any = {
            datasets: [{
                data: [
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                ],
                backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
                label: "Pie Dataset 1"
            }],
            labels: [
                "value 1",
                "value 2",
                "value 3",
                "value 4"
            ]
        };

        const options: any = {
            responsive: true,
            maintainAspectRatio: false
        };

        const optionsAnnotation: any = {
            responsive: true,
            maintainAspectRatio: false,
            annotation: {
                annotations: [{
                    drawTime: "afterDraw", // overrides annotation.drawTime if set
                    id: "a-line-1", // optional
                    type: "line",
                    mode: "vertical",
                    scaleID: "y-axis-0",
                    value: "25",
                    borderColor: "#406980",
                    borderWidth: 2,
                    label: {
                        fontStyle: "normal",
                        fontSize: "14",
                        backgroundColor: "#406980",
                        position: "top",
                        content: "Annotaion",
                        enabled: true
                    }
                }]
            }
        };

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

                        <p>Here are sample outputs pie chart</p>
                        <div className="result wide chart">
                            <Chart
                                chartType="pie"
                                data={pieData}
                                options={options}
                                onClick={(e) => { console.log("On cliking on chart", e); }}
                            />
                        </div>

                        <p>Here are sample outputs line chart</p>
                        <div className="result wide chart">
                            <Chart
                                chartType="line"
                                data={data}
                                options={options}
                                onClick={(e) => { console.log("On cliking on chart", e); }}
                            />
                        </div>

                        <p>Here are sample outputs bar chart</p>
                        <div className="result wide chart">
                            <Chart
                                chartType="bar"
                                data={data}
                                options={options}
                            />
                        </div>

                        <p>Here are sample outputs bar chart</p>
                        <div className="result wide chart">
                            <Chart
                                chartType="line"
                                data={data}
                                options={optionsAnnotation}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

import * as React from "react";
import { shallow } from "enzyme";
import { Chart } from "./Chart";

describe("Component: Chart", () => {
    const randomScalingFactor = () => Math.round(Math.random() * 100);

    const barData: any = {
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
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
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

    it("Should render", () => {
        // Line
        const lineWrapper = shallow(<Chart chartType="line" data={barData} />);
        expect(lineWrapper).toBeDefined();
        // Bar
        const barWrapper = shallow(<Chart chartType="bar" data={barData} />);
        expect(barWrapper).toBeDefined();
        // Horizontal Bar
        const horizontalWrapper = shallow(<Chart chartType="horizontalBar" data={barData} />);
        expect(horizontalWrapper).toBeDefined();
        // Pie
        const pieWrapper = shallow(<Chart chartType="pie" data={pieData} />);
        expect(pieWrapper).toBeDefined();
        // Doughnut
        const doughnutWrapper = shallow(<Chart chartType="doughnut" data={pieData} />);
        expect(doughnutWrapper).toBeDefined();
        // Polar
        const polarWrapper = shallow(<Chart chartType="polar" data={pieData} />);
        expect(polarWrapper).toBeDefined();
        // Radar
        const radarWrapper = shallow(<Chart chartType="radar" data={pieData} />);
        expect(radarWrapper).toBeDefined();
        // Bubble
        const bubbleWrapper = shallow(<Chart chartType="bubble" data={barData} />);
        expect(bubbleWrapper).toBeDefined();
        // Scatter
        const scatterWrapper = shallow(<Chart chartType="scatter" data={barData} />);
        expect(scatterWrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Chart chartType="bar" data={barData} className="myChart" />);
        expect(wrapper.hasClass("myChart")).toBeTruthy();
    });

    it("Should render an error message if an unknown chart type is passed", () => {
        const wrapper = shallow(<Chart chartType="bingo" data={barData} />);
        expect(wrapper.children().first().text()).toEqual("Unknown chart type");
    });

});

import * as React from "react";
import { Line, Bar, HorizontalBar, Pie, Doughnut, Polar, Radar, Bubble, Scatter } from "react-chartjs-2";
import "./chart-style.scss";
// to enable chart.js annotation plugin, we need to import this file
import "chartjs-plugin-annotation";

export interface ChartProps {
    chartType: string;
    data: any;
    options?: any;
    className?: string;
    onClick?: (event: any) => void;
}

export class Chart extends React.Component<ChartProps, any> {
    constructor(props) {
        super(props);
    }

    renderChart(type: string) {
        switch (type) {
            case "line":
                return <Line data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "bar":
                return <Bar data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "horizontalBar":
                return <HorizontalBar data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "pie":
                return <Pie data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "doughnut":
                return <Doughnut data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "polar":
                return <Polar data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "radar":
                return <Radar data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "bubble":
                return <Bubble data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            case "scatter":
                return <Scatter data={this.props.data} options={this.props.options} onElementsClick={this.props.onClick} />;
            default:
                return <div>Unknown chart type</div>;
        }
    }

    render() {
        return (
            <div className={"chart-wrapper " + (this.props.className ? this.props.className : "")}>
                {this.renderChart(this.props.chartType)}
            </div>
        );
    }
}

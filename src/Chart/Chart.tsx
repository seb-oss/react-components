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

export const Chart: React.FunctionComponent<ChartProps> = (props: ChartProps): React.ReactElement<void> => {
    function renderChart(type: string) {
        switch (type) {
            case "line":
                return <Line data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "bar":
                return <Bar data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "horizontalBar":
                return <HorizontalBar data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "pie":
                return <Pie data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "doughnut":
                return <Doughnut data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "polar":
                return <Polar data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "radar":
                return <Radar data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "bubble":
                return <Bubble data={props.data} options={props.options} onElementsClick={props.onClick} />;
            case "scatter":
                return <Scatter data={props.data} options={props.options} onElementsClick={props.onClick} />;
            default:
                return <div>Unknown chart type</div>;
        }
    }

    return (
        <div className={"chart-wrapper " + (props.className ? props.className : "")}>
            {renderChart(props.chartType)}
        </div>
    );
};

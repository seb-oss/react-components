import React from "react";
import { Line, Bar, HorizontalBar, Pie, Doughnut, Polar, Radar, Bubble, Scatter } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "./chart-style.scss";
// to enable chart.js annotation plugin, we need to import this file
import "chartjs-plugin-annotation";

export interface ExtendedChartOptions extends ChartOptions {
    annotation?: ChartAnnotation;
}

export type ChartType = "line" | "bar" | "horizontalBar" | "pie" | "doughnut" | "polar" | "radar" | "bubble" | "scatter";

export interface ChartProps {
    chartType: ChartType;
    className?: string;
    data: ChartData;
    id?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    options?: ExtendedChartOptions;
}

export class Chart extends React.Component<ChartProps, any> {
    constructor(props) {
        super(props);
    }

    renderChart(type: ChartType) {
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
            <div className={"chart-wrapper " + (this.props.className ? this.props.className : "")} id={this.props.id}>
                {this.renderChart(this.props.chartType)}
            </div>
        );
    }
}

export interface ChartAnnotation {
    type?: "line" | "box";

    // Defines when the annotations are drawn.
    // This allows positioning of the annotation relative to the other
    // elements of the graph.
    //
    // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
    // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
    drawTime?: "afterDraw" | "afterDatasetsDraw" | "beforeDatasetsDraw";

    // Mouse events to enable on each annotation.
    // Should be an array of one or more browser-supported mouse events
    // See https://developer.mozilla.org/en-US/docs/Web/Events
    events?: Array<string>;

    // Double-click speed in ms used to distinguish single-clicks from
    // double-clicks whenever you need to capture both. When listening for
    // both click and dblclick, click events will be delayed by this
    // amount.
    dblClickSpeed?: number; // ms (default)

    // Array of annotation configuration objects
    // See below for detailed descriptions of the annotation options
    annotations?: Array<ChartAnnotationItem>;
}

export interface ChartAnnotationItem {
    // optional annotation ID (must be unique)
    id?: string;

    type?: "line" | "box";

    // Defines when the annotations are drawn.
    // This allows positioning of the annotation relative to the other
    // elements of the graph.
    //
    // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
    // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
    drawTime?: "afterDraw" | "afterDatasetsDraw" | "beforeDatasetsDraw";

    // set to "vertical" to draw a vertical line
    mode?: "horizontal" | "vertical";

    // ID of the scale to bind onto
    scaleID?: string;

    // Data value to draw the line at
    value?: number;

    // Optional value at which the line draw should end
    endValue?: number;

    // Line color
    borderColor?: string;

    // Line width
    borderWidth?: number;

    // Line dash
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    borderDash?: [number, number];

    // Line Dash Offset
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
    borderDashOffset?: number;

    label?: ChartAnnotationsLabel;

    // Mouse event handlers - be sure to enable the corresponding events in the
    // annotation events array or the event handler will not be called.
    // See https://developer.mozilla.org/en-US/docs/Web/Events for a list of
    // supported mouse events.
    onMouseenter?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseover?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseleave?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseout?: (e: React.MouseEvent<HTMLElement>) => void;
    onMousemove?: (e: React.MouseEvent<HTMLElement>) => void;
    onMousedown?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseup?: (e: React.MouseEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onDblclick?: (e: React.MouseEvent<HTMLElement>) => void;
    onContextmenu?: (e: React.MouseEvent<HTMLElement>) => void;
    onWheel?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ChartAnnotationsLabel {
    // Background color of label, default below
    backgroundColor?: string;

    // Font family of text, inherits from global
    fontFamily?: string;

    // Font size of text, inherits from global
    fontSize?: number | string;

    // Font style of text, default below
    fontStyle?: string;

    // Font color of text, default below
    fontColor?: string;

    // Padding of label to add left/right, default below
    xPadding?: number;

    // Padding of label to add top/bottom, default below
    yPadding?: number;

    // Radius of label rectangle, default below
    cornerRadius?: number;

    // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
    position?: "top" | "bottom" | "left" | "right" | "center";

    // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
    // For horizontal lines positioned left or right, negative values move
    // the label toward the edge, and positive values toward the center.
    xAdjust?: number;

    // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
    // For vertical lines positioned top or bottom, negative values move
    // the label toward the edge, and positive values toward the center.
    yAdjust?: number;

    // Whether the label is enabled and should be displayed
    enabled?: boolean;

    // Text to display in label - default is null. Provide an array to display values on a new line
    content?: string;
}

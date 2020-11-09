import React from "react";
import Docs from "components/Docs";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Chart, ChartType, ExtendedChartOptions } from "@sebgroup/react-components/Chart";
import { ChartData } from "chart.js";
import { ChartOptions } from "chart.js";

const NotificationPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Chart/Chart");
    const typeList: Array<DynamicFormOption> = [
        { label: "line", value: "line", key: "line" },
        { label: "bar", value: "bar", key: "bar" },
        { label: "horizontalBar", value: "horizontalBar", key: "horizontalBar" },
        { label: "pie", value: "pie", key: "pie" },
        { label: "doughnut", value: "doughnut", key: "doughnut" },
        { label: "polar", value: "polar", key: "polar" },
        { label: "radar", value: "radar", key: "radar" },
        { label: "bubble", value: "bubble", key: "bubble" },
        { label: "scatter", value: "scatter", key: "scatter" },
    ];
    const defaultCheckboxControls: Array<DynamicFormOption> = [{ label: "withAnnotation", value: "withAnnotation", key: "withAnnotation" }];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "type",
                    value: typeList[0],
                    label: "Type",
                    options: typeList,
                    controlType: "Dropdown",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Chart chartType="line" data={data} options={options} />`;

    /** get randomize scaling factor */
    function randomScalingFactor() {
        return Math.round(Math.random() * 100);
    }

    const data: ChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: "rgba(255,99,132,0.5)",
            },
        ],
    };

    const pieData: ChartData = {
        datasets: [
            {
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
                backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
                label: "Pie Dataset 1",
            },
        ],
        labels: ["value 1", "value 2", "value 3", "value 4"],
    };

    const bubbleData: ChartData = {
        datasets: [
            {
                label: "John",
                data: [{ x: 3, y: 7, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "Paul",
                data: [{ x: 6, y: 2, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "George",
                data: [{ x: 2, y: 6, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "Ringo",
                data: [{ x: 5, y: 3, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "John",
                data: [{ x: 2, y: 1, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "George",
                data: [{ x: 1, y: 3, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "Ringo",
                data: [{ x: 1, y: 1, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
            {
                label: "George",
                data: [{ x: 1, y: 2, r: 10 }],
                backgroundColor: "#ff6384",
                hoverBackgroundColor: "#ff6384",
            },
        ],
    };

    const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const optionsAnnotation: ExtendedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
            annotations: [
                {
                    drawTime: "afterDraw", // overrides annotation.drawTime if set
                    type: "line",
                    id: "a-line-1", // optional
                    mode: "vertical",
                    scaleID: "y-axis-0",
                    value: 25,
                    borderColor: "#406980",
                    borderWidth: 2,
                    label: {
                        fontStyle: "normal",
                        fontSize: "14",
                        backgroundColor: "#406980",
                        position: "top",
                        content: "Annotaion",
                        enabled: true,
                    },
                },
            ],
        },
    };

    const [type, setType] = React.useState<ChartType>("bar");
    const [chartData, setChartData] = React.useState<ChartData>(data);

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };
    /** update chart data */
    const updateChartData = React.useCallback((newType: ChartType) => {
        switch (newType) {
            case "pie":
            case "polar":
            case "doughnut":
                setChartData(pieData);
                break;
            case "scatter":
            case "bubble":
                setChartData(bubbleData);
                break;
            default:
                setChartData(data);
        }
    }, []);

    React.useEffect(() => {
        const newType: ChartType = (controls as any)?.type.value;
        setType(newType);
        updateChartData(newType);
    }, [(controls as any)?.type.value]);

    return (
        <Docs
            mainFile={importString}
            example={<Chart chartType={type} data={chartData} options={checkSelectedKey("withAnnotation") ? optionsAnnotation : options} />}
            code={code}
            controls={renderForm()}
        />
    );
};

export default NotificationPage;

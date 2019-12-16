import * as React from "react";
import { Tooltip, TooltipTrigger, TooltipTheme, TooltipPosition, TooltipMessageGroupItem } from "../../../src/Tooltip/Tooltip";
import { RadioListModel, RadioGroup } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { Button } from "../../../src/Button/Button";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Tooltip/readme.md");

const moneySVG: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><title>regular_black</title><path d="M137.5,102.1V40.4a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v61.7a3,3,0,0,0,3,3H134.5A3,3,0,0,0,137.5,102.1ZM112,91.3v7.7H30.5V91.3a3,3,0,0,0-3-3,6.1,6.1,0,0,1-6.1-6.1,3,3,0,0,0-3-3H11V63h7.5a3,3,0,0,0,3-3,6.1,6.1,0,0,1,6.1-6.1,3,3,0,0,0,3-3V43.4H112v7.5a3,3,0,0,0,3,3A6.1,6.1,0,0,1,121,60a3,3,0,0,0,3,3h7.5V79.3H124a3,3,0,0,0-3,3,6.1,6.1,0,0,1-6.1,6.1A3,3,0,0,0,112,91.3ZM131.5,57h-4.9a12.1,12.1,0,0,0-8.7-8.7V43.4h13.6ZM24.5,43.4v4.9A12.1,12.1,0,0,0,15.9,57H11V43.4ZM11,85.3h4.9A12.1,12.1,0,0,0,24.5,94v5.1H11ZM118,99.1V94a12.1,12.1,0,0,0,8.7-8.7h4.9V99.1Z" /><path d="M151.3,115.8V54.2h-6v58.7H21.7v6H148.3A3,3,0,0,0,151.3,115.8Z" /><path d="M159,67.9v58.7H35.5v6H162a3,3,0,0,0,3-3V67.9Z" /><path d="M71.3,88.8A17.5,17.5,0,1,1,88.8,71.3,17.5,17.5,0,0,1,71.3,88.8Zm0-29A11.5,11.5,0,1,0,82.8,71.3,11.5,11.5,0,0,0,71.3,59.8Z" /></svg>;

const TooltipPage: React.FunctionComponent = () => {
    const contentList: Array<RadioListModel<number>> = [
        { label: "content", value: 0 },
        { label: "message", value: 1 },
        { label: "messageGroup", value: 2 }
    ];
    const triggerList: Array<RadioListModel<TooltipTrigger>> = [
        { label: "Click", value: "click" },
        { label: "Hover", value: "hover" },
        { label: "Focus", value: "focus" }
    ];
    const themeList: Array<RadioListModel<TooltipTheme>> = [
        { label: "Primary", value: "primary" },
        { label: "Danger", value: "danger" },
        { label: "Default", value: "default" },
        { label: "Light", value: "light" },
        { label: "Purple", value: "purple" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
    ];
    const positionList: Array<RadioListModel<TooltipPosition>> = [
        { label: "Top", value: "top" },
        { label: "Top Left", value: "top-left" },
        { label: "Top Right", value: "top-right" },
        { label: "Right", value: "right" },
        { label: "Right Top", value: "right-top" },
        { label: "Right Bottom", value: "right-bottom" },
        { label: "Bottom", value: "bottom" },
        { label: "Bottom Left", value: "bottom-left" },
        { label: "Bottom Right", value: "bottom-right" },
        { label: "Left", value: "left" },
        { label: "Left Top", value: "left-top" },
        { label: "Left Bottom", value: "left-bottom" },
    ];
    const defaultMessageGroup: Array<TooltipMessageGroupItem> = [
        {
            title: "Tooltip title",
            message: "tooltip 1"
        },
        {
            message: "tooltip 2"
        }
    ];
    const defaultTooltipContent: string = "Tooltip content could be long, therefore, controlling the position and width is important";
    const nodeTooltipContent: React.ReactNode = (<div><h1>Tooltip Header</h1><div>tooltip content</div></div>);
    const [theme, setTheme] = React.useState<TooltipTheme>("primary");
    const [position, setPosition] = React.useState<TooltipPosition>("top");
    const [trigger, setTrigger] = React.useState<TooltipTrigger>("click");
    const [hasCallback, setHasCallback] = React.useState<boolean>(false);
    const [hasNodeAsContent, setHasNodeAsContent] = React.useState<boolean>(false);
    const [hasCustomReference, setHasCustomReference] = React.useState<boolean>(false);
    const [disableAutoPosition, setDisableAutoPosition] = React.useState<boolean>(false);
    const [customSvg, setCustomSvg] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<number>(2);
    let myTooltip: Tooltip;

    function dismissTooltip(e?: React.MouseEvent<HTMLDivElement>): void {
        console.log("force dismissed");
        myTooltip.forceDismiss(e);
    }

    function forceShowTooltip(e?: React.MouseEvent<HTMLDivElement>): void {
        console.log("force showed");
        myTooltip.forceShow();
    }

    return (
        <div className="route-template container">
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
                        <Tooltip
                            content={content === 0 && (hasNodeAsContent ? nodeTooltipContent : defaultTooltipContent)}
                            message={content === 1 && defaultTooltipContent}
                            messageGroup={content === 2 && defaultMessageGroup}
                            customSvg={customSvg && moneySVG}
                            position={position}
                            theme={theme}
                            trigger={trigger}
                            disableAutoPosition={disableAutoPosition}
                            onVisibleChange={hasCallback && (() => console.log("callback"))}
                            ref={(el: Tooltip) => { myTooltip = el; }}
                        >
                            {hasCustomReference && <div>This is custom tooltip reference</div>}
                        </ Tooltip>
                    </div>
                    <p>Force events</p>
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <Button label="Force dismiss tooltip" size="sm" onClick={() => dismissTooltip()}/>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Button label="Force show tooltip" size="sm" onClick={() => forceShowTooltip()}/>
                        </div>
                    </div>
                    <p>Tooltip Content Options</p>
                    <div className="row">
                        <RadioGroup
                            name="content"
                            list={contentList}
                            value={content}
                            onChange={(e) => setContent(Number(e.currentTarget.value))}
                            condensed
                            inline={true}
                        />
                    </div>
                    <p>Options</p>
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <CheckBox label="Callback on visibility change" name="hasCallback" checked={hasCallback} onChange={(e) => setHasCallback(e.target.checked)} condensed />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CheckBox
                                label="Render node as tooltip content (only works with content attribute)"
                                name="hasNodeAsContent"
                                checked={hasNodeAsContent}
                                onChange={(e) => setHasNodeAsContent(e.target.checked)}
                                condensed
                            />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CheckBox label="Disable auto position" name="disableAutoPosition" checked={disableAutoPosition} onChange={(e) => setDisableAutoPosition(e.target.checked)} condensed />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CheckBox
                                label="Define custom tooltip reference"
                                name="hasCustomReference"
                                checked={hasCustomReference}
                                onChange={(e) => setHasCustomReference(e.target.checked)}
                                condensed
                            />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CheckBox
                                label="Define custom svg"
                                name="customSvg"
                                checked={customSvg}
                                onChange={(e) => setCustomSvg(e.target.checked)}
                                condensed
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Position</p>
                            <RadioGroup
                                name="position"
                                list={positionList}
                                value={position}
                                onChange={(e) => setPosition(e.currentTarget.value as TooltipPosition)}
                                condensed
                            />
                        </div>
                        <div className="col">
                            <p>Themes</p>
                            <RadioGroup
                                name="theme"
                                list={themeList}
                                value={theme}
                                onChange={(e) => setTheme(e.currentTarget.value as TooltipTheme)}
                                condensed
                            />
                        </div>
                        <div className="col">
                            <p>Triggers</p>
                            <RadioGroup
                                name="trigger"
                                list={triggerList}
                                value={trigger}
                                onChange={(e) => setTrigger(e.currentTarget.value as TooltipTrigger)}
                                condensed
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TooltipPage;

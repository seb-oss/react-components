import * as React from "react";
import { Tooltip, TooltipTrigger, TooltipTheme, TooltipPosition, TooltipMessageGroupItem } from "../../../src/Tooltip/Tooltip";
import { RadioListModel, RadioGroup } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { Notification } from "../../../src/Notification/Notification";
import Highlight from "react-highlight";

const docMD: string = require("../../../src/Tooltip/readme.md");

const TooltipPage: React.FunctionComponent = () => {
    const triggerList: Array<RadioListModel<TooltipTrigger>> = [
        { label: "Click", value: "click" },
        { label: "Hover", value: "hover" },
        { label: "Focus", value: "focus" },
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
    const defaultTooltipContent: string = "Tooltip content could be long, therefore, controlling the position and width is important";
    const nodeTooltipContent: React.ReactNode = (
        <div>
            <h1>Tooltip Header</h1>
            <div>tooltip content</div>
        </div>
    );
    const [theme, setTheme] = React.useState<TooltipTheme>(themeList[0].value);
    const [position, setPosition] = React.useState<TooltipPosition>(positionList[0].value);
    const [trigger, setTrigger] = React.useState<TooltipTrigger>(triggerList[0].value);
    const [hasCallback, setHasCallback] = React.useState<boolean>(false);
    const [hasNodeAsContent, setHasNodeAsContent] = React.useState<boolean>(false);
    const [hasCustomReference, setHasCustomReference] = React.useState<boolean>(false);
    const [disableAutoPosition, setDisableAutoPosition] = React.useState<boolean>(false);
    const [notifcationToggle, setNotifcationToggle] = React.useState<boolean>(false);

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
                            content={hasNodeAsContent ? nodeTooltipContent : defaultTooltipContent}
                            position={position}
                            theme={theme}
                            trigger={trigger}
                            disableAutoPosition={disableAutoPosition}
                            onVisibleChange={hasCallback && (() => setNotifcationToggle(true))}
                        >
                            {hasCustomReference && <div>This is custom tooltip reference</div>}
                        </Tooltip>
                    </div>
                    <p>Options</p>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <CheckBox label="Callback on visibility change" name="hasCallback" checked={hasCallback} onChange={(e) => setHasCallback(e.target.checked)} condensed />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <CheckBox
                                label="Render node as tooltip content (only works with content attribute)"
                                name="hasNodeAsContent"
                                checked={hasNodeAsContent}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasNodeAsContent(e.target.checked)}
                                condensed
                            />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <CheckBox label="Disable auto position" name="disableAutoPosition" checked={disableAutoPosition} onChange={(e) => setDisableAutoPosition(e.target.checked)} condensed />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <CheckBox
                                label="Define custom tooltip reference"
                                name="hasCustomReference"
                                checked={hasCustomReference}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasCustomReference(e.target.checked)}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.currentTarget.value as TooltipPosition)}
                                condensed
                            />
                        </div>
                        <div className="col">
                            <p>Themes</p>
                            <RadioGroup name="theme" list={themeList} value={theme} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTheme(e.currentTarget.value as TooltipTheme)} condensed />
                        </div>
                        <div className="col">
                            <p>Triggers</p>
                            <RadioGroup
                                name="trigger"
                                list={triggerList}
                                value={trigger}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrigger(e.currentTarget.value as TooltipTrigger)}
                                condensed
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Notification toggle={notifcationToggle} style="slide-in" dismissTimeout={3000} onDismiss={() => setNotifcationToggle(false)}>
                <div>Tooltip visibility changed!</div>
            </Notification>
        </div>
    );
};

export default TooltipPage;

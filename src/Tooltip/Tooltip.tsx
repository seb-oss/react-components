import * as React from "react";
import "./tooltip-style.scss";
import { randomId } from "../__utils/randomId";
import { debounce } from "lodash";
import { TooltipPositionChecker } from "./placement";
import * as ReactDOM from "react-dom";

const InfoCircleIcon: JSX.Element = <div className="icon"><svg name="info-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" /></svg></div>;

export type TooltipTrigger = "hover" | "click" | "rightClick" | "focus";
export type TooltipTheme = "default" | "light" | "primary" | "warning" | "success" | "danger" | "purple";
export type TooltipPosition = "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "left-top" | "left-bottom" | "right-top" | "right-bottom";

export interface TooltipProps {
    className?: string;
    id?: string;
    content: string | React.ReactNode;
    trigger?: TooltipTrigger;
    theme?: TooltipTheme;
    position?: TooltipPosition;
    disableAutoPosition?: boolean;
    onVisibleChange?: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement>, visible: boolean) => void;
    children?: React.ReactNode;
}

export const Tooltip: React.FunctionComponent<TooltipProps> = (props: TooltipProps): React.ReactElement<void> => {
    const containerRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
    const [id, setId] = React.useState<string>("");
    const [visible, setVisible] = React.useState<boolean>(false);
    const [tooltipContainer, setTooltipContainer] = React.useState<HTMLDivElement>(null);
    const tooltipRootClassName: string = "tooltip-root-container";
    const [tooltipPositionChecker, setTooltipPositionChecker] = React.useState<TooltipPositionChecker>(null);

    React.useEffect(() => {
        const randID: string = constructId();
        constructTooltipContentContainer(randID);
    }, []);

    React.useEffect(() => {
        if (!!tooltipPositionChecker) {
            tooltipPositionChecker.toggleAutoPlacement(props.disableAutoPosition);
        }
        const eventListener: string = props.disableAutoPosition ? "remove" : "add";
        window[`${eventListener}EventListener`]("resize", debounce(getWithinViewportPosition, 500));
        return function cleanup() {
            window.removeEventListener("resize", debounce(getWithinViewportPosition, 500));
        };
    }, [props.disableAutoPosition]);

    React.useEffect(() => {
        if (!!tooltipContainer) {
            tooltipPositionChecker.addTooltipContainer(tooltipContainer);
        }
    }, [tooltipContainer]);

    React.useEffect(() => {
        if (!!tooltipContainer) {
            setTooltipContent(tooltipContainer);
        }
    }, [props.content]);

    React.useEffect(() => {
        if (!!tooltipContainer) {
            const classNames: Array<string> = tooltipContainer.className.split(" ");
            classNames[1] = props.theme;
            tooltipContainer.className = classNames.join(" ");
        }
    }, [props.theme]);

    /**
     * get tooltip position
     */
    const getWithinViewportPosition = (): void => {
        if (tooltipPositionChecker) {
            tooltipPositionChecker.getPosition((props.position || "top"));
        }
    };

    /**
     * construct tooltip content container and append to root tooltip container
     * @param tooltipId unique tooltip id
     */
    const constructTooltipContentContainer = (tooltipId: string): void => {
        const tooltipRootArr: HTMLCollectionOf<Element> = document.body.getElementsByClassName(tooltipRootClassName);
        let tooltipRootRef: Element = tooltipRootArr && tooltipRootArr[0];
        if (tooltipRootArr.length === 0) {
            tooltipRootRef = document.createElement("div");
            tooltipRootRef.className = tooltipRootClassName;
            document.body.appendChild(tooltipRootRef);
        }
        const newTooltip: HTMLDivElement = document.createElement("div");
        newTooltip.className = `tooltip-content ${props.theme || "default"} ${props.position}`;
        newTooltip.id = tooltipId;
        newTooltip.setAttribute("role", "tooltip");
        setTooltipContent(newTooltip);
        setTooltipContainer(newTooltip);
        tooltipRootRef.appendChild(newTooltip);
        setTooltipPositionChecker(new TooltipPositionChecker(containerRef.current, props.disableAutoPosition));
    };

    /**
     * construct unique tooltip id
     */
    const constructId = (): string => {
        const randId: string = randomId("tooltip-");
        setId(randId);
        return randId;
    };

    /**
     * set content of tooltip
     * @param tooltip tooltip element
     */
    const setTooltipContent = (tooltip: HTMLDivElement): void => {
        ReactDOM.render(<TooltipContent content={props.content} />, tooltip);
    };

    /**
     * set tooltip visibility
     * @param isVisible boolean
     */
    const setTooltipVisibility = (isVisible: boolean): void => {
        tooltipContainer.style.display = isVisible ? "block" : "none";
        if (isVisible) {
            getWithinViewportPosition();
        }
    };

    /**
     * toggle tooltip
     * @param toggle boolean
     * @param e event triggering the changes
     */
    const onTooltipToggle = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>, toggle?: boolean) => {
        if (e) {
            e.preventDefault();
        }
        const isVisible: boolean = toggle !== undefined ? toggle : !visible;
        setVisible(isVisible);
        setTooltipVisibility(isVisible);
        if (props.onVisibleChange) {
            props.onVisibleChange(e, isVisible);
        }
    };

    return (
        <div
            className={"tooltip-container" + (props.className ? ` ${props.className}` : "")}
            id={props.id}
            ref={containerRef}
        >
            <div
                className="tooltip-reference"
                aria-describedby={id}
                tabIndex={-1}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => (!!!props.trigger || props.trigger === "click") && onTooltipToggle(e)}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => props.trigger === "rightClick" && onTooltipToggle(e)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => props.trigger === "hover" && onTooltipToggle(e, true)}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => props.trigger === "hover" && onTooltipToggle(e, false)}
                onFocus={(e: React.FocusEvent<HTMLDivElement>) => props.trigger === "focus" && onTooltipToggle(e)}
                onBlur={(e: React.FocusEvent<HTMLDivElement>) => onTooltipToggle(e, false)}
            >
                {props.children || InfoCircleIcon}
            </div>
        </div>
    );
};

type TooltipContent = Pick<TooltipProps, "content">;
const TooltipContent: React.FunctionComponent<TooltipContent> = (props: TooltipContent) => {
    return (
        <>
            <div className="tooltip-arrow" />
            <div className="tooltip-inner">
                {props.content}
            </div>
        </>
    );
};

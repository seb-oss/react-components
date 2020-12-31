import React from "react";
import classnames from "classnames";
import { ClipRect } from "./ImageCropper";

export interface ResizeHandleProps {
    coordinates: ClipRect;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    handleResize: React.MouseEventHandler | React.TouchEventHandler;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ coordinates, position, handleResize, ...props }: ResizeHandleProps) => {
    const style: React.CSSProperties = {
        top: position.includes("bottom") ? coordinates.bottom - 10 : coordinates.top,
        left: position.includes("right") ? coordinates.right - 10 : coordinates.left,
    };

    return (
        <div
            {...props}
            className={classnames("handle", { [position]: position })}
            draggable={false}
            onMouseDown={handleResize as React.MouseEventHandler}
            onTouchStart={handleResize as React.TouchEventHandler}
            style={style}
        />
    );
};

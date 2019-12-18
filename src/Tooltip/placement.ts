import { TooltipPosition } from "./Tooltip";

type PositionPoint = "ref-left" | "right-from-ref-left" | "ref-right" | "left-from-ref-right" | "ref-top" |
                     "bottom-from-ref-top" | "ref-bottom" | "top-from-ref-bottom" | "left-center" | "right-center" |
                     "top-center" | "bottom-center" | "left" | "right" | "bottom" | "top";
type PointPositionLabel = "vertical-center" | "horizontal-center" | "side-top" | "side-bottom" | "side-left" |
                          "side-right" | "bottom" | "left" | "right" | "top";
type TooltipCoord = {
    left: string,
    top: string
};
type TooltipPlacement = {
    relatedPoints: Array<PositionPoint>;
    calculationPoints: {
        x: PointPositionLabel,
        y: PointPositionLabel
    };
};

export type TooltipPlacements = {
    [key in TooltipPosition]: TooltipPlacement;
};

export type PositionPoints = {
    [key in TooltipPosition]: Array<PositionPoint>;
};

export type TooltipPlacementWithCoord = {
    coord: TooltipCoord;
    position: TooltipPosition;
};

export const tooltipPlacements: TooltipPlacements = {
    "top": {
        relatedPoints: ["top", "left-center", "right-center"],
        calculationPoints: {
            x: "horizontal-center",
            y: "top"
        }
    },
    "right": {
        relatedPoints: ["right", "top-center", "bottom-center"],
        calculationPoints: {
            x: "right",
            y: "vertical-center"
        }
    },
    "bottom": {
        relatedPoints: ["bottom", "left-center", "right-center"],
        calculationPoints: {
            x: "horizontal-center",
            y: "bottom"
        }
    },
    "left": {
        relatedPoints: ["left", "top-center", "bottom-center"],
        calculationPoints: {
            x: "left",
            y: "vertical-center"
        }
    },
    "top-left": {
        relatedPoints: ["top", "ref-left", "right-from-ref-left"],
        calculationPoints: {
            x: "side-left",
            y: "top"
        }
    },
    "top-right": {
        relatedPoints: ["top", "ref-right", "left-from-ref-right"],
        calculationPoints: {
            x: "side-right",
            y: "top"
        }
    },
    "bottom-left": {
        relatedPoints: ["bottom", "ref-left", "right-from-ref-left"],
        calculationPoints: {
            x: "side-left",
            y: "bottom"
        }
    },
    "bottom-right": {
        relatedPoints: ["bottom", "ref-right", "left-from-ref-right"],
        calculationPoints: {
            x: "side-right",
            y: "bottom"
        }
    },
    "left-top": {
        relatedPoints: ["left", "ref-top", "bottom-from-ref-top"],
        calculationPoints: {
            x: "left",
            y: "side-top"
        }
    },
    "left-bottom": {
        relatedPoints: ["left", "ref-bottom", "top-from-ref-bottom"],
        calculationPoints: {
            x: "left",
            y: "side-bottom"
        }
    },
    "right-top": {
        relatedPoints: ["right", "ref-top", "bottom-from-ref-top"],
        calculationPoints: {
            x: "right",
            y: "side-top"
        }
    },
    "right-bottom": {
        relatedPoints: ["right", "ref-bottom", "top-from-ref-bottom"],
        calculationPoints: {
            x: "right",
            y: "side-bottom"
        }
    },
};

export class TooltipPositionChecker {
    private reference: HTMLDivElement;
    private tooltip: HTMLDivElement;
    private disableAutoPlacement: boolean;

    constructor(refContainer: HTMLDivElement, disableAutoPlacement: boolean) {
        this.reference = refContainer.querySelector(".tooltip-reference");
        this.disableAutoPlacement = disableAutoPlacement;
    }

    /**
     * add generated tooltip container
     * @param tooltipContainer tooltip container
     */
    addTooltipContainer(tooltipContainer: HTMLDivElement): void {
        if (tooltipContainer) {
            this.tooltip = tooltipContainer;
        }
    }

    /**
     * enable or disable auto placement for tooltip
     * @param toggle boolean
     */
    toggleAutoPlacement(toggle: boolean): void {
        this.disableAutoPlacement = toggle;
    }

    /**
     * get tooltip position
     * @param position selected position
     */
    getPosition(position: TooltipPosition): TooltipPlacementWithCoord {
        if (this.disableAutoPlacement) {
            return this.getPlacement(position);
        } else {
            return this.setPositionWithinViewport(position);
        }
    }

    /**
     * retrieve position within viewport
     * @param position selected position
     */
    private setPositionWithinViewport(position: TooltipPosition): TooltipPlacementWithCoord {
        const selectedPlacement: TooltipPlacement = tooltipPlacements[position];
        if (selectedPlacement && selectedPlacement.relatedPoints.every((point: PositionPoint) => this.isPointOverflow(point))) {
            return this.getPlacement(position);
        } else {
            const possiblePlacements: Array<TooltipPosition> = ["top", "left", "right", "bottom", "bottom-left", "bottom-right", "left-bottom", "left-top", "right-bottom", "right-top", "top-left", "top-right"];
            let placementWithCoord: TooltipPlacementWithCoord = null;
            possiblePlacements.some((pos: TooltipPosition) => {
                if (tooltipPlacements[pos].relatedPoints.every((point: PositionPoint) => this.isPointOverflow(point))) {
                    placementWithCoord = this.getPlacement(pos);
                    return true;
                }
            });
            return placementWithCoord;
        }
    }

    /**
     * retrieve new tooltip style
     * @param position position selected
     * @returns tooltip coordinate
     */
    private getNewStyle(position: TooltipPosition): TooltipCoord {
        const selectedPlacement: TooltipPlacement = tooltipPlacements[position];
        if (selectedPlacement) {
            return this.getTooltipPosition(selectedPlacement.calculationPoints.x, selectedPlacement.calculationPoints.y);
        }
        return null;
    }

    /**
     * retrieve actual tooltip position in top and left
     * @param pointX x coord
     * @param pointY y coord
     * @returns tooltip coordinate
     */
    private getTooltipPosition(pointX: PointPositionLabel, pointY: PointPositionLabel): TooltipCoord {
        return {
            top: this.getPointPosition(pointY),
            left: this.getPointPosition(pointX)
        };
    }

    /**
     * get actual position of coord x or y in px
     * @param point point
     * @returns css position string
     */
    private getPointPosition(point: PointPositionLabel): string {
        const referenceRect: ClientRect = this.reference.getBoundingClientRect();
        const tooltipRect: ClientRect = this.tooltip.getBoundingClientRect();
        let calculatedPosition: number = 0;
        switch (point) {
            case "vertical-center": calculatedPosition = referenceRect.bottom - (tooltipRect.height / 2) - (referenceRect.height / 2); break;
            case "horizontal-center": calculatedPosition = referenceRect.left - (tooltipRect.width / 2) + (referenceRect.width / 2); break;
            case "side-top": calculatedPosition = referenceRect.bottom - referenceRect.height ; break;
            case "side-bottom": calculatedPosition = referenceRect.bottom - tooltipRect.height; break;
            case "side-left": calculatedPosition = referenceRect.left; break;
            case "side-right": calculatedPosition = referenceRect.right - tooltipRect.width; break;
            case "bottom": calculatedPosition = referenceRect.bottom; break;
            case "left": calculatedPosition = referenceRect.left - tooltipRect.width; break;
            case "right": calculatedPosition = referenceRect.right; break;
            default: calculatedPosition = referenceRect.top - tooltipRect.height;
        }
        return `${calculatedPosition}px`;
    }

    /**
     * check if point related to tooltip overflow viewport
     * @param point point related position
     * @returns the status of whether a point is overflowing the viewport
     */
    private isPointOverflow(point: PositionPoint): boolean {
        const referenceRect: ClientRect = this.reference.getBoundingClientRect();
        const tooltipRect: ClientRect = this.tooltip.getBoundingClientRect();
        switch (point) {
            case "ref-left": return referenceRect.left > 0;
            case "right-from-ref-left": return referenceRect.left + tooltipRect.width < window.innerWidth;
            case "ref-right": return referenceRect.right < window.innerWidth;
            case "left-from-ref-right": return referenceRect.right - tooltipRect.width > 0;
            case "ref-top": return referenceRect.top > 0;
            case "bottom-from-ref-top": return referenceRect.top + tooltipRect.height < window.innerHeight;
            case "ref-bottom": return referenceRect.bottom < window.innerHeight;
            case "top-from-ref-bottom": return referenceRect.bottom - tooltipRect.height > 0;
            case "left-center": return referenceRect.left - (tooltipRect.width - referenceRect.width) / 2 > 0;
            case "right-center": return referenceRect.right + (tooltipRect.width - referenceRect.width) / 2 < window.innerWidth;
            case "top-center": return referenceRect.top - (tooltipRect.height - referenceRect.height) / 2 > 0;
            case "bottom-center": return referenceRect.bottom + (tooltipRect.height - referenceRect.height) / 2 < window.innerHeight;
            case "left": return referenceRect.left - tooltipRect.width > 0;
            case "right": return referenceRect.right + tooltipRect.width < window.innerWidth;
            case "bottom": return referenceRect.bottom + tooltipRect.height < window.innerHeight;
            default: return referenceRect.top - tooltipRect.height > 0;
        }
    }

    /**
     * get current placement of tooltip
     * @param pos selected position
     */
    private getPlacement(pos: TooltipPosition): TooltipPlacementWithCoord {
        return {
            coord: this.getNewStyle(pos),
            position: pos
        };
    }
}

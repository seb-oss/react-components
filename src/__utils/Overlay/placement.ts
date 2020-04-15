export type ElementPosition = "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "left-top" | "left-bottom" | "right-top" | "right-bottom";

type PointPositionLabel = "vertical-center" | "horizontal-center" | "side-top" | "side-bottom" | "side-left" | "side-right" | "bottom" | "left" | "right" | "top";

type ElementPositionCoord = {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
};

type ElementStylePosition = {
    left: string,
    top: string
};

type ElementPlacement = {
    x: PointPositionLabel,
    y: PointPositionLabel
};

export type ElementPlacements = {
    [key in ElementPosition]: ElementPlacement;
};

export type ElementPlacementWithCoord = {
    coord: ElementStylePosition;
    position: ElementPosition;
};

export const elementPlacements: ElementPlacements = {
    "top": {
        x: "horizontal-center",
        y: "top"
    },
    "right": {
        x: "right",
        y: "vertical-center"
    },
    "bottom": {
        x: "horizontal-center",
        y: "bottom"
    },
    "left": {
        x: "left",
        y: "vertical-center"
    },
    "top-left": {
        x: "side-left",
        y: "top"
    },
    "top-right": {
        x: "side-right",
        y: "top"
    },
    "bottom-left": {
        x: "side-left",
        y: "bottom"
    },
    "bottom-right": {
        x: "side-right",
        y: "bottom"
    },
    "left-top": {
        x: "left",
        y: "side-top"
    },
    "left-bottom": {
        x: "left",
        y: "side-bottom"
    },
    "right-top": {
        x: "right",
        y: "side-top"
    },
    "right-bottom": {
        x: "right",
        y: "side-bottom"
    },
};

export class OverlayPositionChecker {
    private defaultPositionsList: Array<ElementPosition> = ["top", "left", "right", "bottom", "bottom-left", "bottom-right", "left-bottom", "left-top", "right-bottom", "right-top", "top-left", "top-right"];
    private referenceElement: HTMLDivElement;
    private overlayElement: HTMLDivElement;
    private disableAutoPosition: boolean;
    private currentPosition: ElementPositionCoord;
    private currentPlacementWithCoord: ElementPlacementWithCoord;

    constructor(refContainer: HTMLDivElement, disableAutoPlacement: boolean) {
        this.referenceElement = refContainer;
        this.disableAutoPosition = disableAutoPlacement;
    }

    /**
     * add generated overlay container
     * @param overlayContainer overlay container
     */
    addOverlayContainer(overlayContainer: HTMLDivElement): void {
        if (overlayContainer) {
            this.overlayElement = overlayContainer;
        }
    }

    /**
     * enable or disable auto placement for overlay
     * @param toggle boolean
     */
    disableAutoPlacement(toggle: boolean): void {
        this.disableAutoPosition = toggle;
    }

    /**
     * get overlay position
     * @param position selected position
     * @returns overlay position and coordinates
     */
    getPosition(position: ElementPosition): ElementPlacementWithCoord {
        if (this.disableAutoPosition) {
            this.getOverlayPositionCoord(position);
            this.currentPlacementWithCoord = this.getPlacement(position);
        } else {
            this.currentPlacementWithCoord = this.setPositionWithinViewport(position);
        }
        return this.currentPlacementWithCoord;
    }

    /**
     * retrieve position within viewport
     * @param position selected position
     * @returns overlay position and coordinates
     */
    private setPositionWithinViewport(position: ElementPosition): ElementPlacementWithCoord {
        if (this.isElementOverflow(position)) {
            const possiblePlacements: Array<ElementPosition> = [...this.defaultPositionsList];
            possiblePlacements.splice(possiblePlacements.indexOf(position), 1);
            let placementWithCoord: ElementPlacementWithCoord = null;
            possiblePlacements.some((pos: ElementPosition) => {
                if (!this.isElementOverflow(pos)) {
                    placementWithCoord = this.getPlacement(pos);
                    return true;
                }
            });
            return placementWithCoord;
        } else {
            return this.getPlacement(position);
        }
    }

    /**
     * retrieve new overlay style
     * @returns overlay style
     */
    private getNewStyle(): ElementStylePosition {
        if (this.currentPosition) {
            return {
                left: `${this.currentPosition.left}px`,
                top: `${this.currentPosition.top}px`
            };
        }
        return null;
    }

    /**
     * retrieve actual overlay position in top and left
     * @param pointX x coord
     * @param pointY y coord
     * @returns overlay coordinate
     */
    private getOverlayPositionCoord(position: ElementPosition): void {
        const overlayRect: ClientRect = this.overlayElement.getBoundingClientRect();
        const selectedPlacement: ElementPlacement = elementPlacements[position];
        if (selectedPlacement) {
            const top: number = this.getPointPosition(selectedPlacement.y);
            const left: number = this.getPointPosition(selectedPlacement.x);
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.currentPosition = {
                top: top + scrollTop,
                left: left + scrollLeft,
                bottom: top + overlayRect.height,
                right: left + overlayRect.width
            };
        } else {
            this.currentPosition = null;
        }
    }

    /**
     * get actual position of coord x or y in px
     * @param point point
     * @returns position
     */
    private getPointPosition(point: PointPositionLabel): number {
        const referenceRect: ClientRect = this.referenceElement.getBoundingClientRect();
        const overlayRect: ClientRect = this.overlayElement.getBoundingClientRect();
        let calculatedPosition: number = 0;
        switch (point) {
            case "vertical-center": calculatedPosition = referenceRect.bottom - (overlayRect.height / 2) - (referenceRect.height / 2); break;
            case "horizontal-center": calculatedPosition = referenceRect.left - (overlayRect.width / 2) + (referenceRect.width / 2); break;
            case "side-top": calculatedPosition = referenceRect.bottom - referenceRect.height; break;
            case "side-bottom": calculatedPosition = referenceRect.bottom - overlayRect.height; break;
            case "side-left": calculatedPosition = referenceRect.left; break;
            case "side-right": calculatedPosition = referenceRect.right - overlayRect.width; break;
            case "bottom": calculatedPosition = referenceRect.bottom; break;
            case "left": calculatedPosition = referenceRect.left - overlayRect.width; break;
            case "right": calculatedPosition = referenceRect.right; break;
            default: calculatedPosition = referenceRect.top - overlayRect.height;
        }
        return calculatedPosition;
    }

    /**
     * check if element is overflow on certain position
     * @param position position
     */
    private isElementOverflow(position: ElementPosition): boolean {
        this.getOverlayPositionCoord(position);
        return !this.currentPosition ||
            (this.currentPosition.left < 0 || this.currentPosition.top < 0 || this.currentPosition.right > window.innerWidth || this.currentPosition.bottom > window.innerHeight);
    }

    /**
     * get current placement of overlay
     * @param pos selected position
     * @returns overlay position and coordinates
     */
    private getPlacement(pos: ElementPosition): ElementPlacementWithCoord {
        return {
            coord: this.getNewStyle(),
            position: pos
        };
    }
}

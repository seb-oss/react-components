import { ClipRect } from "./ImageCropper";

/**
 * Read image from input type file
 * @param event The for event triggered by selecting an image
 * @returns A promise that resolves with the image as data URI string
 */
export function readImage(event: React.FormEvent<HTMLInputElement>): Promise<string> {
    return new Promise((resolve, reject) => {
        const input: HTMLInputElement = event.target as any;

        if (input.value) {
            if (input.files && input.files[0]) {
                const reader: FileReader = new FileReader();

                reader.onload = (event: ProgressEvent<FileReader>) => {
                    resolve(event.target.result.toString());
                };

                reader.readAsDataURL(input.files[0]);
            } else {
                reject("No files found");
            }
        } else {
            reject("No value detected");
        }
    });
}

export interface Coordinates {
    x: number;
    y: number;
}
export interface Movement {
    movementX: number;
    movementY: number;
}
let prevMovement: Coordinates = { x: 0, y: 0 };

/**
 * Gets the X and Y distance that the cursor has travelled
 * @param event The mouse movement event
 * Returns an object of x and y movements
 */
export function getMovement(event: MouseEvent | TouchEvent): Movement {
    let screenX: number = prevMovement.x;
    let screenY: number = prevMovement.y;

    if (event.type.includes("touch")) {
        const touchEvent: TouchEvent = event as TouchEvent;
        if (touchEvent.touches && touchEvent.touches[0]) {
            screenX = touchEvent.touches[0].screenX;
            screenY = touchEvent.touches[0].screenY;
        }
    } else {
        const mouseEvent: MouseEvent = event as MouseEvent;
        screenX = mouseEvent.screenX;
        screenY = mouseEvent.screenY;
    }

    var movementX: number = prevMovement.x ? screenX - prevMovement.x : 0;
    var movementY: number = prevMovement.y ? screenY - prevMovement.y : 0;

    prevMovement = {
        x: screenX,
        y: screenY,
    };

    return { movementX, movementY };
}

/**
 * A move event handler
 * @param event The mouse move event
 * @param setPos The position setter function
 * @param imgRef The image element
 */
export function moveHandler(event: MouseEvent | TouchEvent, img: HTMLImageElement, setPos: React.Dispatch<React.SetStateAction<ClipRect>>): void {
    const { movementX, movementY } = getMovement(event);

    if (movementX || movementY) {
        setPos((oldPos: ClipRect) => {
            const top: number = oldPos.top + movementY;
            const bottom: number = oldPos.bottom + movementY;
            const left: number = oldPos.left + movementX;
            const right: number = oldPos.right + movementX;

            const shouldUpdateY: boolean = top > -1 && bottom <= img.clientHeight;
            const shouldUpdateX: boolean = left > -1 && right <= img.clientWidth;

            return {
                top: shouldUpdateY ? top : oldPos.top,
                bottom: shouldUpdateY ? bottom : oldPos.bottom,
                left: shouldUpdateX ? left : oldPos.left,
                right: shouldUpdateX ? right : oldPos.right,
            };
        });
    }
}

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function resizeHandler(event: MouseEvent | TouchEvent, position: Position, img: HTMLImageElement, setPos: React.Dispatch<React.SetStateAction<ClipRect>>) {
    const { movementX, movementY } = getMovement(event);

    let change: ClipRect;
    let shouldUpdate: boolean;

    switch (position) {
        case "top-right":
            setPos((oldPos: ClipRect) => {
                change = {
                    ...oldPos,
                    right: oldPos.right + movementX,
                    top: oldPos.top - movementX,
                };
                shouldUpdate = change.right <= img.clientWidth && change.top >= 0;
                shouldUpdate = shouldUpdate && change.bottom - change.top >= 20 && change.right - change.left >= 20;
                return shouldUpdate ? change : oldPos;
            });
            break;
        case "top-left":
            setPos((oldPos: ClipRect) => {
                change = {
                    ...oldPos,
                    left: oldPos.left + movementX,
                    top: oldPos.top + movementX,
                };
                shouldUpdate = change.left >= 0 && change.top >= 0;
                shouldUpdate = shouldUpdate && change.bottom - change.top >= 20 && change.right - change.left >= 20;
                return shouldUpdate ? change : oldPos;
            });
            break;
        case "bottom-left":
            setPos((oldPos: ClipRect) => {
                change = {
                    ...oldPos,
                    bottom: oldPos.bottom + movementY,
                    left: oldPos.left - movementY,
                };
                shouldUpdate = change.left >= 0 && change.bottom <= img.clientHeight;
                shouldUpdate = shouldUpdate && change.bottom - change.top >= 20 && change.right - change.left >= 20;
                return shouldUpdate ? change : oldPos;
            });
            break;
        case "bottom-right":
            setPos((oldPos: ClipRect) => {
                change = {
                    ...oldPos,
                    bottom: oldPos.bottom + movementY,
                    right: oldPos.right + movementY,
                };
                shouldUpdate = change.right <= img.clientWidth && change.bottom <= img.clientHeight;
                shouldUpdate = shouldUpdate && change.bottom - change.top >= 20 && change.right - change.left >= 20;
                return shouldUpdate ? change : oldPos;
            });
            break;
    }
}

export function addListener(event: React.MouseEvent | React.TouchEvent, callback: (...args: any[]) => void) {
    let type: keyof DocumentEventMap;
    let cancelTypes: Array<keyof DocumentEventMap> = [];

    switch (event.type as keyof DocumentEventMap) {
        case "mousedown":
            type = "mousemove";
            cancelTypes = ["mouseup", "mouseleave"];
            break;
        case "touchstart":
            type = "touchmove";
            cancelTypes = ["touchend"];
    }

    function stop() {
        document.removeEventListener(type, callback);
        cancelTypes.forEach((t: keyof DocumentEventMap) => {
            document["on" + t] = null;

            prevMovement = {
                x: 0,
                y: 0,
            };
        });
        document.onkeyup = null;
    }

    if (type) {
        document.addEventListener(type, callback);

        cancelTypes.forEach((cancelType: keyof DocumentEventMap) => {
            document["on" + cancelType] = stop;
        });

        document.onkeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                stop();
            }
        };
    }
}

/**
 * @param url The source image
 * @param x The x coordinates of the crop box
 * @param y The y coordinates of the crop box
 * @param width The width of the crop box
 * @param height The height of the crop box
 * @param imgContainer The image HTML element containing the original image
 * @return {Promise<HTMLCanvasElement>} A Promise that resolves with the resulting image as a canvas element
 */
export function crop(url: string, x: number, y: number, width: number, height: number, imgContainer: HTMLImageElement): Promise<string> {
    return new Promise((resolve) => {
        const inputImage: HTMLImageElement = new Image();

        inputImage.onload = () => {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const maxDrawnSize: number = Math.min(imgContainer.width, imgContainer.height);
            canvas.width = canvas.height = maxDrawnSize;

            const scaleX: number = inputImage.width / imgContainer.width;
            const scaleY: number = inputImage.height / imgContainer.height;

            const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            ctx.drawImage(inputImage, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, maxDrawnSize, maxDrawnSize);
            resolve(canvas.toDataURL());
        };

        inputImage.src = url;
    });
}

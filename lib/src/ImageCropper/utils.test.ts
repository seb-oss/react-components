import { Dispatch, SetStateAction } from "react";
import { ClipRect } from ".";
import { addListener, crop, getMovement, moveHandler, Movement, Position, readImage, resizeHandler } from "./utils";

const image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

/** Helper function that generates blobs from images */
function makeblob(dataURL: string): Blob {
    const parts: string[] = dataURL.split(";base64,");
    const contentType: string = parts[0].split(":")[1];
    const raw: string = window.atob(parts[1]);
    const uInt8Array: Uint8Array = new Uint8Array(raw.length);

    for (let i = 0; i < raw.length; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

describe("Component: ImageCropper - utils", () => {
    describe("readImage", () => {
        it("Should reject when there is no value or files", () => {
            expect(readImage({ target: {} } as any)).rejects.toEqual("No value detected");
            expect(readImage({ target: { value: "image/url" } } as any)).rejects.toEqual("No files found");
        });

        it("Should read the file and resolves", (done: jest.DoneCallback) => {
            readImage({ target: { value: "image/url", files: [makeblob(image)] } } as any).then((image: string) => {
                expect(image).toEqual(image);
                done();
            });
        });
    });

    describe("getMovement", () => {
        it("Should get the movement for mouse events", () => {
            let event: MouseEvent = new MouseEvent("mousedown", { screenX: 10, screenY: 10 });

            // Calculates difference from previous 0,0 point
            expect(getMovement(event)).toMatchObject({
                movementX: 0,
                movementY: 0,
            } as Movement);

            event = new MouseEvent("mousedown", { screenX: 20, screenY: 20 });

            // Calcualtes difference from previous 10,10 point
            expect(getMovement(event)).toMatchObject({
                movementX: 10,
                movementY: 10,
            } as Movement);
        });

        it("Should get the movement for mouse events", () => {
            let event: TouchEvent = new TouchEvent("touchstart", { touches: [{ screenX: 30, screenY: 30 } as any] });

            // Calculates difference from previous 20,20 point
            expect(getMovement(event)).toMatchObject({
                movementX: 10,
                movementY: 10,
            } as Movement);

            event = new TouchEvent("touchstart", { touches: [{ screenX: 40, screenY: 40 } as any] });

            // Calcualtes difference from previous 10,10 point
            expect(getMovement(event)).toMatchObject({
                movementX: 10,
                movementY: 10,
            } as Movement);

            // No touches - highly unlikely
            event = new TouchEvent("touchstart", { touches: [] });

            expect(getMovement(event)).toMatchObject({
                movementX: 0,
                movementY: 0,
            } as Movement);
        });
    });

    describe("moveHandler", () => {
        let state: ClipRect = { top: 10, bottom: 10, left: 10, right: 10 };
        let result: ClipRect;

        const setter: Dispatch<SetStateAction<ClipRect>> = (value: any | ((prevState: any) => any)) => {
            result = value(state);
        };

        beforeEach(() => {
            result = undefined;
        });

        it("Should not return anything if no movement detected", () => {
            // Reset to 0
            getMovement(new MouseEvent("mousedown"));
            expect(moveHandler(new MouseEvent("mousedown"), null, null)).toBeUndefined();
        });

        it("Should handle movement with mouse event", () => {
            const imgContainer: HTMLImageElement = document.createElement("img");
            jest.spyOn(imgContainer, "clientWidth", "get").mockReturnValue(1000);
            jest.spyOn(imgContainer, "clientHeight", "get").mockReturnValue(1000);

            // Reset to 10, 10
            getMovement(new MouseEvent("mousedown", { screenX: 10, screenY: 10 }));

            moveHandler(new MouseEvent("mousedown", { screenX: 20, screenY: 20 }), imgContainer, setter);

            // Moved from 10 to 20 is 10
            expect(result).toMatchObject({
                top: state.top + 10,
                right: state.right + 10,
                left: state.left + 10,
                bottom: state.bottom + 10,
            } as ClipRect);
        });

        it("Should not move into a direction when it exceeds the width or height of the image", () => {
            const imgContainer: HTMLImageElement = document.createElement("img");
            jest.spyOn(imgContainer, "clientWidth", "get").mockReturnValue(5);
            jest.spyOn(imgContainer, "clientHeight", "get").mockReturnValue(5);

            // Reset to 10, 10
            getMovement(new MouseEvent("mousedown", { screenX: 10, screenY: 10 }));

            moveHandler(new MouseEvent("mousedown", { screenX: 20, screenY: 20 }), imgContainer, setter);

            // Moved from 10 to 20 is 10
            expect(result).toMatchObject(state);
        });
    });
    describe("resizeHandler", () => {
        const cropboxSize: number = 200;
        const margin: number = 20;
        let state: ClipRect = { top: margin, bottom: cropboxSize + margin, left: margin, right: cropboxSize + margin };
        let result: ClipRect;

        const setter: Dispatch<SetStateAction<ClipRect>> = (value: any | ((prevState: any) => any)) => {
            result = value(state);
        };

        beforeEach(() => {
            result = undefined;
        });

        describe("Expansion/reduction should happen as long as it is within image size or not less than 20px", () => {
            type MouseMove = { screenX: number; screenY: number };
            interface TestCase {
                position: Position;
                movement: MouseMove;
                expected: ClipRect;
                imageSize?: number;
                description: string;
            }

            const cursorAlign: { [key in Position]: MouseMove } = {
                "top-right": { screenX: cropboxSize + margin, screenY: margin },
                "top-left": { screenX: margin, screenY: margin },
                "bottom-right": { screenX: cropboxSize + margin, screenY: cropboxSize + margin },
                "bottom-left": { screenX: margin, screenY: cropboxSize + margin },
            };

            const movement: number = 10;
            const excessiveMovement: number = 1000;

            const testCases: TestCase[] = [
                // Expansion
                {
                    position: "top-right",
                    description: "Expansion",
                    movement: { screenX: state.right + movement, screenY: state.top - movement },
                    expected: { ...state, top: state.top - movement, right: state.right + movement },
                },
                {
                    position: "top-left",
                    description: "Expansion",
                    movement: { screenX: state.left - movement, screenY: state.top - movement },
                    expected: { ...state, top: state.top - movement, left: state.left - movement },
                },
                {
                    position: "bottom-right",
                    description: "Expansion",
                    movement: { screenX: state.right + movement, screenY: state.bottom + movement },
                    expected: { ...state, bottom: state.bottom + movement, right: state.right + movement },
                },
                {
                    position: "bottom-left",
                    description: "Expansion",
                    movement: { screenX: state.left - movement, screenY: state.bottom + movement },
                    expected: { ...state, bottom: state.bottom + movement, left: state.left - movement },
                },
                // Expantion Blocked - bigger than the picture
                {
                    position: "top-right",
                    description: "Expansion",
                    movement: { screenX: state.right + excessiveMovement, screenY: state.top - excessiveMovement },
                    expected: state,
                },
                {
                    position: "top-left",
                    description: "Expansion",
                    movement: { screenX: state.left - excessiveMovement, screenY: state.top - excessiveMovement },
                    expected: state,
                },
                {
                    position: "bottom-right",
                    description: "Expansion",
                    movement: { screenX: state.right + excessiveMovement, screenY: state.bottom + excessiveMovement },
                    expected: state,
                },
                {
                    position: "bottom-left",
                    description: "Expansion",
                    movement: { screenX: state.left - excessiveMovement, screenY: state.bottom + excessiveMovement },
                    expected: state,
                },
                // Reduction
                {
                    position: "top-right",
                    description: "Reduction",
                    movement: { screenX: state.right - movement, screenY: state.top + movement },
                    expected: { ...state, top: state.top + movement, right: state.right - movement },
                },
                {
                    position: "top-left",
                    description: "Reduction",
                    movement: { screenX: state.left + movement, screenY: state.top + movement },
                    expected: { ...state, top: state.top + movement, left: state.left + movement },
                },
                {
                    position: "bottom-right",
                    description: "Reduction",
                    movement: { screenX: state.right - movement, screenY: state.bottom - movement },
                    expected: { ...state, bottom: state.bottom - movement, right: state.right - movement },
                },
                {
                    position: "bottom-left",
                    description: "Reduction",
                    movement: { screenX: state.left + movement, screenY: state.bottom - movement },
                    expected: { ...state, bottom: state.bottom - movement, left: state.left + movement },
                },
                // Reduction Blocked - less than 20px
                {
                    position: "top-right",
                    description: "Reduction blocked - less than 20px",
                    movement: { screenX: state.right - excessiveMovement, screenY: state.top + excessiveMovement },
                    expected: state,
                },
                {
                    position: "top-left",
                    description: "Reduction blocked - less than 20px",
                    movement: { screenX: state.left + excessiveMovement, screenY: state.top + excessiveMovement },
                    expected: state,
                },
                {
                    position: "bottom-right",
                    description: "Reduction blocked - less than 20px",
                    movement: { screenX: state.right - excessiveMovement, screenY: state.bottom - excessiveMovement },
                    expected: state,
                },
                {
                    position: "bottom-left",
                    description: "Reduction blocked - less than 20px",
                    movement: { screenX: state.left + excessiveMovement, screenY: state.bottom - excessiveMovement },
                    expected: state,
                },
            ];

            testCases.forEach((testCase: TestCase) => {
                test(`${testCase.position} - ${testCase.description}`, () => {
                    const imgContainer: HTMLImageElement = document.createElement("img");
                    jest.spyOn(imgContainer, "clientWidth", "get").mockReturnValue(testCase.imageSize || 1000);
                    jest.spyOn(imgContainer, "clientHeight", "get").mockReturnValue(testCase.imageSize || 1000);

                    // Reset to 100, 100
                    getMovement(new MouseEvent("mousedown", cursorAlign[testCase.position]));

                    resizeHandler(new MouseEvent("mousedown", testCase.movement), testCase.position, imgContainer, setter);

                    // Expansion from top-right causing top to reduce and right to increase
                    expect(result).toMatchObject(testCase.expected);
                });
            });
        });
    });
    describe("addListener", () => {
        const addSpy = jest.spyOn(document, "addEventListener");
        const removeSpy = jest.spyOn(document, "removeEventListener");

        afterEach(() => {
            addSpy.mockReset();
            removeSpy.mockReset();
        });

        it("Should add event listner for mousedown", () => {
            const callback: jest.Mock = jest.fn();
            addListener(new MouseEvent("mousedown") as any, callback);

            expect(addSpy).toHaveBeenCalledWith("mousemove", callback);
            expect(document.onmouseup).not.toBeNull();
            expect(document.onmouseleave).not.toBeNull();
            expect(document.onkeyup).not.toBeNull();

            document.onmouseup(new MouseEvent("mouseup"));

            expect(removeSpy).toHaveBeenCalledWith("mousemove", callback);
            expect(document.onmouseup).toBeNull();
            expect(document.onmouseleave).toBeNull();
            expect(document.onkeyup).toBeNull();
        });

        it("Should add event listner for touchstart", () => {
            const callback: jest.Mock = jest.fn();
            addListener(new TouchEvent("touchstart") as any, callback);

            expect(addSpy).toHaveBeenCalledWith("touchmove", callback);
            expect(document.ontouchend).not.toBeNull();
            expect(document.onkeyup).not.toBeNull();

            document.ontouchend(new TouchEvent("touchEnd"));

            expect(removeSpy).toHaveBeenCalledWith("touchmove", callback);
            expect(document.ontouchend).toBeNull();
            expect(document.onkeyup).toBeNull();
        });

        it("Should not set any listener when the type is not mousedown or touchstart", () => {
            const callback: jest.Mock = jest.fn();
            addListener(new TouchEvent("mouseup") as any, callback);

            expect(addSpy).not.toHaveBeenCalledWith("touchmove", callback);
            expect(document.ontouchend).toBeNull();
            expect(document.onkeyup).toBeNull();
        });

        it("Should cancel the listeners when escape is pressed", () => {
            const callback: jest.Mock = jest.fn();
            addListener(new MouseEvent("mousedown") as any, callback);

            expect(addSpy).toHaveBeenCalledWith("mousemove", callback);
            expect(document.onmouseup).not.toBeNull();
            expect(document.onmouseleave).not.toBeNull();
            expect(document.onkeyup).not.toBeNull();

            document.onkeyup(new KeyboardEvent("keyup", { key: "Space" }));
            expect(removeSpy).not.toHaveBeenCalledWith("mousemove", callback);
            expect(document.onmouseup).not.toBeNull();
            expect(document.onmouseleave).not.toBeNull();
            expect(document.onkeyup).not.toBeNull();

            document.onkeyup(new KeyboardEvent("keyup", { key: "Escape" }));

            expect(removeSpy).toHaveBeenCalledWith("mousemove", callback);
            expect(document.onmouseup).toBeNull();
            expect(document.onmouseleave).toBeNull();
            expect(document.onkeyup).toBeNull();
        });
    });
    describe("crop", () => {
        it("Should be able to crop an image", async () => {
            const img: HTMLImageElement = document.createElement("img");
            img.width = 200;
            img.height = 200;

            const result = await crop(image, 10, 10, 100, 100, img);
            expect(result).toBeDefined();
        });
    });
});

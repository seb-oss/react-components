import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ImageCropper, ImageCropperProps } from ".";
import { act, Simulate } from "react-dom/test-utils";

const image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

jest.mock("./utils");

import { moveHandler, readImage, resizeHandler, Position, addListener, crop } from "./utils";

(readImage as jest.Mock).mockReturnValue(Promise.resolve(image));
(addListener as jest.Mock).mockImplementation((ev, cb) => cb());
(resizeHandler as jest.Mock).mockImplementation();
(crop as jest.Mock).mockReturnValue(Promise.resolve(image));

describe("Component: ImageCropper", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;

        jest.clearAllMocks();
    });

    it("Should render correctly", () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        expect(container).toBeDefined();
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("image-cropper")).toBeTruthy();

        const input: HTMLInputElement = container.querySelector("input");
        expect(input).not.toBeNull();
        expect(input.type).toEqual("file");
        expect(input.accept).toEqual("image/*");
        expect(input.hidden).toBeTruthy();

        expect(container.querySelector(".image-preview")).not.toBeNull();
    });

    it("Should allow passing custom clasName", () => {
        const className: string = "myClassName";

        act(() => {
            render(<ImageCropper className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should trigger input click and clears the value when the picker button is clicked", () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        const input: HTMLInputElement = container.querySelector("input");

        let clickSpy = jest.spyOn(input, "click");
        let setValueSpy = jest.spyOn(input, "value", "set");
        let setFilesSpy = jest.spyOn(input, "files", "set");

        act(() => Simulate.click(container.querySelector("button.select")));

        expect(clickSpy).toBeCalled();
        expect(setValueSpy).toBeCalledWith(null);
        expect(setFilesSpy).toBeCalledWith(null);
    });

    it("Should toggle the modal when the user selects an image in the file input", async () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        await act(async () => await Simulate.input(container.querySelector("input")));

        expect(readImage).toBeCalled();
        expect(container.querySelector(".modal.show")).not.toBeNull();

        act(() => Simulate.click(container.querySelector(".btn-outline-primary")));

        expect(container.querySelector(".modal.show")).toBeNull();
    });

    it("Should handle cropbox movement", async () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        await act(async () => await Simulate.mouseDown(container.querySelector(".crop-box")));

        expect(addListener).toBeCalled();
        expect(moveHandler).toBeCalled();
    });

    it("Should handle cropbox resize", async () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        await act(async () => await Simulate.touchStart(container.querySelector(".handle")));

        expect(addListener).toBeCalled();
        expect(resizeHandler).toBeCalled();
    });

    it("Should handle cropping an image", async () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(<ImageCropper onChange={onChange} />, container);
        });

        await act(async () => await Simulate.click(container.querySelector(".modal .modal-footer .btn-primary")));

        expect(crop).toBeCalled();
        expect(onChange).toBeCalled();
    });

    it("Should handle resetting when the reset button is clicked", () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(<ImageCropper value={image} onChange={onChange} />, container);
        });

        const input: HTMLInputElement = container.querySelector("input[type=file]");

        let setValueSpy = jest.spyOn(input, "value", "set");
        let setFilesSpy = jest.spyOn(input, "files", "set");

        act(() => Simulate.click(container.querySelector("button.reset")));

        container.querySelectorAll<HTMLImageElement>("img").forEach((img) => expect(img.src).toBeFalsy());

        expect(setValueSpy).toBeCalledWith(null);
        expect(setFilesSpy).toBeCalledWith(null);
        expect(onChange).toBeCalledWith(null);
    });

    it("Should render all buttons with type set to 'button'", () => {
        // This is to avoid submitting a form if this component is part of a form
        act(() => {
            render(<ImageCropper />, container);
        });

        container.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => expect(btn.type).toEqual("button"));
    });
});

import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ImageCropper } from ".";
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

        await act(async () => await Simulate.input(document.querySelector("input")));

        expect(readImage).toBeCalled();
        expect(document.querySelector(".modal.show")).not.toBeNull();

        act(() => Simulate.click(document.querySelector(".btn-outline-primary")));

        expect(document.querySelector(".modal.show")).toBeNull();
    });

    it("Should handle cropbox movement", async () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        await act(async () => await Simulate.mouseDown(document.querySelector(".crop-box")));

        expect(addListener).toBeCalled();
        expect(moveHandler).toBeCalled();
    });

    it("Should handle cropbox resize", async () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        await act(async () => await Simulate.touchStart(document.querySelector(".handle")));

        expect(addListener).toBeCalled();
        expect(resizeHandler).toBeCalled();
    });

    it("Should handle cropping an image", async () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(<ImageCropper onChange={onChange} />, container);
        });

        await act(async () => await Simulate.click(document.querySelector(".modal .modal-footer .btn-primary")));

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

    it("Should allow passing custom texts", () => {
        const crop: string = "custom crop text";
        const select: string = "custom select text";
        const cancel: string = "custom cancel text";

        act(() => {
            render(<ImageCropper text={{ select, crop, cancel }} />, container);
        });

        expect(document.querySelector(".modal-footer button.cancel").textContent).toEqual(cancel);
        expect(document.querySelector(".modal-footer button.btn-primary").textContent).toEqual(crop);
        expect(container.querySelector("button.select").textContent).toEqual(select);
    });

    it("Should allow changing the size of the image picker", () => {
        act(() => {
            render(<ImageCropper />, container);
        });

        expect(document.querySelector<HTMLDivElement>(".image-preview").style.width).toEqual("200px");
        expect(document.querySelector<HTMLDivElement>(".image-preview").style.height).toEqual("200px");

        act(() => {
            render(<ImageCropper size={500} />, container);
        });

        expect(document.querySelector<HTMLDivElement>(".image-preview").style.width).toEqual("500px");
        expect(document.querySelector<HTMLDivElement>(".image-preview").style.height).toEqual("500px");
    });
});

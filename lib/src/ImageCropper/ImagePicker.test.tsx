import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ImagePicker, ImagePickerProps } from "./ImagePicker";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: ImageCropper - ImagePicker", () => {
    let container: HTMLDivElement = null;
    const props: ImagePickerProps = {
        image: "",
        size: 200,
        onReset: jest.fn(),
        onSelect: jest.fn(),
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<ImagePicker {...props} />, container);
        });

        expect(container).toBeDefined();
        expect(container.firstElementChild.classList.contains("image-preview")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("preview")).toBeTruthy();

        const preview: HTMLDivElement = container.querySelector<HTMLDivElement>(".preview");
        // Clear button should not render yet
        expect(preview.children).toHaveLength(2);
        expect(preview.firstElementChild.tagName.toLowerCase()).toEqual("svg");
        expect(preview.lastElementChild.tagName.toLowerCase()).toEqual("button");
        expect(preview.lastElementChild.classList.contains("select")).toBeTruthy();

        expect(container.firstElementChild.getAttribute("style")).toContain("width: 200px; height: 200px");
    });

    it("Should render clear button when there is an image", () => {
        act(() => {
            render(<ImagePicker {...props} image="myimageurl" />, container);
        });

        const preview: HTMLDivElement = container.querySelector<HTMLDivElement>(".preview");
        expect(preview.children).toHaveLength(3);
        expect(preview.lastElementChild.classList.contains("reset")).toBeTruthy();

        container.querySelectorAll("button").forEach((button) => expect(button.type).toEqual("button"));
    });

    it("Should fire select and reset events when clicked", () => {
        act(() => {
            render(<ImagePicker {...props} image="myimageurl" />, container);
        });

        act(() => Simulate.click(container.querySelector("button.select")));
        act(() => Simulate.click(container.querySelector("button.reset")));

        expect(props.onSelect).toBeCalled();
        expect(props.onReset).toBeCalled();
    });
});

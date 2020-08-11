import React from "react";
import { Image, ImageProps } from "./Image";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";

describe("Component: Image", () => {
    let container: HTMLDivElement = null;
    const props: ImageProps = {
        src: "my-image-src",
        width: "200px",
        height: "200px",
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

    it("Should pass custom class and id", () => {
        const className: string = "myImageClass";
        const id: string = "myImageId";

        act(() => {
            render(<Image {...props} className={className} id={id} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.id).toEqual(id);

        act(() => {
            render(<Image {...props} className={className} id={id} useImgTag />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.id).toEqual(id);
    });

    it("Should pass alt, aria-label, and aria-describedby", () => {
        const updatedProps: ImageProps = { ...props, alt: "myImageAlt", ariaLabel: "myLabel", ariaDescribedBy: "myDescription" };

        act(() => {
            render(<Image {...updatedProps} />, container);
        });
        expect(container.firstElementChild.hasAttribute("title")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("title")).toEqual(updatedProps.alt);
        expect(container.firstElementChild.hasAttribute("aria-label")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual(updatedProps.ariaLabel);
        expect(container.firstElementChild.hasAttribute("aria-describedby")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-describedby")).toEqual(updatedProps.ariaDescribedBy);

        act(() => {
            render(<Image {...updatedProps} useImgTag />, container);
        });
        expect(container.firstElementChild.hasAttribute("alt")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("alt")).toEqual(updatedProps.alt);
        expect(container.firstElementChild.hasAttribute("aria-label")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual(updatedProps.ariaLabel);
        expect(container.firstElementChild.hasAttribute("aria-describedby")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("aria-describedby")).toEqual(updatedProps.ariaDescribedBy);
    });

    it("Should fire click event when clicked", () => {
        const action1 = jest.fn();
        const action2 = jest.fn();

        act(() => {
            render(<Image {...props} onClick={action1} />, container);
        });
        container.firstChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(action1).toBeCalled();

        act(() => {
            render(<Image {...props} onClick={action2} useImgTag />, container);
        });
        container.firstChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(action2).toBeCalled();
    });
});

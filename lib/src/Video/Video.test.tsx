import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Video } from ".";
import { VideoProps } from "./types-definition";

describe("Component: Video ", () => {
    let container: HTMLDivElement = null;
    const props: VideoProps = {
        src: "sourcepath",
        width: "500",
        height: "250",
        name: "myVideo",
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
            render(<Video {...props} />, container);
        });
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("video-holder-component")).toBeTruthy();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTVideoClass";
        const id: string = "myTVideoId";
        act(() => {
            render(<Video {...props} className={className} id={id} />, container);
        });
        expect(container.firstElementChild.id).toEqual(id);
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should enable autoplay, loop, showControls when passed", () => {
        act(() => {
            render(<Video {...props} autoplay loop showControls />, container);
        });
        expect(container.querySelector("iframe").getAttribute("src").indexOf("autoplay=1")).toBeGreaterThan(-1);
        expect(container.querySelector("iframe").getAttribute("src").indexOf("loop=1")).toBeGreaterThan(-1);
        expect(container.querySelector("iframe").getAttribute("src").indexOf("controls=1")).toBeGreaterThan(-1);
    });
});

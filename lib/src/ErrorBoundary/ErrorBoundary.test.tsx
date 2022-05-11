import React, { useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { ErrorBoundary } from ".";

describe("Component: ErrorBoundary", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correction", () => {
        act(() => {
            render(
                <ErrorBoundary errorView={<div className="error-view">error view</div>}>
                    <div className="component">some component</div>
                </ErrorBoundary>,
                container
            );
        });

        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
        expect(container.firstElementChild.textContent).toEqual("some component");
        expect(container.querySelector(".error-view")).toBeNull();
    });

    it("Should render error view when error occurs", () => {
        const ComponentWithError: React.FC<{}> = () => {
            throw new Error();
            return <div>I will never render :(</div>;
        };

        act(() => {
            render(
                <ErrorBoundary errorView={<div className="error-view">error view</div>}>
                    <div className="component">{<ComponentWithError />}</div>
                </ErrorBoundary>,
                container
            );
        });

        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
        expect(container.firstElementChild.textContent).toEqual("error view");
        expect(container.querySelector(".component")).toBeNull();
    });
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorBoundary } from ".";

describe("Component: ErrorBoundary", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");

    it("Should render correction", () => {
        render(
            <ErrorBoundary errorView={<div data-testid="errorView">error view</div>}>
                <div>some component</div>
            </ErrorBoundary>
        );
        expect(screen.getByText("some component")).toBeInTheDocument();
        expect(screen.queryByTestId("errorView")).toBeNull();
    });

    it("Should render error view when error occurs", () => {
        consoleErrorSpy.mockImplementation(jest.fn());
        const ComponentWithError: React.FC<{}> = () => {
            throw new Error();
            return <div>I will never render :(</div>;
        };
        render(
            <ErrorBoundary errorView={<div>error view</div>}>
                <div data-testid="component">{<ComponentWithError />}</div>
            </ErrorBoundary>
        );
        expect(screen.getByText("error view")).toBeInTheDocument();
        expect(screen.queryByTestId("component")).toBeNull();
        consoleErrorSpy.mockClear();
    });
});

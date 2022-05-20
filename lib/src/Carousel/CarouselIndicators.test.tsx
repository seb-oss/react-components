import { randomId } from "@sebgroup/frontend-tools/randomId";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CarouselIndicators } from "./CarouselIndicators";

describe("Component: Carousel", () => {
    it("Should render", () => {
        render(<CarouselIndicators />);
        expect(screen.getByRole("list")).toHaveClass("carousel-indicators");
    });

    it("Should render elements correctly with parent id on each element", async () => {
        const active: number = 1;
        const size: number = 3;
        const parentId: string = randomId("test-");
        const onIndicatorClicked: jest.Mock = jest.fn();
        render(<CarouselIndicators active={active} size={size} parentId={parentId} onIndicatorClicked={onIndicatorClicked} />);
        const children: Array<HTMLLIElement> = screen.getAllByRole("listitem");
        expect(children).toHaveLength(size);
        children.forEach((child: HTMLLIElement, index: number) => {
            index === active && expect(child).toHaveClass("active");
            expect(child).toHaveAttribute("data-target", `#${parentId}`);
            expect(child).toHaveAttribute("data-slide-to", index.toString());
        });
        expect(onIndicatorClicked).not.toHaveBeenCalled();
        await userEvent.click(children[active]);
        expect(onIndicatorClicked).not.toHaveBeenCalled();
        await userEvent.click(children[0]);
        expect(onIndicatorClicked).toBeCalledTimes(1);
    });
});

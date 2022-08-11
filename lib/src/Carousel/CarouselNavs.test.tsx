import { randomId } from "@sebgroup/frontend-tools/randomId";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CarouselNavs, CarouselNavsProps } from "./CarouselNavs";

describe("Component: Carousel", () => {
    const props: CarouselNavsProps = {
        onNavigate: jest.fn(),
        parentId: randomId("nav-"),
    };

    it("Should render", async () => {
        render(<CarouselNavs {...props} />);
        const [prevButton, nextButton]: Array<HTMLButtonElement> = screen.getAllByRole("button");
        expect(prevButton).toHaveClass("carousel-control-prev");
        expect(nextButton).toHaveClass("carousel-control-next");
        expect(prevButton).toHaveAttribute("href", `#${props.parentId}`);
        expect(nextButton).toHaveAttribute("href", `#${props.parentId}`);
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        await userEvent.click(prevButton);
        expect(props.onNavigate).toBeCalledTimes(1);
        await userEvent.click(prevButton);
        expect(props.onNavigate).toBeCalledTimes(2);
        await userEvent.click(nextButton);
        expect(props.onNavigate).toBeCalledTimes(3);
        await userEvent.click(nextButton);
        expect(props.onNavigate).toBeCalledTimes(4);
    });

    it("Should render custom sr-only text", () => {
        const previousText: string = "prevTest";
        const nextText: string = "nextTest";
        render(<CarouselNavs {...props} previousText={previousText} nextText={nextText} />);
        expect(screen.getByText(previousText)).toBeInTheDocument();
        expect(screen.getByText(nextText)).toBeInTheDocument();
    });
});

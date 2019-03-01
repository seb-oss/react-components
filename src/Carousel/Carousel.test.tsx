import * as React from "react";
import { shallow, mount } from "enzyme";
import { Carousel, CarouselItem } from "./Carousel";

describe("Component: Carousel", () => {
    const carouselList: Array<CarouselItem> = [
        { title: "title", desc: "desc", image: "imagepath" },
        { title: "title", desc: "desc", image: "imagepath" },
        { title: "title", desc: "desc", image: "imagepath" }
    ];

    it("Should render", () => {
        const wrapper = shallow(<Carousel list={carouselList} />);
        expect(wrapper).toBeDefined();
    });

    it("Should render and pass custom class", () => {
        const wrapper = shallow(<Carousel list={carouselList} className="myCarousel" />);
        expect(wrapper.find(".myCarousel")).toBeDefined();
    });

    it("Should trigger change event when swiper arrow is clicked", (done) => {
        const onChange = jest.fn();
        const wrapper = mount(<Carousel list={carouselList} carouselChanged={onChange} />);
        wrapper.find(".slick-next").simulate("click");
        setTimeout(() => {
            expect(onChange).toHaveBeenCalled();
            wrapper.unmount();
            done();
        }, 500);
    });

    it("Should autoplay images when autoplay is enabled", (done) => {
        const onChange = jest.fn();
        const wrapper = mount(<Carousel list={carouselList} carouselChanged={onChange} autoPlay={true} autoPlaySpeed={100} />);
        wrapper.find(".slick-next").simulate("click");
        setTimeout(() => {
            expect(onChange).toHaveBeenCalled();
            wrapper.unmount();
            done();
        }, 500);
    });
});

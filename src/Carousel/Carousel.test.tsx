import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Carousel, CarouselItem, CarouselProps } from "./Carousel";

describe("Component: Carousel", () => {
    const carouselList: Array<CarouselItem> = [
        { title: "title", desc: "desc", image: "imagepath" },
        { title: "title", desc: "desc", image: "imagepath" },
        { title: "title", desc: "desc", image: "imagepath" },
    ];
    let wrapper: ShallowWrapper<CarouselProps>;

    beforeEach(() => {
        wrapper = shallow(<Carousel list={carouselList} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should render and pass custom class and id", () => {
        const className: string = "myCarouselClass";
        const id: string = "myCarouselId";
        wrapper.setProps({ className, id });
        expect(wrapper.find(`.${className}`).length).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should trigger change event when swiper arrow is clicked", async (done: jest.DoneCallback) => {
        expect.assertions(1);
        const onChange: jest.Mock = jest.fn();
        const mountedWrapper: ReactWrapper<CarouselProps> = mount(<Carousel list={carouselList} afterChange={onChange} />);
        mountedWrapper.find("button.slick-next").simulate("click");

        await setTimeout(() => {
            expect(onChange).toBeCalled();
            mountedWrapper.unmount();
            done();
        }, 1000);
    });

    it("Should override the default values of autoplay and autoplayspeed", async (done) => {
        expect.assertions(3);
        const onChange: jest.Mock = jest.fn();
        const mountedWrapper: ReactWrapper<CarouselProps> = mount(<Carousel list={carouselList} afterChange={onChange} autoPlay={true} autoPlaySpeed={500} infinite={true} />);
        expect(mountedWrapper.prop("autoPlay")).toEqual(true);
        expect(mountedWrapper.prop("autoPlaySpeed")).toEqual(500);
        await setTimeout(() => {
            expect(onChange).toBeCalled();
            mountedWrapper.unmount();
            done();
        }, 2000);
    });
});

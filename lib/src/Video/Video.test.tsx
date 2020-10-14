import React from "react";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { Video } from ".";
import { VideoProps } from "./types-definition";

describe("Component: Video ", () => {
    const props: VideoProps = {
        src: "sourcepath",
        width: "500",
        height: "250",
        name: "myVideo",
    };
    let wrapper: ShallowWrapper<VideoProps>;
    let mountedWrapper: ReactWrapper<VideoProps>;

    beforeEach(() => {
        wrapper = shallow(<Video {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTVideoClass";
        const id: string = "myTVideoId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should enable autoplay, loop, showControls when passed", () => {
        mountedWrapper = mount(<Video {...props} autoplay loop showControls />);
        expect(mountedWrapper.find("iframe").prop("src").indexOf("autoplay=1")).toBeGreaterThan(-1);
        expect(mountedWrapper.find("iframe").prop("src").indexOf("loop=1")).toBeGreaterThan(-1);
        expect(mountedWrapper.find("iframe").prop("src").indexOf("controls=1")).toBeGreaterThan(-1);
    });
});

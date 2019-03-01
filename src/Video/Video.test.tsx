import * as React from "react";
import { shallow } from "enzyme";
import { Video } from "./Video";

describe("Component: Video ", () => {

    const props = {
        src: "sourcepath",
        width: "500",
        height: "250",
        name: "myVideo",
        sourceType: "local"
    };

    it("Should render", () => {
        const wrapper = shallow(<Video {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Video {...props} className="myVideo" />);
        expect(wrapper.hasClass("myVideo")).toBeTruthy();
    });

    it("Should render embed video when sourceType is set to `stream`", () => {
        const wrapper = shallow(<Video {...{ ...props, sourceType: "stream" }} />);
        expect(wrapper.find("iframe").length).toBe(1);
    });

    it("Should enable autoplay, loop, showControls and showInfo when passed", () => {
        const wrapperLocal = shallow(
            <Video
                {...props}
                autoplay={true}
                loop={true}
                showControls={true}
                showInfo={true}
            />
        );
        expect(wrapperLocal.find("video").prop("autoPlay")).toEqual(true);
        expect(wrapperLocal.find("video").prop("loop")).toEqual(true);
        expect(wrapperLocal.find("video").prop("controls")).toEqual(true);
        const wrapperStream = shallow(
            <Video
                {...{ ...props, sourceType: "stream" }}
                autoplay={true}
                loop={true}
                showControls={true}
                showInfo={true}
            />
        );
        expect(wrapperStream.find("iframe").prop("src").indexOf("autoplay=1")).toBeGreaterThan(-1);
        expect(wrapperStream.find("iframe").prop("src").indexOf("loop=1")).toBeGreaterThan(-1);
        expect(wrapperStream.find("iframe").prop("src").indexOf("controls=1")).toBeGreaterThan(-1);
        expect(wrapperStream.find("iframe").prop("src").indexOf("&amp;showinfo=1&amp;title=1&amp;byline=1&amp;portrait=1")).toBeGreaterThan(-1);
    });

    // Prevent being blocked by some browsers
    it("Should render local video as muted when autoplay is enabled", () => {
        const wrapper = shallow(<Video {...props} autoplay={true} />);
        expect(wrapper.find("video").prop("muted")).toEqual(true);
    });
});

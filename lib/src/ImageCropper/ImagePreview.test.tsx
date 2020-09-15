import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { ImagePreview, ImagePreviewProps, ImagePreviewState } from "./ImagePreview";

describe("Component: ImagePreview", () => {
    let wrapper: ShallowWrapper<ImagePreviewProps>;
    const props: ImagePreviewProps = { handleUploadImage: jest.fn() };

    beforeEach(() => {
        wrapper = shallow(<ImagePreview {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const className: string = "my-preview";
        wrapper.setProps({ previewClassName: className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should render default svg image when previewSrc is empty", () => {
        wrapper.setProps({ previewSrc: "" });
        expect(wrapper.find(".profile-image").find("svg")).toBeTruthy();
        expect(wrapper.find(".profile-image").find("img").exists()).toBeFalsy();
        wrapper.setProps({ previewSrc: "xxxxx" });
        wrapper.instance().componentDidMount();
        expect(wrapper.find(".profile-image").find("svg").exists()).toBeFalsy();
        expect(wrapper.find(".profile-image").find("img").exists()).toBeTruthy();
    });

    it("Button select image should trigger file upload on click", () => {
        wrapper.find("#fileInput").simulate("change", { target: { value: "file" } });
        expect(props.handleUploadImage).toBeCalled();
        wrapper.setProps({ previewSrc: "The source" });
        wrapper.find(".custom-button").simulate("click", { target: { value: "file" } });
        expect(props.handleUploadImage).toHaveBeenCalledTimes(2);
        wrapper.find("#fileInput").simulate("click", { target: { value: "file" } });
        wrapper.find("#fileInput").simulate("click", { target: null });
    });

    it("Should call onFileInputClick when open file button is clicked", () => {
        const fileInputClickMock = jest.spyOn(ImagePreview.prototype, "onFileInputClick");
        const mountedWrapper: ReactWrapper<ImagePreviewProps, any, ImagePreview> = mount(<ImagePreview {...props} />);
        mountedWrapper.find("button").simulate("click");
        expect(fileInputClickMock).toHaveBeenCalled();
    });

    it("Should call handleUploadImage when clicking on open file button given that cropResult is provided", () => {
        const mountedWrapper: ReactWrapper<ImagePreviewProps, ImagePreviewState, ImagePreview> = mount(<ImagePreview {...props} />);
        const cropResult: string = "Result is stored here";
        mountedWrapper.setProps({ cropResult });
        mountedWrapper.find("button").simulate("click");
        expect(props.handleUploadImage).toHaveBeenCalled();
    });

    it("The value of `cropDataResult` state should change when the prop value of `cropResult` is changed", () => {
        const cropResult: string = "result";
        const mountedWrapper: ReactWrapper<ImagePreviewProps, ImagePreviewState, ImagePreview> = mount(<ImagePreview {...props} />);
        expect(mountedWrapper.state("cropDataResult")).toEqual("");
        mountedWrapper.setProps({ cropResult });
        expect(mountedWrapper.state("cropDataResult")).toEqual(cropResult);
    });

    it("CroppedData should be cleared or initialised on first mount", (doneFn) => {
        const previewSrc: string = "imageSource";
        const mountedWrapper: ReactWrapper<ImagePreviewProps, ImagePreviewState, ImagePreview> = mount(<ImagePreview {...props} previewSrc={previewSrc} />);
        expect(mountedWrapper.find(".profile-image").find("img").prop("src")).toEqual(previewSrc);
        mountedWrapper.unmount();
        mountedWrapper.setProps({ previewSrc: undefined });
        mountedWrapper.mount();
        expect(mountedWrapper.find(".profile-image").find("img").exists()).toBeFalsy();
        expect(mountedWrapper.find(".profile-image").find("svg").exists()).toBeTruthy();
        doneFn();
    });
});

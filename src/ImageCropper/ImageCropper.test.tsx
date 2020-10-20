import * as React from "react";
import { mount, ReactWrapper, render, shallow, ShallowWrapper } from "enzyme";
import { CanvasData, CropBoxData, ImageCropper, ImageCropperProps } from "./ImageCropper";

jest.mock("./ImagePreview", () => ({ ImagePreview: () => <div></div> }));

describe("Component: ImageCropper", () => {
    let mountedWrapper: ReactWrapper<ImageCropperProps>;
    let props = {
        toggle: false,
        cropperConfigs: {
            aspectRatio: 1.67,
            preview: ".image-preview",
            guides: false,
            responsive: true,
            ready: () => {
                console.log("On ready");
            },
        },
        className: "",
        alwaysAlignedCropper: false,
        onCrop: jest.fn(),
        onCustomButtonClick: jest.fn(),
        cropButtonText: "",
        customButtonText: "",
        cancelText: "",
        selectButtonText: "",
        previewClassName: "",
        imageCropperClassName: "",
        // cropper options
        previewSrc: "",
        alt: null,
        crossOrigin: null,
        enable: false,
        rotateTo: 0,
        scaleX: 0,
        scaleY: 0,
        zoomTo: 0,
        moveTo: [1, 0],
        reset: false,
        cropBoxData: null,
        canvasData: null,
        showCustomButton: false,
    };

    beforeEach(() => {
        mountedWrapper = mount(<ImageCropper {...props} />);
    });

    afterEach(() => {
        mountedWrapper.unmount();
    });

    it("Should render", () => {
        expect(mountedWrapper.find(".custom-cropper-dialogue")).toBeTruthy();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myImageCropperClass";
        const id: string = "myImageCropperId";
        mountedWrapper.setProps({ imageCropperClassName: className, id: id });
        expect(mountedWrapper.find(`.${className}`)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`)).toBeTruthy();
    });

    it("Should hide cropper when toggle is true", () => {
        expect(mountedWrapper.find(".open-cropper-dialogue").exists()).toBeFalsy();
        mountedWrapper.setProps({ toggle: true });
        jest.useFakeTimers("modern");

        expect(mountedWrapper.find("div.open-cropper-dialogue")).toBeTruthy();
    });

    it("should allow setting custom properties in cropperjs without throwing an error", async () => {
        const newProps = { ...props, cropperConfigs: { ...props.cropperConfigs, aspectRatio: 3 / 2 } };
        expect(() => mount(<ImageCropper {...newProps} />)).not.toThrow();

        expect(() => mount(<ImageCropper {...props} enable={true} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} reset={!props.reset} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} enable={false} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} scaleY={12} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} scaleX={12} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} rotateTo={100} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} moveTo={[10, 20]} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} moveTo={[30]} />)).not.toThrow();

        const cropBoxData: CropBoxData = {
            left: 2,
            top: 6,
            width: 70,
            height: 80,
        };

        const canvasData: CanvasData = {
            left: 2,
            top: 6,
            width: 70,
            height: 80,
            naturalHeight: 90,
            naturalWidth: 80,
        };

        expect(() => mount(<ImageCropper {...props} cropBoxData={cropBoxData} />)).not.toThrow();
        expect(() => shallow(<ImageCropper {...newProps} canvasData={canvasData} />)).not.toThrow();

        const dataProps = {
            ...props,
            cropperConfigs: {
                ...props.cropperConfigs,
                data: {
                    x: 24,
                    y: 24,
                    width: 24,
                    height: 24,
                    rotate: 24,
                    scaleX: 24,
                    scaleY: 24,
                },
            },
        };

        expect(() => mount(<ImageCropper {...dataProps} />)).not.toThrow();
        expect(() => mount(<ImageCropper {...props} previewSrc="data:image/jpeg;base64,PHN2ZyKPC9zdmc+" />)).not.toThrow();
    });

    it("custom or delete button should only be available when the callback and the showCustomButtons are provided ", () => {
        mountedWrapper.setProps({ toggle: true, previewSrc: "data:image/jpeg;base64,PHN2ZyKPC9zdmc+" });
        expect(mountedWrapper.find(".btn-delete > button").exists()).toBeFalsy();
        mountedWrapper.setProps({ showCustomButton: true, onCustomButtonClick: jest.fn() });
        expect(mountedWrapper.find(".btn-delete > button").exists()).toBeTruthy();
    });

    it("should call onCustomButtonClick when customBtn is clicked ", () => {
        const action = jest.fn();

        mountedWrapper.setProps({ toggle: true, showCustomButton: true, onCustomButtonClick: action, previewSrc: "data:image/jpeg;base64,PHN2ZyKPC9zdmc+" });

        mountedWrapper.find(".btn-delete > button").simulate("click");

        expect(action).toHaveBeenCalled();
    });

    it("onCropClick function should be called on crop button click ", () => {
        expect(mountedWrapper.find(".loader-holder").exists()).toBeTruthy();

        mountedWrapper.setProps({ toggle: true, previewSrc: "data:image/jpeg;base64,PHN2ZyKPC9zdmc+" });

        const cropBtnEl = mountedWrapper.find("#cropBtn");

        cropBtnEl.simulate("click");

        jest.useFakeTimers("modern");
        setTimeout(() => {
            expect(mountedWrapper.find(".loader-holder").exists()).toBeFalsy();
        });
    });
});

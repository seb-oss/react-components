import React from "react";
import { mount } from "enzyme";
import { ImageCropper } from ".";

describe("Component: ImageCropper", () => {
    const props = {
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
        onCrop: (imageData: string) => {
            console.log("the image data is ", imageData);
        },
        onCustomButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            console.log(" coustom bottom has been click");
        },
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

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    it("Should render", () => {
        const wrapper = mount(<ImageCropper {...props} />);
        expect(wrapper).toBeDefined();
        wrapper.unmount();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myImageCropperClass";
        const id: string = "myImageCropperId";
        const wrapper = mount(<ImageCropper {...props} previewClassName={className} id={id} />);
        expect(wrapper.find(`.${className}`).length).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
        wrapper.unmount();
    });

    it("Should hide cropper when toggle is true", () => {
        let wrapper = mount(<ImageCropper {...props} />);
        expect(wrapper.find(".open-cropper-dialogue").length).toBe(0);
        expect(wrapper.find(".open-cropper-dialogue").exists()).toBeFalsy();

        props.toggle = true;

        wrapper = mount(<ImageCropper {...props} />);

        expect(wrapper.find(".open-cropper-dialogue").exists()).toBeTruthy();
        wrapper.unmount();
    });

    it("Should perform changes and call relevance functions when method change", () => {
        props.toggle = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);
        const instance: any = wrapper.instance();
        const mockDismissCropper = jest.spyOn(instance, "dismissCropper");
        // dismisFunction should be called when toggle is false
        wrapper.setProps({ toggle: true });
        expect(mockDismissCropper).not.toHaveBeenCalled();
        wrapper.setProps({ toggle: false });
        expect(mockDismissCropper).toHaveBeenCalled();

        // onReset function should be called when the reset props is change
        const mockOnReset = jest.spyOn(instance, "onReset");
        wrapper.setProps({ reset: false });
        expect(mockOnReset).not.toHaveBeenCalled();
        wrapper.setProps({ reset: true });
        expect(mockOnReset).toHaveBeenCalled();

        // onEnable and disable functions should be called when the enable props is change
        const mockOnEnable = jest.spyOn(instance, "onEnable");
        const mockOnDisAble = jest.spyOn(instance, "disable");
        wrapper.setProps({ enable: false });
        expect(mockOnEnable).not.toHaveBeenCalled();
        expect(mockOnDisAble).not.toHaveBeenCalled();

        wrapper.setProps({ enable: true });
        expect(mockOnEnable).toHaveBeenCalled();

        wrapper.setProps({ enable: false });
        expect(mockOnDisAble).toHaveBeenCalled();

        // setYScale function should be called when the scaleY props is change
        const mockSetScaleY = jest.spyOn(instance, "setYScale");
        wrapper.setProps({ scaleY: 3 });
        expect(mockSetScaleY).toHaveBeenCalled();

        // setXScale function should be called when the scaleX props is change
        const mockSetScaleX = jest.spyOn(instance, "setXScale");
        wrapper.setProps({ scaleX: 3 });
        expect(mockSetScaleX).toHaveBeenCalled();

        // onRotateTo function should be called when the roateTo props is change
        const mockOnRotateTo = jest.spyOn(instance, "onRotateTo");
        wrapper.setProps({ rotateTo: 3 });
        expect(mockOnRotateTo).toHaveBeenCalled();

        // onMoveTo function should be called when the onMoveTo props is change
        const mockOnMoveTo = jest.spyOn(instance, "onMoveTo");
        wrapper.setProps({ moveTo: [0, 3] });
        expect(mockOnMoveTo).toHaveBeenCalled();

        // setCropBoxData function should be called when the cropBoxData props is change
        const mockSetCropBoxData = jest.spyOn(instance, "setCropBoxData");
        wrapper.setProps({ cropBoxData: { top: 0, left: 0, height: 1, width: 3 } });
        expect(mockSetCropBoxData).toHaveBeenCalled();
        wrapper.unmount();
    });
    /*
    it("loader should be loading when src in not provided", () => {
        props.toggle = true;
        const wrapper = mount(<ImageCropper {...props} />);

        expect(wrapper.find(".loader-holder").exists()).toBeTruthy();

        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";

        timeout(500).then(() => {
            expect(wrapper.find(".loader-holder").exists()).toBeFalsy();
            wrapper.unmount();
        });
    });*/
    /*
    it("onCropClick function should be called on crop button click ", () => {
        props.toggle = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);
        const instance: any = wrapper.instance();

        const mockCropClick = spyOn(instance, "onCropClick").and.callThrough();

        const cropBtnEl = wrapper.find("#cropBtn");

        cropBtnEl.simulate("click");
        setTimeout(() => {
            expect(mockCropClick).toHaveBeenCalled();
            wrapper.unmount();
        }, 1000);
    });*/
    /*
    it("dismissCropper function should be called on dismiss button click ", () => {
        props.toggle = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);
        const instance: any = wrapper.instance();

        const mockDismissClick = spyOn(instance, "dismissCropper").and.callThrough();

        const dismissBtnEl = wrapper.find("#cancelBtn");

        dismissBtnEl.simulate("click");
        setTimeout(() => {
            expect(mockDismissClick).toHaveBeenCalled();
            wrapper.unmount();
        }, 1000);
    });
*/
    it("custom or delete button should only be available when the callback and the showCustomButtons are provided ", () => {
        props.toggle = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);

        expect(wrapper.find(".btn-delete > button").exists()).toBeFalsy();

        wrapper.setProps({ showCustomButton: true, onCustomButtonClick: jest.fn() });

        expect(wrapper.find(".btn-delete > button").exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("should call onCustomButtonClick when customBtn is clicked ", () => {
        props.toggle = true;
        const action = jest.fn();
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        props.onCustomButtonClick = action;
        props.showCustomButton = true;
        const wrapper = mount(<ImageCropper {...props} />);

        wrapper.find(".btn-delete > button").simulate("click");

        expect(action).toHaveBeenCalled();

        wrapper.unmount();
    });

    /* it("stopProp function should be called on modal div click to stopPropagation", () => {
        props.toggle = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);
        const instance: any = wrapper.instance();

        expect(wrapper.props().toggle).toBeTruthy();

        const mockCropDivClick = spyOn(instance, "stopProp").and.callThrough();

        const cropperModalDiv = wrapper.find(".cropper-dialogue");

        cropperModalDiv.simulate("click");
        setTimeout(() => {
            expect(mockCropDivClick).toHaveBeenCalled();
            expect(wrapper.props().toggle).toBeFalsy();
            wrapper.unmount();
        }, 1000);
    });*/
    /*
    it("alignCropper method should be called on crop move when alwaysAlignedCropper is set to true ", () => {
        props.toggle = true;
        props.alwaysAlignedCropper = true;
        props.previewSrc = "data:image/jpeg;base64,PHN2ZyKPC9zdmc+";
        const wrapper = mount(<ImageCropper {...props} />);

        const cropMoveSpy = spyOn(wrapper.instance() as any, "alignCropBox").and.callThrough();
        wrapper.setProps({ moveTo: 50 });

        setTimeout(() => {
            expect(cropMoveSpy).toHaveBeenCalled();
            wrapper.unmount();
        }, 1000);
    });*/

    // it(" should throw error when one of the unchangeable properties changed", () => {
    //     // setAspectRatio and other unchangeable properties should be throw exception because aspectRatio is part of unchangeable props after rendering
    //     try {
    //         const wrapper = mount(<ImageCropper {...props} />);
    //         const instance: any = wrapper.instance();
    //         const setAspectRatioMock = jest.spyOn(instance, "setAspectRatio");
    //         wrapper.setProps({ cropperConfigs: { aspectRatio: 1.90 } });
    //         expect(setAspectRatioMock).toThrowError();

    //         // setData function should be called when the data props is change
    //         const mockSetData = jest.spyOn(instance, "setData");
    //         wrapper.setProps({ data: { y: 0, x: 0, height: 1, width: 3 }, });
    //         expect(mockSetData).toThrowError();

    //         // setDragMode function should be called when the setDragMode props is change
    //         const mockSetDragMode = jest.spyOn(instance, "setDragMode");
    //         wrapper.setProps({ dragMode: "move" });
    //         expect(mockSetDragMode).toThrowError();
    //         wrapper.unmount();

    //     } catch (err) {
    //         // console.error(err);
    //     }
    // });
});

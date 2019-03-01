import * as React from "react";
import { shallow, mount } from "enzyme";
import { ImagePreview } from "./ImagePreview";

describe("Component: ImagePreview", () => {

    it("Should render", () => {
        const wrapper = shallow(<ImagePreview handleUploadImage={(e) => console.log("it has been click ", e)} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<ImagePreview handleUploadImage={(e) => console.log("it has been click ", e)} previewClassName="my-preview" />);
        expect(wrapper.hasClass("my-preview")).toBeTruthy();
    });

    it("should render default svg image when previewSrc is empty", () => {
        const wrapper = shallow(<ImagePreview handleUploadImage={(e) => console.log("it has been click ", e)} previewSrc="" />);
        expect(wrapper.find(".profile-image").find("svg")).toBeTruthy();
        expect(wrapper.find(".profile-image").find("img").exists()).toBeFalsy();
        wrapper.setProps({ previewSrc: "xxxxx" });
        wrapper.instance().componentDidMount();
        expect(wrapper.find(".profile-image").find("svg").exists()).toBeFalsy();
        expect(wrapper.find(".profile-image").find("img").exists()).toBeTruthy();
    });

    it("Button select image should trigger file upload on click", (doneFn) => {
        const action = jest.fn();
        const wrapper: any = shallow(<ImagePreview handleUploadImage={action} previewClassName="my-preview" />);
        wrapper.find("#fileInput").simulate("change", { target: { value: "file" } });
        expect(action).toBeCalled();

        // perform click on file
        wrapper.find("#fileInput").simulate("click", { target: { value: "file" } });

        setTimeout(() => {
            doneFn();
        }, 1000);

    });

    it("open file button click should call the onFileInputClick function", (doneFn) => {
        const fileInputClickMock = jest.spyOn(ImagePreview.prototype, "onFileInputClick");
        const wrapper = mount(<ImagePreview handleUploadImage={(e) => console.log("it has been click ", e)} previewClassName="my-preview" />);

        wrapper.find("button").simulate("click");
        setTimeout(() => {
            expect(fileInputClickMock).toHaveBeenCalled();
            doneFn();
        }, 1000);
    });

    it("open file button should call handleUploadImage when cropResult is provided", (doneFn) => {
        const action = jest.fn();
        const wrapper = mount(<ImagePreview handleUploadImage={action} previewClassName="my-preview" previewSrc="xxxxx" />);
        wrapper.find("button").simulate("click");
        setTimeout(() => {
            expect(action).toHaveBeenCalled();
            doneFn();
        }, 1000);
    });

    it("componentDidUpdate should change cropResult when there is change", (doneFn) => {
        const wrapper = mount(<ImagePreview handleUploadImage={(e) => { console.log(e); }} previewClassName="my-preview" />);
        expect(wrapper.prop("cropResult")).toBeFalsy();

        wrapper.setProps({ cropResult: "xxxxx" });

        expect(wrapper.prop("cropResult")).toEqual("xxxxx");

        doneFn();
    });

    it("croppedData should be cleared or initialised on first mount", (doneFn) => {
        const wrapper: any = shallow(<ImagePreview handleUploadImage={(e) => console.log("it has been click ", e)} previewSrc="xxxxx" />);

        expect(wrapper.find(".profile-image").find("img").prop("src")).toEqual("xxxxx");
        wrapper.setProps({ previewSrc: undefined });
        wrapper.instance().componentDidMount();
        console.log(wrapper.find(".profile-image").find("img").debug());
        expect(wrapper.find(".profile-image").find("img").exists()).toBeFalsy();
        expect(wrapper.find(".profile-image").find("svg").exists()).toBeTruthy();
        doneFn();
    });

});

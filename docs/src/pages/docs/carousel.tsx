import React from "react";
import Docs from "@common/Docs";
import { withPrefix } from "gatsby";
import { Carousel, CarouselItem, CarouselProps } from "@sebgroup/react-components/Carousel";
import { Img } from "@sebgroup/react-components/Image";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const images = ["/images/painting-1.jpg", "/images/painting-2.jpg", "/images/painting-3.jpg", "/images/painting-4.jpg"];
const importString: string = require("!raw-loader!@sebgroup/react-components/Carousel/Carousel");
const code: string = `<Carousel>
    <CarouselItem><Img type="div" src="first.jpg" /></CarouselItem>
    <CarouselItem><Img type="div" src="second.jpg" /></CarouselItem>
</Carousel>`;

const transitionStyles: Array<DynamicFormOption<CarouselProps["transitionStyle"]>> = [
    { key: "slide", label: "slide", value: "slide", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "fade", label: "fade", value: "fade", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const {
        renderForm: renderControls,
        state: { controls },
    }: any = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "autoplaySpeed", label: "autoplaySpeed", controlType: "Text", initialValue: 2000 },
                { key: "transitionDuration", label: "transitionDuration", controlType: "Text", initialValue: 500 },
                { key: "infinite", label: "infinite", controlType: "Checkbox", initialValue: false },
                { key: "autoplay", label: "autoplay", controlType: "Checkbox", initialValue: false },
                { key: "showIndicators", label: "showIndicators", controlType: "Checkbox" },
                { key: "transitionStyle", label: "transitionStyle", controlType: "Radio", options: transitionStyles, initialValue: transitionStyles[0].value },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Carousel
                        autoplaySpeed={controls.autoplaySpeed}
                        transitionDuration={controls.transitionDuration}
                        showIndicators={controls.showIndicators}
                        autoplay={controls.autoplay}
                        infinite={controls.infinite}
                        transitionStyle={controls.transitionStyle}
                        aria-label="Image gallery"
                        aria-level={2}
                    >
                        {images.map((image, i) => (
                            <CarouselItem key={i} aria-label={`image canvas ${i + 1}`} aria-level={3}>
                                <Img src={withPrefix(image)} responsive width="100%" alt={`image ${i + 1}`} />
                            </CarouselItem>
                        ))}
                    </Carousel>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default CarouselPage;

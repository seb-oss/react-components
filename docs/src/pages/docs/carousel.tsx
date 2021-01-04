import React from "react";
import Docs from "@common/Docs";
import { Carousel, CarouselItem, CarouselProps } from "@sebgroup/react-components/Carousel";
import { DivImage } from "@sebgroup/react-components/DivImage";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "@utils/helpers";

const images = [require("../../assets/images/cat-pet-animal-1.jpeg"), require("../../assets/images/cat-pet-animal-2.jpg"), require("../../assets/images/cat-pet-animal-3.jpg")];
const importString: string = require("!raw-loader!@sebgroup/react-components/Carousel/Carousel");
const code: string = `<Carousel>
    <CarouselItem><DivImage src="first.jpg" /></CarouselItem>
    <CarouselItem><DivImage src="second.jpg" /></CarouselItem>
</Carousel>`;

const checkboxControls: Array<DynamicFormOption> = [
    { label: "Infinite", value: "infinite", key: "infinite" },
    { label: "Auto play", value: "autoplay", key: "autoplay" },
    { label: "Show indicators", value: "showIndicators", key: "showIndicators" },
];

const transitionStyles: Array<DynamicFormOption<CarouselProps["transitionStyle"]>> = [
    { key: "slide", label: "Slide-in", value: "slide" },
    { key: "fade", label: "Fade", value: "fade" },
];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "autoplaySpeed",
                    label: "Auto play speed",
                    controlType: "Text",
                    value: 2000,
                },
                {
                    key: "transitionDuration",
                    label: "Transition duration",
                    controlType: "Text",
                    value: 500,
                },
                {
                    key: "checkboxes",
                    label: "Configurable options",
                    controlType: "Option",
                    value: [checkboxControls[0]],
                    options: checkboxControls,
                },
                {
                    key: "transitionStyle",
                    label: "Transition style",
                    controlType: "Radio",
                    inline: true,
                    options: transitionStyles,
                    value: transitionStyles[0],
                },
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
                        showIndicators={checkDynamicFormSelectedKey("showIndicators", controls)}
                        autoplay={checkDynamicFormSelectedKey("autoplay", controls)}
                        infinite={checkDynamicFormSelectedKey("infinite", controls)}
                        transitionStyle={controls.transitionStyle?.value}
                    >
                        <CarouselItem>
                            <DivImage src={images[0]} width="100%" height="350px" />
                        </CarouselItem>

                        <CarouselItem>
                            <DivImage src={images[1]} width="100%" height="350px" />
                        </CarouselItem>

                        <CarouselItem>
                            <DivImage src={images[2]} width="100%" height="350px" />
                        </CarouselItem>
                    </Carousel>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default CarouselPage;

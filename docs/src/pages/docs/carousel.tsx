import React from "react";
import Docs from "@common/Docs";
import { Carousel, CarouselItem, CarouselProps } from "@sebgroup/react-components/Carousel";
import { Img } from "@sebgroup/react-components/Image";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";

const images = [require("../../assets/images/cat-pet-animal-1.jpeg"), require("../../assets/images/cat-pet-animal-2.jpg"), require("../../assets/images/cat-pet-animal-3.jpg")];
const importString: string = require("!raw-loader!@sebgroup/react-components/Carousel/Carousel");
const code: string = `<Carousel>
    <CarouselItem><Img type="div" src="first.jpg" /></CarouselItem>
    <CarouselItem><Img type="div" src="second.jpg" /></CarouselItem>
</Carousel>`;

const transitionStyles: Array<DynamicFormOption<CarouselProps["transitionStyle"]>> = [
    { key: "slide", label: "slide", value: "slide" },
    { key: "fade", label: "fade", value: "fade" },
];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "autoplaySpeed",
                    label: "autoplaySpeed",
                    controlType: "Text",
                    value: 2000,
                },
                {
                    key: "transitionDuration",
                    label: "transitionDuration",
                    controlType: "Text",
                    value: 500,
                },
                { key: "infinite", label: "infinite", controlType: "Checkbox" },
                { key: "autoplay", label: "autoplay", controlType: "Checkbox" },
                { key: "showIndicators", label: "showIndicators", controlType: "Checkbox" },
                {
                    key: "transitionStyle",
                    label: "transitionStyle",
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
                        showIndicators={controls.showIndicators}
                        autoplay={controls.autoplay}
                        infinite={controls.infinite}
                        transitionStyle={controls.transitionStyle?.value}
                    >
                        <CarouselItem>
                            <Img src={images[0]} responsive width="100%" />
                        </CarouselItem>

                        <CarouselItem>
                            <Img src={images[1]} responsive width="100%" />
                        </CarouselItem>

                        <CarouselItem>
                            <Img src={images[2]} responsive width="100%" />
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

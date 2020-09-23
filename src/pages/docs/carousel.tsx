import React from "react";
import Docs from "components/Docs";
import { Carousel, CarouselItemProps } from "../../../lib/src/Carousel";
import { CarouselItem } from "../../../lib/src/Carousel/CarouselItem";
import { useDynamicForm } from "hooks/useDynamicForm";
const images = [require("../../assets/images/cat-pet-animal-1.jpeg"), require("../../assets/images/cat-pet-animal-2.jpg"), require("../../assets/images/cat-pet-animal-3.jpg")];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "autoPlaySpeed",
                    label: "Auto play speed",
                    order: 10,
                    controlType: "Text",
                    value: 2000,
                },
                {
                    key: "transitionDuration",
                    label: "Transition duration",
                    order: 20,
                    controlType: "Text",
                    value: 500,
                },
                {
                    key: "translateX",
                    label: "Translate X",
                    order: 30,
                    controlType: "Text",
                    value: 3000,
                },
                {
                    key: "infinite",
                    label: "Infinite",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "autoPlay",
                    label: "Auto play",
                    order: 50,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "showIndicators",
                    label: "Show indicators",
                    order: 60,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "comingNext",
                    label: "Coming next",
                    order: 70,
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!../../../lib/src/Carousel/Carousel"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!../../../lib/src/Carousel/Carousel")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./carousel").default, []);

    const carouselList: Array<CarouselItemProps> = React.useMemo(
        () => [
            {
                transitionDuration: controls.transitionDuration,
                comingNext: controls.comingNext,
                translateX: controls.translateX,
            },
            {
                transitionDuration: controls.transitionDuration,
                comingNext: controls.comingNext,
                translateX: controls.translateX,
            },
            {
                transitionDuration: controls.transitionDuration,
                comingNext: controls.comingNext,
                translateX: controls.translateX,
            },
        ],
        [controls]
    );

    const renderCarouselItem: React.ReactNode = React.useMemo(() => {
        return carouselList.map((list: CarouselItemProps, index: number) => (
            <CarouselItem {...list} key={`carousel-${index}`}>
                {<img src={images[index]} />}
            </CarouselItem>
        ));
    }, [controls, carouselList]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Carousel showIndicators={controls.showIndicators} autoplay={controls.autoPlay} autoplaySpeed={controls.autoPlaySpeed} infinite={controls.infinite}>
                        {renderCarouselItem}
                    </Carousel>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default CarouselPage;

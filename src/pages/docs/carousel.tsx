import React from "react";
import Docs from "components/Docs";
import { Carousel, CarouselItemProps } from "../../../lib/src/Carousel";
import { CarouselItem } from "../../../lib/src/Carousel/CarouselItem";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "utils/helpers";
const images = [require("../../assets/images/cat-pet-animal-1.jpeg"), require("../../assets/images/cat-pet-animal-2.jpg"), require("../../assets/images/cat-pet-animal-3.jpg")];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Infinite", value: "infinite", key: "infinite" },
            { label: "Auto play", value: "autoPlay", key: "autoPlay" },
            { label: "Show indicators", value: "showIndicators", key: "showIndicators" },
            { label: "Coming next", value: "comingNext", key: "comingNext" },
        ],
        []
    );

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
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    options: checkboxControls,
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
                comingNext: checkDynamicFormSelectedKey("comingNext", controls),
                translateX: controls.translateX,
            },
            {
                transitionDuration: controls.transitionDuration,
                comingNext: checkDynamicFormSelectedKey("comingNext", controls),
                translateX: controls.translateX,
            },
            {
                transitionDuration: controls.transitionDuration,
                comingNext: checkDynamicFormSelectedKey("comingNext", controls),
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
                    <Carousel
                        showIndicators={checkDynamicFormSelectedKey("showIndicators", controls)}
                        autoplay={checkDynamicFormSelectedKey("autoPlay", controls)}
                        autoplaySpeed={checkDynamicFormSelectedKey("autoPlaySpeed", controls)}
                        infinite={checkDynamicFormSelectedKey("infinite", controls)}
                    >
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

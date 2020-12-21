import React from "react";
import Docs from "components/Docs";
import { Carousel, CarouselItemProps } from "../../../lib/src/Carousel";
import { CarouselItem } from "../../../lib/src/Carousel/CarouselItem";
import { DivImage, DivImageProps } from "../../../lib/src/DivImage";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "utils/helpers";
const images = [require("../../assets/images/cat-pet-animal-1.jpeg"), require("../../assets/images/cat-pet-animal-2.jpg"), require("../../assets/images/cat-pet-animal-3.jpg")];

const CarouselPage: React.FC = (): React.ReactElement<void> => {
    const checkboxControls: Array<DynamicFormOption> = [
        { label: "Infinite", value: "infinite", key: "infinite" },
        { label: "Auto play", value: "autoplay", key: "autoplay" },
        { label: "Show indicators", value: "showIndicators", key: "showIndicators" },
    ];

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "autoplaySpeed",
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
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    value: [checkboxControls[0]],
                    options: checkboxControls,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!../../../lib/src/Carousel/Carousel"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!../../../lib/src/Carousel/Carousel")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./carousel").default, []);

    const divImageStyle: DivImageProps["style"] = { height: "350px", width: "100%", margin: "auto" };
    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Carousel
                        {...controls}
                        showIndicators={checkDynamicFormSelectedKey("showIndicators", controls)}
                        autoplay={checkDynamicFormSelectedKey("autoplay", controls)}
                        infinite={checkDynamicFormSelectedKey("infinite", controls)}
                    >
                        <CarouselItem key="1">
                            <DivImage
                                style={divImageStyle}
                                src={`https://static01.nyt.com/images/2020/04/22/science/22VIRUS-PETCATS1/merlin_150476541_233fface-f503-41af-9eae-d90a95eb6051-superJumbo.jpg?quality=90&auto=webp`}
                            />
                        </CarouselItem>

                        <CarouselItem key="2">
                            <DivImage
                                style={divImageStyle}
                                src={`https://static01.nyt.com/images/2020/04/06/science/06VIRUS-ANIMALS/merlin_171317514_567f80c0-6f04-4737-ad7e-47c4b603fcff-superJumbo.jpg?quality=90&auto=webp`}
                            />
                        </CarouselItem>

                        <CarouselItem key="3">
                            <DivImage style={divImageStyle} src={require("../../assets/images/cat-pet-animal-1.jpeg")} />
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

import React from "react";
import { CheckBox, CheckBoxProps } from "../../../src/CheckBox";
import Highlight from "react-highlight";
import { loremIpsum } from "lorem-ipsum";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup";
import { FeedbackIndicator, IndicatorType } from "../../../src/FeedbackIndicator";
import docMD from "../../../src/CheckBox/readme.md";

type CheckboxPageState = {
    inline: boolean;
    disabled: boolean;
    hasDescription: boolean;
    hasIndicator: boolean;
    indicatorType: IndicatorType;
};

const errorMessage: string = "Accept agreement and terms";

const CheckBoxPage: React.FC = () => {
    const [state, setState] = React.useState<CheckboxPageState>({
        inline: false,
        disabled: false,
        hasDescription: false,
        hasIndicator: false,
        indicatorType: "danger",
    });

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newState: CheckboxPageState = { ...state };
            switch (e.target.type) {
                case "radio":
                    newState[e.target.name] = e.target.value;
                    break;
                case "checkbox":
                    newState[e.target.name] = e.target.checked;
                    break;
            }
            setState(newState);
        },
        [state]
    );

    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <h3 className="border-bottom pb-2">Output</h3>
                            <div className="result wide">
                                {checkboxes.map((item: CheckBoxProps, i: number) => (
                                    <CheckBox
                                        key={i}
                                        {...item}
                                        disabled={state.disabled}
                                        inline={state.inline}
                                        description={state.hasDescription ? item.description : null}
                                        indicator={i === checkboxes.length - 1 && state.hasIndicator ? { type: state.indicatorType, message: errorMessage } : null}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <h3 className="border-bottom pb-2">Options</h3>
                            <div className="row">
                                <div className="col">
                                    <CheckBox label="Inline" name="inline" checked={state.inline} onChange={changeHandler} />
                                    <CheckBox label="Disabled" name="disabled" checked={state.disabled} onChange={changeHandler} />
                                    <CheckBox label="Description" name="hasDescription" checked={state.hasDescription} onChange={changeHandler} />
                                    <CheckBox label="Indicator" name="hasIndicator" checked={state.hasIndicator} onChange={changeHandler} />
                                    {state.hasIndicator && <RadioGroup className="pl-4" name="indicatorType" list={indicatorTypes} value={state.indicatorType} onChange={changeHandler} condensed />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info">
                    <h2 id="footnote-2-example">Multiple checkboxes with one error message (footnote 2)</h2>
                    <div className="result wide">
                        <div className="row">
                            <div className="col-6">
                                <FeedbackIndicator type="danger" message={errorMessage}>
                                    <CheckBox label="Agreement" />
                                    <CheckBox label="Terms" />
                                </FeedbackIndicator>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const checkboxes: Array<CheckBoxProps> = [
    { name: "checkbox1", label: loremIpsum({ units: "words", count: 2 }), description: loremIpsum({ units: "words", count: 3 }) },
    { name: "checkbox2", label: loremIpsum({ units: "words", count: 2 }), description: loremIpsum({ units: "words", count: 3 }) },
    { name: "checkbox3", label: loremIpsum({ units: "words", count: 2 }), description: loremIpsum({ units: "words", count: 3 }) },
];

const indicatorTypes: Array<RadioListModel<IndicatorType>> = [
    { label: "Danger", value: "danger" },
    { label: "Warning", value: "warning" },
    { label: "Success", value: "success" },
];

export default CheckBoxPage;

import React from "react";
import { FeedbackIndicator, IndicatorType } from "../../../src/FeedbackIndicator";
import Highlight from "react-highlight";
import { CheckBox } from "../../../src/CheckBox";
import { Button } from "../../../src/Button";
import docMD from "../../../src/FeedbackIndicator/readme.md";

const FeedbackIndicatorPage: React.FC = () => {
    const [message, setMessage] = React.useState<string>("");
    const [errorType, setErrorType] = React.useState<IndicatorType>(null);
    const [acceptConditions, setAcceptConditions] = React.useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = React.useState<boolean>(false);

    const handleSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            switch (+acceptTerms + +acceptConditions) {
                case 0:
                    setMessage("You have to accept the terms and conditions");
                    setErrorType("danger");
                    break;
                case 1:
                    setMessage("Both terms and conditions must be accepted");
                    setErrorType("warning");
                    break;
                case 2:
                    setMessage("You're all set!");
                    setErrorType("success");
                    break;
            }
        },
        [acceptTerms, acceptConditions]
    );

    const handleReset = React.useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setMessage("");
        setErrorType(null);
        setAcceptConditions(false);
        setAcceptTerms(false);
    }, []);

    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h3 className="border-bottom pb-2">Output</h3>
                    <p>Make different combinations of submissions to see the indicator changes</p>
                    <div className="result">
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <FeedbackIndicator className="mb-4" type={errorType} message={message}>
                                <div>
                                    <CheckBox label="Accept conditions" checked={acceptConditions} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcceptConditions(e.target.checked)} />
                                    <CheckBox label="Accept terms" checked={acceptTerms} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcceptTerms(e.target.checked)} />
                                </div>
                            </FeedbackIndicator>
                            <Button type="submit" className="mr-2">
                                Submit
                            </Button>
                            <Button type="reset" theme="outline-primary">
                                Reset
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackIndicatorPage;

import * as React from "react";
import { ProgressBar } from "../../../src/ProgressBar/ProgressBar";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/ProgressBar/readme.md");

export default class ProgressBarPage extends React.Component<any, any>  {
    progress: number = 0;
    timerRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            progress: 1,
        };
    }

    simulateProgress(): void {
        if (this.timerRef) { clearInterval(this.timerRef); }
        this.setState({ progress: 0 }, () => {
            this.timerRef = setInterval((): void => {
                if (this.state.progress < 100) {
                    this.setState({ progress: this.state.progress + 1 });
                } else {
                    clearInterval(this.timerRef);
                }
            }, 100);
        });
    }

    componentDidMount(): void {
        this.simulateProgress();
    }

    componentWillUnmount() {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
                <div className="info-holder">

                    <div className="info">
                        <div className="md-file">
                            <Highlight innerHTML={true}>{docMD}</Highlight>
                        </div>
                    </div>

                    <div className="info">
                        <h2>Output</h2>
                        <p>Here are sample outputs</p>
                        <div className="result">
                            <ProgressBar
                                value={this.state.progress}
                            />
                        </div>

                        <p>Progress bar with percentage</p>
                        <div className="result">
                            <ProgressBar
                                value={this.state.progress}
                                showProgress={true}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

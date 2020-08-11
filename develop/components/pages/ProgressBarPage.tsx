import * as React from "react";
import { ProgressBar, ProgressBarProps } from "../../../src/ProgressBar/ProgressBar";
import { RouteComponentProps } from "react-router";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/ProgressBar/readme.md");

interface ProgressBarPageState {
    progress: number;
}

class ProgressBarPage extends React.Component<RouteComponentProps, ProgressBarPageState> {
    timerRef: any;

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            progress: 1,
        };
    }

    simulateProgress(): void {
        if (this.timerRef) {
            clearInterval(this.timerRef);
        }
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
        return (
            <div className="route-template container">
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
                            <ProgressBar value={this.state.progress} />
                        </div>

                        <p>Progress bar with percentage</p>
                        <div className="result">
                            <ProgressBar value={this.state.progress} showProgress={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBarPage;

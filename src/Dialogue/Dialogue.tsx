import * as React from "react";
import "./dialogue-style.scss";

interface DialogueProps {
    toggle: boolean;
    header?: string;
    desc?: string;
    primaryBtn?: string;
    secondaryBtn?: string;
    primaryAction?: () => void;
    secondaryAction?: () => void;
    className?: string;
}

interface DialogueState {
    open: boolean;
    close: boolean;
}

export class Dialogue extends React.Component<DialogueProps, DialogueState> {
    constructor(props: DialogueProps) {
        super(props);
        this.state = {
            open: false,
            close: false
        };
    }

    componentDidMount(): void {
        if (this.props.toggle === true) {
            this.setState({ open: true });
        }
    }

    componentDidUpdate(prevProps: DialogueProps): void {
        if (this.props.toggle !== prevProps.toggle) {
            this.setState({ open: !prevProps.toggle, close: prevProps.toggle });
        }
    }

    render() {
        return (
            <div className={"custom-dialogue" + (this.state.open ? " open-dialogue" : "") + (this.state.close ? " close-dialogue" : "")}>
                <div className={"dialogue-container" + (this.props.className ? ` ${this.props.className}` : "")}>
                    <div className={"dialogue" + (this.props.desc ? " with-desc" : "")} onClick={(e) => e.stopPropagation()}>
                        {this.props.header && <div className="dialogue-header">{this.props.header}</div>}
                        {this.props.desc && <div className="dialogue-desc">{this.props.desc}</div>}

                        <div className="dialogue-footer">
                            {(this.props.secondaryBtn && this.props.secondaryAction) &&
                                <div className="dialogue-action secondary-action">
                                    <button
                                        className="btn btn-secondary dialogue-button"
                                        onClick={this.props.secondaryAction}
                                    >{this.props.secondaryBtn}
                                    </button>
                                </div>
                            }
                            {(this.props.primaryBtn && this.props.primaryAction) &&
                                <div className="dialogue-action primary-action">
                                    <button
                                        className="btn btn-primary dialogue-button"
                                        onClick={this.props.primaryAction}
                                    >
                                        {this.props.primaryBtn}
                                    </button>
                                </div>
                            }
                            {(!this.props.primaryBtn && !this.props.secondaryBtn) &&
                                <div className="dialogue-action primary-action">
                                    <button
                                        className="btn btn-primary dialogue-button"
                                        onClick={this.props.primaryAction && this.props.primaryAction}
                                    >
                                        Close
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

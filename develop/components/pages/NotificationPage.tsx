import * as React from "react";
import { Notification, NotificationAction } from "../../../src/Notification/Notification";
import { Button } from "../../../src/Button/Button";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Notification/readme.md");

interface NotificationPageState {
    notification1Toggle: boolean;
    notification2Toggle: boolean;
    notification3Toggle: boolean;
}

export default class NotificationPage extends React.Component<any, NotificationPageState>  {
    notificationActions: Array<NotificationAction>;
    description: string = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    constructor(props: any) {
        super(props);
        this.state = {
            notification1Toggle: false,
            notification2Toggle: false,
            notification3Toggle: false,
        };
        this.dismiss = this.dismiss.bind(this);
        this.notificationActions = [
            { text: "Yes, I'm in", action: this.dismiss },
            { text: "Ignore", action: this.dismiss },
        ];
    }

    dismiss(): void {
        this.setState({ notification2Toggle: false });
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
                        <p>Here is a sample output</p>
                        <div className="result">
                            <Notification
                                toggle={this.state.notification1Toggle}
                                title="Notification Title"
                                message={this.description}
                                onClick={() => { console.log("Notification clicked"); }}
                                dismissable={true}
                                onDismiss={() => { this.setState({ notification1Toggle: false }); }}
                            />
                            <Button
                                label="Toggle"
                                onClick={() => {
                                    this.setState({ notification1Toggle: !this.state.notification1Toggle });
                                }}
                            />
                        </div>
                        <p>Notification with actions</p>
                        <div className="result">
                            <Notification
                                toggle={this.state.notification2Toggle}
                                title="Notification Title"
                                message={this.description}
                                actions={this.notificationActions}
                                onDismiss={this.dismiss}
                                persist={true}
                                position="bottom-right"
                                theme="primary"
                            />
                            <Button label="With actions" onClick={() => { this.setState({ notification2Toggle: !this.state.notification2Toggle }); }} />
                        </div>
                        <p>Bar notification</p>
                        <div className="result">
                            <Notification
                                toggle={this.state.notification3Toggle}
                                onClick={() => { console.log("Notification clicked"); }}
                                dismissable={true}
                                onDismiss={() => { this.setState({ notification3Toggle: false }); }}
                                style="bar"
                                position="bottom"
                                theme="danger"
                            >
                                <div className="notification-message">
                                    {this.description}&nbsp;
                                    <button
                                        className="btn btn-sm btn-secondary text-light px-1 py-0"
                                        onClick={
                                            (e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                console.log("Link Clicked");
                                            }
                                        }
                                    >
                                        Click here
                                    </button>
                                </div>
                            </Notification>
                            <Button
                                label="Bar"
                                onClick={() => {
                                    this.setState({ notification3Toggle: !this.state.notification3Toggle });
                                }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

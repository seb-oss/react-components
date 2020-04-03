import * as React from "react";
import { Notification, NotificationAction } from "../../../src/Notification/Notification";
import { Button } from "../../../src/Button/Button";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Notification/readme.md");

const NotificationPage: React.FunctionComponent = () => {
    const [notification1Toggle, setNotification1Toggle] = React.useState<boolean>(false);
    const [notification2Toggle, setNotification2Toggle] = React.useState<boolean>(false);
    const [notification3Toggle, setNotification3Toggle] = React.useState<boolean>(false);

    const description: string = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    const notificationActions: Array<NotificationAction> = [
        { text: "Yes, I'm in", action: () => setNotification2Toggle(false) },
        { text: "Ignore", action: () => setNotification2Toggle(false) },
    ];

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
                    <p>Here is a sample output</p>
                    <div className="result">
                        <Notification
                            toggle={notification1Toggle}
                            title="Notification Title"
                            message={description}
                            onClick={() => {
                                console.log("Notification clicked");
                            }}
                            dismissable={true}
                            onDismiss={() => setNotification1Toggle(false)}
                        />
                        <Button label="Toggle" onClick={() => setNotification1Toggle(!notification1Toggle)} />
                    </div>
                    <p>Notification with actions</p>
                    <div className="result">
                        <Notification
                            toggle={notification2Toggle}
                            title="Notification Title"
                            message={description}
                            actions={notificationActions}
                            onDismiss={() => setNotification2Toggle(false)}
                            persist={true}
                            position="bottom-right"
                            theme="primary"
                        />
                        <Button label="With actions" onClick={() => setNotification2Toggle(!notification2Toggle)} />
                    </div>
                    <p>Bar notification</p>
                    <div className="result">
                        <Notification
                            toggle={notification3Toggle}
                            onClick={() => {
                                console.log("Notification clicked");
                            }}
                            dismissable={true}
                            onDismiss={() => setNotification3Toggle(false)}
                            style="bar"
                            position="bottom"
                            theme="danger"
                        >
                            <div className="notification-message">
                                {description && (
                                    <button
                                        className="btn btn-sm btn-secondary text-light px-1 py-0"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            console.log("Link Clicked");
                                        }}
                                    >
                                        Click here
                                    </button>
                                )}
                            </div>
                        </Notification>
                        <Button label="Bar" onClick={() => setNotification3Toggle(!notification3Toggle)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;

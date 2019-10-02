import * as React from "react";
import { Button } from "../../../src/Button/Button";
import { Loader } from "../../../src/Loader/Loader";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Button/readme.md");

const mysvg: JSX.Element = <svg id="PIKTO_REGULAR" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><title>regular_black</title><path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" /><path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" /></svg>;

const ButtonPage: React.FunctionComponent = () => {
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

                    <p>Theme: Primary</p>
                    <div className="result wide">
                        <Button
                            title="Click me"
                            label="Primary"
                            onClick={() => true}
                            theme="primary"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Primary disabled"
                            onClick={() => true}
                            theme="primary"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Secondary</p>
                    <div className="result wide">
                        <Button
                            title="Click me"
                            label="Secondary"
                            onClick={() => true}
                            theme="secondary"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Secondary disabled"
                            onClick={() => true}
                            theme="secondary"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Alternative</p>
                    <div className="result wide">
                        <Button
                            title="Click me"
                            label="Alternative"
                            onClick={() => true}
                            theme="alternative"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Alternative disabled"
                            onClick={() => true}
                            theme="alternative"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Delete</p>
                    <div className="result wide">
                        <Button
                            title="Click me"
                            label="Delete"
                            onClick={() => true}
                            theme="danger"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Delete disabled"
                            onClick={() => true}
                            theme="danger"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Ghost light</p>
                    <div className="result wide p-3 bg-dark">
                        <Button
                            title="Click me"
                            label="Ghost light"
                            onClick={() => true}
                            theme="ghost-light"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Ghost light disabled"
                            onClick={() => true}
                            theme="ghost-light"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Ghost dark</p>
                    <div className="result wide p-3 bg-warning">
                        <Button
                            title="Click me"
                            label="Ghost dark"
                            onClick={() => true}
                            theme="ghost-dark"
                            className="mr-1"
                        />
                        <Button
                            title="Click me"
                            label="Ghost dark disabled"
                            onClick={() => true}
                            theme="ghost-dark"
                            disabled={true}
                        />
                    </div>

                    <p>Theme: Anchor</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            theme="anchor"
                            onClick={() => true}
                            className="mr-1"
                        />
                        <Button
                            label="Test Label"
                            theme="anchor"
                            onClick={() => true}
                            disabled={true}
                        />
                    </div>

                    <p>Button with icon</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="left"
                            icon={mysvg}
                            onClick={() => true}
                            className="mr-1"
                        />
                        <Button
                            label="Test Label"
                            iconPosition="right"
                            icon={mysvg}
                            onClick={() => true}
                        />
                    </div>

                    <p>Pass the loader component instead of the icon and it will just work</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            icon={<Loader toggle={true} />}
                            onClick={() => true}
                            className="mr-1"
                        />
                        <Button
                            label="Test Label"
                            iconPosition="right"
                            icon={<Loader toggle={true} />}
                            onClick={() => true}
                            disabled={true}
                        />
                    </div>

                    <p>It also comes in different sizes</p>
                    <div className="result wide">
                        <Button
                            label="Large"
                            onClick={() => true}
                            size="lg"
                            className="mr-1"
                        />
                        <Button
                            label="Medium"
                            onClick={() => true}
                            className="mr-1"
                        />
                        <Button
                            label="Small"
                            onClick={() => true}
                            size="sm"
                            className="mr-1"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ButtonPage;

import * as React from "react";
import { Pagination } from "../../../src/Pagination/Pagination";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Pagination/readme.md");

const PaginationPage: React.FunctionComponent = () => {
    const [pagination, setPagination] = React.useState<number>(1);
    const [pagination2, setPagination2] = React.useState<number>(1);
    const [dotnav, setDotnav] = React.useState<number>(1);

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
                        <Pagination
                            value={pagination}
                            onChange={setPagination}
                            size={20}
                            offset={5}
                        />
                    </div>

                    <p>With <b>first</b> and <b>last</b> enabled</p>
                    <div className="result">
                        <Pagination
                            value={pagination2}
                            onChange={setPagination2}
                            size={20}
                            offset={5}
                            useFirstAndLast={true}
                        />
                    </div>

                    <p>Here are sample outputs of DotNav: {dotnav}</p>
                    <div className="result">
                        <Pagination
                            value={dotnav}
                            onChange={setDotnav}
                            size={8}
                            useDotNav={true}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PaginationPage;

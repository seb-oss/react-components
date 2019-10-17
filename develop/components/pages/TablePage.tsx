import * as React from "react";
import { Table } from "../../../src/Table/Table";
import makeData from "../../../src/Table/makeData";
import { Column } from "react-table";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const TablePage: React.FunctionComponent = () => {
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Visits",
                accessor: "visits",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Profile Progress",
                accessor: "progress",
            },
        ],
        []
    );
    const data = React.useMemo(() => makeData(20), []);
    return (
        <div className="route-template container">
            <div className="info-holder">

                {/* <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div> */}

                <div className="info">
                    <h2>Output</h2>

                    <p>Here is an example of a horizontal step tracker:</p>
                    <div className="result wide">
                        <Table columns={columns} data={data} sortable={true} />
                    </div>
                </div>

            </div>

        </div>
    );
};

const stepList: Array<string> = ["Getting Started", "Personal Information", "Account Information", "Finish"];

export default TablePage;

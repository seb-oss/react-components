import React from "react";
import { Tabs, TabItemProps } from "@sebgroup/react-components/Tabs";
import Layout from "./Layout";
import { Helmet } from "react-helmet";
import { APIExtractService } from "utils/api-parser";
import DocsWrapper from "./DocsWrapper";
import { DocsPlaygroundProps } from "./DocsPlaygroud";

export interface DocsProps extends DocsPlaygroundProps {
    mainFile: string;
    importedFiles?: Array<string>;
    note?: React.ReactNode;
}

const Docs: React.FC<DocsProps> = (props: DocsProps) => {
    const tabList: Array<TabItemProps> = [{ children: "Playground" }, { children: "APIs" }];
    const tabListWithNotes: Array<TabItemProps> = [...tabList, { children: "Notes" }];
    const [apis, setApis] = React.useState<ApiSection>(null);
    const [activeTab, setActiveTab] = React.useState<number>(0);

    React.useEffect(() => {
        new APIExtractService()
            .initParse(props.mainFile, props.importedFiles)
            .then(async (res) => {
                console.log(res[0]);
                setApis(await res[0]);
            })
            .catch((test) => {
                console.log(test);
            });
    }, []);
    return (
        <Layout>
            <Helmet>
                <title>{apis?.name || ""} - SEB React Components</title>
            </Helmet>

            <div className="doc-page container">
                <h1>{apis?.name}</h1>
                <p>{apis?.description}</p>
                <Tabs className="doc-page-tabs" list={props.note ? tabListWithNotes : tabList} value={activeTab} onValueChange={setActiveTab} />
                <DocsWrapper activeTab={activeTab} interfaces={apis?.interfaces} code={props.code} example={props.example} controls={props.controls} />
            </div>
        </Layout>
    );
};

export default Docs;

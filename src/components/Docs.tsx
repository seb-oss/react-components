import React from "react";
import { Tabs, TabsListItem } from "@sebgroup/react-components/Tabs";
import Layout from "./Layout";
import { Helmet } from "react-helmet";
import { APIExtractService } from "utils/api-parser";
import DocsWrapper from "./DocsWrapper";
import { DocsPlaygroundProps } from "./DocsPlaygroud";

export interface DocsProps extends DocsPlaygroundProps {
    importString: string;
    note?: React.ReactNode;
}

const Docs: React.FC<DocsProps> = (props: DocsProps) => {
    const tabList: Array<TabsListItem> = [{ text: "Playground" }, { text: "APIs" }];
    const tabListWithNotes: Array<TabsListItem> = [...tabList, { text: "Notes" }];
    const [apis, setApis] = React.useState<ApiSection>(null);
    const [activeTab, setActiveTab] = React.useState<number>(0);

    React.useEffect(() => {
        new APIExtractService().initParse(props.importString).then(async (res) => {
            setApis(await res[0]);
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
                <Tabs className="doc-page-tabs" list={props.note ? tabListWithNotes : tabList} activeTab={activeTab} onClick={(index: number) => setActiveTab(index)} />
                <DocsWrapper activeTab={activeTab} inputs={apis?.inputs} code={props.code} example={props.example} controls={props.controls} />
            </div>
        </Layout>
    );
};

export default Docs;

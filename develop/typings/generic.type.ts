import { RouteComponentProps, StaticContext } from "react-router";

export interface AppSharedProps<Params extends { [K in keyof Params]?: string; } = {}, C extends StaticContext = StaticContext, S = any> extends Partial<RouteComponentProps<Params, C, S>> {
    mode: string;
    readonly brief: string;
}

export type SideBarItem = {
    name: string;
    path: string;
    filePath: string;
};
export type SideBarContent = {
    links: Array<SideBarItem>;
    form: Array<SideBarItem>;
    ui: Array<SideBarItem>;
    other: Array<SideBarItem>;
};

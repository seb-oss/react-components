import { RouteComponentProps, StaticContext } from "react-router";

export interface AppSharedProps<Params extends { [K in keyof Params]?: string; } = {}, C extends StaticContext = StaticContext, S = any> extends Partial<RouteComponentProps<Params, C, S>> {
    mode: string;
    readonly brief: string;
}

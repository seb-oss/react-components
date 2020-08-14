declare interface NavsURLs {
    releases: string;
    github: string;
    contribute: string;
    issues: string;
}

declare module "*.svg" {
    const comp: React.FC<JSX.IntrinsicElements["svg"]>;
    export default comp;
}

declare module "@pkg" {
    const data: NPMPackage;
    export default data;
}

declare module "*components-list.json" {
    const data: Array<ComponentsListItem>;
    export default data;
}

declare interface ComponentsListItem {
    name: string;
    path: string;
    filePath: string;
    module: string;
}

declare interface NPMPackage {
    name: string;
    version: string;
    description: string;
    license: string;
    keywords: Array<string>;
    repository: {
        type: string;
        url: string;
    };
    bugs: {
        url: string;
    };
    homepage: string;
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}

declare interface ApiSection<T = any> {
    name: string;
    description: string;
    inputs?: Array<T>;
}

declare interface APIInputs {
    default: any;
    description: string;
    end: number;
    isOptional: boolean;
    isStatic: boolean;
    name: string;
    start: number;
    type: string;
    visibility: any;
}

declare interface APIOutputs {
    description: string;
    end: number;
    functionCall: string;
    isAbstract: boolean;
    isAsync: boolean;
    isOptional: boolean;
    isStatic: boolean;
    name: string;
    parameters: any[];
    start: number;
    type: string;
    variables: any[];
    visibility: undefined;
}

declare interface APIInput {
    comment?: string;
    skip?: string;
    decorator?: string;
    name?: string;
    type?: string;
    default?: string;
    alias?: string;
    accessor?: string;
    optional?: string;
    private?: string;
    parameter?: string;
    return?: string;
}

declare interface ParsedAPI {
    [key: string]: APIInput;
}

declare interface DocDropdownItem<T = any> {
    value: T;
    label: string;
}

declare type QuerySize = "xl" | "lg" | "md" | "sm" | "xs" | "never";

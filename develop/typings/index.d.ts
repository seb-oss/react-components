declare module "*.svg" {
    const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;
    export default ReactComponent;
}

declare module "*.md" {
    const md: string;
    export default md;
}

declare module "*.jpg" {
    const asset: string;
    export default asset;
}

declare module "*.jpeg" {
    const asset: string;
    export default asset;
}

declare module "*.png" {
    const asset: string;
    export default asset;
}

declare module "*.gif" {
    const asset: string;
    export default asset;
}

declare module "*.json" {
    const asset: any;
    export default asset;
}

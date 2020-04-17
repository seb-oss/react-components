declare module "*.svg" {
    const ReactComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
    const path: string;
    export { ReactComponent };
    export default path;
}

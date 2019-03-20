# SEB React Components
This is a set of react components which some of them are based on SEB's bootstrap. The plan for this project is to increase and improve components for future usages.

-     The package name: `@sebgroup/react-components`
-     The package documentation: [Documentation](https://sebgroup.github.io/react-components) 
-     The package sourcecode: [Github Source Code](https://github.com/sebgroup/react-components)

## Minimum requirements
This version of components has been tested and developed on:
-   React `16.4.0` or above
-   Typescript `3.0.0` or above
-   Webpack `4.16.0` or above

## Installation
You should be able to install the NPM package.
```bash
npm install @sebgroup/react-components --save
```

This project is based on SEB Bootstrap which includes `fonts`, `colors` and `variables`, to make sure everything works fine, please install these dependacies on your project:
```bash
npm install @sebgroup/bootstrap --save
```
Then make sure you add the Main SEB bootstrap package in your main style.SCSS or index.ts as follows
`@import '~@sebgroup/bootstrap/scss/bootstrap';`.

For `Visual Studio Code` users, please install official [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) plugin which has been published by `Microsoft` on your IDE, to enable `ts-linting` as by default you need to pass TSLint to be able to compile your code for production.

## Development
This project uses proper `ts-linting` and our lints are based on `tslint:latest` and `tslint-react`, with our own changes in lint rules for a more consistant (less annoying) coding.
We are using 4 different builds for this project.
The `src` folder is where the actual components exist with all their necessary dependacies. and `develop` folder is where we test and develop those components. Unit tests are based on `jest` and `enzyme`.

1. Development: `npm start`
2. Check for Lint-ing rules, Compile components and Create Docs folder: `npm run build`
3. Build and create the Documentation pages only: `npm run docs` 
4. To run the unit tests, run: `npm run test`
5. To run a unit test for a specifc component you have to pass the name of the component in `comp` variable, run: `npm run test --comp=Button`

## Usage
For performance benefits we are not combining all the componnents into single Index rather they are chunk into their own sub package, therefore to use a component, you need to import the `Component` sub module from the `dist` folder, in whichever Class you want to use it. Here is a sample how to import `Button` component in a page. 

```javascript
import { Button } from '@sebgroup/react-components/dist/Button';
class YourParentComponent extends React.Component<any, any> {
     constructor(props) {
        super(props);

        this.yourClickEvent = this.yourClickEvent.bind(this);
    }

    yourClickEvent(e){
        console.log("Im Clicked");
    }

    render() {
        return (
            <div>
                <Button label="a button" onClick={this.yourClickEvent} />
            </div>
        )
    }
}
export default YourParentComponent;
```

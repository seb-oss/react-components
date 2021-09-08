# SEB React Components

[![https://img.shields.io/npm/v/@sebgroup/react-components](https://img.shields.io/npm/v/@sebgroup/react-components)](https://www.npmjs.com/package/@sebgroup/react-components)
![Deployment](https://github.com/sebgroup/react-components/workflows/Deployment/badge.svg)
![Github Pages](https://github.com/sebgroup/react-components/workflows/Github%20Pages/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/sebgroup/react-components/badge.svg?branch=master)](https://coveralls.io/github/sebgroup/react-components?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sebgroup/react-components)](https://dependabot.com)

This is a set of react components some of which are based on SEB's bootstrap. The plan for this project is to increase and improve components for future usage.

- The package name: `@sebgroup/react-components`
- The package documentation: [Documentation](https://sebgroup.github.io/react-components)
- The package sourcecode: [Github Source Code](https://github.com/sebgroup/react-components)
- NPM package: [@sebgroup/react-components](https://www.npmjs.com/package/@sebgroup/react-components)

## Minimum requirements

This version of components has been developed with:

-   React
-   Typescript
-   SEB Bootstrap

## Installation

You should be able to install the NPM package.

```bash
npm install @sebgroup/react-components --save
```

This project is based on SEB Bootstrap which includes `fonts`, `colors` and `variables`, to make sure everything works fine, please install these dependencies on your project:

```bash
npm install @sebgroup/bootstrap --save
```

Then make sure you add the Main SEB bootstrap package in your main style.SCSS or index.ts as follows
`@import '~@sebgroup/bootstrap/scss/bootstrap';`.

For `Visual Studio Code` users, please install the [recommended plugins](.vscode/extensions.json)

## Development

This project uses `prettier` for a more consistent (less annoying) coding. We are using 4 different builds for this project. The `src` folder is where the actual components exist with all their necessary dependencies. and `develop` folder is where we develop and test those components.

1. Development: `npm start`
2. Check formatting rules, Compile components and Create Docs folder: `npm run build`
3. Build and create the Documentation pages only: `npm run docs`
4. To run the unit tests, run: `npm test`
5. To run a unit test for a specific component you have to pass the name of the component, example: `npm test Button`. It can also be chained with multiple specific components, e.g. `npm test Button RadioGroup`
6. To commit your changes run: `npm run commit` and follow the steps

## Usage

For performance benefits we are not combining all the components into single Index rather they are chunked into their subpackage. Therefore, to use a component, you need to import the `Component` submodule from the `dist` folder, in whichever Class you want to use it. Here is a sample of how to import a `Button` component in a page.

```javascript
import { Button } from "@sebgroup/react-components";

const Component = () => {
    const onClick = (e) => {
        console.log("Im Clicked");
    }

    return (
        <div>
            <Button onClick={onClick}>Button label</Button>
        </div>
    );
}

export default Component;
```

# **Contributing to React Components**

First of all, I would like to thank you for considering to contribute. Before you start, we recommend submitting an [issue on Github](https://github.com/sebgroup/react-components/issues) and discuss it with the maintainers just to make sure that no one else is already working on it as well as getting more details on when this feature/fix will be released.

## **How to contribute**

After discussing your feature/fix with the maintainers you can start by [forking](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository from `develop` branch, make the changes, and then submit a pull request from your fork back to our repository. You can find more details about how to do that [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

## **Coding guidelines**

To make our code consistent, please make sure you follow our guidelines listed below:

-   **Spacing**: use 4 spaces for indentation. No tabs. (Can be configured in VS Code)
-   **Naming**:
    -   Use **camelCase** to name your **function** utilities
    -   Use **PascalCase** to name your component
    -   Please do not use vague names for variables, functions, constants, etc. The name of the variable should describe it. Don't worry about long names since we minify/uglify the code during the build.
-   **Quotes**: Please use double quotes (\") at all times
-   **Comments**: Please use [JSDoc](https://en.wikipedia.org/wiki/JSDoc) to document your the internal methods of your component with at least the following details:
    -   A description of the method
    -   A list of parameters annotated with `@param` keyword and a description of what is it
    -   A description of the returned value annotated with `@returns`
-   **Types**: All variables, constants and parameters must have a type unless it's unknown. If the type is generic then please use [Typescript generics](https://www.typescriptlang.org/docs/handbook/generics.html) so that the user can pass the type.

## **Unit Test**

Please write your own unit test before submitting a pull request. We have [status checks](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-status-checks) setup for this repository that will prevent you from merging if the tests are failing. We also have [coveralls](https://coveralls.io) status check that will report if your changes will affect our overall unit tests coverage.

-   **Quality**: Please make sure that you don't write unit test for the sake of increasing test coverage. Instead, start by writing test cases that tests the core functionalities first covering all the test cases you can think of, and then you can consider increasing test coverage.
-   **Coverage**: We strive to have our unit test coverage at **100%**, however, our minimum test coverage requirement is at **85%**.
-   **Practices**: Try not to create unnecessary repetition of code to test different scenarios. Instead, you can write an array of test cases and loop through then to test each one. You can check our implementation in any of the components.
-   **Types**: Yes, we use Typescript when writing unit tests as well. It makes it much easier to catch errors when coding.

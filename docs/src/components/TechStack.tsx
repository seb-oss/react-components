import React from "react";
import { withPrefix } from "gatsby";
import pkg from "@pkg";
import "../styles/tech-stack.scss";

function clean(version: string): string {
    return version?.replace(/^[~^]/g, "");
}

const reactVersion: string = clean(pkg.dependencies["react"]);
const bootstrapVersion: string = clean(pkg.dependencies["@sebgroup/bootstrap"]);
const typescriptVersion: string = clean(pkg.devDependencies.typescript);

export const TechStack: React.FC = React.memo(() => {
    return (
        <div className="tech-stack row">
            <div className="col-md-4 col-12">
                <div className="img">
                    <a href="https://reactjs.org/" target="_blank" rel="noreferrer noopener nofollow">
                        <img className="img-fluid" src={withPrefix("/react.png")} alt="React" />
                    </a>
                </div>
                <h3>React</h3>
                <h5>{reactVersion}</h5>
            </div>
            <div className="col-md-4 col-12">
                <div className="img">
                    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer noopener nofollow">
                        <img className="img-fluid" src={withPrefix("/typescript.png")} alt="Typescript" />
                    </a>
                </div>
                <h3>Typescript</h3>
                <h5>{typescriptVersion}</h5>
            </div>
            <div className="col-md-4 col-12">
                <div className="img">
                    <a href="https://sebgroup.github.io/bootstrap/" target="_blank" rel="noreferrer noopener nofollow">
                        <img className="img-fluid" src={withPrefix("/bootstrap.png")} alt="Bootstrap" />
                    </a>
                </div>
                <h3>SEB Bootstrap</h3>
                <h5>{bootstrapVersion}</h5>
            </div>
        </div>
    );
});

import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TechStack } from "../components/TechStack";
import { httpGet } from "../utils/http";
import { withPrefix } from "gatsby";
import { getCommonMetaTag, initMetaConfiguration } from "../utils/meta.util";
import AccessibilityIllustration from "../../static/illustrations/accessibility.svg";
import AdjustmentsIllustration from "../../static/illustrations/adjustments.svg";
import DesignTeamIllustration from "../../static/illustrations/design-team.svg";
import "../styles/home.scss";

const designer: GithubContributor = {
    login: "boonying",
    type: "User",
    html_url: "https://www.behance.net/boonying",
    avatar_url: withPrefix("/boonying-profile.png"),
};

export default function Home() {
    const [contributors, setContributors] = React.useState<GithubContributor[]>([]);
    const commonMetaTags: Array<MetaTag> = React.useMemo(() => getCommonMetaTag(), []);

    React.useEffect(() => {
        httpGet<GithubContributor[]>("https://api.github.com/repos/sebgroup/ng-components/contributors").then((response) => {
            if (response.status === 200 && response.data?.length) {
                setContributors(response.data);
            }
        });
        initMetaConfiguration();
    }, []);

    return (
        <div>
            <Helmet>
                <title>SEB React Components</title>
                {commonMetaTags.map((item: MetaTag, index: number) =>
                    item.property ? <meta key={index} property={item.property} content={item.content} /> : <meta key={index} name={item.name} content={item.content} />
                )}
            </Helmet>
            <Navbar />
            <main>
                <section id="getting-started" className="jumbotron">
                    <div className="container">
                        <h1>React components</h1>
                        <p className="lead">A set of React components based on SEB design library guidelines</p>
                        <Link className="btn btn-light" to="/docs" role="button">
                            Get started
                        </Link>
                    </div>
                </section>

                <section id="features">
                    <div className="container">
                        <h2>Why use our components?</h2>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <DesignTeamIllustration />
                                <h4>Speed up development</h4>
                                <p>You don't have to spend time developing your own components. You can utilize these well-designed components to speed up your development.</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <AccessibilityIllustration />
                                <h4>Accessibility support</h4>
                                <p>Accessibilty is supported out of the box and we are always improving it. We care deeply about providing the best experience for all users.</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <AdjustmentsIllustration />
                                <h4>Highly configurable</h4>
                                <p>These components are designed to give high flexibility to developers and multiple ways of achieving the same outcomes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="technical-stack">
                    <div className="container">
                        <h2>Technical stack</h2>
                        <TechStack />
                    </div>
                </section>

                {/* <section id="tests">
                    <div className="container py-5">
                        <h2 className="text-center mb-5">Statistics</h2>
                        [CHART]
                    </div>
                </section> */}

                <section id="call-to-action">
                    <div className="container">
                        <h4>Get started with SEB React Components</h4>
                        <Link to="/docs" className="btn btn-light">
                            Get started
                        </Link>
                    </div>
                </section>

                <section id="contributors">
                    <div className="container">
                        <h2>Contributors</h2>
                        <div>
                            {contributors.map((person: GithubContributor, i: number) => (
                                <div key={i}>
                                    <a href={person.html_url} target="_blank" rel="noreferrer noopener nofollow">
                                        <img className="avatar" width="50px" src={person.avatar_url} alt={person.login} title={person.login} />
                                    </a>
                                </div>
                            ))}
                            <div>
                                <a href={designer.html_url} target="_blank" rel="noreferrer noopener nofollow">
                                    <img className="avatar" width="50px" src={designer.avatar_url} alt={designer.login} title={designer.login} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

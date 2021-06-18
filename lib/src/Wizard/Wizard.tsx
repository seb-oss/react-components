import React from "react";
import { CloseButton } from "../CloseButton";
import "./wizard.scss";

export type WizardProps = JSX.IntrinsicElements["div"] & {
    /** Heading/text for the wizard. */
    heading: string;
    /** Add controls/actions in the header of the wizard. */
    actions?: React.ReactNodeArray;
    /** A series of ordered steps to be managed by the wizard, it relies on react router for navigations */
    steps?: Array<WizardStep>; // temporary making it optional, this should be mandatory
};

export type WizardStep = {
    /**
     * The path of the step, a string representation of the location, created by concatenating the
     * location’s pathname, search, and hash properties.
     * */
    path: string;
    /** The component to be displayed when the route matches the step path. */
    component: React.Component;
    /** Additional data for the Step component */
    data: WizardStepData;
};

export type WizardStepData = {
    /**
     * Heading/text for link to step in navigation and as a category/label heading in each step.
     * If no page header is defined the heading will be used as page heading too. */
    heading: string;
    /**
     * Page heading for step. If no page heading is defined the wizard will fall back to heading instead.
     */
    pageHeading?: string;
    /**
     * Add controls/actions in the footer of the step, if no controls were provided,
     * controls for previous and next will be added by default.
     * */
    controls?: Array<WizardControl>;
    /**
     * Set state for a step (adds icon and highlights state in navigation), it can be used to highlight
     * and clarify wizard progress - completed steps, errors etc. By default steps will be marked
     * as finished or completed when you've passed them.
     * */
    state?: WizardStepState;
    /** Add secondary content to the step. */
    secondaryContent?: React.ReactNode;
};

export type WizardControl = {
    /**
     * Type of control. Both next and prev will add icons and by default as well as try to navigate
     * to next/previous step if no path is passed.
     * */
    type: WizardControlType;
    /** Text that will be added to the control. */
    label: string;
    /** Add a path to the control which will be used a path for the router link. */
    path?: string;
    /** Add a custom class to the control/button. */
    className?: string;
};

export type WizardControlType = "next" | "prev" | "cancel" | "save" | "close";

export type WizardStepState = "success" | "warning" | "danger" | "info";

export const Wizard: React.FC<WizardProps> = React.memo(
    React.forwardRef(({ heading, actions, steps, ...props }: WizardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <div className="wizard">
                {/* WizardNavBar */}
                <div className="wizard-navbar">
                    <nav className="navbar navbar-light bg-white">
                        <span className="navbar-brand">{heading}</span>
                        {/* WizardActions */}
                        <div className="wizard-actions">
                            <div className="d-flex align-items-center">
                                {actions?.map((action) => action)}
                                <CloseButton />
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="row no-gutters">
                    {/* temporary hardcode step data to show sample structure */}
                    <div className="col-12 col-md-auto">
                        {/* WizardNavigations */}
                        <div className="wizard-navigations">
                            <div className="bg-secondary py-3">
                                <ol className="list-group list-group-ordered mt-3">
                                    <li className="list-group-item">
                                        <a>Needs and Requirements</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a>Fill in Information</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a>Summary</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        {/* WizardContent */}
                        <div className="wizard-content">
                            <main className="container-fluid p-3 p-md-4 px-xl-5 bg-white">
                                <h2>Step Header</h2>
                                <h3>Step Sub-Header</h3>
                                <div className="row no-gutters">
                                    <div className="col-12 col-lg mr-lg-3">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                                        recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </div>
                                    {/* WizardSecondaryContent */}
                                    <div className="wizard-secondary-content">
                                        <div className="col-12 col-lg-auto ml-lg-3 mb-3">Secondary content</div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        {/* WizardFooter */}
                        <div className="wizard-footer">
                            <div className="container-fluid">
                                <div className="px-md-4 px-xl-5 pb-3 pb-md-0">
                                    {/* WizardControls */}
                                    <div className="wizard-controls">
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-outline-primary" type="button">
                                                &lt;- Prev
                                            </button>
                                            <button className="btn btn-primary" type="button">
                                                Next -&gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);

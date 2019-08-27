import * as React from "react";
import "./modal-style.scss";

interface ModalProps {
    toggle: boolean;
    id?: string;
    fullscreen?: boolean;
    position?: "left" | "right";
    className?: string;
    disableBackdropDismiss?: boolean;
    ariaLabel?: string;
    ariaDescribedby?: string;
    dismissModal?: () => void;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

interface ModalState {
    open: boolean;
    close: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            open: false,
            close: false
        };
    }

    componentDidMount(): void {
        if (this.props.toggle === true) {
            this.setState({ open: true });
        }
    }

    componentDidUpdate(prevProps: ModalProps): void {
        if (this.props.toggle !== prevProps.toggle) {
            this.setState({ open: !prevProps.toggle, close: prevProps.toggle });
        }
    }

    /**
     * set modal class names
     * @returns string of concatenated class names
     */
    setModalClasses(): string {
        const classes: string = this.classNames({
            "show": this.state.open,
            "fade": this.state.close,
            "modal-aside": !!this.props.position,
            "modal-aside-left": this.props.position === "left",
            "modal-aside-right": this.props.position === "right",
            "modal-fullscreen": this.props.fullscreen,
            [this.props.className]: !!this.props.className
        });
        return classes;
    }

    /**
     * Convert object to string
     * @param { [key: string]: boolean } classes list of classes to be appended
     * @returns {string} string of concatenated class names
     */
    classNames(classes: { [key: string]: boolean }): string {
        return Object.entries(classes)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
            .join(" ");
    }

    /**
     * emit dismissModal event when backdrop is clicked
     * @param {React.MouseEvent} event clicked element
     */
    closeModal(event: React.MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        if (event && event.target && target.classList && target.classList.length) {
            const classList: DOMTokenList = target.classList;
            if (classList.contains("modal")) {
                this.setState({ open: false, close: true });
                this.props.dismissModal();
            }
        }
    }

    render() {
        return (
            <div
                className={"modal-backdrop" + (this.state.open ? " show" : " fade")}
                onClick={(event: React.MouseEvent) => { !this.props.disableBackdropDismiss && this.closeModal(event); }}
            >
                <div role="dialog" tabIndex={-1} className={"modal " + this.setModalClasses()}>
                    <div role="document" className="modal-dialog" tabIndex={-1}>
                        <div className="modal-content">
                            <div className="modal-header">{this.props.header}</div>
                            <div className="modal-body">{this.props.body}</div>
                            <div className="modal-footer">{this.props.footer}</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

import * as React from "react";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import { ReactComponent as BarsIcon } from "../../assets/icons/bars.svg";
import { ReactComponent as MagnifierIcon } from "../../assets/icons/magnifier.svg";
import { ReactComponent as SEBLogo } from "../../assets/svgs/seblogo.svg";
const reactLogo: string = require("../../assets/images/ReactLogo.png");
const sidebarData = require("../../assets/components-list.json");

interface SideBarDataItem {
    name: string;
    path: string;
}

interface TitleBarProps {
    onToggleClick: () => any;
    history?: any;
}

interface TitleBarState {
    searchTerm: string;
    componentsList: Array<SideBarDataItem>;
    searchList: Array<SideBarDataItem>;
    searchInFocus: boolean;
    highlighted: number;
}

export default class TitleBar extends React.Component<TitleBarProps, TitleBarState> {
    private searchRef: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);

        this.state = {
            componentsList: [],
            searchTerm: "",
            searchList: [],
            searchInFocus: false,
            highlighted: 0,
        };
        this.searchRef = React.createRef();
        this.chooseHighlightedItem = this.chooseHighlightedItem.bind(this);
        this.searchItemClicked = this.searchItemClicked.bind(this);
        this.searchTermChange = this.searchTermChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.dismissSearch = this.dismissSearch.bind(this);
    }

    /**
     * Handle input change
     * @param {React.ChangeEvent<HTMLInputElement>} event Change event
     */
    searchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({ searchTerm: event.target.value.toLowerCase(), highlighted: 0 }, () => this.searchComponents());
    }

    /** Search components list as you type */
    searchComponents(): void {
        if (this.state.searchTerm.length >= 2) {
            const result = this.state.componentsList.filter((x) => x.name.toLowerCase().match(this.state.searchTerm)).slice(0, 5);
            this.setState({ searchList: result });
        }
        if (this.state.searchTerm === "") {
            this.setState({ searchList: [] });
        }
    }

    /** Choose the highlighted item and navigate to it */
    chooseHighlightedItem() {
        if (this.state.searchList && this.state.searchList.length > 0) {
            const path: string = this.state.searchList[this.state.highlighted].path;
            if (document.activeElement === this.searchRef.current) {
                (this.searchRef.current as HTMLInputElement).blur();
            }
            this.setState({ searchList: [], searchTerm: "", searchInFocus: false }, () => this.props.history.push(path));
        }
    }

    /**
     * Navigate to the component page when its clicked in the search list
     * @param {string} path The path to navigate to
     */
    searchItemClicked(path: string) {
        this.setState({ searchList: [], searchTerm: "", searchInFocus: false }, () => this.props.history.push(path));
    }

    /**
     * Handle keyboard key down (Enter)
     * @param {React.KeyboardEvent<HTMLInputElement>} event The keyboard event
     */
    handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.which === 13) {
            this.chooseHighlightedItem();
        }
    }

    /**
     * Enable search mode when the search input is in focus
     * @note if the search term already has a value, the value will be used to search for components
     */
    handleFocus(): void {
        this.setState({ searchInFocus: true }, () => this.searchComponents());
    }

    /**
     * Dismiss the search mode when clicked on the focus div covering the whole page
     * @param {React.MouseEvent<HTMLDivElement>} event The mouse click event
     */
    dismissSearch(event: React.MouseEvent<HTMLDivElement>): void {
        event.stopPropagation();
        this.setState({ searchInFocus: false, searchList: [] });
    }

    /**
     * Checks whether the input key is an `Escape` key
     * @param {React.KeyboardEvent<HTMLInputElement>} event The keyboard event
     * @returns {boolean} True if it is `Escape` key
     */
    isEscapeKey(event: React.KeyboardEvent<HTMLInputElement>): boolean {
        if (event.key.toLowerCase() === "escape" || event.key.toLowerCase() === "esc") {
            return true;
        } else if (event.keyCode === 27) {
            return true;
        } else {
            return false;
        }
    }

    onKeyPressListener: EventListener = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === "f" || e.keyCode === 6)) {
            this.searchRef.current.focus();
        }
    };

    onKeyUpListener: EventListener = (e: KeyboardEvent) => {
        if (document.activeElement === this.searchRef.current) {
            if (e.key.toLowerCase() === "escape" || e.keyCode === 27) {
                if (document.activeElement === this.searchRef.current) {
                    this.setState({ searchTerm: "", searchList: [], searchInFocus: false }, () => (this.searchRef.current as HTMLInputElement).blur());
                }
            }
            if (e.key.toLowerCase() === "arrowup" || e.keyCode === 38) {
                e.preventDefault();
                if (this.state.highlighted > 0) {
                    this.setState({ highlighted: this.state.highlighted - 1 });
                }
            }
            if (e.key.toLowerCase() === "arrowdown" || e.keyCode === 40) {
                e.preventDefault();
                if (this.state.highlighted < this.state.searchList.length - 1) {
                    this.setState({ highlighted: this.state.highlighted + 1 });
                }
            }
        }
    };

    componentDidMount() {
        this.setState({ componentsList: [].concat(...[sidebarData.form, sidebarData.ui, sidebarData.other]) });
        document.addEventListener("keyup", this.onKeyUpListener);
        document.addEventListener("keypress", this.onKeyPressListener);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUpListener);
        document.removeEventListener("keypress", this.onKeyPressListener);
    }

    render() {
        return (
            <div className="title-bar">
                <div className="main-title">
                    <div className="tech-logo">
                        <img className="logo-icon" src={reactLogo} />
                    </div>
                    <div className="title">SEB React components</div>
                    <div className="search-holder" onKeyDown={this.handleKeyDown} onFocus={this.handleFocus}>
                        {this.state.searchInFocus && <div className="input-cover" onClick={this.dismissSearch} />}
                        <TextBoxGroup
                            name="textInput"
                            placeholder="Find components (Ctrl+Shift+f)"
                            value={this.state.searchTerm}
                            className="text-input"
                            onChange={this.searchTermChange}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key.toLowerCase() === "escape" && e.preventDefault()}
                            reference={this.searchRef}
                            rightIcon={<MagnifierIcon />}
                        />
                        <div className="search-result">
                            {this.state.searchList && this.state.searchList.length > 0 && (
                                <div className="search-list">
                                    {this.state.searchList.map((item, index) => (
                                        <div
                                            key={index}
                                            onMouseEnter={() => this.setState({ highlighted: index })}
                                            className={"search-item" + (this.state.highlighted === index ? " highlighted" : "")}
                                            onClick={() => {
                                                this.searchItemClicked(item.path);
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {this.state.searchList && !this.state.searchList.length && this.state.searchTerm && this.state.searchInFocus && (
                                <div className="search-list">
                                    <div className="search-item no-match">No match</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="logo">
                        <SEBLogo className="logo-icon" />
                    </div>
                </div>
                <div className="subtitle-bar">
                    <div className="sidebar-toggler">
                        <BarsIcon className="bars" onClick={this.props.onToggleClick ? this.props.onToggleClick : null} />
                    </div>
                    <div className="sidebar-title">@sebgroup/react-components</div>
                </div>
            </div>
        );
    }
}

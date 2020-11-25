import React, { useState } from "react";
import classnames from "classnames";
import { useIsMobile } from "hooks/useIsMobile";
import BarsIcon from "../../static/icons/bars.svg";
import SearchIcon from "../../static/icons/search.svg";
import ExternalLinkIcon from "../../static/icons/external-link.svg";
import { Link } from "gatsby";
import { urls } from "@configs";
import comps from "../../static/components-list.json";
import { TextBox } from "@sebgroup/react-components/TextBox";
import "../styles/sidemenu.scss";

const SIDE_MENU_STORAGE_KEY = "SIDEMENU";

const components: Array<ComponentsListItem> = comps.sort((a, b) => (a.name > b.name ? 1 : -1));

/**
 * Retrieves the value of the side menu toggle from local storage
 * @returns The value of the side menu's toggle
 */
function getStoredValue(): boolean {
    let value: boolean = true;
    if (typeof window !== "undefined") {
        try {
            const lsValue: string = localStorage.getItem(SIDE_MENU_STORAGE_KEY);
            value = lsValue !== null ? JSON.parse(lsValue) : true;
        } catch (e) {}
    }
    return value;
}

export const SideMenu: React.FC = React.memo(() => {
    const [className, setClassName] = useState<string>("side-menu");
    const [prestine, setPrestine] = React.useState<boolean>(true);
    const [toggle, setToggle] = React.useState<boolean>(getStoredValue());
    const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("");
    const [highlighted, setHighlighted] = React.useState<number>(-1);
    const listRef: React.MutableRefObject<HTMLElement> = React.useRef();
    const isMobile = useIsMobile();

    const getChildIndex = (children: HTMLCollectionOf<HTMLAnchorElement>, value: number): number => {
        let i: number = 0;
        let found: number = -1;
        do {
            if (Number(children.item(i).getAttribute("data-value")) === value) {
                found = i;
            }
            i++;
        } while (i < children.length && found === -1);
        return found;
    };

    const searchNavigations = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        let highlightedItem: number;
        let children: HTMLCollectionOf<HTMLAnchorElement>;
        switch (e.key?.toLowerCase()) {
            case "escape":
                if (search === "" && highlighted === -1) {
                    document.getElementById("searchTextBox").blur();
                } else {
                    setHighlighted(-1);
                    setSearch("");
                }
                break;
            case "enter":
                const currentElements: HTMLCollection = listRef.current.children;
                if (currentElements.length) {
                    if (highlighted !== -1) {
                        (currentElements.item(highlighted) as HTMLElement).click();
                        setHighlighted(-1);
                        setSearch("");
                    } else {
                        setHighlighted(0);
                    }
                }
                break;
            case "arrowdown":
                e.preventDefault();
                children = listRef.current.children as HTMLCollectionOf<HTMLAnchorElement>;
                if (children.length) {
                    highlightedItem = getChildIndex(children, highlighted);
                    if (highlightedItem === -1) {
                        setHighlighted(Number(children.item(0).getAttribute("data-value")));
                    } else {
                        if (children.item(highlightedItem).nextSibling) {
                            setHighlighted(Number(children.item(highlightedItem).nextElementSibling.getAttribute("data-value")));
                        }
                    }
                }
                break;
            case "arrowup":
                e.preventDefault();
                children = listRef.current.children as HTMLCollectionOf<HTMLAnchorElement>;
                if (children.length) {
                    highlightedItem = getChildIndex(children, highlighted);
                    if (highlightedItem === -1) {
                        setHighlighted(Number(children.item(0).getAttribute("data-value")));
                    } else {
                        if (children.item(highlightedItem).previousSibling) {
                            setHighlighted(Number(children.item(highlightedItem).previousElementSibling.getAttribute("data-value")));
                        }
                    }
                }
                break;
        }
    };

    const onToggle = () => {
        const newToggle: boolean = !toggle;
        setToggle(newToggle);
        setIsAnimating(true);
        if (prestine) {
            setPrestine(false);
        }
        localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(newToggle));
    };

    React.useEffect(() => {
        const initialToggle: boolean = getStoredValue();
        setClassName(
            classnames("side-menu", {
                opened: (initialToggle && prestine) || (toggle && !isAnimating),
                closed: (!initialToggle && prestine) || (!toggle && !isAnimating),
                openning: !prestine && toggle && isAnimating,
                closing: !prestine && !toggle && isAnimating,
                mobile: isMobile,
            })
        );
    }, [prestine, isMobile, isAnimating, toggle]);

    React.useEffect(() => {
        if (isMobile) {
            // Only change the value if it's `false`, otherwise, no need to trigger re-render
            if (!isMobile) {
                if (toggle) {
                    setToggle(false);
                }
            }
        } else {
            // Only change the value if it's `true`, otherwise, no need to trigger re-render
            if (isMobile) {
                if (!toggle) {
                    setToggle(true);
                }
            }
        }
    }, [isMobile]);

    return (
        <aside className={className}>
            <div
                className="toggle"
                onClick={onToggle}
                onAnimationStart={() => {
                    setIsAnimating(true);
                }}
                onAnimationEnd={() => {
                    setIsAnimating(false);
                }}
            >
                <BarsIcon />
            </div>

            <div className="sidemenu-content">
                <h5 className="header mr-5">SEB React Components</h5>
                <hr />
                <nav className="components-list">
                    <Link to="/" className="list-item">
                        Home
                    </Link>
                    <Link to="/docs/getting-started" activeClassName="highlighted" className="list-item">
                        Getting Started
                    </Link>
                    <a href={urls.releases} target="_blank" rel="noreferrer noopener nofollow" className="list-item">
                        <ExternalLinkIcon className="align-icon-with-text" />
                        Release notes
                    </a>
                    <a href={urls.issues} target="_blank" rel="noreferrer noopener nofollow" className="list-item">
                        <ExternalLinkIcon className="align-icon-with-text" />
                        Issues
                    </a>
                </nav>
                <hr />
                <h4>
                    Components <span className="badge badge-dark float-right rounded">{components?.length || 0}</span>
                </h4>

                <TextBox
                    id="searchTextBox"
                    className="sidemenu-search"
                    name="search"
                    type="text"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const keyword: string = e.target.value;
                        setSearch(keyword);
                        setHighlighted(keyword.length ? 0 : -1);
                    }}
                    onKeyUp={searchNavigations}
                    placeholder="Search (Control+Shift+F)"
                    rightSlot={<SearchIcon />}
                />

                <nav className="components-list" ref={listRef}>
                    {components
                        .filter((comp: ComponentsListItem) => (search ? comp.name.toLowerCase().indexOf(search.toLowerCase()) > -1 : true))
                        .map((comp: ComponentsListItem, i: number) => (
                            <Link
                                key={i}
                                className={classnames("list-item", { highlighted: highlighted === i })}
                                activeClassName="active"
                                data-value={i}
                                to={comp.path}
                                onClick={() => {
                                    isMobile && setToggle(false);
                                }}
                            >
                                {comp.name}
                            </Link>
                        ))}
                </nav>
            </div>
        </aside>
    );
});

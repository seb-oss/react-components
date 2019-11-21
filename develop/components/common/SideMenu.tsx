import * as React from "react";
import { Image } from "../../../src/Image";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import { SideBarItem } from "typings/generic.type";
import { sortBy } from "lodash";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Toggle } from "../../../src/Toggle/Toggle";
import { useMediaQuery } from "../../utils/customHooks";
const SEBLogo: string = require("../../assets/images/icons/seblogo.svg");
const LogoSize: string = "64px";
const listOfComponents: Array<SideBarItem> = sortBy(require("../../assets/components-list.json").components, "name");
const SIDE_MENU_STORAGE_KEY: string = "sidemenu";

function getChildIndex(children: HTMLCollectionOf<HTMLAnchorElement>, value: number) {
    let i: number = 0;
    let found: number = -1;
    do {
        if (Number(children.item(i).getAttribute("data-value")) === value) {
            found = i;
        }
        i++;
    } while (i < children.length && found === -1);
    return found;
}

type SideMenuProps = {
    darkMode: boolean;
    onDarkModeChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
    const isMobile: boolean = useMediaQuery("(max-width: 420px)");
    const [search, setSearch] = React.useState<string>("");
    const [toggle, setToggle] = React.useState<boolean>(JSON.parse(localStorage.getItem(SIDE_MENU_STORAGE_KEY)));
    const [highlighted, setHighlighted] = React.useState<number>(-1);
    const listRef = React.useRef<HTMLElement>(null);
    const [inputFocus, setInputFocus] = React.useState<boolean>(false);
    const match = useRouteMatch();

    const searchComponents = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setHighlighted(-1);
        setSearch(e.currentTarget.value);
    }, []);

    const searchNavigations = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        let highlightedItem: number;
        let children: HTMLCollectionOf<HTMLAnchorElement>;
        switch (e.key.toLowerCase()) {
            case "escape":
                setHighlighted(-1);
                setSearch("");
                break;
            case "enter":
                if (highlighted !== -1) {
                    (listRef.current.children.item(highlighted) as HTMLAnchorElement).click();
                    setHighlighted(-1);
                    setSearch("");
                } else {
                    (listRef.current.children.item(0) as HTMLAnchorElement).click();
                    setHighlighted(-1);
                    setSearch("");
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
    }, [highlighted, listRef]);

    React.useEffect(() => {
        if (isMobile && (toggle || toggle === null)) {
            setToggle(false);
        }
    }, [match]);

    return (
        <aside
            className={
                "side-menu"
                + (toggle === null ? "" : toggle ? " opened" : " closed")
                + (isMobile ? " mobile" : "")
            }
        >
            <div
                className="toggle"
                onClick={() => {
                    const value: boolean = toggle === null ? isMobile : !toggle;
                    setToggle(value);
                    localStorage.setItem(SIDE_MENU_STORAGE_KEY, String(value));
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14"><path id="menu" fillRule="evenodd" d="M947,253H925a1,1,0,0,1,0-2h22A1,1,0,0,1,947,253Zm0-6H925a1,1,0,0,1,0-2h22A1,1,0,0,1,947,247Zm-22,10h22a1,1,0,0,1,0,2H925A1,1,0,0,1,925,257Z" transform="translate(-924 -245)" /></svg>
            </div>
            <div className="sidemenu-content">
                <Image src={SEBLogo} width={LogoSize} height={LogoSize} useImgTag alt="SEB Logo" />
                <h4 className="header">React Components</h4>
                <TextBoxGroup
                    className={"sidemenu-search" + (inputFocus ? " in-focus" : "")}
                    name="search"
                    type="search"
                    value={search}
                    onChange={searchComponents}
                    placeholder="Type to search"
                    onKeyUp={searchNavigations}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    rightIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24.03" height="24" viewBox="0 0 24.03 24"><path fillRule="evenodd" d="M1221,240a9,9,0,1,1-9,9A9,9,0,0,1,1221,240Zm0,2a7,7,0,1,1-7,7A7,7,0,0,1,1221,242Zm6.71,12.282,8.01,7.984a1.011,1.011,0,0,1-1.43,1.428l-8.01-7.984A1.011,1.011,0,0,1,1227.71,254.282Z" transform="translate(-1212 -240)" /></svg>
                    }
                />
                <nav className="components-list" ref={listRef}>
                    <DisplayList
                        list={listOfComponents.filter((item: SideBarItem) => {
                            if (search) {
                                return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                            } else {
                                return true;
                            }
                        }).map((item: SideBarItem, index: number) =>
                            <NavLink
                                className={"list-item" + (highlighted === index ? " highlighted" : "")}
                                key={index}
                                to={item.path}
                                activeClassName="active"
                                data-value={index}
                            >
                                {item.name}
                            </NavLink>
                        )}
                    />
                </nav>
                <hr />
                <div className="options">
                    <h5>Dark Mode</h5>
                    <Toggle
                        name="dark-mode"
                        value={props.darkMode}
                        onChange={props.onDarkModeChanged}
                    />
                </div>
            </div>
        </aside>
    );
};

type DisplayListProps = { list: Array<any> };
const DisplayList: React.FC<DisplayListProps> = (props: DisplayListProps) => {
    return (
        <>
            {props.list.length ? props.list : <div>Nothing found</div>}
        </>
    );
};

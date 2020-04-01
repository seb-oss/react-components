import * as React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Tabs, TabsProps } from "./Tabs";

type keyboardTestUnit = { key: string; registeredAt: number; expectedToChange: number };

describe("Component: Tabs", () => {
    let props: TabsProps;
    let wrapper: ShallowWrapper<TabsProps>;

    beforeEach(() => {
        props = {
            list: [
                { text: "First", disabled: false },
                { text: "Second", disabled: false },
                { text: "Third", disabled: false },
                { text: "Fourth", disabled: true }
            ],
            activeTab: 0,
            onClick: jest.fn()
        };
        wrapper = shallow(<Tabs {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const updatedProps: TabsProps = { ...props, className: "MyTabsClass", id: "MyIDClass" };
        wrapper.setProps({ ...updatedProps });
        expect(wrapper.hasClass(updatedProps.className)).toBeTruthy();
        expect(wrapper.find(`#${updatedProps.id}`).length).toBeGreaterThan(0);
    });

    it("Should fire click event if passed", () => {
        wrapper
            .find(".nav-link")
            .last()
            .simulate("click");
        expect(props.onClick).toHaveBeenCalledTimes(0);
        wrapper
            .find(".nav-link")
            .at(1)
            .simulate("click");
        expect(props.onClick).toBeCalled();
    });

    it("Should render a tab as disabled if passed", () => {
        expect(
            wrapper
                .find(".nav-link")
                .last()
                .hasClass("disabled")
        ).toBeTruthy();
    });

    it("Should call componentDidUpdate change localActive when active change ", () => {
        wrapper.setProps({ activeTab: 2 });
        expect(
            wrapper
                .find(".nav-link")
                .at(2)
                .hasClass("active")
        ).toBeTruthy();
    });

    describe("Should change active tab when controlled with arrows and select buttons", () => {
        let mountedWrapper: ReactWrapper<TabsProps>;
        const testList: Array<keyboardTestUnit> = [
            { key: "arrowleft", registeredAt: 1, expectedToChange: 0 },
            { key: "arrowdown", registeredAt: 1, expectedToChange: 0 },
            { key: "arrowright", registeredAt: 1, expectedToChange: 2 },
            { key: "arrowup", registeredAt: 1, expectedToChange: 2 },
            { key: " ", registeredAt: 0, expectedToChange: 0 },
            { key: "space", registeredAt: 0, expectedToChange: 0 },
            { key: "enter", registeredAt: 0, expectedToChange: 0 },
            { key: "backspace", registeredAt: 1, expectedToChange: 1 } // Should do nothing
        ];

        beforeEach(() => {
            const onClick: (index: number) => void = (index: number) => mountedWrapper.setProps({ activeTab: index });
            mountedWrapper = mount(<Tabs {...{ ...props, activeTab: 1, onClick }} />);
        });

        testList.map((item: keyboardTestUnit) => {
            it(`Testing key [${item.key}]`, () => {
                mountedWrapper
                    .find(".nav-link")
                    .at(item.registeredAt)
                    .simulate("keydown", { key: item.key });
                expect(
                    mountedWrapper
                        .find(".nav-link")
                        .at(item.expectedToChange)
                        .hasClass("active")
                ).toBeTruthy();
            });
        });
    });

    it("Should only change tab with keyboard if active tab is correct", () => {
        const mountedWrapper: ReactWrapper<TabsProps> = mount(<Tabs {...{ ...props, activeTab: 15 }} />);
        mountedWrapper
            .find(".nav-link")
            .at(1)
            .simulate("keydown", { key: "enter" });
        expect(
            mountedWrapper
                .find(".nav-link")
                .at(1)
                .hasClass("active")
        ).toBeFalsy();
    });
});

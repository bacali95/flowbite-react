import type { Meta, StoryFn } from "@storybook/react";
import {
  Badge,
  Button,
  Sidebar,
  SidebarCollapse,
  SidebarCTA,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
  type SidebarProps,
} from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta;

const Template: StoryFn<SidebarProps> = (props) => <Sidebar {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards} label="Pro" labelColor="gray">
            Kanban
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox} label="3">
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

export const WithoutIcons = Template.bind({});
WithoutIcons.storyName = "No icons";
WithoutIcons.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#">Dashboard</SidebarItem>
          <SidebarItem href="#" label="Pro" labelColor="alternative">
            Kanban
          </SidebarItem>
          <SidebarItem href="#" label="3">
            Inbox
          </SidebarItem>
          <SidebarItem href="#">Users</SidebarItem>
          <SidebarItem href="#">Products</SidebarItem>
          <SidebarItem href="#">Sign In</SidebarItem>
          <SidebarItem href="#">Sign Up</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

export const MultiLevelDropdown = Template.bind({});
MultiLevelDropdown.storyName = "Multi-level dropdown";
MultiLevelDropdown.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
            <SidebarItem href="#">Products</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

export const DefaultExpandedDropdown = Template.bind({});
DefaultExpandedDropdown.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
            <SidebarItem href="#">Products</SidebarItem>
          </SidebarCollapse>
          <SidebarCollapse icon={HiShoppingBag} label="Billing" open>
            <SidebarItem href="#">Usage Summary</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

export const ContentSeparator = Template.bind({});
ContentSeparator.storyName = "Content separator";
ContentSeparator.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Kanban
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
          <SidebarItem href="#" icon={BiBuoy}>
            Help
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

export const CTAButton = Template.bind({});
CTAButton.storyName = "CTA button";
CTAButton.args = {
  children: (
    <>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Kanban
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
      <SidebarCTA>
        <div className="mb-3 flex items-center">
          <Badge color="warning">Beta</Badge>
          <div className="-m-1.5 ml-auto">
            <Button aria-label="Close" outline>
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
        <p className="mb-3 text-sm text-cyan-900 dark:text-cyan-400">
          Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your
          profile.
        </p>
        <a
          href="#"
          className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          Turn new navigation off
        </a>
      </SidebarCTA>
    </>
  ),
  collapsed: false,
};

export const LogoBranding = Template.bind({});
LogoBranding.storyName = "Logo branding";
LogoBranding.args = {
  children: (
    <>
      <SidebarLogo href="#" img="favicon.svg" imgAlt="Flowbite logo">
        Flowbite
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Kanban
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </>
  ),
  collapsed: false,
};

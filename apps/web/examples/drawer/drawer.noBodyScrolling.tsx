"use client";

import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

export function Component() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <SidebarItems>
                  <SidebarItemGroup>
                    <SidebarItem href="/" icon={HiChartPie}>
                      Dashboard
                    </SidebarItem>
                    <SidebarItem href="/e-commerce/products" icon={HiShoppingBag}>
                      Products
                    </SidebarItem>
                    <SidebarItem href="/users/list" icon={HiUsers}>
                      Users list
                    </SidebarItem>
                    <SidebarItem href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </SidebarItem>
                    <SidebarItem href="/authentication/sign-up" icon={HiPencil}>
                      Sign up
                    </SidebarItem>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                      Docs
                    </SidebarItem>
                    <SidebarItem href="https://flowbite-react.com/" icon={HiCollection}>
                      Components
                    </SidebarItem>
                    <SidebarItem href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </SidebarItem>
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
}
`;

export function Component() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <SidebarItems>
                  <SidebarItemGroup>
                    <SidebarItem href="/" icon={HiChartPie}>
                      Dashboard
                    </SidebarItem>
                    <SidebarItem href="/e-commerce/products" icon={HiShoppingBag}>
                      Products
                    </SidebarItem>
                    <SidebarItem href="/users/list" icon={HiUsers}>
                      Users list
                    </SidebarItem>
                    <SidebarItem href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </SidebarItem>
                    <SidebarItem href="/authentication/sign-up" icon={HiPencil}>
                      Sign up
                    </SidebarItem>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                      Docs
                    </SidebarItem>
                    <SidebarItem href="https://flowbite-react.com/" icon={HiCollection}>
                      Components
                    </SidebarItem>
                    <SidebarItem href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </SidebarItem>
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export const noBodyScrolling: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "drawer/drawer.noBodyScrolling.tsx",
  component: <Component />,
  iframe: 600,
};

import {
  MegaMenu,
  MegaMenuDropdown,
  MegaMenuDropdownToggle,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import {
  MegaMenu,
  MegaMenuDropdown,
  MegaMenuDropdownToggle,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";

function Component() {
  return (
    <MegaMenu>
      <NavbarBrand href="#">
        <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#">Home</NavbarLink>
        <MegaMenuDropdownToggle>
          Company
          <HiChevronDown className="ml-2" />
        </MegaMenuDropdownToggle>
        <NavbarLink href="#">Marketplace</NavbarLink>
        <NavbarLink href="#">Resources</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
      <MegaMenuDropdown>
        <div className="mt-6 border-y border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <div className="mx-auto grid max-w-screen-xl px-4 py-5 text-sm text-gray-500 md:grid-cols-3 md:px-6 dark:text-gray-400">
            <ul className="mb-4 hidden space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Segmentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Marketing CRM
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Online Stores
                </a>
              </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  License
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Resources
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="rounded-lg bg-gray-500 bg-cover bg-local bg-center bg-no-repeat p-8 text-left bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
              style={{
                backgroundImage: 'url("/dashboard-overview.png")',
              }}
            >
              <p className="mb-5 max-w-xl font-extrabold leading-tight tracking-tight text-white">
                Preview the new Flowbite dashboard navigation.
              </p>
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-white px-2.5 py-1.5 text-center text-xs font-medium text-white hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-700"
              >
                Get started
                <HiArrowRight className="ml-2" />
              </button>
            </a>
          </div>
        </div>
      </MegaMenuDropdown>
    </MegaMenu>
  );
}
`;

function Component() {
  return (
    <MegaMenu>
      <NavbarBrand href="#">
        <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#">Home</NavbarLink>
        <MegaMenuDropdownToggle>
          Company
          <HiChevronDown className="ml-2" />
        </MegaMenuDropdownToggle>
        <NavbarLink href="#">Marketplace</NavbarLink>
        <NavbarLink href="#">Resources</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
      <MegaMenuDropdown>
        <div className="mt-6 border-y border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <div className="mx-auto grid max-w-screen-xl px-4 py-5 text-sm text-gray-500 md:grid-cols-3 md:px-6 dark:text-gray-400">
            <ul className="mb-4 hidden space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Segmentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Marketing CRM
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Online Stores
                </a>
              </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  License
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 hover:underline dark:hover:text-primary-500">
                  Resources
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="rounded-lg bg-gray-500 bg-cover bg-local bg-center bg-no-repeat p-8 text-left bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
              style={{
                backgroundImage: 'url("/dashboard-overview.png")',
              }}
            >
              <p className="mb-5 max-w-xl font-extrabold leading-tight tracking-tight text-white">
                Preview the new Flowbite dashboard navigation.
              </p>
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-white px-2.5 py-1.5 text-center text-xs font-medium text-white hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-700"
              >
                Get started
                <HiArrowRight className="ml-2" />
              </button>
            </a>
          </div>
        </div>
      </MegaMenuDropdown>
    </MegaMenu>
  );
}

export const fullWidthImage: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "megaMenu/megaMenu.fullWidthImage.tsx",
  component: <Component />,
};

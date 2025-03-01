import { Footer, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export function MainFooter() {
  return (
    <Footer className="rounded-none bg-gray-50 pb-8 pt-16 shadow-none">
      <div className="mx-auto w-full max-w-8xl px-4">
        <div className="grid w-full justify-between gap-8 md:grid-cols-2">
          <div className="mb-4 max-w-sm lg:mb-0">
            <Link href="/" className="flex items-center gap-3">
              <Image alt="" height="32" src="/favicon.svg" width="32" />
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">Flowbite React</span>
            </Link>
            <p className="mb-3 mt-4 max-w-sm text-gray-600 dark:text-gray-400">
              Flowbite is an ecosystem built on top of Tailwind CSS including a component library, block sections, a
              Figma design system and other resources.
            </p>
            <p className="mb-3 mt-4 max-w-sm text-gray-600 dark:text-gray-400">
              Code licensed{" "}
              <a
                href="https://github.com/themesberg/flowbite-react/blob/main/LICENSE"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                MIT
              </a>
              , docs{" "}
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                CC BY 3.0
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle
                title="Resources"
                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
              />
              <FooterLinkGroup col className="text-gray-600 dark:text-gray-400">
                <FooterLink
                  href="https://github.com/themesberg/flowbite-react"
                  rel="noopener"
                  target="_blank"
                  className="text-base"
                >
                  GitHub
                </FooterLink>
                <FooterLink href="https://flowbite.com/" rel="noopener" target="_blank" className="text-base">
                  Flowbite
                </FooterLink>
                <FooterLink
                  href="https://tailwindcss.com/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-base"
                >
                  Tailwind CSS
                </FooterLink>
                <FooterLink href="https://flowbite.com/figma/" rel="noopener" target="_blank" className="text-base">
                  Figma
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle
                title="Help & Support"
                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
              />
              <FooterLinkGroup col className="text-gray-600 dark:text-gray-400">
                <FooterLink
                  href="https://discord.gg/4eeurUVvTy"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-base"
                >
                  Discord
                </FooterLink>
                <FooterLink
                  href="https://github.com/themesberg/flowbite-react/discussions"
                  rel="noopener"
                  target="_blank"
                  className="text-base"
                >
                  Github Discussions
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle
                title="Legal"
                className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
              />
              <FooterLinkGroup col className="text-gray-600 dark:text-gray-400">
                <FooterLink href="https://flowbite.com/license/" rel="noopener" target="_blank" className="text-base">
                  License
                </FooterLink>
                <FooterLink href="https://flowbite.com/brand/" rel="noopener" target="_blank" className="text-base">
                  Brand guideline
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full text-center sm:flex sm:items-center sm:justify-center">
          <FooterCopyright
            by="All Rights Reserved. Flowbite™ is a registered trademark."
            href="/"
            year={new Date().getFullYear()}
            className="text-base"
          />
        </div>
      </div>
    </Footer>
  );
}

import { cleanup, render, screen } from "@testing-library/react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Footer } from "./Footer";
import { FooterBrand } from "./FooterBrand";
import { FooterCopyright } from "./FooterCopyright";
import { FooterDivider } from "./FooterDivider";
import { FooterIcon } from "./FooterIcon";
import { FooterLink } from "./FooterLink";
import { FooterLinkGroup } from "./FooterLinkGroup";
import { FooterTitle } from "./FooterTitle";

describe("Components / Footer", () => {
  describe("Rendering", () => {
    it('should render an `<a>` with an `<img>` on `FooterBrand href=".."`', () => {
      render(
        <Footer>
          <FooterBrand alt="Flowbite" href="https://flowbite.com" src="">
            Flowbite
          </FooterBrand>
        </Footer>,
      );
      const a = screen.getByTestId("flowbite-footer-brand");
      const img = screen.getByAltText("Flowbite");

      expect(a).toBeInTheDocument();
      expect(a).toContainElement(img);
    });
  });

  it('should render an `<img>` on `FooterBrand src=".."`', () => {
    render(
      <Footer>
        <FooterBrand alt="Flowbite" src="">
          Flowbite
        </FooterBrand>
      </Footer>,
    );
    const img = screen.getByAltText("Flowbite");

    expect(img).toBeInTheDocument();
  });

  it('should render an `<a>` on `FooterCopyright href=".."`', () => {
    render(
      <Footer>
        <FooterCopyright by="Flowbite" href="https://flowbite.com" year={2022}>
          Flowbite
        </FooterCopyright>
      </Footer>,
    );

    expect(copyright()).toContainElement(screen.getByRole("link"));
  });

  it('should render an `<a>` on `FooterIcon href=".."`', () => {
    render(
      <Footer>
        <FooterIcon ariaLabel="Icon" href="/" icon={BsFacebook} />
      </Footer>,
    );
    const iconLink = screen.getAllByRole("link")[0];

    expect(iconLink).toContainElement(icon());
  });

  describe("Theme", () => {
    it("should use `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        footer: {
          root: {
            base: "text-gray-100",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <TestFooter />
        </ThemeProvider>,
      );

      expect(footer()).toHaveClass("text-gray-100");
    });

    it("should use `bgDark` classes", () => {
      const theme: CustomFlowbiteTheme = {
        footer: {
          root: {
            bgDark: "text-gray-100",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <TestFooter />
        </ThemeProvider>,
      );

      expect(footer()).toHaveClass("text-gray-100");
    });

    it("should use `container` classes", () => {
      const theme: CustomFlowbiteTheme = {
        footer: {
          root: {
            container: "text-gray-100",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <TestFooter />
        </ThemeProvider>,
      );

      expect(footer()).toHaveClass("text-gray-100");
    });

    describe("`FooterBrand`", () => {
      it("should use `brand` classes", () => {
        const theme: CustomFlowbiteTheme = {
          footer: {
            brand: {
              base: "text-gray-100",
              img: "text-gray-200",
              span: "text-gray-300",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterBrand alt="Flowbite" href="https://flowbite.com" src="">
                Flowbite
              </FooterBrand>
            </Footer>
          </ThemeProvider>,
        );

        expect(brand()).toHaveClass("text-gray-100");
        expect(screen.getByRole("img")).toHaveClass("text-gray-200");

        cleanup();
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterBrand href="/" src="">
                Flowbite
              </FooterBrand>
            </Footer>
          </ThemeProvider>,
        );

        expect(screen.getByTestId("flowbite-footer-brand-span")).toHaveClass("text-gray-300");
      });
    });

    describe("`FooterCopyright`", () => {
      it("should use `copyright` classes", () => {
        const theme: CustomFlowbiteTheme = {
          footer: {
            copyright: {
              base: "text-gray-100",
              href: "text-gray-200",
              span: "text-gray-300",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterCopyright by="Flowbite" year={2022}>
                Test
              </FooterCopyright>
            </Footer>
          </ThemeProvider>,
        );

        expect(copyright()).toHaveClass("text-gray-100");
        expect(screen.getByTestId("flowbite-footer-copyright-span")).toHaveClass("text-gray-300");

        cleanup();
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterCopyright by="Flowbite" href="/" year={2022}>
                Test
              </FooterCopyright>
            </Footer>
          </ThemeProvider>,
        );

        expect(screen.getByRole("link")).toHaveClass("text-gray-200");
      });
    });

    describe("`FooterIcon`", () => {
      it("should use `icon` classes", () => {
        const theme: CustomFlowbiteTheme = {
          footer: {
            icon: {
              base: "text-gray-800",
              size: "text-gray-900",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterIcon ariaLabel="Icon" href="/" icon={BsFacebook} />
            </Footer>
          </ThemeProvider>,
        );

        expect(icon()).toHaveClass("text-gray-800");

        cleanup();
        render(
          <ThemeProvider theme={theme}>
            <Footer>
              <FooterIcon ariaLabel="Icon" icon={BsFacebook} />
            </Footer>
          </ThemeProvider>,
        );

        expect(icon()).toHaveClass("text-gray-900");
      });
    });

    describe("`FooterTitle`", () => {
      it("should use `title` classes", () => {
        const theme: CustomFlowbiteTheme = {
          footer: {
            title: {
              base: "text-gray-100",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <FooterTitle title="Flowbite" />
          </ThemeProvider>,
        );

        expect(title()).toHaveClass("text-gray-100");
      });
    });
  });
});

function TestFooter() {
  return (
    <Footer bgDark container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">Flowbite</FooterLink>
                <FooterLink href="#">Tailwind CSS</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms & Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

const brand = () => screen.getByTestId("flowbite-footer-brand");

const copyright = () => screen.getByTestId("flowbite-footer-copyright");

const footer = () => screen.getByTestId("flowbite-footer");

const icon = () => screen.getByTestId("flowbite-footer-icon");

const title = () => screen.getByTestId("flowbite-footer-title");

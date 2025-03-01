import type { Meta, StoryFn } from "@storybook/react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default {
  title: "Components/Footer",
  component: Footer,
} as Meta;

const Template: StoryFn = ({ children }) => <Footer>{children}</Footer>;

export const DefaultFooter = Template.bind({});
DefaultFooter.storyName = "Default";
DefaultFooter.args = {
  children: (
    <div className="flex w-full justify-between p-6">
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </div>
  ),
};

export const WithLogoFooter = Template.bind({});
WithLogoFooter.storyName = "With Logo";
WithLogoFooter.args = {
  children: (
    <div className="w-full p-6 text-center">
      <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <FooterBrand
          href="https://flowbite.com"
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          name="Flowbite"
        />
        <FooterLinkGroup>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Licensing</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinkGroup>
      </div>
      <FooterDivider />
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
    </div>
  ),
};

export const WithSocialMediaFooter = Template.bind({});
WithSocialMediaFooter.storyName = "Social Media Icons";
WithSocialMediaFooter.args = {
  container: true,
  children: (
    <div className="w-full p-6">
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
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
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
  ),
};

export const SitemapLinksFooter = Template.bind({});
SitemapLinksFooter.storyName = "Sitemap Links";
SitemapLinksFooter.args = {
  children: (
    <div className="w-full bg-gray-800">
      <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <div>
          <FooterTitle title="Company" />
          <FooterLinkGroup col>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Brand Center</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <FooterTitle title="help center" />
          <FooterLinkGroup col>
            <FooterLink href="#">Discord Server</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <FooterTitle title="legal" />
          <FooterLinkGroup col>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Terms &amp; Conditions</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <FooterTitle title="download" />
          <FooterLinkGroup col>
            <FooterLink href="#">iOS</FooterLink>
            <FooterLink href="#">Android</FooterLink>
            <FooterLink href="#">Windows</FooterLink>
            <FooterLink href="#">MacOS</FooterLink>
          </FooterLinkGroup>
        </div>
      </div>
      <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
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
  ),
};

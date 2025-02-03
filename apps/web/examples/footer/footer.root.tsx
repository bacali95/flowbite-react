import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function Component() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
`;

export function Component() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "footer/footer.root.tsx",
  component: <Component />,
  iframe: 130,
};

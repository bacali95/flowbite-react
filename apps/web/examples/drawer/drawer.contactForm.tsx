"use client";

import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";

export function Component() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show contact form</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="CONTACT US" titleIcon={HiEnvelope} />
        <DrawerItems>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              <TextInput id="email" name="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:info@company.com" className="hover:underline">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:2124567890" className="hover:underline">
                212-456-7890
              </a>
            </p>
          </form>
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
        <Button onClick={() => setIsOpen(true)}>Show contact form</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="CONTACT US" titleIcon={HiEnvelope} />
        <DrawerItems>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              <TextInput id="email" name="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:info@company.com" className="hover:underline">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:2124567890" className="hover:underline">
                212-456-7890
              </a>
            </p>
          </form>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export const contactForm: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "drawer/drawer.contactForm.tsx",
  component: <Component />,
  iframe: 600,
};

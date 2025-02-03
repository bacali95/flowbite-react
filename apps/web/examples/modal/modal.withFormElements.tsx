"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";

export function Component() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
`;

export function Component() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export const withFormElements: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "modal/modal.withFormElements.tsx",
  component: <Component />,
  iframe: 600,
};

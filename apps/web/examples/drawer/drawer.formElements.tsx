"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Datepicker,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { HiCalendar, HiUserAdd } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Datepicker,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { HiCalendar, HiUserAdd } from "react-icons/hi";

export function Component() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="NEW EVENT" titleIcon={HiCalendar} />
        <DrawerItems>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <TextInput id="title" name="title" placeholder="Apple Keynote" />
            </div>
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea id="description" name="description" placeholder="Write event description..." rows={4} />
            </div>
            <div className="mb-6">
              <Datepicker />
            </div>
            <div className="mb-6">
              <TextInput
                id="guests"
                name="guests"
                placeholder="Add guest email"
                type="search"
                rightIcon={() => (
                  <Button size="sm" className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0">
                    <HiUserAdd className="mr-2" />
                    Add
                  </Button>
                )}
                theme={{
                  field: {
                    rightIcon: {
                      base: twMerge(theme.textInput.field.rightIcon.base, "pointer-events-auto"),
                    },
                  },
                }}
              />
            </div>
            <Avatar.Group className="mb-6">
              <Avatar alt="" img="/images/people/profile-picture-5.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-2.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-3.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-4.jpg" rounded size="sm" stacked />
            </Avatar.Group>
            <Button className="w-full">
              <HiCalendar className="mr-2" />
              Create event
            </Button>
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
        <Button onClick={() => setIsOpen(true)}>Show drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="NEW EVENT" titleIcon={HiCalendar} />
        <DrawerItems>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <TextInput id="title" name="title" placeholder="Apple Keynote" />
            </div>
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea id="description" name="description" placeholder="Write event description..." rows={4} />
            </div>
            <div className="mb-6">
              <Datepicker />
            </div>
            <div className="mb-6">
              <TextInput
                id="guests"
                name="guests"
                placeholder="Add guest email"
                type="search"
                rightIcon={() => (
                  <Button size="sm" className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0">
                    <HiUserAdd className="mr-2" />
                    Add
                  </Button>
                )}
                theme={{
                  field: {
                    rightIcon: {
                      base: "pointer-events-auto",
                    },
                  },
                }}
              />
            </div>
            <AvatarGroup className="mb-6">
              <Avatar alt="" img="/images/people/profile-picture-5.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-2.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-3.jpg" rounded size="sm" stacked />
              <Avatar alt="" img="/images/people/profile-picture-4.jpg" rounded size="sm" stacked />
            </AvatarGroup>
            <Button className="w-full">
              <HiCalendar className="mr-2" />
              Create event
            </Button>
          </form>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export const formElements: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "drawer/drawer.formElements.tsx",
  component: <Component />,
  iframe: 600,
};

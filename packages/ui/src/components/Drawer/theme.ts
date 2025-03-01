import { createTheme } from "../../helpers/create-theme";
import type { DrawerTheme } from "./Drawer";

export const drawerTheme = createTheme<DrawerTheme>({
  root: {
    base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      top: {
        on: "left-0 right-0 top-0 w-full transform-none",
        off: "left-0 right-0 top-0 w-full -translate-y-full",
      },
      right: {
        on: "right-0 top-0 h-screen w-80 transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
      bottom: {
        on: "bottom-0 left-0 right-0 w-full transform-none",
        off: "bottom-0 left-0 right-0 w-full translate-y-full",
      },
      left: {
        on: "left-0 top-0 h-screen w-80 transform-none",
        off: "left-0 top-0 h-screen w-80 -translate-x-full",
      },
    },
  },
  header: {
    inner: {
      closeButton:
        "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      closeIcon: "h-4 w-4",
      titleIcon: "me-2.5 h-4 w-4",
      titleText: "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
    },
    collapsed: {
      on: "hidden",
      off: "block",
    },
  },
  items: {
    base: "",
  },
});

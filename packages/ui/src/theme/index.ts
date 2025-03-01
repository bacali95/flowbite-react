import { accordionTheme } from "../components/Accordion/theme";
import { alertTheme } from "../components/Alert/theme";
import { avatarTheme } from "../components/Avatar/theme";
import { badgeTheme } from "../components/Badge/theme";
import { blockquoteTheme } from "../components/Blockquote/theme";
import { breadcrumbTheme } from "../components/Breadcrumb/theme";
import { buttonGroupTheme, buttonTheme } from "../components/Button/theme";
import { cardTheme } from "../components/Card/theme";
import { carouselTheme } from "../components/Carousel/theme";
import { checkboxTheme } from "../components/Checkbox/theme";
import { clipboardTheme } from "../components/Clipboard/theme";
import { darkThemeToggleTheme } from "../components/DarkThemeToggle/theme";
import { datePickerTheme } from "../components/Datepicker/theme";
import { drawerTheme } from "../components/Drawer/theme";
import { dropdownTheme } from "../components/Dropdown/theme";
import { fileInputTheme } from "../components/FileInput/theme";
import { floatingLabelTheme } from "../components/FloatingLabel/theme";
import { footerTheme } from "../components/Footer/theme";
import { helperTextTheme } from "../components/HelperText/theme";
import { hrTheme } from "../components/HR/theme";
import { kbdTheme } from "../components/Kbd/theme";
import { labelTheme } from "../components/Label/theme";
import { listTheme } from "../components/List/theme";
import { listGroupTheme } from "../components/ListGroup/theme";
import { megaMenuTheme } from "../components/MegaMenu/theme";
import { modalTheme } from "../components/Modal/theme";
import { navbarTheme } from "../components/Navbar/theme";
import { paginationTheme } from "../components/Pagination/theme";
import { popoverTheme } from "../components/Popover/theme";
import { progressTheme } from "../components/Progress/theme";
import { radioTheme } from "../components/Radio/theme";
import { rangeSliderTheme } from "../components/RangeSlider/theme";
import { ratingAdvancedTheme, ratingTheme } from "../components/Rating/theme";
import { selectTheme } from "../components/Select/theme";
import { sidebarTheme } from "../components/Sidebar/theme";
import { spinnerTheme } from "../components/Spinner/theme";
import { tableTheme } from "../components/Table/theme";
import { tabsTheme } from "../components/Tabs/theme";
import { textareaTheme } from "../components/Textarea/theme";
import { textInputTheme } from "../components/TextInput/theme";
import { timelineTheme } from "../components/Timeline/theme";
import { toastTheme } from "../components/Toast/theme";
import { toggleSwitchTheme } from "../components/ToggleSwitch/theme";
import { tooltipTheme } from "../components/Tooltip/theme";
import type { FlowbiteTheme } from "../types";

export const theme: FlowbiteTheme = {
  accordion: accordionTheme,
  alert: alertTheme,
  avatar: avatarTheme,
  badge: badgeTheme,
  blockquote: blockquoteTheme,
  breadcrumb: breadcrumbTheme,
  button: buttonTheme,
  buttonGroup: buttonGroupTheme,
  card: cardTheme,
  carousel: carouselTheme,
  checkbox: checkboxTheme,
  clipboard: clipboardTheme,
  darkThemeToggle: darkThemeToggleTheme,
  datepicker: datePickerTheme,
  drawer: drawerTheme,
  dropdown: dropdownTheme,
  fileInput: fileInputTheme,
  floatingLabel: floatingLabelTheme,
  footer: footerTheme,
  helperText: helperTextTheme,
  hr: hrTheme,
  kbd: kbdTheme,
  label: labelTheme,
  list: listTheme,
  listGroup: listGroupTheme,
  megaMenu: megaMenuTheme,
  modal: modalTheme,
  navbar: navbarTheme,
  pagination: paginationTheme,
  popover: popoverTheme,
  progress: progressTheme,
  radio: radioTheme,
  rangeSlider: rangeSliderTheme,
  rating: ratingTheme,
  ratingAdvanced: ratingAdvancedTheme,
  select: selectTheme,
  sidebar: sidebarTheme,
  spinner: spinnerTheme,
  table: tableTheme,
  tabs: tabsTheme,
  textarea: textareaTheme,
  textInput: textInputTheme,
  timeline: timelineTheme,
  toast: toastTheme,
  toggleSwitch: toggleSwitchTheme,
  tooltip: tooltipTheme,
};

export { ThemeConfig, type ThemeConfigProps } from "./config";
export { ThemeModeScript, type ThemeModeScriptProps } from "./mode-script";
export { ThemeProvider, useThemeProvider, type ThemeProviderProps, type ThemeProviderValue } from "./provider";

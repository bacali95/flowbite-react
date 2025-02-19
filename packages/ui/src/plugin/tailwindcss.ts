import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export const backgroundImage = {
  "arrow-down-icon":
    "url('data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m1%201%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')",
  "check-icon":
    "url('data:image/svg+xml,%3Csvg%20aria-hidden%3D%27true%27%20xmlns%3D%27http://www.w3.org/2000/svg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2016%2012%27%3E%3Cpath%20stroke%3D%27white%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%273%27%20d%3D%27M1%205.917%205.724%2010.5%2015%201.5%27/%3E%3C/svg%3E')",
  "dash-icon":
    "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2016%2012%22%3E%3Cpath%20stroke%3D%22white%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%223%22%20d%3D%22M0.5%206h14%22%2F%3E%3C%2Fsvg%3E')",
  "dot-icon":
    "url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E')",
} as const;

export const boxShadow = {
  "sm-light": "0 2px 5px 0px rgba(255, 255, 255, 0.08)",
} as const;

export const baseColors = {
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  red: {
    50: "#FDF2F2",
    100: "#FDE8E8",
    200: "#FBD5D5",
    300: "#F8B4B4",
    400: "#F98080",
    500: "#F05252",
    600: "#E02424",
    700: "#C81E1E",
    800: "#9B1C1C",
    900: "#771D1D",
  },
  orange: {
    50: "#FFF8F1",
    100: "#FEECDC",
    200: "#FCD9BD",
    300: "#FDBA8C",
    400: "#FF8A4C",
    500: "#FF5A1F",
    600: "#D03801",
    700: "#B43403",
    800: "#8A2C0D",
    900: "#771D1D",
  },
  yellow: {
    50: "#FDFDEA",
    100: "#FDF6B2",
    200: "#FCE96A",
    300: "#FACA15",
    400: "#E3A008",
    500: "#C27803",
    600: "#9F580A",
    700: "#8E4B10",
    800: "#723B13",
    900: "#633112",
  },
  green: {
    50: "#F3FAF7",
    100: "#DEF7EC",
    200: "#BCF0DA",
    300: "#84E1BC",
    400: "#31C48D",
    500: "#0E9F6E",
    600: "#057A55",
    700: "#046C4E",
    800: "#03543F",
    900: "#014737",
  },
  teal: {
    50: "#EDFAFA",
    100: "#D5F5F6",
    200: "#AFECEF",
    300: "#7EDCE2",
    400: "#16BDCA",
    500: "#0694A2",
    600: "#047481",
    700: "#036672",
    800: "#05505C",
    900: "#014451",
  },
  blue: {
    50: "#EBF5FF",
    100: "#E1EFFE",
    200: "#C3DDFD",
    300: "#A4CAFE",
    400: "#76A9FA",
    500: "#3F83F8",
    600: "#1C64F2",
    700: "#1A56DB",
    800: "#1E429F",
    900: "#233876",
  },
  indigo: {
    50: "#F0F5FF",
    100: "#E5EDFF",
    200: "#CDDBFE",
    300: "#B4C6FC",
    400: "#8DA2FB",
    500: "#6875F5",
    600: "#5850EC",
    700: "#5145CD",
    800: "#42389D",
    900: "#362F78",
  },
  purple: {
    50: "#F6F5FF",
    100: "#EDEBFE",
    200: "#DCD7FE",
    300: "#CABFFD",
    400: "#AC94FA",
    500: "#9061F9",
    600: "#7E3AF2",
    700: "#6C2BD9",
    800: "#5521B5",
    900: "#4A1D96",
  },
  pink: {
    50: "#FDF2F8",
    100: "#FCE8F3",
    200: "#FAD1E8",
    300: "#F8B4D9",
    400: "#F17EB8",
    500: "#E74694",
    600: "#D61F69",
    700: "#BF125D",
    800: "#99154B",
    900: "#751A3D",
  },
} as const;

export const semanticColors = {
  primary: {
    50: "#EBF5FF",
    100: "#E1EFFE",
    200: "#C3DDFD",
    300: "#A4CAFE",
    400: "#76A9FA",
    500: "#3F83F8",
    600: "#1C64F2",
    700: "#1A56DB",
    800: "#1E429F",
    900: "#233876",
  },
} as const;

export const colors = {
  ...baseColors,
  ...semanticColors,
} as const;

export const theme: Config["theme"] = {
  backgroundImage,
  boxShadow,
  colors,
};

export const config: Partial<Config> = {
  theme: {
    extend: theme,
  },
};

export default plugin(
  // plugin
  () => {},
  // config
  config,
);

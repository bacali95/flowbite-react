import { forwardRef, type SVGProps } from "react";

export const HomeIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={0}
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path fill="none" stroke="none" d="M0 0h24v24H0z" />
    <path stroke="none" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
));
HomeIcon.displayName = "HomeIcon";

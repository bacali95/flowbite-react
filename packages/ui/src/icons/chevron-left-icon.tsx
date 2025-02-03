import { forwardRef, type SVGProps } from "react";

export const ChevronLeftIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
  </svg>
));
ChevronLeftIcon.displayName = "ChevronLeftIcon";

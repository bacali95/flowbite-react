import { forwardRef, type SVGProps } from "react";

export const ChevronUpIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
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
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 15 7-7 7 7" />
  </svg>
));
ChevronUpIcon.displayName = "ChevronUpIcon";

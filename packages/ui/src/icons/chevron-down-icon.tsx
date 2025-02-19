import { forwardRef, type SVGProps } from "react";

export const ChevronDownIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={0}
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <path
      fillRule="evenodd"
      stroke="none"
      d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
      clipRule="evenodd"
    />
  </svg>
));
ChevronDownIcon.displayName = "ChevronDownIcon";

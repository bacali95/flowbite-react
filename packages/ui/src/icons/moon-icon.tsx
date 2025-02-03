import { forwardRef, type SVGProps } from "react";

export const MoonIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
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
    <path stroke="none" d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
  </svg>
));
MoonIcon.displayName = "MoonIcon";

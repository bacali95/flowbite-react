import { forwardRef, type SVGProps } from "react";

export const ArrowRightIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
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
      d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414z"
      clipRule="evenodd"
    />
  </svg>
));
ArrowRightIcon.displayName = "ArrowRightIcon";

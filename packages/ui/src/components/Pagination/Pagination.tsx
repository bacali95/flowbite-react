"use client";

import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { ChevronLeftIcon } from "../../icons/chevron-left-icon";
import { ChevronRightIcon } from "../../icons/chevron-right-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { range } from "./helpers";
import type { PaginationButtonProps, PaginationButtonTheme } from "./PaginationButton";
import { PaginationButton, PaginationNavigation } from "./PaginationButton";
import { paginationTheme } from "./theme";

export interface PaginationTheme {
  base: string;
  layout: PaginationLayoutTheme;
  pages: PaginationPagesTheme;
}

export interface PaginationRootTheme {
  base: string;
}

export interface PaginationLayoutTheme {
  table: {
    base: string;
    span: string;
  };
}

export interface PaginationPagesTheme {
  base: string;
  showIcon: string;
  previous: PaginationNavigationTheme;
  next: PaginationNavigationTheme;
  selector: PaginationButtonTheme;
}

export interface PaginationNavigationTheme {
  base: string;
  icon: string;
}

export interface PaginationProps extends ComponentProps<"nav">, ThemingProps<PaginationTheme> {
  currentPage: number;
  layout?: "navigation" | "pagination" | "table";
  nextLabel?: string;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  renderPaginationButton?: (props: PaginationButtonProps) => ReactNode;
  showIcons?: boolean;
  totalPages: number;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [paginationTheme, provider.theme?.pagination, props.theme],
    [get(provider.clearTheme, "pagination"), props.clearTheme],
    [get(provider.applyTheme, "pagination"), props.applyTheme],
  );

  const {
    className,
    currentPage,
    layout = "pagination",
    nextLabel = "Next",
    onPageChange,
    previousLabel = "Previous",
    renderPaginationButton = (props: PaginationButtonProps) => <PaginationButton {...props} />,
    showIcons: showIcon = false,
    totalPages,
    ...restProps
  } = resolveProps(props, provider.props?.pagination);

  const lastPage = Math.min(Math.max(layout === "pagination" ? currentPage + 2 : currentPage + 4, 5), totalPages);
  const firstPage = Math.max(1, lastPage - 4);

  function goToNextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages));
  }

  function goToPreviousPage() {
    onPageChange(Math.max(currentPage - 1, 1));
  }

  return (
    <nav ref={ref} className={twMerge(theme.base, className)} {...restProps}>
      {layout === "table" && (
        <div className={theme.layout.table.base}>
          Showing <span className={theme.layout.table.span}>{firstPage}</span> to&nbsp;
          <span className={theme.layout.table.span}>{lastPage}</span> of&nbsp;
          <span className={theme.layout.table.span}>{totalPages}</span> Entries
        </div>
      )}
      <ul className={theme.pages.base}>
        <li>
          <PaginationNavigation
            className={twMerge(theme.pages.previous.base, showIcon && theme.pages.showIcon)}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {showIcon && <ChevronLeftIcon aria-hidden className={theme.pages.previous.icon} />}
            {previousLabel}
          </PaginationNavigation>
        </li>
        {layout === "pagination" &&
          range(firstPage, lastPage).map((page: number) => (
            <li aria-current={page === currentPage ? "page" : undefined} key={page}>
              {renderPaginationButton({
                className: twMerge(theme.pages.selector.base, currentPage === page && theme.pages.selector.active),
                active: page === currentPage,
                onClick: () => onPageChange(page),
                children: page,
              })}
            </li>
          ))}
        <li>
          <PaginationNavigation
            className={twMerge(theme.pages.next.base, showIcon && theme.pages.showIcon)}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            {nextLabel}
            {showIcon && <ChevronRightIcon aria-hidden className={theme.pages.next.icon} />}
          </PaginationNavigation>
        </li>
      </ul>
    </nav>
  );
});

Pagination.displayName = "Pagination";

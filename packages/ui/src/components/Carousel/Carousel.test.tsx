import { act, fireEvent, render, screen } from "@testing-library/react";
import Image from "next/image";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CarouselProps } from "./Carousel";
import { Carousel } from "./Carousel";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(global, "setTimeout");
});

afterEach(() => {
  vi.clearAllMocks();
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("Components / Carousel", () => {
  it("should render and show first item", () => {
    render(<TestCarousel />);

    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "false");
    expect(carouselIndicators()).toHaveLength(5);
    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(nonActiveIndicatorClasses);
    expect(carouselLeftControl()).toBeInTheDocument();
    expect(carouselRightControl()).toBeInTheDocument();
  });

  it("should render without indicators", () => {
    render(<TestCarousel indicators={false} />);

    expect(screen.queryAllByTestId("carousel-indicator")).toHaveLength(0);
  });

  it("should change slide via click on indicator", () => {
    render(<TestCarousel />);

    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");

    act(() => {
      fireEvent.click(carouselIndicators()[3]);
    });

    expect(carouselItems()[0]).toHaveAttribute("data-active", "false");
    expect(carouselItems()[3]).toHaveAttribute("data-active", "true");
    expect(carouselIndicators()[0]).not.toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[3]).toHaveClass(activeIndicatorClasses);
  });

  it("should render custom controls", () => {
    render(<TestCarousel leftControl="<" rightControl=">" />);

    expect(screen.getByText(/</)).toBeInTheDocument();
    expect(screen.getByText(/>/)).toBeInTheDocument();
  });

  it("should change slide via click on control", () => {
    render(<TestCarousel />);

    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");

    act(() => {
      fireEvent.click(carouselRightControl());
    });

    expect(carouselItems()[0]).toHaveAttribute("data-active", "false");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "true");
    expect(carouselIndicators()[0]).not.toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(activeIndicatorClasses);
  });

  it("should transition to the next item after about 3 s by default", () => {
    render(<TestCarousel />);

    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "false");
    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(nonActiveIndicatorClasses);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(carouselItems()[0]).toHaveAttribute("data-active", "false");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "true");
    expect(carouselIndicators()[0]).toHaveClass(nonActiveIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(activeIndicatorClasses);
  });

  it("should transition to the next item after `slideInterval` when it is provided", () => {
    render(<TestCarousel slideInterval={9000} />);

    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "false");
    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(nonActiveIndicatorClasses);

    act(() => {
      vi.advanceTimersByTime(9000);
    });

    expect(carouselItems()[0]).toHaveAttribute("data-active", "false");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "true");
    expect(carouselIndicators()[0]).toHaveClass(nonActiveIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(activeIndicatorClasses);
  });

  it("should not automatically transition to the next item when `slide={false}`", () => {
    render(<TestCarousel slide={false} />);

    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "false");
    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(nonActiveIndicatorClasses);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(carouselItems()[0]).toHaveAttribute("data-active", "true");
    expect(carouselItems()[1]).toHaveAttribute("data-active", "false");
    expect(carouselIndicators()[0]).toHaveClass(activeIndicatorClasses);
    expect(carouselIndicators()[1]).toHaveClass(nonActiveIndicatorClasses);
  });
});

const activeIndicatorClasses = "bg-white dark:bg-gray-800";
const nonActiveIndicatorClasses = "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800";

const TestCarousel = (props: CarouselProps) => (
  <Carousel {...props}>
    <Image alt="" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" height="100" width="100" />
    <Image alt="" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" height="100" width="100" />
    <Image alt="" src="https://flowbite.com/docs/images/carousel/carousel-3.svg" height="100" width="100" />
    <Image alt="" src="https://flowbite.com/docs/images/carousel/carousel-4.svg" height="100" width="100" />
    <Image alt="" src="https://flowbite.com/docs/images/carousel/carousel-5.svg" height="100" width="100" />
  </Carousel>
);

const carouselItems = () => screen.getAllByTestId("carousel-item");
const carouselIndicators = () => screen.getAllByTestId("carousel-indicator");
const carouselLeftControl = () => screen.getByTestId("carousel-left-control");
const carouselRightControl = () => screen.getByTestId("carousel-right-control");

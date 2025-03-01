import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import type { DatepickerRef } from "./Datepicker";
import { Datepicker } from "./Datepicker";
import { getFormattedDate } from "./helpers";

describe("Components / Datepicker", () => {
  it("should display today's date by default", () => {
    const todaysDateInDefaultLanguage = getFormattedDate("en", new Date());

    render(<Datepicker />);

    expect(screen.getByDisplayValue(todaysDateInDefaultLanguage)).toBeInTheDocument();
  });

  it("should update date when a different day is clicked", async () => {
    const todaysDayOfMonth = new Date().getDate();
    const anotherDay = todaysDayOfMonth === 1 ? 2 : 1;

    render(<Datepicker />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getAllByText(anotherDay)[0]);

    expect((screen.getByRole("textbox") as HTMLInputElement).value.includes(`${anotherDay}`)).toBeTruthy();
  });

  it("should reset to today's date when Clear button is clicked", async () => {
    const todaysDateInDefaultLanguage = getFormattedDate("en", new Date());
    const todaysDayOfMonth = new Date().getDate();
    const anotherDay = todaysDayOfMonth === 1 ? 2 : 1;

    render(<Datepicker />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getAllByText(anotherDay)[0]);
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getByText("Clear"));

    expect(screen.getByDisplayValue(todaysDateInDefaultLanguage)).toBeInTheDocument();
  });

  it("should use today's date when Today button is clicked", async () => {
    const todaysDateInDefaultLanguage = getFormattedDate("en", new Date());
    const todaysDayOfMonth = new Date().getDate();
    const anotherDay = todaysDayOfMonth === 1 ? 2 : 1;

    render(<Datepicker />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getAllByText(anotherDay)[0]);
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getByText("Today"));

    expect(screen.getByDisplayValue(todaysDateInDefaultLanguage)).toBeInTheDocument();
  });

  it("should call `onChange` when a new date is selected", async () => {
    const onChange = vi.fn();
    const todaysDayOfMonth = new Date().getDate();
    const anotherDay = todaysDayOfMonth === 1 ? 2 : 1;

    render(<Datepicker onChange={onChange} />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getAllByText(anotherDay)[0]);

    expect(onChange).toHaveBeenCalledOnce();
  });

  it("should close month overlay when user clicks outside of it", async () => {
    render(<Datepicker />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(document.body);
  });

  it("should render 1990 - 2100 year range when selecting decade", async () => {
    const testDate = new Date(2024, 6, 20);
    render(<Datepicker defaultValue={testDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    expect(titleButton.textContent).toBe("2024");
    await userEvent.click(titleButton);
    expect(titleButton.textContent).toBe("2020 - 2031");
    await userEvent.click(titleButton);
    expect(titleButton.textContent).toBe("1990 - 2100");
  });

  it("should allow selecting earlier decades when setting max date", async () => {
    const testDate = new Date(2024, 6, 20);
    render(<Datepicker defaultValue={testDate} maxDate={testDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);

    const earlierDecadeButton = screen.getByText("2010");
    expect(earlierDecadeButton).toBeInstanceOf(HTMLButtonElement);
    expect(earlierDecadeButton).toBeEnabled();
  });

  it("should disallow selecting later decades when setting max date", async () => {
    const testDate = new Date(2024, 6, 20);
    render(<Datepicker defaultValue={testDate} maxDate={testDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);

    const laterDecadeButton = screen.getByText("2030");
    expect(laterDecadeButton).toBeInstanceOf(HTMLButtonElement);
    expect(laterDecadeButton).toBeDisabled();
  });

  it("should disallow selecting earlier decades when setting min date", async () => {
    const testDate = new Date(2024, 6, 20);
    render(<Datepicker defaultValue={testDate} minDate={testDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);

    const earlierDecadeButton = screen.getByText("2010");
    expect(earlierDecadeButton).toBeInstanceOf(HTMLButtonElement);
    expect(earlierDecadeButton).toBeDisabled();
  });

  it("should allow selecting later decades when setting min date", async () => {
    const testDate = new Date(2024, 6, 20);
    render(<Datepicker defaultValue={testDate} minDate={testDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);

    const laterDecadeButton = screen.getByText("2030");
    expect(laterDecadeButton).toBeInstanceOf(HTMLButtonElement);
    expect(laterDecadeButton).toBeEnabled();
  });

  it("should allow selecting decades within the range set by max date and min date and disallow selecting outside the range", async () => {
    const minDate = new Date(2010, 1, 1);
    const maxDate = new Date(2030, 1, 1);
    const testDate = new Date(2024, 6, 1);

    render(<Datepicker defaultValue={testDate} minDate={minDate} maxDate={maxDate} />);

    const textBox = screen.getByRole("textbox");
    await userEvent.click(textBox);

    const titleButton = screen.getByText("July 2024");
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);
    await userEvent.click(titleButton);

    const inRange = screen.getByText("2010");
    expect(inRange).toBeInstanceOf(HTMLButtonElement);
    expect(inRange).toBeEnabled();

    const outsideRange = screen.getByText("2000");
    expect(outsideRange).toBeInstanceOf(HTMLButtonElement);
    expect(outsideRange).toBeDisabled();
  });

  it("should focus the input when ref.current.focus is called", () => {
    const {
      result: { current: ref },
    } = renderHook(() => useRef<DatepickerRef>(null));
    render(<Datepicker ref={ref} />);

    act(() => ref.current?.focus());

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("should clear the value when ref.current.clear is called", async () => {
    const todaysDateInDefaultLanguage = getFormattedDate("en", new Date());
    const todaysDayOfMonth = new Date().getDate();
    const anotherDay = todaysDayOfMonth === 1 ? 2 : 1;

    const {
      result: { current: ref },
    } = renderHook(() => useRef<DatepickerRef>(null));
    render(<Datepicker ref={ref} />);

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.click(screen.getAllByText(anotherDay)[0]);
    act(() => ref.current?.clear());

    expect(screen.getByDisplayValue(todaysDateInDefaultLanguage)).toBeInTheDocument();
  });
});

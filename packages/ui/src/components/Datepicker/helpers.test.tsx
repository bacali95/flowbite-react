import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  addYears,
  getFirstDayOfTheMonth,
  getFormattedDate,
  isDateInRange,
  startOfYearPeriod,
} from "./helpers";

describe("isDateInRange", () => {
  it("returns true when date is within the range", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    const minDate = new Date(2023, 0, 1); // January 1st, 2023
    const maxDate = new Date(2023, 2, 31); // March 31st, 2023
    expect(isDateInRange(date, minDate, maxDate)).toBe(true);
  });

  it("returns true when only minDate is provided and date is after minDate", () => {
    const date = new Date(2023, 2, 15); // March 15th, 2023
    const minDate = new Date(2023, 0, 1); // January 1st, 2023
    expect(isDateInRange(date, minDate)).toBe(true);
  });

  it("returns true when only maxDate is provided and date is before maxDate", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    const maxDate = new Date(2023, 2, 31); // March 31st, 2023
    expect(isDateInRange(date, undefined, maxDate)).toBe(true);
  });

  it("returns true when no range is provided", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    expect(isDateInRange(date)).toBe(true);
  });

  it("returns false when date is outside the range", () => {
    const date = new Date(2023, 3, 1); // April 1st, 2023
    const minDate = new Date(2023, 0, 1); // January 1st, 2023
    const maxDate = new Date(2023, 2, 31); // March 31st, 2023
    expect(isDateInRange(date, minDate, maxDate)).toBe(false);
  });
});

describe("getFirstDayOfTheMonth", () => {
  it("should return the first day of the first week for the given month (week starting on Sunday)", () => {
    // July 2023, where the 1st is a Saturday
    const date = new Date(2023, 6, 1);
    const firstDayOfTheWeekSunday = getFirstDayOfTheMonth(date, 0);

    const weekDaysSunday: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(firstDayOfTheWeekSunday, i);
      weekDaysSunday.push(day);
    }

    expect(weekDaysSunday).toEqual([
      new Date(2023, 5, 25), // Sunday, June 25th, 2023
      new Date(2023, 5, 26), // Monday, June 26th, 2023
      new Date(2023, 5, 27), // Tuesday, June 27th, 2023
      new Date(2023, 5, 28), // Wednesday, June 28th, 2023
      new Date(2023, 5, 29), // Thursday, June 29th, 2023
      new Date(2023, 5, 30), // Friday, June 30th, 2023
      new Date(2023, 6, 1), // Saturday, July 1st, 2023
    ]);
  });

  it("should return the first day of the first week for the given month (week starting on Monday)", () => {
    // July 2023, where the 1st is a Saturday
    const date = new Date(2023, 6, 1);
    const firstDayOfTheWeekMonday = getFirstDayOfTheMonth(date, 1);

    const weekDaysMonday: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(firstDayOfTheWeekMonday, i);
      weekDaysMonday.push(day);
    }

    expect(weekDaysMonday).toEqual([
      new Date(2023, 5, 26), // Monday, June 26th, 2023
      new Date(2023, 5, 27), // Tuesday, June 27th, 2023
      new Date(2023, 5, 28), // Wednesday, June 28th, 2023
      new Date(2023, 5, 29), // Thursday, June 29th, 2023
      new Date(2023, 5, 30), // Friday, June 30th, 2023
      new Date(2023, 6, 1), // Saturday, July 1st, 2023
      new Date(2023, 6, 2), // Sunday, July 2nd, 2023
    ]);
  });
});

describe("addDays", () => {
  it("returns a new date by adding the specified number of days", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addDays(date, 5);
    expect(newDate.getDate()).toBe(6);
  });

  it("returns a new date by subtracting the specified number of days", () => {
    const date = new Date(2023, 0, 10); // January 10th, 2023
    const newDate = addDays(date, -5);
    expect(newDate.getDate()).toBe(5);
  });

  it("does not modify the original date", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addDays(date, 5);
    expect(date.getDate()).toBe(1);
    expect(newDate.getDate()).toBe(6);
  });
});

describe("addMonths", () => {
  it("returns a new date by adding the specified number of months", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addMonths(date, 2);
    expect(newDate.getMonth()).toBe(2); // March
  });

  it("returns a new date by subtracting the specified number of months", () => {
    const date = new Date(2023, 2, 10); // March 10th, 2023
    const newDate = addMonths(date, -2);
    expect(newDate.getMonth()).toBe(0); // January
  });

  it("does not modify the original date", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addMonths(date, 2);
    expect(date.getMonth()).toBe(0); // January
    expect(newDate.getMonth()).toBe(2); // March
  });
});

describe("addYears", () => {
  it("returns a new date by adding the specified number of years", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addYears(date, 5);
    expect(newDate.getFullYear()).toBe(date.getFullYear() + 5);
  });

  it("returns a new date by subtracting the specified number of years", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addYears(date, -2);
    expect(newDate.getFullYear()).toBe(date.getFullYear() - 2);
  });

  it("does not modify the original date", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const newDate = addYears(date, 5);
    expect(date.getFullYear()).toBe(2023);
    expect(newDate.getFullYear()).toBe(date.getFullYear() + 5);
  });
});

describe("getFormattedDate", () => {
  it("returns the formatted date string using the default options", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    const formattedDate = getFormattedDate("en", date);
    expect(formattedDate).toBe("January 15, 2023");
  });

  it("returns the formatted date string using the specified options", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    const options: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
    const formattedDate = getFormattedDate("en", date, options);
    expect(formattedDate).toBe("Jan 2023");
  });

  it("returns the formatted date string using the specified language", () => {
    const date = new Date(2023, 0, 15); // January 15th, 2023
    const formattedDate = getFormattedDate("pt-BR", date);
    expect(formattedDate).toBe("15 de janeiro de 2023");
  });
});

describe("startOfYearPeriod", () => {
  it("returns the start year period for the given date and years", () => {
    const date = new Date(2023, 7, 1); // August 1st, 2023
    const years = 10;
    const startYearPeriod = startOfYearPeriod(date, years);
    expect(startYearPeriod).toBe(2020);
  });

  it("returns the start year period when the date is already at the start of a year period", () => {
    const date = new Date(2023, 0, 1); // January 1st, 2023
    const years = 5;
    const startYearPeriod = startOfYearPeriod(date, years);
    expect(startYearPeriod).toBe(2020);
  });
});

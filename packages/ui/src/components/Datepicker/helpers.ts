export enum Views {
  Days = 0,
  Months = 1,
  Years = 2,
  Decades = 3,
}

export enum WeekStart {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  if (minDate && maxDate) {
    const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
    return dateTime >= minDateTime && dateTime <= maxDateTime;
  }

  if (minDate) {
    const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    return dateTime >= minDateTime;
  }

  if (maxDate) {
    const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
    return dateTime <= maxDateTime;
  }

  return true;
}

export function isDateEqual(date: Date, selectedDate: Date): boolean {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  return date.getTime() === selectedDate.getTime();
}

export function isMonthEqual(date: Date, selectedDate: Date): boolean {
  return date.getMonth() === selectedDate.getMonth();
}

export function getFirstDateInRange(date: Date, minDate?: Date, maxDate?: Date): Date {
  if (!isDateInRange(date, minDate, maxDate)) {
    if (minDate && date < minDate) {
      date = minDate;
    } else if (maxDate && date > maxDate) {
      date = maxDate;
    }
  }
  return date;
}

export function getFirstDayOfTheMonth(date: Date, weekStart: WeekStart): Date {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  let diff = dayOfWeek - weekStart;
  if (diff < 0) {
    diff += 7;
  }

  return addDays(firstDayOfMonth, -diff);
}

export function getWeekDays(lang: string, weekStart: WeekStart): string[] {
  const weekdays: string[] = [];
  const date = new Date(0);
  date.setDate(date.getDate() - date.getDay() + weekStart);

  const formatter = new Intl.DateTimeFormat(lang, { weekday: "short" });

  for (let i = 0; i < 7; i++) {
    weekdays.push(formatter.format(addDays(date, i)));
  }

  return weekdays;
}

export function addDays(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
}

export function addMonths(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
}

export function addYears(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + amount);
  return newDate;
}

export function getFormattedDate(language: string, date: Date, options?: Intl.DateTimeFormatOptions): string {
  let defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (options) {
    defaultOptions = options;
  }

  return new Intl.DateTimeFormat(language, defaultOptions).format(date);
}

export function startOfYearPeriod(date: Date, years: number): number {
  const year = date.getFullYear();
  return Math.floor(year / years) * years;
}

export function isDateInDecade(date: Date, startYear: number): boolean {
  const year = date.getFullYear();
  const endYear = startYear + 9;
  return year >= startYear && year <= endYear;
}

export function isDateRangeInDecade(startDate: Date, endDate: Date, decadeStart: number, decadeEnd: number): boolean {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (decadeStart && decadeEnd) {
    // Check if the start and end years of the date range are within the decade
    const isStartYearInRange = isDateInRange(
      new Date(startYear, 0, 1),
      new Date(decadeStart, 0, 1),
      new Date(decadeEnd, 11, 31),
    );
    const isEndYearInRange = isDateInRange(
      new Date(endYear, 11, 31),
      new Date(decadeStart, 0, 1),
      new Date(decadeEnd, 11, 31),
    );

    return isStartYearInRange && isEndYearInRange;
  }

  // If decadeStart or decadeEnd is not provided, treat it as an open-ended range
  return true;
}

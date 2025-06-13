import { InGameDate, Season } from '@mistria-guide/data-types';
import { seasonMap } from './sort-helpers';

export function addDays(date: InGameDate, days: number): InGameDate {
  let dateAsNumber = inGameDateToNumber(date);

  dateAsNumber += days;

  return numberToInGameDate(dateAsNumber);
}

export function inGameDateToNumber(date: InGameDate): number {
  return (
    date.day + ((seasonMap[date.season] ?? 0) - 1) * 28 + (date.year - 1) * 112
  );
}

export function dateInRanges(
  date: InGameDate,
  range:
    | { from: InGameDate; to: InGameDate }
    | {
        from: InGameDate;
        to: InGameDate;
      }[],
  ignoreYear = false
): boolean {
  const rangeAsList = [range].flat();

  if (!rangeAsList.length) return false;

  let dateValue = inGameDateToNumber(date);

  if (ignoreYear) {
    dateValue = Math.floor(dateValue - 1) % 112;
  }

  return rangeAsList.some((r) => {
    let start = inGameDateToNumber(r.from);

    if (ignoreYear) {
      start = Math.floor(start - 1) % 112;
    }

    let end = inGameDateToNumber(r.to);

    if (ignoreYear) {
      end = Math.floor(end - 1) % 112;
    }

    return start <= dateValue && end >= dateValue;
  });
}

export function numberToInGameDate(days: number): InGameDate {
  const year = Math.floor((days - 1) / 112) + 1;
  const day = ((days - 1) % 28) + 1;
  const seasonValue = Math.floor(((days - 1) % 112) / 28) + 1;

  const season: Season =
    seasonValue === 1
      ? 'spring'
      : seasonValue === 2
      ? 'summer'
      : seasonValue === 3
      ? 'fall'
      : 'winter';

  return { day, season, year };
}

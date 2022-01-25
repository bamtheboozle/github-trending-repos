import { format, subDays } from 'date-fns';

export enum CreateSearchQueryType {
  'stars_descending',
}
export type QueryTypes = {
  daysBack?: number;
  sort?: 'stars-asc' | 'stars-desc';
  p?: number;
  language?: string;
};

export const createSearchQuery = (filters: QueryTypes) => {
  const query = [];
  if (filters.daysBack) {
    query.push(
      `created:>${format(subDays(new Date(), filters.daysBack), 'yyyy-MM-dd')}`
    );
  }
  if (filters.language) {
    query.push(`language:${filters.language}`);
  }

  if (filters.sort) {
    query.push(`sort:${filters.sort}`);
  }

  if (filters.p) {
    query.push(`p:${filters.p}`);
  }

  return encodeURI(query.join('+'));
};

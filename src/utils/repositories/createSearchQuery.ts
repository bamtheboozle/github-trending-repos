export enum CreateSearchQueryType {
  'stars_descending',
}
const createSearchQuery = (type: CreateSearchQueryType) => {
  switch (type) {
    case CreateSearchQueryType.stars_descending:
      return `2`;

    default: {
      return '';
    }
  }
};

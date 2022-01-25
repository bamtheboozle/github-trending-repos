# Github Trending Repos

This app fetches trending repositores from the public github api and shows them based on certain filters.

## Features include:

1. Filter by created date (days back, 7, 30, etc)
2. Filter by language
3. Starring/saving repositories
4. Persisting starred repositories through localStorage
5. Pagination on trending repos (kinda) -> github api doing some weird stuff

## Tech stack:

1. React
2. Context for state management (single source of truth)
3. react-testing-library for test samples
4. chakra-ui for lightweight design

## How to run
```
yarn install
yarn start
```

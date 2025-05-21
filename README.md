# Companies duplicates

Given a txt file with companies names, find companies names that could refer to the same company.

## Method used

1. Read the txt file and transform it to an array
2. Clean each company name form common words (ltd, co, inc, etc), numbers, short names, other symbols, etc.
3. Creat a key for each name and assign it to a bucket
4. If 2 companies have same key, they will be inserted to same bucket.
5. For each bucket, we run the Jaro-Winkler similarity metric to see if the 2 company names are the same.
6. If they are, insert them to a common array

## Challenges faced

1. Running any metric such as Jaro-Winkler similarity metric for the whole array took a long time to complete. For this reason buckets where used.
2. Finding a good bucket key method was a challenge. With the current logic, several false positives are obtained.

## What can be improved?

1. A better bucketing strategy or even a different way to group company names.
2. More data regarding each company name such as registration code.
3. Other metrics could be used such as Levenshtein Distance. And its results could be compared to the current one.
4. A way to find all common and unneeded words (ltd, co, inc, etc) in the whole file.

## Tech

- Typescript
- Node.js
- Natural Library for Jaro-Winkler metric
- Eslint, prettier, husky, lint-staged
- jest for testing

## How to run the project?

```bash
npm install

# run the project
npx ts-node src/index.ts

# run tests
npm run test
```

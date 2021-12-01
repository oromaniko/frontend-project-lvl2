import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const file1 = parse(data1, path.extname(filepath1));
  const file2 = parse(data2, path.extname(filepath2));

  const markedFile1 = _.mapKeys(file1, (value, key) => (
    value === file2[key] ? `  ${key}` : `- ${key}`
  ));
  const markedFile2 = _.mapKeys(file2, (value, key) => (
    value === file1[key] ? `  ${key}` : `+ ${key}`
  ));

  const diff = { ...markedFile1, ...markedFile2 };
  const sortedDiff = _.sortBy(Object.entries(diff), ([key]) => key.slice(2));
  return JSON.stringify(_.fromPairs(sortedDiff), null, ' ').replace(/"/gi, '');
};

export default genDiff;

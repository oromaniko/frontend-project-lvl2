import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(filepath1));
  const file2 = JSON.parse(readFileSync(filepath2));
  const markedFile1 = _.mapKeys(file1, (value, key) => (
    value === file2[key] ? `  ${key}` : `- ${key}`
  ));
  const markedFile2 = _.mapKeys(file2, (value, key) => (
    value === file1[key] ? `  ${key}` : `+ ${key}`
  ));

  const diff = { ...markedFile1, ...markedFile2 };
  const sortedDiff = _.sortBy(Object.entries(diff), ([key]) => key.slice(2));
  return JSON.stringify(_.fromPairs(sortedDiff), null, ' ').replaceAll('"', '');
};

export default genDiff;

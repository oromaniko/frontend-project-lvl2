import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const makeDiff = (tree1, tree2) => {
  const keys = _.union(Object.keys(tree1), Object.keys(tree2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.reduce((acc, key) => {
    const value1 = tree1[key];
    const value2 = tree2[key];

    if (_.isEqual(value1, value2)) {
      return { ...acc, [key]: { type: 'still', after: value1 } };
    }
    if (_.has(tree1, key) && !_.has(tree2, key)) {
      return { ...acc, [key]: { type: 'removed', after: value1 } };
    }
    if (_.has(tree2, key) && !_.has(tree1, key)) {
      return { ...acc, [key]: { type: 'added', after: value2 } };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { ...acc, [key]: { type: 'still', after: makeDiff(value1, value2) } };
    }
    return { ...acc, [key]: { type: 'updated', before: value1, after: value2 } };
  }, {});
  return diff;
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1 = parse(filepath1, path.extname(filepath1));
  const file2 = parse(filepath2, path.extname(filepath2));
  const diff = makeDiff(file1, file2);
  return format(diff, formatter);
};

export default genDiff;

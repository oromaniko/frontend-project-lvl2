import _ from 'lodash';

const stringify = (value, repl, spsCount) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return String(data);
    }

    const sps = repl.repeat(spsCount * depth);
    const sps1 = repl.repeat(spsCount * (depth - 1));
    const result = Object.entries(data)
      .reduce((acc, entrie) => {
        const [key, val] = entrie;
        const newValue = iter(val, depth + 2);
        return `${acc}${sps}${key}: ${newValue}\n`;
      }, '');
    return `{\n${result}${sps1}}`;
  };

  return iter(value, 1);
};

const makeStyledObj = (data) => {
  const result = Object.entries(data).reduce((acc, item) => {
    const [key, value] = item;
    const { type = false, before = '', after = value } = value;
    const val = _.isObject(after) ? makeStyledObj(after) : after;
    const bef = _.isObject(before) ? makeStyledObj(before) : before;
    if (!type) {
      acc[`  ${key}`] = val;
    } else if (type === 'still') {
      acc[`  ${key}`] = val;
    } else if (type === 'deleted') {
      acc[`- ${key}`] = val;
    } else if (type === 'added') {
      acc[`+ ${key}`] = val;
    } else {
      acc[`- ${key}`] = bef;
      acc[`+ ${key}`] = val;
    }

    return acc;
  }, {});
  return result;
};

const stylish = (data) => {
  const styled = makeStyledObj(data);
  return stringify(styled, ' ', 2);
};

export default stylish;

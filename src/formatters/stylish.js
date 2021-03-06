import _ from 'lodash';

const stringify = (value, replacer, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 2)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const makeStyledObj = (data) => {
  const result = _.reduce(data, (acc, value, key) => {
    const { type = false, before = '', after = value } = value;
    const val = _.isObject(after) ? makeStyledObj(after) : after;
    const bef = _.isObject(before) ? makeStyledObj(before) : before;
    switch (type) {
      case 'removed': {
        return { ...acc, [`- ${key}`]: val };
      }
      case 'added': {
        return { ...acc, [`+ ${key}`]: val };
      }
      case 'updated': {
        return { ...acc, [`- ${key}`]: bef, [`+ ${key}`]: val };
      }
      default:
        return { ...acc, [`  ${key}`]: val };
    }
  }, {});
  return result;
};

const stylish = (data) => {
  const styled = makeStyledObj(data);
  return stringify(styled, ' ', 2);
};

export default stylish;

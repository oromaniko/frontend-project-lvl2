import _ from 'lodash';

const mkStr = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};

const plain = (data, parents = '') => {
  const result = _.reduce(data, (acc, value, key) => {
    const path = `${parents}${key}`;
    const { type = false, before = '', after } = value;
    const afterStr = mkStr(after);
    switch (type) {
      case 'still':
        return _.isObject(after) ? [...acc, plain(after, `${path}.`)] : acc;
      case 'removed': {
        const str1 = `Property '${path}' was removed`;
        return [...acc, str1];
      }
      case 'added': {
        const str2 = `Property '${path}' was added with value: ${afterStr}`;
        return [...acc, str2];
      }
      default: {
        const str3 = `Property '${path}' was updated. From ${mkStr(before)} to ${afterStr}`;
        return [...acc, str3];
      }
    }
  }, []);
  return result.join('\n');
};

export default plain;

import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter) => {
  if (formatter === 'plain') {
    return plain(data);
  }
  if (formatter === 'json') {
    return JSON.stringify(data);
  }
  return stylish(data);
};

export default format;

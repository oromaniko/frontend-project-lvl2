import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter) => {
  if (formatter === 'stylish') {
    return stylish(data);
  }
  if (formatter === 'plain') {
    return plain(data);
  }
  return null;
};

export default format;

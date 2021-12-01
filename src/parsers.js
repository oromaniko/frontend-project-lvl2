import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      return null;
  }
};

export default parse;

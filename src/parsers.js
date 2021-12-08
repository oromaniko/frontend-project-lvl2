import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parse = (filepath, fileExt) => {
  const data = readFileSync(filepath, 'utf-8');
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

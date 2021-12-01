/* eslint-disable quotes */
import genDiff from '../src/index.js';

test('genDiff flat', () => {
  const expected = JSON.stringify({
    "- follow": false,
    "  host": "hexlet.io",
    "- proxy": "123.234.53.22",
    "- timeout": 50,
    "+ timeout": 20,
    "+ verbose": true
  }, null, ' ').replaceAll('"', '');

  expect(genDiff('/home/oulka/frontend-project-lvl2/src/file1.json', '/home/oulka/frontend-project-lvl2/src/file2.json')).toEqual(expected);
});

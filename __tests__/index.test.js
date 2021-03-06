/* eslint-disable quotes */
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff -f stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2)).toEqual(readFile('expected_stylish.txt'));
});

test('genDiff -f plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'plain')).toEqual(readFile('expected_plain.txt'));
});

test('genDiff -f json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2, 'json')).toEqual(readFile('expected_json.txt'));
});

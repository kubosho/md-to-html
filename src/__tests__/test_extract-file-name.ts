import test from 'ava';
import { extractFileName } from '../extract-file-name';

test('extractFileName', t => {
  const filename = 'index';
  const path = `/path/to/${filename}.md`;

  const actual = extractFileName(path);
  const expected = filename;

  t.is(actual, expected);
});

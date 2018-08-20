import test from 'ava';
import { expectMdFilePath } from '../expect-file-path';

test('expectMdFilePath', t => {
  const path = 'index.md';

  const actual = expectMdFilePath(path);
  const expected = path;

  t.is(actual, expected);
  t.notThrows(() => expectMdFilePath(path));
});

test('expectMdFilePath: thrown error', t => {
  const path = 'index.mdm';

  const actual = t
    .throws(() => expectMdFilePath(path), TypeError)
    .message;
  const expected = 'Specified file is not Markdown file.';

  t.is(actual, expected);
});

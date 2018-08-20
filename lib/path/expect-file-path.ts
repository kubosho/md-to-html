import { extname } from 'path';

function getFileTypeErrorMessage(expected: string): string {
  return `Specified file is not ${expected} file.`;
}

export function expectMdFilePath(path: string): string {
  const expected = /\.md$/;
  const actual = extname(path);
  const msg = getFileTypeErrorMessage('Markdown');

  if (!expected.test(actual)) {
    throw TypeError(msg);
  }

  return path;
}

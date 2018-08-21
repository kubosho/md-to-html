import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
import { readFile as readFileMod, writeFile as writeFileMod } from 'fs';
import { promisify } from 'util';

const FILE_ENCODING = 'utf8';

export function readFile(path: string): Promise<string> {
  const r = promisify(readFileMod);
  return r(path, FILE_ENCODING);
}

export function writeFile(path: string, contents: string): Promise<void> {
  const w = promisify(writeFileMod);
  return w(path, contents, FILE_ENCODING);
}

export function readStdin(): Promise<string> {
  let contents = '';

  return new Promise((resolve: (value: string) => void, reject: (errorMessage: string) => void) => {
    const stdin = process.stdin;
    const isTTY = stdin.isTTY;

    if (isTTY) {
      resolve(contents);
      return;
    }

    stdin.setEncoding('utf8');

    stdin.on('readable', () => {
      let chunk = '';

      do {
        chunk = unwrapOrFromNullable(stdin.read(), '').toString();
        contents += chunk;
      } while (chunk !== '');
    });

    stdin.on('error', (error: Error) => {
      reject(error.toString());
    });

    stdin.on('end', () => {
      resolve(contents);
    });
  });
}

import {
  readFile as readFileMod,
  writeFile as writeFileMod,
} from 'fs';
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

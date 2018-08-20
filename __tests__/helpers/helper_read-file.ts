import { readFile as readFileMod } from 'fs';
import { promisify } from 'util';

const FILE_ENCODING = 'utf8';

export function readFile(path: string): Promise<string> {
  const r = promisify(readFileMod);
  return r(path, FILE_ENCODING);
}

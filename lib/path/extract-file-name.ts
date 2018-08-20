import { parse } from 'path';

export function extractFileName(path: string): string {
  const name = parse(path).name;
  return name;
}

import globby from 'globby';
import { resolve as resolvePath } from 'path';
import { unwrapOrFromMaybe } from 'option-t/lib/Maybe/unwrapOr';
import { defineArguments } from './lib/define-arguments';
import {
  readFile,
  writeFile,
  readStdin,
} from './lib/io';
import { convertToHtml } from './lib/markdown-to-html-converter';
import { reportFatalError } from './lib/report-fatal-error';

async function getAbsolutePaths(input: string[]): Promise<string[]> {
  if (input.length === 0) {
    return [];
  }

  const paths = await globby(input);

  if (paths.length === 0) {
    reportFatalError('Input Error: You must pass a valid list of files to parse');
  }

  return paths.map((path: string) => resolvePath(path));
}

async function readFileContent(path?: string): Promise<string> {
  if (!path || path.length === 0) {
    return await readStdin();
  }

  return await readFile(path);
}

async function readFileContents(paths: string[]): Promise<string[]> {
  let fileContents = null;

  try {
    fileContents = await Promise.all(paths.map((path: string) => {
      return readFileContent(path);
    }));
  } catch (err) {
    reportFatalError(err);
  }

  return fileContents;
}

async function writeHtmlString(content: string, outputPath?: string) {
  const htmlString = convertToHtml(content);

  if (!outputPath) {
    process.stdout.write(htmlString);
    return;
  }

  try {
    await writeFile(outputPath, htmlString);
  } catch (err) {
    reportFatalError(err);
  }
}

export async function main() {
  const argv = defineArguments();
  const input = unwrapOrFromMaybe(argv._, []);
  const outputPath = argv.output;

  const paths = await getAbsolutePaths(input);
  let content = '';

  try {
    content = await readFileContent(paths[0]);
  } catch (err) {
    reportFatalError(err);
  }

  if (paths.length <= 1) {
    writeHtmlString(content, outputPath);
    return;
  }
}

import globby from 'globby';
import {
  basename,
  join as joinPath,
  resolve as resolvePath,
} from 'path';
import { unwrapOrFromMaybe } from 'option-t/lib/Maybe/unwrapOr';
import { defineArguments } from './lib/define-arguments';
import {
  readFile,
  writeFile,
  readStdin,
} from './lib/io';
import { extractFileName } from './lib/extract-file-name';
import { convertToHtml } from './lib/markdown-to-html-converter';
import { reportFatalError } from './lib/report-fatal-error';

type HtmlString = string;
type FilePath = string;

const DEFAULT_FILE_NAME = 'output.html';
const FROM_STDIN = 'stdin';
const HTML_EXTENSION = '.html';

async function readFileContent(path?: string): Promise<string> {
  if (!path || path.length === 0) {
    return await readStdin();
  }

  return await readFile(path);
}

async function writeHtmlString(htmlString: string, outputPath?: string) {
  if (!outputPath || outputPath === '') {
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
  const { out, outDir } = argv;
  const outOption = unwrapOrFromMaybe(out, '');
  const outDirOption = unwrapOrFromMaybe(outDir, '');
  const inputFiles = unwrapOrFromMaybe(argv._, []);

  const htmlStringMap: Map<FilePath, HtmlString> = new Map();

  // input from stdin
  if (inputFiles.length === 0) {
    try {
      const c = await readFileContent();
      const h = convertToHtml(c);
      htmlStringMap.set(FROM_STDIN, h);
    } catch (err) {
      reportFatalError(err);
    }
  }

  if (inputFiles.length >= 1) {
    let paths = await globby(inputFiles);
    paths = paths.map((path: string) => resolvePath(path));

    if (paths.length === 0) {
      reportFatalError('Input Error: You must pass a valid list of files to parse');
    }

    await Promise.all(paths.map(async (path: string) => {
      try {
        const c = await readFileContent(path);
        const h = convertToHtml(c);
        htmlStringMap.set(path, h);
      } catch (err) {
        reportFatalError(err);
      }
    }));
  }

  htmlStringMap.forEach((htmlString: HtmlString, path: FilePath) => {
    try {
      if (htmlString === '') {
        return;
      }

      const filename = extractFileName(path) === FROM_STDIN ? DEFAULT_FILE_NAME : extractFileName(path);

      if (outOption !== '' || outDirOption !== '') {
        const outPath = joinPath(outDirOption, outOption || `${filename}${HTML_EXTENSION}`);
        writeHtmlString(htmlString, outPath);
        return;
      }

      writeHtmlString(htmlString);
    } catch (err) {
      reportFatalError(err);
    }
  });
}

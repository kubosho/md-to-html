import { reportFatalError } from './report-fatal-error';
import { convertToHtml } from './markdown-to-html-converter';
import {
  readFile,
  writeFile,
} from './io';

interface MdToHtmlOptions {
  to?: string;
}

export async function optionToAction(filepath: string, options?: MdToHtmlOptions) {
  let contents = null;
  let htmlString = null;

  try {
    contents = await readFile(filepath);
    htmlString = convertToHtml(contents);
  } catch (err) {
    reportFatalError(err);
  }

  try {
    const path = options.to;
    await writeFile(path, htmlString);
  } catch (err) {
    reportFatalError(err);
  }
}

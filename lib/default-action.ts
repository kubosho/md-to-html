import { reportFatalError } from './report-fatal-error';
import { convertToHtml } from './markdown-to-html-converter';
import { readFile } from './io';

export async function defaultAction(filepath: string) {
  let contents = null;
  let htmlString = null;

  try {
    contents = await readFile(filepath);
    htmlString = convertToHtml(contents);
  } catch (err) {
    reportFatalError(err);
  }

  process.stdout.write(htmlString);
}

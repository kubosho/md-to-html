import globby from 'globby';
import { resolve as resolvePath } from 'path';
import { defineArguments } from './lib/define-arguments';
import { defaultAction } from './lib/default-action';
import { optionToAction } from './lib/option-to-action';
import { reportFatalError } from './lib/report-fatal-error';

const args = defineArguments();
const input = args._;

Promise.resolve()
  .then(async () => {
    if (input && input.length) {
      const paths = await globby(input);

      if (paths.length === 0) {
        reportFatalError('Input Error: You must pass a valid list of files to parse');
      }

      return paths;
    }

    return ['stdin'];
  })
  .then((inputs: string[]) => {
    let paths = inputs;
    const argv = defineArguments();

    if (paths[0] !== 'stdin') {
      paths = paths.map((path: string) => resolvePath(path));
    }

    if (!!argv.to) {
      paths.forEach((path: string) => {
        optionToAction(path, { to: argv.to });
      });
      return;
    }

    paths.forEach((path: string) => {
      defaultAction(path);
    });
  })
  .catch((err: any) => {
    reportFatalError(err);
  });

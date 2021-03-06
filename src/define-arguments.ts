import yargs from 'yargs';
import { version } from './version';

export interface MdToHtmlArguments extends yargs.Arguments {
  version?: string;
  output?: string;
  outDir?: string;
}

export function defineArguments(): MdToHtmlArguments {
  return yargs
    .version(version)
    .option('out', {
      alias: 'o',
      type: 'string',
      desc: 'Output HTML file in specified path',
    })
    .option('outDir', {
      type: 'string',
      desc: 'Output HTML file in specified directory',
    }).argv;
}

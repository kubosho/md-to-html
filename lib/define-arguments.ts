import yargs from 'yargs';
import { version } from './version';

export function defineArguments(): yargs.Arguments {
  return (
    yargs
      .version(version)
      .option('to', {
        type: 'string',
        desc: 'Output HTML file in specified path',
      })
      .argv
  );
}

import test from 'ava';
import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';
import { exec } from 'child_process';
import { readFile } from './helpers/helper_read-file';

test.cb('Read from stdin', t => {
  const process = exec(
    `node ${resolvePath('bin/md-to-html')}`,
    (error, stdout) => {
      if (error) {
        t.end(error);
      }

      const fixtureHtml = resolvePath('__tests__/fixtures/fixture_stdin.html');
      const fixtureMd = resolvePath('__tests__/fixtures/fixture_stdin.md');

      Promise.all([stdout, readFile(fixtureHtml)])
        .then(([actual, expected]) => {
          t.is(actual, expected);
          t.end();
        })
        .catch(t.end);

      createReadStream(fixtureMd)
        .pipe(process.stdin);
    },
  );
});

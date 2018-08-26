import test from 'ava';
import { resolve as resolvePath } from 'path';
import { exec } from 'child_process';
import { readFile } from './helpers/helper_read-file';

test.cb('Read from glob', t => {
  const fixtureMdGlob = resolvePath('__tests__/fixtures/fixture_glob*.md');
  const bin = resolvePath('bin/md-to-html');

  exec(
    `node ${bin} ${fixtureMdGlob}`,
    (error, stdout) => {
      if (error) {
        t.end(error);
      }

      const fixtureHtml = resolvePath('__tests__/fixtures/fixture_glob.html');

      Promise.all([stdout, readFile(fixtureHtml)])
        .then(([actual, expected]) => {
          t.is(actual, expected);
          t.end();
        })
        .catch(t.end);
    },
  );
});

export function reportFatalError(message: string) {
  // tslint:disable-next-line: no-console
  console.error(message);
  process.exit(1);
}

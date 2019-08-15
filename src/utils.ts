function delimeterMsg(str: string) {
  console.log(`\n*************** ${str} *****************\n`);
}

function log(...args: any[]) {
  console.log(...['\n', ...args.map(arg => arg + '\n\n')]);
}

export { log, delimeterMsg };
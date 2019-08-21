function delimeterMsg(str: string) {
  const msg = `\n*************** ${str} *****************\n`;
  console.log(msg);
  delimeterMsgHTML(msg);
}

function log(...args: any[]) {
  console.log(...['\n', ...args.map(arg => arg + '\n\n')]);
}

function logF(f: Function, ...args: any) {
  const name = splitToWords(f.name);
  log(name);
  logToHTML(name);
  f(args);
}

function delimeterMsgHTML(msg: string) {
  appendMsgToHTML(msg, 'delimeter-msg');
}

function logToHTML(...args: any[]) {
  appendMsgToHTML(args.join('\n'), 'msg');
}

function appendMsgToHTML(msg: string, klass: string) {
  const div: HTMLElement = document.createElement('div');
  div.classList.add(klass);
  div.innerText = msg;

  document.getElementById('content').appendChild(div);
}

function splitToWords(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((str, i) => i == 0 ? capitalize(str) : str.toLowerCase())
    .join(' ');
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { log, logF, logToHTML, delimeterMsg };
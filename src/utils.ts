function delimeterMsg(str: string) {
  const msg = `\n*************** ${str} *****************\n`;
  console.log(msg);
  delimeterMsgHTML(msg);
}

function log(...args: any[]) {
  console.log(...['\n', ...args.map(arg => arg + '\n\n')]);
  logHTML(args);
}

function delimeterMsgHTML(msg: string) {
  logToHTML(msg, 'delimeter-msg');
}

function logHTML(...args: any[]) {
  logToHTML(args.join('\n'), 'msg');
}

function logToHTML(msg: string, klass: string) {
  const div: HTMLElement = document.createElement('div');
  div.classList.add(klass);
  div.innerText = msg;

  document.getElementById('content').appendChild(div); 
}

export { log, delimeterMsg };
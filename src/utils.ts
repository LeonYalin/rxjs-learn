function delimeterMsg(str: string) {
  const msg = `\n*************** ${str} *****************\n`;
  console.log(msg);
  delimeterMsgHTML(msg);
}

function log(...args: any[]) {
  console.log(...['\n', ...args.map(arg => arg + '\n\n')]);
  logToHTML(args);
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

export { log, logToHTML, delimeterMsg };
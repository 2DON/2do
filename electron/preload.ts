window.env = new Map<string, string>();

if (process.env['_2DO_API_URL']) {
  window.env.set('API_URL', process.env['_2DO_API_URL']);
}

require('electron')
  .remote.getCurrentWindow()
  .setIcon('../buildResources/icon-golden.png');
require('electron').remote.getCurrentWindow().setTitle('self-hosted');

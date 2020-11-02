import { remote } from 'electron';
import { join as pathJoin } from 'path';

const app = remote.app;
const win = remote.getCurrentWindow();

window.env = new Map<string, string>();
if (process.env['_2DO_API_URL']) {
  window.env.set('API_URL', process.env['_2DO_API_URL']);
}

Object.defineProperty(window, 'title', {
  set(title: string) {
    win.setTitle(title);
  },
  get(): string {
    return win.getTitle();
  },
});

window.setIcon = (...path: string[]) => {
  win.setIcon(pathJoin(app.getAppPath(), 'build', ...path));
};

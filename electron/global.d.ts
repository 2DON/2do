interface Window {
  env: Map<string, string>;
  title: string;
  setIcon: (...path: string[]) => void;
}

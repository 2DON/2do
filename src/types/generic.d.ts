interface Dict<V> {
  [id: string]: V;
}

type SubmitEvent = React.BaseSyntheticEvent<
  Event,
  EventTarget & HTMLFormElement,
  EventTarget
>;

type Page<T = {}> = React.FC<T> & { path: string }

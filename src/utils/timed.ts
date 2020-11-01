type TimedHandler<T> = (t: T) => void;

export default function timed<T>(
  time: number,
  handler: TimedHandler<T>
): TimedHandler<T> {
  let id: NodeJS.Timeout;

  return (...args) => {
    if (id != null) {
      clearTimeout(id);
    }

    id = setTimeout(() => handler(...args), time);
  };
}

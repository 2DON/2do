export default function timed<T extends Function>(
  time: number,
  handler: T
): T {
  let id: NodeJS.Timeout;

  return ((...args: any) => {
    if (id != null) {
      clearTimeout(id);
    }

    id = setTimeout(() => handler(...args), time);
  }) as unknown as T;
}
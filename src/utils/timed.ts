/**
 * Returns a function that, when called, if not called again within the specified time, will be executed
 *
 * @param {number} time
 * @param {VoidFunction} handler
 * @returns {VoidFunction}
 */
export default function timed(
  time: number,
  handler: (...args: any[]) => Promise<void>
): (...args: any[]) => void {
  let id: NodeJS.Timeout;

  return (...args) => {
    if (id != null) {
      clearTimeout(id);
    }

    id = setTimeout(() => handler(...args), time);
  };
}

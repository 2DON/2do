/**
 * Returns a function that, when called, if not called again within the specified time, will be executed
 *
 * @param {number} time
 * @param {VoidFunction} handler
 * @returns {VoidFunction}
 */
export default function (time, handler) {
  let id

  return (...args) => {
    if (id != null) {
      clearTimeout(id)
    }

    id = setTimeout(() => handler(...args), time)
  }
}

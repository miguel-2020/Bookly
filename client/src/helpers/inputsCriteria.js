/**
 * Checks that every argument is valid.
 * @param {String[]} args - the arguments that need to be tested.
 * @returns {boolean} - returns true with valid inputs. Otherwise false.
 */
export default function inputsCriteria(args) {
  return args.every(
    (input) => !Object.is(input, null) && typeof input == 'string' && input.trim() != ''
  );
}

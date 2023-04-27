/**
 * @description calc count word ending form
 * @param {number} number
 * @param {Array<string>} titles
 * @return {string}
 */
const countForm = (number: number, titles: Array<string>): string => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return titles[1];
};

export { countForm };

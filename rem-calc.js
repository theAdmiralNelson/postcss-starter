const remBase = 16;

function remCalc(value, baseValue = remBase) {
  return value / baseValue + "rem";
}

module.exports = { remCalc };

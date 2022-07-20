const calc = require("./rem-calc");
module.exports = (cfg) => {
  const dev = cfg.env === "development",
    scss = cfg.file.extname === ".scss";

  function darken(value) {
    const darken = "red";
    return darken;
  }

  const remCalc = calc.remCalc;

  return {
    map: dev ? { inline: false } : false,
    plugins: [
      require("postcss-advanced-variables")(),
      require("postcss-map-get")(),
      require("postcss-nested")(),
      require("postcss-functions")({
        functions: { darken, remCalc },
      }),
      require("autoprefixer")(),
      dev ? null : require("cssnano")(),
    ],
  };
};

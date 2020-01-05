const autoprefixer = require('autoprefixer');

module.exports = {
  autoprefixer: autoprefixer({
    grid: 'autoplace', // will enable -ms- prefixes for Grid Layout including some, more info: https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie
  });
};

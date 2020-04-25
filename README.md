# Webpack Boilerplate

Hi there! 👋

This repository is intended to be a boilerplate for a quick start for my web development, I don't know how many repositories must be exist out the, but apart of be just another one is also a record of my learning in my daily job and readings about web technologies.

This boilerplate is made for compile and build files using Webpack configured with Babel Bootstrap 4 and Sass.

This Boilerplate is inspired in this [post](https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1) of [Margarita Obraztsova](https://hackernoon.com/@riittagirl)

Thanks Margarita!

If you like it send me a tweet!

## What include this configuration?

- [Babel](https://babeljs.io/)
- [Bootstrap 4](http://getbootstrap.com/)
- [Fontawesome 5](https://fontawesome.com/)
- [Sass](http://sass-lang.com/)
- [Webpack 4](https://webpack.js.org/)

## Installation

Clone repository

```sh
$ git clone https://github.com/wilcho-vnz/webpack-boilerplate.git
$ cd webpack-boilerplate
$ cp env.example .env
$ yarn install
$ yarn build && yarn start
```

NOTE: run the last command only the first time that you start the devserver. This is because the assets and default index should be copied to the dist folder where webpack dev server will look for contents.

## Commands

### Start dev server

```sh
$ yarn dev
```

### Build files

```sh
$ yarn build
```

### Build for production

```sh
$ yarn build:prod
```

## How to

### Handle background images

The files used as background images should be stored in src/assets/img/ and in your sass files call it, for example:

```
background-image: url("../assets/img/bg-test.png");
```

### Handle fonts

The fonts files should be stored in src/assets/fonts/ and have to be added in \_typography.scss file, for example:

```
@font-face {
    font-family: 'font-name';
    src: url('../assets/fonts/font-name/font-name.eot');
    src: url('../assets/fonts/font-name/font-name.eot') format('embedded-opentype'),
        url('../assets/fonts/font-name/font-name.woff2') format('woff2'),
        url('../assets/fonts/font-name/font-name.woff') format('woff'),
        url('../assets/fonts/font-name/font-name.ttf') format('truetype'),
        url('~../ssets/fonts/font-name/font-name.svg#font-name') format('svg');
```

## ESLint configuration

VS Code recommended User Settings JSON configuration

```
{
    ...
    // these are all my auto-save config
    "editor.formatOnSave": true,
    // turn it off fot JS
    "[javascript]": {
        "editor.formatOnSave": false,
    },
    "eslint.autoFixOnSave": true,
    "eslint.alwaysShowStatus": true,
    ...
}

```

## References

- [A tale of Webpack 4 and how to finally configure it in the right way](https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1)
- [Babel](https://babeljs.io/)
- [Syntactically Awesome Style Sheets (Sass)](http://sass-lang.com)

## Author

- Wilhelm Siso [@wilcho\_](https://twitter.com/wilcho)

---

MIT

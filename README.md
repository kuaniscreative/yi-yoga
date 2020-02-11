# Yi Yoga Class Manage System

A class manage system for Yi Yoga.

## Getting Started

- `$ npm install` to install packages
- `$ npm start` to run a local server
- `$ gulp` to listen to SCSS file changes
- `$ npm run build` for a production build
- `$ npm run build-dev` for a development build

## Before Build

如果有需要部署到 dev server，請使用 `$ npm run build-dev`。這樣才能使用正確的 `fbConfig`。

## Before Deployment

- 記得切換 firebase environment。
- `$ firebase use default` for **production**
- `$ firebase use development` for **development**

## Project Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Framework**: [React](https://reactjs.org/)

**State Management**: [Redux](http://redux.js.org/)

**CSS Preprocessor**: [SASS](https://sass-lang.com/)

**Bundler for SASS**: [Gulp](https://gulpjs.com/)

**Hosting**: [Firebase](https://firebase.google.com/)

## MISC

- 切換環境參考[此篇](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial)
- `create-react-app` 中關於環境變數的設定：[create-react-app 文件](https://create-react-app.dev/docs/adding-custom-environment-variables/)

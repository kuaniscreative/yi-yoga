# Yi Yoga Class Manage System

A class manage system for Yi Yoga.

## Getting Started

- `$ npm install` to install packages
- `$ npm start` to run a dev server
- `$ gulp` to listen to SCSS file changes
- `$ npm run build` for a production build

## Before Deployment

- 記得切換 firebase environment。
- `$ firebase use default` for **production**
- `$ firebase use development` for **development**
- 發佈時會自動更新 `NODE_ENV` ， `src/fbConfig.js` 會自動切換。（關於 `NODE_ENV` 的設定請參考 [create-react-app 文件](https://create-react-app.dev/docs/adding-custom-environment-variables/)）

## Project Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Framework**: [React](https://reactjs.org/)

**State Management**: [Redux](http://redux.js.org/)

**CSS Preprocessor**: [SASS](https://sass-lang.com/)

**Bundler for SASS**: [Gulp](https://gulpjs.com/)

**Hosting**: [Firebase](https://firebase.google.com/)

## MISC

- 切換環境參考[此篇](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial)

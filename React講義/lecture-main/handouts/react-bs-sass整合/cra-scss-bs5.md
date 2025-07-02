# SASS/SCSS - CRA(create-react-app)+Bootstrap5 SCSS 搭配使用

## 第一部份：CRA 加入 SASS(SCSS)導入支援

### 步驟 1. 安裝 node-sass

安裝 sass:

```
# 使用 yarn
yarn add sass

```

或

```
# 使用 npm
npm install sass --save
```

### 步驟 2. 更改 .css 檔案為 .scss

### 步驟 3. 更改所有導入(import)樣式部份使用 .scss

> /index.js

```js
import './index.scss'
```

> 註：需要 yarn start 重啟 react 開發伺服器

> 參考：https://create-react-app.dev/docs/adding-a-sass-stylesheet/

## 第二部份：CRA 加入 Bootstrap SCSS 檔案與導入

### 安裝 bootstrap 的 npm 模組(以 5.x 為主)

```sh
yarn add bootstrap

// use npm
npm install --save bootstrap
```

### 全站使用樣式 `index.scss`

> 在`src`目錄

```scss
// 其它自訂樣式
@import './styles/global.scss';
```

### 自訂樣式 `global.scss`

建立一個`styles`資料夾，裡面建一個新檔案`global.scss`

> 在`src/styles`目錄

選項 A: 完整導入 Bootstrap 的情況：(來源: https://getbootstrap.com/docs/5.0/customize/sass/)

```scss
// 這裡導入所有要預設變數覆蓋

// 導入bootstrap所有的樣式與預設變數
@import '~bootstrap/scss/bootstrap';

// 其它要導入覆蓋掉原本的預設bootstrap樣式要放在這下面
// 全站都會使用的共同樣式
html {
  font-size: 12px;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
```

選項 B: (進階使用!)視情況導入所需樣式的情況：(來源: https://getbootstrap.com/docs/5.0/customize/sass/)

```scss
// 1. 導入functions(要處理colors, SVGs, calc, 等等)
@import '~bootstrap/scss/functions';

// 2. 這裡導入所有要預設變數覆蓋

// 3. 導入必要的其它Bootstrap樣式
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

// 4. 導入可選擇的Bootstrap元件樣式
@import '~bootstrap/scss/root';
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/type';
@import '~bootstrap/scss/images';
@import '~bootstrap/scss/containers';
@import '~bootstrap/scss/grid';

// 5. 加入額外的樣式在這裡
```

### 覆蓋預設變數 \_variables.scss

在 Bootstrap 中只要是有包含`!default`標記的 Sass 變數是可以覆蓋的，並不需要更改到 Bootstrap 的原始檔案。

複製然後貼上需要的變數，然後修改它們的值，以及移除掉`!default`標記。

您可以在 scss/\_variables.scss 中找到 Bootstrap 變數的完整列表。有些變數設置為 null ，除非在配置中被覆蓋，否則這些變數不會輸出其屬性。

變數覆蓋需要在導入 Bootstrap 的 Sass 檔案之前。

> 在`src/styles`目錄，global.scss

```scss
// 變數覆蓋需要在導入Bootstrap的Sass檔案之前
// 參考Bootstrap的 _variables.scss
$primary: rgb(148, 36, 240);
$secondary: rgba(10, 10, 10, 0.842);

// 導入Bootstrap所有的樣式與預設變數
@import '~bootstrap/scss/bootstrap.scss';

// 其它要導入覆蓋掉原本的預設Bootstrap樣式要放在這下面
// .alert-primary {
//   color: #020c16;
//   background-color: #5e94ce;
//   border-color: #b8daff;
// }
```

### 其它

- 目前 CRA+sass 模組 已支援 `@use` 的新語法，可以取代`@import`，詳見[Adding a Sass Stylesheet](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)與[@use](https://sass-lang.com/documentation/at-rules/use)

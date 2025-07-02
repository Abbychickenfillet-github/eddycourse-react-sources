---
title: React 18 新功能一覽
tags: [react]
date: '2022-04-08'
draft: false
summary: 'React 18 版本在經歷一年左右的開發與測試後，在 2022.3.29 正式推出了第一個穩定版本...'
---

## 前言

React 18 版本在經歷一年左右的開發與測試後，在 2022.3.29 正式推出了第一個穩定版本，同時 npm 套件也更換為 18.0.0 版本，代表 React 正式進入了 一個新的里程碑，也是從 React Fiber 完成後，長久以來的所謂的並行(Concurrent)模式真的達到可用於應用程式開發中的重要版本，當然它是一個可選擇加入或退出的，並非強制性的功能。

本文快速的摘要了重要的功能，詳細的各功能有包含在連結之中。有許多新功能的目標對象並非應用程式的開發者，而是針對特定函式庫的開發者，大部份都與伺服器(SSR)渲染有關，不得不說 SSR 是目前 React 技術生態圈相當重要的發展趨勢。

個人建議是對於 18 新版本發佈後，開發者們可以先作觀察與前期實驗性使用，不需要急著升級現有應用程式，仍然需要一定時間讓市場接受考驗，一開始會出現較多嚴重問題的地方，可能都會先落在於與其它周邊第三方函式庫的整合相容與搭配問題。

## 介紹連結

文章介紹

- [React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html)

影片介紹

- [React Conf 2021](https://www.youtube.com/watch?v=FZ0cG47msEk&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa)
- [React 18 for app developers](https://www.youtube.com/watch?v=ytudH8je5ko&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa&index=3)

## 新功能摘要

### Automatic batching(自動批次)

- 更少的 re-render 提高效能
- 可在事件處理外執行
- 安全，也可在在需要時選擇退出

18 版之前，原本的自動批次功能只會在 React 的事件處理器(函式)中，在 promise, setTimeout, 原生的事件處理器(函式)中或其它事件中，並不會作自動批次。

18 版之後，有了新的自動批次功能，上述的這些都會有自動批次執行的功能。

```js
// 之前的版本: 只有React事件才會作自動批次
setTimeout(() => {
  setCount((c) => c + 1)
  setFlag((f) => !f)
  // React將會render兩次，每個對狀態更新都會作一次(無自動批次)
}, 1000)

// 18版本之後
setTimeout(() => {
  setCount((c) => c + 1)
  setFlag((f) => !f)
  // React將只會re-render一次(自動批次)
}, 1000)
```

### Suspense on the server(伺服器端暫停功能)

- 一個執行慢的部份不會拖慢整個頁面
- 更早呈現初始的 HTML，然後連串呈現出其它的
- 程式碼分離完整整合到伺服器端渲染

```js
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

> 註: Suspense 在 16 版就已釋出(但並不支援 SSR，屬於實驗性質實務上可用性不高)。18 版後作了許多新的改進，也有加入並行模式與新功能，但還有不少功能仍在開發中，詳見此 issue: [Releasing Suspense #13206](https://github.com/facebook/react/issues/13206)

### 新 API

concurrent(並行)功能部份

- [startTransition()](https://reactjs.org/docs/react-api.html#starttransition)
- [useTransition()](https://reactjs.org/docs/hooks-reference.html#usetransition): 類似於節流閥(Throttling)與防抖動(debouncing)的機制，但由 React 來控管更新的時間點
- [useDeferredValue()](https://reactjs.org/docs/hooks-reference.html#usedeferredvalue): 與 useTransition 類似機制，但用於從父母元件接收新值(useTransition 用於事件處理器觸發更新)

> 註: 更多相關內容可參考[New feature: startTransition](https://github.com/reactwg/react-18/discussions/41)與[New in 18: useDeferredValue](https://github.com/reactwg/react-18/discussions/129)

針對函式庫開發者部份

- [useId()](https://reactjs.org/docs/hooks-reference.html#useid): "不是"用來產生列表項目的 key，之前名稱為 [useOpaqueIdentifier](https://github.com/facebook/react/pull/17322)，目的是能同時在客戶端與伺服器端產生唯一 ID，避免伺服器端渲染(SSR)的事件處理器[水合作用](https://blog.saeloun.com/2021/12/16/hydration.html)匹配上的問題。
- [useSyncExternalStore()](https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore): 主要針對外部狀態函式庫開發使用，如 redux, mobx, zustand 等等
- [useInsertionEffect()](https://reactjs.org/docs/hooks-reference.html#useinsertioneffect): 主要針對給 css-in-js 函式庫開發使用。(應用開發建議優先使用 useEffect 或 useLayoutEffect)

## 客戶端升級

參考：[官網升級指南](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)

### 安裝最新版本的 React 18 (react 與 react-dom)

> 註: TypeScript 使用者額外需更新`@types/react`與`@types/react-dom`

> 註: 目前(2022.4.18)在 npm 上的 版本已經是版本 18，CRA 安裝也改為 React 18，也改用`createRoot`了

### 從 `ReactDOM.render` 改為 `ReactDOM.createRoot`

> 註: 沒有更動的話仍然是以 17 版的方式執行

```js
// 之前
import { render } from 'react-dom'

const container = document.getElementById('app')
render(<App tab="home" />, container)

// 修改後
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App tab="home" />)
```

### 1. 安裝jquery模組
`yarn add jquery` 或 `npm install jquery`

### 2. 導入jquery模組(使用的元件檔案最上方)

`import $ from 'jquery'`

### 3-1. 方法一：使用id或class值獲取dom元素，只能在`componentDidMount`生命周期方法中使用

> 類別型元件

```jsx
import React from 'react'
// 要先安裝jquery 模組 
// yarn add jquery或npm instal jquery
import $ from 'jquery'

class App extends React.Component {
  constructor(props) {
    super(props)
    // product = { name: string, price: numbers }
    this.state = {
      data: 0,
    }
  }

  componentDidMount() {
    //jquery的程式碼需要寫在這裡，確保dom元素已經出現在網頁上
    $('#one').click(() => alert('data is ' + this.state.data))
  }

  render() {
    return (
      <>
        <button id="one">click me</button>
        <button onClick={() => this.setState({ data: 111 })}>
          change to 111
        </button>
      </>
    )
  }
}

export default App
```

---

> 函式型元件

```jsx
import React, { useEffect, useState } from 'react'
// 要先安裝jquery 模組
// yarn add jquery或npm instal jquery
import $ from 'jquery'

export default function TestJQuery(props) {
  const [data, setData] = useState(123)

  useEffect(() => {
    //jquery的程式碼需要寫在這裡，確保dom元素已經出現在網頁上
    $('#one').click(() => alert('data is ' + data))
  }, [])

  return (
    <>
      <button id="one">click me</button>
    </>
  )
}
```

### 3-2. 方法二：使用refs來獲取dom元素

> 類別型元件

```jsx
import React from 'react'
// 要先安裝jquery 模組
// yarn add jquery或npm instal jquery
import $ from 'jquery'

class App extends React.Component {
  constructor(props) {
    super(props)
    // product = { name: string, price: numbers }
    this.state = {
      data: 0,
    }

    // 先宣告ref
    this.buttonOneRef = React.createRef()
  }

  componentDidMount() {
    //jquery的程式碼需要寫在這裡，確保dom元素已經出現在網頁上
    //jquery使用ref的current值來獲取dom元素
    $(this.buttonOneRef.current).click(() =>
      alert('data is ' + this.state.data)
    )
  }

  render() {
    return (
      <>
        {/* 套用ref值 */}
        <button ref={this.buttonOneRef}>click me</button>
        <button onClick={() => this.setState({ data: 111 })}>
          change to 111
        </button>
      </>
    )
  }
}

export default App
```

---

> 函式型元件

> 註：函式型元件可以使用[useRef](https://zh-hant.reactjs.org/docs/hooks-reference.html#useref)勾子來處理refs

```jsx
import React, { useRef, useState } from 'react'
// 要先安裝jquery 模組
// yarn add jquery或npm instal jquery
import $ from 'jquery'

export default function TestJQuery(props) {
  const buttonOneRef = useRef(null)
  const [data, setData] = useState(123)

  return (
    <>
      {/* 套用ref值 */}
      <button
        onClick={() => {
          $(buttonOneRef.current).click(() => alert('data is ' + data))
        }}
        ref={buttonOneRef}
      >
        click me
      </button>
    </>
  )
}
```
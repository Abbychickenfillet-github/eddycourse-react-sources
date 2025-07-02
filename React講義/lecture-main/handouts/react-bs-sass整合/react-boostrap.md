# React Bootstrap 使用說明

> https://react-bootstrap.github.io/

本範例中使用了數個套件模組，這些套件彼此可獨立運作。它們分別的功用如下所示:

- React Bootstrap: 應用程式的排版，跳出視窗、表單、按鈕等操作介面
- react-icons: 免費授權的圖示 icon

註：本章中將以 Bootstrap 5 的樣式為主，更多相關資訊可到以下網站觀看 - [Bootstrap5-官方網站](https://getbootstrap.com/docs/5.1/getting-started/introduction/)

註：有另一個專案名稱為[reactstrap](https://reactstrap.github.io/)的專案，也是以 Bootstrap 的 React 元件庫，用法很類似，但本範例中並不是使用這個。

## React Bootstrap 部份

### 安裝 react-bootstrap 模組

在終端機裡，對應專案的根目錄，輸入以下的指令(選擇其中一種即可，如果已經有安裝 yarn 建議使用上面這個):

> 註：1.6.1 對應 Bootstrap 4.6 / 2.3.0 對應 Bootstrap 5.1

```
yarn add react-bootstrap
```

或

```
npm install react-bootstrap
```

### 修改 index.html(略)

> 註: 如果沒有安裝與使用 bootstrap 模組與 scss 的話，才需要此步驟

因為 React Bootstrap 雖然並沒有依賴任一個 Bootstrap 的版本中的 css，但有些樣式仍然是需要使用 Bootstrap 中的 css 檔案，所以你還是得要加入到你的 index.html 檔案之中。

打開專案中的 public 資料夾中的 index.html 檔案，將以下的程式碼加入到<title>標記的前一行即可：

```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

註：上面這行樣式的程式碼，可到 Bootstrap 官方網站找到。如果不想使用 cdn 的方式來引用，可以到官方網站下載已編譯過的 css 樣式檔案，放於 public 資料夾中再引入。

### 撰寫測試用程式碼

```js
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

function BootstrapTest(props) {
  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <h1>React Bootstrap</h1>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='success'>Success</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BootstrapTest
```

### 注意

React Bootstrap 可相容於任何以 Bootstrap 所製作的樣版佈景樣式，但因為並沒有使用 Bootstrap 的 JavaScript 功能部份，所以並不能支援樣版佈景中有使用原本 Bootsrap 的一些動態特效的樣式。

## react-icons 部份

由於 React Bootstrap 目前已不再內建圖示功能，圖示需要另外安裝[react-icons](https://github.com/react-icons/react-icons)模組。

### 安裝模組

在終端機裡，對應專案的根目錄，輸入以下的指令(選擇其中一種即可，如果已經有安裝 yarn 建議使用上面這個):

```
yarn add react-icons
```

或

```
npm install react-icons --save
```

### 使用圖示範例

react-icons 支援了 10 種以上免費(商業授權也免費)的圖示，使用上非常簡單。

首先在已安裝好的專案程式碼檔案上引入，然後在 JSX 語法中作為元件來使用即可，如下面的程式碼範例：

```js
import React from 'react'
import { FaReact } from 'react-icons/fa'
import { Button } from 'react-bootstrap'

const IconButton = (props) => (
  <>
    <Button variant='primary'>
      <FaReact /> React v16
    </Button>
  </>
)

export default IconButton
```

註：圖示清單，或是其它種類的圖示如何引用，請至[react-icons 官網](https://react-icons.netlify.com/)觀看詳細說明。

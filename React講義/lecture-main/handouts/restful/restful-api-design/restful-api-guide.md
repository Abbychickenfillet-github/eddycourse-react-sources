# Restful API 設計指引

## 專門術語

### Document(文件)

文件資源是單數的概念，類似於一個物件或是一筆資料庫的記錄。

範例: http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet

### Collection(集合)

集合資源是一個伺服器管理的資源目錄。客戶端可能會準備加入新資源到一個集合中。因此，這取決於由集合來選擇是否要建立新的資源。

範例: http://api.soccer.restapi.org/leagues/seattle/teams

### Store(存儲)

存儲是客戶端管理的資源存儲存庫。存儲資源可以讓 API 進行 put 資源進來，然後回應它們出去，或是決定什麼時候要刪除它們。就其本身而言，存儲無法建立新資源，因此存儲不會產生新的 URIs。取而代之的是，每個存儲資源當它被初始化放進到存儲時，會有一個由客戶端選定的 URI。

範例: PUT /users/1234/favorites/alonso

### Controller(控制器)

控制器資源模型化一個程式化的概念。控制器資源就像是可執行的函式，包含了傳入參數值和回傳值，也就是有輸入與輸出。

就像是傳統的使用 HTML 表單的網站應用程式，一個 REST API 依頼了控制器資源，來執行那些無法邏輯上匹配到其一標準方法的特定應用程式動作 (create, retrieve, update, 與 delete，即常見的 CRUD)

控制器通常位於 URI 路徑的最後一分段，在階層上不會再接上子資源在之後

範例: POST /alerts/245743/resend

## 命名規則

規則: 應用`動詞`或`動詞片語`於控制器名稱

範例:

http://api.college.restapi.org/students/morgan/register
http://api.example.restapi.org/lists/4324/dedupe
http://api.ognom.restapi.org/dbs/reindex
http://api.build.restapi.org/qa/nightly/runTestSuite

規則: 應用`單數名詞`於 document(文件)名稱
規則: 應用`複數名詞`於 collection(集合)名稱
規則: 應用`複數名詞`於 store(存儲)名稱

範例(明確的 CRUD):

GET http://www.api.com/customers - 要 獲得 customers 的清單項目

POST http://www.api.com/customers - 基於 request 中的 body 建立一個新的 customer

PUT http://www.api.com/customers/123 - 基於 request 中的 body 更新 識別 id 為“123”的 customer

PATCH http://www.api.com/customers/123 - 基於 request 中的 body 更新 識別 id 為“123”的 customer

DELETE http://www.api.com/customers/123 - 刪除 依照識別 id 為“123”的 customer

### 註冊/登出/登入

[logout 應該要使用 POST](https://stackoverflow.com/questions/3521290/logout-get-or-post).

> In 2010, using GET was probably an acceptable answer. But today (in 2013), browsers will pre-fetch pages they "think" you will visit next.

```
GET  /register // gets the webpage that has the registration form
POST /register  //create a new user
POST  /logout   // destroys session and redirects to /
POST /login    // authenticates credentials against database and either redirects home with a new session or redirects back to /login
```

```
GET  /signup // gets the webpage that has the registration form
POST /signup  //create a new user
POST  /logout   // destroys session and redirects to /
POST /login    // authenticates credentials against database and either redirects home with a new session or redirects back to /login
```

```
GET  /users/register // gets the webpage that has the registration form
POST /users  //create a new user
POST  /logout   // destroys session and redirects to /
POST /login    // authenticates credentials against database and either redirects home with a new session or redirects back to /login
```

```
GET    /session/new gets the webpage that has the login form
POST   /session authenticates credentials against database
DELETE /session destroys session and redirect to /
GET  /users/new gets the webpage that has the registration form
POST /users records the entered information into database as a new /user/xxx
GET  /users/xxx // gets and renders current user data in a profile view
POST /users/xxx // updates new information about user
```

```
/auth?user={user_id}
/auth?action=logout
/auth/{auth_id}
```

## 最佳實踐

### 名詞(Nouns)是比較好的命名時的選擇

例如:

`GET /users` 比 `GET /getUsers` 好
`GET /users/987` 比 `GET /getUserWithId/987` 好
`POST /users` 比 `GET /createNewUser` 好

### 使用複數名詞(PLURAL NOUNS)比單數名詞(SINGULAR)好

`/users` 比 `/user` 好
`/users/16` 比 `/user/16` 好

> 注意: 避免混用單數與複數名詞

### 用查詢字串(QUERY STRING)來表示複雜的參數

`GET /users?location=US&age=21` 比下面幾個都好

```text
GET  /users
GET /US-basedUsers
GET  /US-basedUsersAnd21-agedUsers
```

### 使用全小寫英文網址

`http://api.example.org/my-folder/my-doc`

> 註: 全大寫和全小寫在網址上是同義，不使用開頭大寫，或混用大小寫的網址(大駝峰寫法並非相等於全小寫或全大寫)

### 使用 連字號(-)，而不要使用 下底線(\_) 符號作為分隔字詞之用

使用 `連字號(-)`取代`下底線( \_ )`，ex:

```text
service-api.com/users
service-api.com/app-setups
```

> 註: 主要是不易閱讀的問題

但有例外情況，像屬性相關時(如查詢字串使用)，使用下底線會更好，這樣在 JS 中可以直接使用屬性名稱，ex:

```js
service_class: 'first'
```

### 網址最後結尾不需要斜線(/)

> 註: 主要是語義不清的問題

### API 版本

> 注意: API 版本位於 URI 中並非是好的作法，主因是這種網址未來有可能會隨版本而遺失或不支援。所以應該使用 aliases(別名) 指向無版本的網址中。

版本通常直接位於網址之中的前綴字詞段:

```text
GET www.myservice.com/api/v1/posts
```

將`api`使用於子網址中更可以更簡短網址:

```text
GET api.myservice.com/v1/posts
```

## Pagination(分頁)

回應範例:

```json
/**
 * Sample response for Page-1.
 */
{
  "totalRowCount": 1500,
  "pageSize": 100,
  "pageNumber": 1,
  "data": [
    {
      "key1": "value1",
      "key2": "value2"
    },
    {
      "key1": "value1",
      "key2": "value2"
    }
  ]
}
```

## Responses(回應) 與 Requests(要求) 設計

### Content-Type header

不論是 Responses(回應) 與 Requests(要求)大部份時候會採用 JSON 溝通。如果你的 API 回應是 JSON 格式，需要加入`Content-Type: application/json`在 MIME 類型上。

對於其它的 Responses(回應)格式例如 CSV/圖片/其它，你需要定義回傳的 MIME 類型在標頭(headers)中，雖然大部份現代的 API 與客戶端框架與工具會自動地處理這些標頭(headers)，但明確定義是比較好的習慣作法。

以下這兩者大部份時候都不需要額外設定，因為它是表單(form)/FormData 在提交的預設行為。
`x-www-form-urlencoded`都是用於送出表單的文字資料到伺服器， `multipart/form-data`用於送出二進位資料，通常是上傳檔案到伺服器使用。

> 註: 伺服器端需有類似[multer](https://www.npmjs.com/package/multer)的套件來處理檔案上傳。

註: 透過專用工具如 axios 可以進行自動偵測，可以略過偶爾必需自行定義的意外情況

### Accept header(標頭)

這個標頭(header)是用於讓客戶端在進行要求(request)到伺服器時，通知伺服器需要用什麼資料格式，來回應(response)客戶端。

通常是設定單一種回應格式為 JSON 或 XML。在需要時也可以設定多種允許格式。

```js
fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {
    Accept: 'application/json, text/plain',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ a: 1, str: 'Some string' }),
})
  .then((res) => res.json())
  .then((res) => console.log(res))
```

註: 透過專用工具如 axios 可以進行自動偵測，可以略過偶爾必需自行定義的意外情況

### 回應更新後的物件值

當要透過 PUT 或 PATCH 來進行更新資源時，最佳的實踐是，在成功後回傳更新後的資源在回應(response)中。這種作法同樣在成功的 POST 也適用(即新增/建立新資料時)。

### 在刪除時使用 204 回應

`204 No Content` 回應代表的是要求已經成功，但沒有內容可以回傳，所以作為 DELETE 或是 PUT 後沒有更動的資料兩者都是合適回應代碼。ex.

`DELETE /v1/posts/:id`

```json
// response - 204
{
  "data": null
}
```

## HTTP status code

### for Standard Statuses

200 for when everything is okay.
204 for when everything is okay, but there’s no content to return.
500 for when the server throws an error, completely unexpected.

### for Data Errors

400 for when the requested information is incomplete or malformed.
422 for when the requested information is okay, but invalid.
404 for when everything is okay, but the resource doesn’t exist.
409 for when a conflict of data exists, even with valid information.

### for Auth Errors

401 for when an access token isn’t provided, or is invalid.
403 for when an access token is valid, but requires more privileges.

200 OK - Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation.
201 Created - Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
204 No Content - Response to a successful request that won't be returning a body (like a DELETE request)
304 Not Modified - Used when HTTP caching headers are in play
400 Bad Request - The request is malformed, such as if the body does not parse
401 Unauthorized - When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
403 Forbidden - When authentication succeeded but authenticated user doesn't have access to the resource
404 Not Found - When a non-existent resource is requested
405 Method Not Allowed - When an HTTP method is being requested that isn't allowed for the authenticated user
410 Gone - Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
415 Unsupported Media Type - If incorrect content type was provided as part of the request
422 Unprocessable Entity - Used for validation errors
429 Too Many Requests - When a request is rejected due to rate limiting

## 參考

- [REST API Design Rulebook](https://www.oreilly.com/library/view/rest-api-design/9781449317904/)
- https://gearheart.io/articles/restful-api-design-best-practices/
- https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
- https://restfulapi.net/resource-naming/
- https://github.com/peterboyer/restful-api-design-tips
 https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E4%BD%BF%E7%94%A8-multer-%E5%AF%A6%E4%BD%9C%E5%A4%A7%E9%A0%AD%E8%B2%BC%E4%B8%8A%E5%82%B3-ee5bf1683113

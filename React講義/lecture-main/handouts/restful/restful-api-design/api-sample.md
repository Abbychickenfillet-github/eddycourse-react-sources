## **呈現會員資料**

回傳單一會員的 json 資料

- **URL**

  /users/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  無

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "陸小鳳" }`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "會員不存在" }`

  或

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "你沒有能進行這個要求的授權" }`

- **呼叫範例:**

  ```javascript
  axios
    .get('/users/1')
    .then((res) => {
      console.table(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      /* 不論失敗成功皆會執行 */
    })
  ```

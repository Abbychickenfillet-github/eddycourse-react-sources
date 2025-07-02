## **標題**

<_有關你的 API 呼叫的附加資訊。試著使用符合要求(request)類型(獲取 vs 更動)與多數(單數 vs 複數)的動詞._>

- **URL**

  <_URL 的結構(只需要用路徑，不需要 root url)_>

- **Method(方法):**

  <_要求的類型_>

  `GET` | `POST` | `DELETE` | `PUT`

- **URL Params(URL 參數)**

  <_如果存在 URL params，指出它們在 URL 區段的提到的名稱。將可選的(optional)與必要的(required)分開來。將資料限制文件化記下。_>

  **Required(必要):**

  `id=[integer]`

  **Optional(可選):**

  `photo_id=[alphanumeric]`

- **Data Params(資料參數)**

  <_如果是要進行 POST 要求，body 的有效資料會是長什麼樣子？ URL 參數規則也可以套用在這裡_>

- **Success Response(成功回應):**

  <_當成功時應該要有什麼狀態碼回傳，和有無回傳資料？這當使用者需要知道它們的回應是不是如預期時，會相當有幫助！_>

  - **Code(狀態碼):** 200 <br />
    **Content(內容):** `{ id : 12 }`

- **Error Response(錯誤回應):**

  <_大部份的端點將會有許多會造成失敗的方式。從沒有認証的存取，到不正確的參數等等。它們應該都要全部列在這裡。這會看起來很單調重複的，但它可以幫助避免產生錯誤回應的假定發生位置。_>

  - **Code(狀態碼):** 401 UNAUTHORIZED <br />
    **Content(內容):** `{ error : "Log in" }`

  或

  - **Code(狀態碼):** 422 UNPROCESSABLE ENTRY <br />
    **Content(狀態碼):** `{ error : "Email Invalid" }`

- **呼叫範例:**

  <_填上呼叫到你的端點的可以執行格式的範例 (例如 $.ajax 呼叫或 curl 要求) - 這可以讓生活更輕松與更可被預測。_>

- **註解:**

  <_這裡可以寫下所有不確定的、評論、討論結果等等。我會建議當留下評論時，加上時間戳記和可識別是誰留下的。._>

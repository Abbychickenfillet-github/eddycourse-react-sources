const express = require('express')
const router = express.Router()
// mysql
const promisePool = require('../config/mysql.js').promisePool
// 專用處理sql字串的工具，主要format與escape
const SqlString = require('sqlstring')

// 認証用的 middleware
function auth(req, res, next) {
  if (req.session.userId) {
    console.log('authenticated')
    next()
  } else {
    console.log('not authenticated')
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// Demo使用auth middleware
router.get('/private-middle', auth, (req, res) => {
  const userId = req.session.userId
  return res.json({ message: 'authorized', userId })
})

// Demo使用Session來決定是否有登入
router.get('/check-login', async function (req, res, next) {
  if (req.session.userId) {
    return res.json({ message: 'authorized', user: { id: req.session.userId } })
  } else {
    return res.json({ message: 'Unauthorized' })
  }
})

// GET - 得到所有會員資料
router.get('/', async function (req, res, next) {
  const sql = 'SELECT * FROM user'

  try {
    const [rows, fields] = await promisePool.query(sql)
    console.log(rows)

    if (rows.length > 0) {
      return res.json({ message: 'success', code: '200', users: rows })
    } else {
      return res.json({ message: 'fail', code: '204', users: [] })
    }
  } catch (error) {
    console.log('error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:userId', async function (req, res, next) {
  const userId = req.params.userId

  if (!userId) {
    return res.json({ message: 'error', code: '400' })
  }

  // 使用SqlString.format先產生sql方便除錯用
  const sql = 'SELECT * FROM user WHERE id=?'
  const formatSql = SqlString.format(sql, [userId])

  console.log(formatSql)

  try {
    const [rows, fields] = await promisePool.query(formatSql)
    console.log(rows)

    if (rows.length > 0) {
      return res.json({ message: 'success', code: '200', user: rows[0] })
    } else {
      return res.json({ message: 'fail', code: '204' })
    }
  } catch (error) {
    console.log('error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})

// POST - 新增會員資料
router.post('/', async function (req, res, next) {
  // 從react傳來的資料(json格式)，id由資料庫自動產生
  // 資料範例
  // {
  //     "name":"金妮",
  //     "email":"ginny@test.com",
  //     "username":"ginny",
  //     "password":"12345"
  // }
  const user = req.body

  console.log(user)

  // 檢查從react來的資料
  if (!user.name || !user.email || !user.username || !user.password) {
    return res.json({ message: 'fail', code: '400' })
  }

  // 先查詢資料庫是否有同username的資料
  const sql = 'SELECT COUNT(*) AS count FROM user WHERE username=?'
  const formatSql = SqlString.format(sql, [user.username])

  try {
    // insert new row to db
    const [rows, fields] = await promisePool.query(formatSql)

    if (rows[0].count > 0) {
      return res.json({ message: 'fail', code: '409' })
    }
  } catch (error) {
    console.log('db error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }

  // 產生sql字串
  const set = []
  let setSql = ''
  let insertSql = ''

  for (const [key, value] of Object.entries(user)) {
    if (value) {
      // SqlString.escape是為了防止SQL Injection
      set.push(`${key} = ${SqlString.escape(value)}`)
    }
  }

  // 檢查
  if (!set.length) {
    return res.json({ message: 'fail', code: '400' })
  }

  setSql = ` SET ` + set.join(`, `)

  insertSql = `INSERT INTO user ${setSql}`

  console.log(insertSql)

  try {
    // insert new row to db
    const [result] = await promisePool.query(insertSql)

    if (result.insertId) {
      return res.json({
        message: 'success',
        code: '200',
        user: { ...user, id: result.insertId },
      })
    } else {
      return res.json({ message: 'fail', code: '400' })
    }
  } catch (error) {
    console.log('db error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})

router.post('/login', async function (req, res, next) {
  //get username and password
  const user = req.body
  console.log(user)

  // 檢查從react來的資料
  if (!user.username || !user.password) {
    return res.json({ message: 'fail', code: '400' })
  }

  // select db
  // 先查詢資料庫是否有同username的資料
  const sql = 'SELECT * FROM user WHERE username=? AND password= ? LIMIT 1'
  const formatSql = SqlString.format(sql, [user.username, user.password])

  try {
    // insert new row to db
    const [rows, fields] = await promisePool.query(formatSql)

    console.log(rows)

    if (rows.length > 0) {
      const { id, name, username, email } = rows[0]

      // 啟用session
      req.session.userId = id

      return res.json({
        message: 'success',
        code: '200',
        user: { id, name, username, email },
      })
    } else {
      return res.json({ message: 'fail', code: '401' })
    }
  } catch (error) {
    console.log('db error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})
router.post('/google-login', async function (req, res, next) {
  //get providerData
  const providerData = req.body
  console.log('L202', providerData)

  // 檢查從react來的資料
  if (!providerData.providerId || !providerData.uid) {
    return res.json({ message: 'fail', code: '400' })
  }

  // select db
  // 先查詢資料庫是否有同username的資料
  const sql = 'SELECT * FROM user WHERE google_uid =? LIMIT 1'

  const formatSql = SqlString.format(sql, [providerData.uid])

  try {
    // insert new row to db
    const [rows, fields] = await promisePool.query(formatSql)

    console.log(rows)

    // 有找到時，登入
    if (rows.length > 0) {
      const { id, name, username, email } = rows[0]

      // 啟用session
      req.session.userId = id

      return res.json({
        message: 'success',
        code: '200',
        user: { id, name, username, email },
      })

      //沒找到時，建立新的user
    } else {
      const user = {
        name: providerData.displayName,
        email: providerData.email,
        google_uid: providerData.uid,
        photo_url: providerData.photoURL,
        providerData: JSON.stringify(providerData),
      }

      // 產生sql字串
      const set = []
      let setSql = ''
      let insertSql = ''

      for (const [key, value] of Object.entries(user)) {
        if (value) {
          // SqlString.escape是為了防止SQL Injection
          set.push(`${key} = ${SqlString.escape(value)}`)
        }
      }

      // 檢查
      if (!set.length) {
        return res.json({ message: 'fail', code: '400' })
      }

      setSql = ` SET ` + set.join(`, `)

      insertSql = `INSERT INTO user ${setSql}`

      console.log(insertSql)

      const [result] = await promisePool.query(insertSql)

      // 建立完成，讓會員登入
      if (result.insertId) {
        // 先查詢資料庫，剛新增的會員資料
        const sql = 'SELECT * FROM user WHERE id =? LIMIT 1'

        const formatSql = SqlString.format(sql, [result.insertId])

        const [rows, fields] = await promisePool.query(formatSql)

        console.log(rows)

        const { id, name, username, email } = rows[0]

        // 啟用session
        req.session.userId = id

        return res.json({
          message: 'success',
          code: '200',
          user: { id, name, username, email },
        })
      } else {
        return res.json({ message: 'fail', code: '400' })
      }
    }
  } catch (error) {
    console.log('db error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})

router.post('/logout', auth, async function (req, res, next) {
  res.clearCookie('SESSION_ID') //cookie name
  req.session.destroy(() => {
    console.log('session destroyed')
  })

  res.json({ message: 'success', code: '200' })
})

// PUT - 更新會員資料
router.put('/:userId', async function (req, res, next) {
  const userId = req.params.userId
  console.log(userId)

  if (!userId) {
    return res.json({ message: 'error', code: '400' })
  }

  const user = req.body
  console.log(user)

  // 檢查從react來的資料
  if (!user.name || !user.email || !user.username || !user.password) {
    return res.json({ message: 'fail', code: '400' })
  }

  // 產生sql字串
  const set = []
  let setSql = ''
  let updateSql = ''

  for (const [key, value] of Object.entries(user)) {
    //更新時不需要id在set中
    if (value && key !== 'id') {
      // SqlString.escape是為了防止SQL Injection
      set.push(`${key} = ${SqlString.escape(value)}`)
    }
  }

  // 檢查
  if (!set.length) {
    return res.json({ message: 'fail', code: '400' })
  }

  setSql = ` SET ` + set.join(`, `)
  updateSql = `UPDATE user ${setSql} WHERE id = ${SqlString.escape(userId)}`

  console.log(updateSql)

  try {
    // update row
    const [result] = await promisePool.query(updateSql)

    console.log(result)
    // affectedRows代表被update的列數
    if (result.affectedRows) {
      return res.json({
        message: 'success',
        code: '200',
        user: { ...user, id: userId },
      })
    } else {
      return res.json({ message: 'fail', code: '400' })
    }
  } catch (error) {
    console.log('db error occurred: ', error)
    return res.json({ message: 'error', code: '500' })
  }
})

module.exports = router

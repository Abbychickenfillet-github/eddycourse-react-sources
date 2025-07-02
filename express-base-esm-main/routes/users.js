import express from 'express';
const router = express.Router();

// 使用中介軟體進行身份驗證
import authenticate from '#middlewares/authenticate.js';
import { getIdParam } from '#db-helpers/db-tool.js';
import { Op } from 'sequelize';
import sequelize from '#configs/db.js';
const { User } = sequelize.models;
import { compareHash } from '#db-helpers/password-hash.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'public/avatar/'),
  filename: (req, file, callback) => {
    const newFilename = req.user.user_id;
    callback(null, newFilename + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const users = await User.findAll({ logging: console.log });
  return res.json({ status: 'success', data: { users } });
});

router.get('/:user_id', authenticate, async (req, res) => {
  const id = getIdParam(req);
  if (req.user.user_id !== id) return res.json({ status: 'error', message: '無法存取會員資料' });
  
  const user = await User.findByPk(id, { raw: true });
  delete user.password;
  return res.json({ status: 'success', data: { user } });
});

// POST 和 PUT 路由請參考先前的範例程式碼
// 上傳檔案使用 /upload-avatar
router.post('/upload-avatar', authenticate, upload.single('avatar'), async (req, res) => {
  if (req.file) {
    const id = req.user.user_id;
    const data = { image_path: req.file.filename };
    const [affectedRows] = await User.update(data, { where: { user_id: id } });
    
    if (!affectedRows) return res.json({ status: 'error', message: '更新失敗或無法更新資料' });
    return res.json({ status: 'success', data: { image_path: req.file.filename } });
  } else return res.json({ status: 'fail', data: null });
});

// 其他路由繼續使用類似的邏輯，確保欄位名稱一致
export default router;

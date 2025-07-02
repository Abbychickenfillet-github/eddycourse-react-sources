import express from 'express'
import bodyParser from "body-parser";
import multer from "multer"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'


const router=express.Router()
const upload=multer();

const app=express()
app.use(express.json())
app.use(cors(
  {
    origin: [""],
  method :[POST,GET,PUT,DELETE],
  credentials:true
  }
))
const db=mysql.createConnection({
  host:'localhost',
  user:'test',
  password:"12345",
  database:"project_db"
})

app.listen(3005,()=>{
  console.log("dashboard login running at localhost:3005");
})

// import sequelize from '##/configs/db.js'
import db from '##/configs/mysql.js';

// import { error } from 'jquery';
// res.set('Content-Type','application/json')

// router.get('/',async function (req,res){
//     try{
//         const [users] = await sequelize.query('SELECT * FROM users')
//         return res.json({status:'success',data:{users}})
//     }catch(error){
//         console.error('無法取得資料:',error)
//         return res.status(500).json({status:'error',message:'無法連接'})
//     }
// })
// // 這邊put是代表使用者更新了他的資料，然後把檔案傳進來之後我們要update
// router.put('/',async(req,res)=>{
//     const {name, gender, password, birthdate, phone, email, address} =req.body
//     let result = await db.execute(
//         "UPDATE users SET birthdate =?, password=?,name=?,email=?,gender=?,country=?,city=?,district=?,road_name=?,detailed_address=?,image_path=?,remarks=?",
//         [birthdate,password,name,email,gender,country,city,district,road_name,detailed_address,image_path,remarks]).then(([results,fields])=>{
//             return results;
//         }).catch(error=>{
//             console.log(error);
//             return undefined
//         }
//     )
    
// })

// 取得單一用戶資料
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId)
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: '找不到用戶'
        })
      }
  
      return res.json({
        status: 'success',
        data: user
      })
    } catch (error) {
      console.error('無法取得資料:', error)
      return res.status(500).json({
        status: 'error',
        message: '無法取得資料'
      })
    }
  })
  
  // 更新用戶資料
  router.put('/:userId', async (req, res) => {
    try {
      const {
        name,
        password,
        gender,
        birthdate,
        phone,
        email,
        country,
        city,
        district,
        road_name,
        detailed_address,
        image_path,
        remarks
      } = req.body
  
      const [updatedCount] = await User.update({
        name,
        password,  // 記得要加密
        gender,
        birthdate,
        phone,
        email,
        country,
        city,
        district,
        road_name,
        detailed_address,
        image_path,
        remarks
      }, {
        where: { 
          id: req.params.userId,
          valid: 1  // 只更新有效用戶
        }
      })
  
      if (updatedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: '更新失敗'
        })
      }
  
      res.json({
        status: 'success',
        message: '更新成功'
      })
  
    } catch (error) {
      console.error('更新失敗:', error)
      res.status(500).json({
        status: 'error',
        message: '更新失敗'
      })
    }
  })
  
  // 停用用戶（軟刪除）
  router.delete('/:userId', async (req, res) => {
    try {
      const result = await User.update({
        valid: 0
      }, {
        where: { 
          id: req.params.userId,
          valid: 1
        }
      })
  
      if (result[0] === 0) {
        return res.status(404).json({
          status: 'error',
          message: '用戶不存在或已停用'
        })
      }
  
      res.json({
        status: 'success',
        message: '用戶已停用'
      })
  
    } catch (error) {
      console.error('停用失敗:', error)
      res.status(500).json({
        status: 'error',
        message: '停用失敗'
      })
    }
  })
export default router
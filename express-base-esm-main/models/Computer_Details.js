import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Computer_details',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Input_ports: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Computer_details', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: true, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
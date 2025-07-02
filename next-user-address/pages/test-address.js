import React, { useState, useEffect } from 'react'
// 導入jQuery，需要先安裝jquery套件()
import $ from 'jquery'
// 導入縣市資料
import { taiwanData, groupCitiesByRegion } from '@/components/tw/data'

export default function Test(props) {

  // useEffect裡放入原本的script.js內容, document.ready不用寫
  useEffect(() => {
    // $(document).ready(function () {
    const citySelect = $('#city')
    const districtSelect = $('#district')
    const roadSelect = $('#roadList') // 新增的路選單

    // 按區域分組的縣市數據
    const groupedCities = {
      北部區域: [
        { CityName: '台北市', CityEngName: 'Taipei City' },
        { CityName: '新北市', CityEngName: 'New Taipei City' },
        { CityName: '基隆市', CityEngName: 'Keelung City' },
        { CityName: '新竹市', CityEngName: 'Hsinchu City' },
        { CityName: '桃園市', CityEngName: 'Taoyuan City' },
        { CityName: '新竹縣', CityEngName: 'Hsinchu County' },
      ],
      中部區域: [
        { CityName: '台中市', CityEngName: 'Taichung City' },
        { CityName: '苗栗縣', CityEngName: 'Miaoli County' },
        { CityName: '彰化縣', CityEngName: 'Changhua County' },
        { CityName: '南投縣', CityEngName: 'Nantou County' },
        { CityName: '雲林縣', CityEngName: 'Yunlin County' },
      ],
      南部區域: [
        { CityName: '高雄市', CityEngName: 'Kaohsiung City' },
        { CityName: '台南市', CityEngName: 'Tainan City' },
        { CityName: '嘉義市', CityEngName: 'Chiayi City' },
        { CityName: '嘉義縣', CityEngName: 'Chiayi County' },
        { CityName: '屏東縣', CityEngName: 'Pingtung County' },
      ],
      東部區域: [
        { CityName: '宜蘭縣', CityEngName: 'Yilan County' },
        { CityName: '花蓮縣', CityEngName: 'Hualien County' },
        { CityName: '台東縣', CityEngName: 'Taitung County' },
      ],
      離島區域: [
        { CityName: '金門縣', CityEngName: 'Kinmen County' },
        { CityName: '連江縣', CityEngName: 'Lienchiang County' },
        { CityName: '澎湖縣', CityEngName: 'Penghu County' },
      ],
    }

    // 動態載入分組的縣市
    for (const group in groupedCities) {
      const optgroup = $('<optgroup>').attr('label', group)
      groupedCities[group].forEach((city) => {
        optgroup.append(
          $('<option>')
            .val(city.CityName)
            .text(`${city.CityName} (${city.CityEngName})`)
        )
      })
      citySelect.append(optgroup)
    }

    // 當選擇國家時，啟用縣市選擇
    $('#country').on('change', function () {
      const selectedCountry = $(this).val()
      if (selectedCountry === '台灣') {
        citySelect.prop('disabled', false) // 啟用縣市下拉選單
      } else {
        citySelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇縣市</option>') // 禁用並清空縣市下拉選單
        districtSelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇鄉鎮市區</option>') // 禁用並清空鄉鎮市區下拉選單
        roadSelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇居住街道</option>') // 禁用並清空街道下拉選單
      }
    })

    // 當選擇縣市時，動態載入鄉鎮市區
    citySelect.on('change', function () {
      const selectedCity = $(this).val()
      districtSelect
        .prop('disabled', false)
        .empty()
        .append('<option value="">請選擇鄉鎮市區</option>')
      roadSelect
        .prop('disabled', true)
        .empty()
        .append('<option value="">請選擇居住街道</option>') // 禁用街道選單

      // 根據選擇的縣市顯示相對應的鄉鎮市區
      const city = taiwanData.find((city) => city.CityName === selectedCity)
      if (city) {
        city.AreaList.forEach((area) => {
          districtSelect.append(
            $('<option>')
              .val(area.AreaName)
              .text(`${area.AreaName} (${area.ZipCode})`)
          )
        })
      }
    })

    // 當選擇鄉鎮市區時，動態載入對應的道路
    districtSelect.on('change', function () {
      const selectedArea = $(this).val()
      roadSelect
        .prop('disabled', false)
        .empty()
        .append('<option value="">請選擇居住街道</option>')

      // 根據選擇的鄉鎮市區顯示相對應的道路
      const selectedCity = citySelect.val() // 獲取選擇的縣市
      const city = taiwanData.find((city) => city.CityName === selectedCity) // 找到選擇的城市

      if (city) {
        const area = city.AreaList.find(
          (area) => area.AreaName === selectedArea
        ) // 找到選擇的區域
        if (area && area.RoadList) {
          // 確保找到的區域有 RoadList
          area.RoadList.forEach((road) => {
            roadSelect.append(
              $('<option>').val(road.RoadName).text(road.RoadName) // 假設 RoadName 是街道名稱
            )
          })
        } else {
          console.error('選擇的區域沒有對應的街道資料')
        }
      } else {
        console.error('未找到對應的城市')
      }
    })
    // }) // 確保結束大括號在這裡
  }, [])

  return (
    <>
      <div>
        <h2 className="mb-4">選擇國家、縣市與鄉鎮</h2>
        <form action>
          {/* 國家選單 */}
          <div className="mb-3 row">
            <label htmlFor="country" className="col-sm-2 col-form-label">
              國家:
            </label>
            <div className="col-sm-10">
              <select id="country" className="form-select">
                <option value>請選擇國家</option>
                <option value="台灣">台灣</option>
                <option value="美國">美國</option>
                <option value="加拿大">加拿大</option>
                <option value="日本">日本</option>
                <option value="韓國">韓國</option>
                {/* 可以繼續添加更多國家 */}
              </select>
            </div>
          </div>
          {/* 縣市選單 */}
          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-2 col-form-label">
              縣市:
            </label>
            <div className="col-sm-10">
              <select id="city" className="form-select" disabled>
                <option value>請選擇縣市</option>
              </select>
            </div>
          </div>
          {/* 鄉鎮市區選單 */}
          <div className="mb-3 row">
            <label htmlFor="district" className="col-sm-2 col-form-label">
              鄉鎮市區:
            </label>
            <div className="col-sm-10">
              <select id="district" className="form-select" disabled>
                <option value>請選擇鄉鎮市區</option>
              </select>
            </div>
          </div>
          {/* 街道選單 */}
          <div className="mb-3 row">
            <label htmlFor="roadList" className="col-sm-2 col-form-label">
              路:
            </label>
            <div className="col-sm-10">
              <select id="roadList" className="form-select" disabled>
                <option value>請選擇居住街道</option>
              </select>
            </div>
          </div>
          {/* 詳細地址輸入 */}
          <div className="mb-3 row">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              詳細地址:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="巷弄門牌"
                required
                autoComplete="address-level4"
              />
              <div className="form-text">
                請輸入詳細地址（例如：1號、2樓、A棟）
              </div>
            </div>
          </div>
          {/* 備註欄位 */}
          <div className="mb-3 row">
            <label htmlFor="remarks" className="col-sm-2 col-form-label">
              備註:
            </label>
            <div className="col-sm-10">
              <textarea
                id="remarks"
                className="form-control"
                rows={3}
                placeholder="輸入備註"
                defaultValue={''}
              />
              <div className="form-text">
                地址假如都不在以上選單的話，請填寫於備註
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

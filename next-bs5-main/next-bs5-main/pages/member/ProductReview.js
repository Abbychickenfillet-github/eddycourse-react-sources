import React, { useState } from 'react';

const ProductReview = () => {
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [coinsReward, setCoinsReward] = useState(0);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 簡單模擬點數回饋計算，隨評論長度給予獎勵
    const rewardPoints = 10 + Math.floor(review.length / 10);
    setCoinsReward(rewardPoints);

    // 模擬評論提交
    setSubmitted(true);
  };

  const handleReset = () => {
    setReview('');
    setPhotos([]);
    setSubmitted(false);
    setCoinsReward(0);
  };

  return (
    <div className="review-container">
      <h2>商品評論</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="review">評論內容：</label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              placeholder="請輸入您的商品評論"
              required
              rows="4"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="photos">上傳照片：</label>
            <input
              type="file"
              id="photos"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            提交評論
          </button>
        </form>
      ) : (
        <div className="submitted-message">
          <h3>感謝您的評論！</h3>
          <p>您已經獲得 {coinsReward} 蝦幣作為回饋。</p>

          {photos.length > 0 && (
            <div className="uploaded-photos">
              <h4>您上傳的照片：</h4>
              <div className="photo-list">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`評論照片 ${index + 1}`}
                    className="photo-thumbnail"
                  />
                ))}
              </div>
            </div>
          )}

          <button onClick={handleReset} className="btn btn-secondary">
            再次評論
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReview;

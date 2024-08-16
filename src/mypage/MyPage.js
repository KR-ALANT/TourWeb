import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('여행가는사람');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // 페이지 이동 핸들러
  const handleStartClick = () => {
    navigate('../local/Local');
  };

  const handleMyPageClick = () => {
    navigate('/MyPage');
  };

  const handleCommunityClick = () => {
    navigate('/community');
  };

  // 카카오 로그인 API 연동
  const handleKakaoLoginClick = () => {
    const REST_API_KEY = 'YOUR_KAKAO_REST_API_KEY'; // 카카오 REST API 키를 입력하세요
    const REDIRECT_URI = 'YOUR_REDIRECT_URI'; // 인가 코드가 전달될 리다이렉트 URI를 입력하세요
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 리다이렉트
  };

  const handleLogoClick = () => {
    navigate('/'); // LOGO 클릭 시 MainPage로 이동
  };

  const toggleEditPopup = () => {
    setIsEditing((prev) => !prev);
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
    localStorage.setItem('nickname', newNickname); // 닉네임을 localStorage에 저장
  };

  const handleDeleteAccount = () => {
    alert('회원 탈퇴 기능은 아직 구현되지 않았습니다.');
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setProfileImage(imageData); // 이미지 URL 설정
        localStorage.setItem('profileImage', imageData); // localStorage에 이미지 저장
      };
      reader.readAsDataURL(file);
    }
  };

  // 컴포넌트가 마운트될 때 localStorage에서 값 불러오기
  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    const savedProfileImage = localStorage.getItem('profileImage');

    if (savedNickname) {
      setNickname(savedNickname);
    }

    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  return (
    <div className="my-page">
      <div className="gradient-background"></div>
      <div className="logo" onClick={handleLogoClick}>LOGO</div> {/* LOGO 위치 조정 */}
      <div className="top-right-buttons">
        <button className="community-button" onClick={handleCommunityClick}>커뮤니티</button>
        <button className="my-page-button" onClick={handleMyPageClick}>마이페이지</button>
        <button className="kakao-login-button" onClick={handleKakaoLoginClick}>카카오 로그인</button>
      </div>
      <div className="profile-section">
        <div className="profile-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-img" />
          ) : (
            <div className="image-placeholder">이미지</div>
          )}
          <img
            src="/edit.png"
            alt="Edit"
            className="edit-icon"
            onClick={toggleEditPopup}
          />
        </div>
        <div className="profile-info">
          <div className="username">{nickname}</div>
          <div className="subscribers">구독 10명</div>
        </div>
      </div>
      <div className="navigation-bar">
        <div className="nav-item" onClick={handleStartClick}>나의 여행</div>
        <div className="nav-item" onClick={handleCommunityClick}>나의 커뮤니티</div>
        <div className="nav-item" onClick={handleMyPageClick}>나의 스크랩</div>
      </div>

      {isEditing && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <h2>프로필 편집</h2>
            <div className="form-group">
              <label htmlFor="profileImage">프로필 이미지 변경:</label>
              <input
                type="file"
                id="profileImage"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname">닉네임 변경:</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            <button
              className="delete-account-button"
              onClick={handleDeleteAccount}
            >
              회원 탈퇴하기
            </button>
            <button onClick={toggleEditPopup}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

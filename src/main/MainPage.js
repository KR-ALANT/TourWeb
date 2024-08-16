import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // 스타일 파일을 임포트하세요

const images = [
  { id: 1, url: process.env.PUBLIC_URL + '/image1.jpg' },
  { id: 2, url: process.env.PUBLIC_URL + '/image2.jpg' },
  { id: 3, url: process.env.PUBLIC_URL + '/image3.jpg' },
  { id: 4, url: process.env.PUBLIC_URL + '/image4.jpg' },
  { id: 5, url: process.env.PUBLIC_URL + '/image5.jpg' },
  { id: 6, url: process.env.PUBLIC_URL + '/image6.jpg' },
  { id: 7, url: process.env.PUBLIC_URL + '/image7.jpg' },
  { id: 8, url: process.env.PUBLIC_URL + '/image8.jpg' },
];

const SLIDE_INTERVAL = 5000; // 5초 간격

const MainPage = () => {
  const [showButton, setShowButton] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const buttonTimer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(buttonTimer);
  }, []);

  useEffect(() => {
    // 배경 이미지 슬라이드 설정
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(imageChangeInterval);
  }, []);

  const handleStartButtonClick = () => {
    navigate('/Local'); // 여행 시작하기 버튼 클릭 시 Local 페이지로 이동
  };

  const handleCommunityButtonClick = () => {
    navigate('/Community'); // 커뮤니티 버튼 클릭 시 Community 페이지로 이동
  };

  const handleMyPageButtonClick = () => {
    navigate('/MyPage'); // 마이페이지 버튼 클릭 시 MyPage 페이지로 이동
  };

  const handleKakaoLoginButtonClick = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize'; // 카카오 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동
  };

  return (
    <div className="MainPage">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`background-image ${index === currentImageIndex ? 'fade-in' : 'fade-out'}`}
          style={{ backgroundImage: `url(${image.url})` }}
        ></div>
      ))}
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>LOGO</div>
        <div className="top-right0">
          <div className="top-right-buttons0">
            <button className="community-button0" onClick={handleCommunityButtonClick}>커뮤니티</button>
            <button className="my-page-button0" onClick={handleMyPageButtonClick}>마이페이지</button>
            <button className="kakao-login-button0" onClick={handleKakaoLoginButtonClick}>카카오 로그인</button>
          </div>
        </div>
      </header>
      <main>
        {showButton && (
          <button className="start-button show" onClick={handleStartButtonClick}>
            여행 시작하기
          </button>
        )}
      </main>
    </div>
  );
};

export default MainPage;

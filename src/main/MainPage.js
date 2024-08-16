<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const images = [
  { id: 1, url: process.env.PUBLIC_URL + '/image1.jpg', opacity: 0.80 },
  { id: 2, url: process.env.PUBLIC_URL + '/image2.jpg', opacity: 0.80 },
  { id: 3, url: process.env.PUBLIC_URL + '/image3.jpg', opacity: 0.70 },
  { id: 4, url: process.env.PUBLIC_URL + '/image4.jpg', opacity: 0.80 },
  { id: 5, url: process.env.PUBLIC_URL + '/image5.jpg', opacity: 0.80 },
  { id: 6, url: process.env.PUBLIC_URL + '/image6.jpg', opacity: 0.80 },
  { id: 7, url: process.env.PUBLIC_URL + '/image7.jpg', opacity: 0.80 },
  { id: 8, url: process.env.PUBLIC_URL + '/image8.jpg', opacity: 0.80 },
];

const SLIDE_INTERVAL = 3000;

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigate to main page
  };

  return (
    <div className="logo" onClick={handleLogoClick}>
      LOGO
>>>>>>> dca6423ed7f3735c806106b1f123d084a0c0ee4d
    </div>
  );
};

<<<<<<< HEAD
export default MainPage;
=======
const MainPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    navigate('../local/Local');
  };

  return (
    <div className="main-page">
      <Logo />
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          alt={`Slide ${image.id}`}
          style={{
            opacity: index === currentImageIndex ? image.opacity : 0,
            transition: 'opacity 0.5s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
          className="slideshow-image"
        />
      ))}
      <button className={`start-button ${buttonVisible ? 'visible' : ''}`} onClick={handleStartClick}>
        여행 시작하기
      </button>
      <div className="top-right-buttons">
        <button className="community-button">커뮤니티</button>
        <button className="my-page-button">마이페이지</button>
        <button className="kakao-login-button">카카오 로그인</button>
      </div>
    </div>
  );
};

export default MainPage;
>>>>>>> dca6423ed7f3735c806106b1f123d084a0c0ee4d

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
    </div>
  );
};

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
    navigate('/next-page');
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
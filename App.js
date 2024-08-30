import React, { useState } from 'react';
import './App.css';

function App() {
  // Define the cards data at the beginning
  const cards = [
    {
      id: 1,
      title: '닉네임',
      description: '제목입니다',
      profileImage: `${process.env.PUBLIC_URL}/img/profile.jpeg`,
      cardImage: `${process.env.PUBLIC_URL}/img/card.png`,
      scrapCount: 27,
      hashtags: ['#어디여행', '#추천명소']
    },
    {
      id: 2,
      title: '여행가는사람 2',
      description: '자연적이고 분위기 좋은 어쩌고 2',
      profileImage: 'your-image-source',
      cardImage: 'your-image-source',
      scrapCount: 15,
      hashtags: ['#어디여행', '#추천명소']
    },
    {
      id: 3,
      title: '여행가는사람 3',
      description: '자연적이고 분위기 좋은 어쩌고 3',
      profileImage: 'your-image-source',
      cardImage: 'your-image-source',
      scrapCount: 32,
      hashtags: ['#어디여행', '#추천명소']
    },
    
  ];

  // Initialize state with the cards data
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredCards, setFilteredCards] = useState(cards);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    if (text) {
      setIsFocused(true);
      filterCards(text);
    } else {
      setIsFocused(false);
      setFilteredCards(cards);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchText === '') {
      setIsFocused(false);
    }
  };

  const handleLocationTagClick = (tag) => {
    setSearchText(tag);
    setIsFocused(true);
    filterCards(tag);
  };

  const filterCards = (text) => {
    const lowercasedText = text.toLowerCase();
    const filtered = cards.filter(card =>
      card.description.toLowerCase().includes(lowercasedText) ||
      card.hashtags.some(hashtag => hashtag.toLowerCase().includes(lowercasedText))
    );
    setFilteredCards(filtered);
  };

  const handleSearchIconClick = () => {
    filterCards(searchText);
  };

  const handleLatestClick = () => {
    console.log('Latest clicked');
    // Implement sorting by latest
  };

  const handlePopularClick = () => {
    console.log('Popular clicked');
    // Implement sorting by popular
  };

  const express = require("express");
  const path = require("path");

  const app = express();

  app.set("port", process.env.PORT || 3000);


  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중..");
  });

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="logo-section">
              <span className="logo">LOGO</span>
              <span className="community">커뮤니티</span>
              <span className="mypage">마이페이지</span>
              <span className="kakao-login">카카오 로그인</span>
            </div>
          </div>
        </header>
        <div className="header-content">
        <div className="container">
          <div className="search-bar-container">
            <div className="search-bar">
              <input
                type="text"
                className={`search-input ${isFocused || searchText ? 'focused' : ''}`}
                value={searchText}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="어디로 떠나시나요 ?"
              />
              <div className="search-icon" onClick={handleSearchIconClick} />
            </div>
          </div>
          <div className="recommendation">
            <div className="recommendation-bar-container">
              <span className="recommendation-title">추천 지역</span>
              <div className="location-tags">
                {['강릉', '부산', '제주', '울산'].map((tag) => (
                  <span
                    key={tag}
                    className="location-tag"
                    onClick={() => handleLocationTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </div>
          <div className="main-content">
            <div className="latest-popular">
              <span className="latest" onClick={handleLatestClick}>최신순</span>
              <span className="popular" onClick={handlePopularClick}>인기순</span>
            </div>

            <div className="cards">
              {filteredCards.map(card => (
                <div className="card" key={card.id}>
                  <div className="card-header">
                    <img src={card.profileImage} className="profile-image" alt="profile" />
                    <span className="card-title">{card.title}</span>
                  </div>
                  <span className="card-description">{card.description}</span>
                  <img src={card.cardImage} className="card-image" alt="card" />
                  <div className="card-footer">
                    <img src={`${process.env.PUBLIC_URL}/img/bookmark-white.png`} className="scrap-image" alt="scrap" />
                    <span className="scrap-count">{card.scrapCount} 명이 스크랩 중</span>
                  </div>
                  <div className="hashtags">
                    {card.hashtags.map((hashtag, index) => (
                      <span className="hashtag" key={index}>{hashtag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

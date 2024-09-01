import React, { useState,useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './Community.css';
import { Cards } from "./cards";

function Community() {
  // Define the cards data at the beginning
  const navigate = useNavigate();

  const MPage = () => {
    navigate('/')
  }

  const goCommunity = () => {
    navigate('../Community')
  }

  const goMyPage = () => {
    navigate('../MyPage')
  }
  
  // Initialize state with the cards data
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredCards, setFilteredCards] = useState(Cards);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    if (text) {
      setIsFocused(true);
      filterCards(text);
    } else {
      setIsFocused(false);
      setFilteredCards(Cards);
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
    const filtered = Cards.filter(card =>
      card.description.toLowerCase().includes(lowercasedText) ||
      card.hashtags.some(hashtag => hashtag.toLowerCase().includes(lowercasedText))
    );
    setFilteredCards(filtered);
  };

  const handleSearchIconClick = () => {
    filterCards(searchText);
  };

  const cardsRef = useRef(null); // cards1 요소에 접근하기 위한 참조
  const scrollAmount = useRef(0); // 현재 스크롤 속도/양을 저장하기 위한 ref

  useEffect(() => {
    const handleScroll = (event) => {
      if (cardsRef.current) {
        scrollAmount.current += event.deltaY; // 스크롤 속도 누적
        smoothScroll(); // 부드러운 스크롤 시작
      }
    };

    const smoothScroll = () => {
      if (cardsRef.current) {
        const currentScrollTop = cardsRef.current.scrollTop;
        const targetScrollTop = currentScrollTop + scrollAmount.current;
        const delta = (targetScrollTop - currentScrollTop) / 10;

        if (Math.abs(delta) > 1) {
          cardsRef.current.scrollTop += delta;
          scrollAmount.current -= delta;
          requestAnimationFrame(smoothScroll);
        } else {
          // 남은 스크롤 양이 적을 때 정확한 위치로 설정
          cardsRef.current.scrollTop = targetScrollTop;
          scrollAmount.current = 0;
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handleCardClick = (id) => {
    navigate(`/card/${id}`);
  };

   // 최신순 정렬 함수
  const sortCardsByDate = () => {
    const sortedCards = [...filteredCards].sort((a, b) => new Date(b.postdata) - new Date(a.postdata));
    setFilteredCards(sortedCards);
  };

  // 최신순 버튼 클릭 핸들러
  const handleLatestClick = () => {
    sortCardsByDate();
  };
  
  // 인기순 정렬 함수
  const sortCardsByPopularity = () => {
    const sortedCards = [...filteredCards].sort((a, b) => b.scrapCount - a.scrapCount);
    setFilteredCards(sortedCards);
  };

   // 인기순 버튼 클릭 핸들러
  const handlePopularClick = () => {
    sortCardsByPopularity();
  };

  return (
    <div className="App">
      <div className = "left">
          <button className = "logo" onClick={MPage}>LOGO</button>
      </div>
      <header className="App-header">
        <div className="header-content">
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
              placeholder="어디로 떠나시나요?"
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

          <div className="cards1" ref={cardsRef}>
            {filteredCards.map(card => (
              <div className="card2" key={card.id} onClick={() => handleCardClick(card.id)}>
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
      <div className = "right-Co">
        <div className = "top-right-buttons-Co">
          <button className="community-button" onClick={goCommunity}>커뮤니티</button>
          <button className="my-page-button" onClick={goMyPage}>마이페이지</button>
          <button className="kakao-login-button">카카오 로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Community;

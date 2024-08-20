import { faCarSide } from '@fortawesome/free-solid-svg-icons'; // faCarSide 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomeIcon 이미지 불러오기
import React, { useState, useEffect } from 'react'; // useState, useEffect 사용
import { useNavigate } from "react-router-dom";
import './Local.css';
import { Users } from "./users";

function Loacl() {
  
  let [nextButtonEn, setnextButtonEn] = useState(false); // 다음 버튼의 활성화 상태를 저장

  const navigate = useNavigate();
  
  const nextPage = () => {
    navigate('../calendar/Calendar')
  }
  
  const MPage = () => {
    navigate('/')
  }

  const goCommunity = () => {
    navigate('../community/Community')
  }

  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedButtons1, setSelectedButtons1] = useState([]);
  const [usersWithColors, setUsersWithColors] = useState([]);
  
  useEffect(() => {
    const usersWithColors = Users.map(user => ({
      ...user,
      color: getRandomColor(),
    }));
    setUsersWithColors(usersWithColors);
  }, []);
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const handleSearch = () => {
    setSearchQuery(query);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleUserVisibility = (user) => {
    if (visibleUsers.includes(user)) {
      setVisibleUsers(visibleUsers.filter(u => u !== user));
    } else {
      setVisibleUsers([...visibleUsers, user]);
    }
  };

  const handleButtonClick = (user) => {
    const newSelectedButtons = selectedButtons.includes(user)
      ? selectedButtons.filter(item => item !== user) // 이미 선택된 버튼 클릭 시 제거
      : [...selectedButtons, user]; // 새로 선택된 버튼 추가

    setSelectedButtons(newSelectedButtons);
    setNextButtonEn(newSelectedButtons.length > 0); // 선택된 버튼이 있으면 '다음 단계' 버튼 활성화
  };

  const handleButtonClick1 = (user) => {
    setSelectedButtons1(prevSelected => {
      const isSelected = prevSelected.includes(user);
      return isSelected
        ? prevSelected.filter(name => name !== user)
        : [...prevSelected, user];
    });
  };

  const getButtonStyle = (user) => {
    return selectedButtons1.includes(user) ? 'enlarged' : '';
  };

  return (
    <div className="LocalPage">
      {/* 로고, 이전 버튼 */}
      <div className="left">
        <button className="logo" onClick={() => navigate('/')}>LOGO</button>
        <button className="prev" onClick={() => navigate('/')}>
          <span className="material-icons" style={{ color: "#131313", marginLeft: "20px", fontSize: "30px" }}>
            chevron_left
          </span>
          <p className="prev-button">이전단계</p>
        </button>
      </div>

      <div className="local-center">
        <div className="top-center">
          <div className="step-1">
            <p className="step1-1">STEP1</p>
            <p className="step2-1">STEP2</p>
            <p className="step3-1">STEP3</p>
          </div>
          <span className="situation-car">
            <FontAwesomeIcon icon={faCarSide} style={{ color: "#5E5E5E", width: "20px", height: "14px", marginBottom: "-9px", marginLeft: "17px" }} />
          </span>
          <div className="situation">
            <hr className="current-situation" />
            <hr className="all-situation" />
          </div>
        </div>

        <div className="app">
          <input
            className="search"
            placeholder="어디로 여행을 떠날까요?"
            onChange={(event) => setQuery(event.target.value.toLowerCase())}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <img 
              className="search-button" 
              src={process.env.PUBLIC_URL + '/search.png'} 
              width='25px' 
              height='25px' 
              alt="Search"
            />
          </button>
          <div className="Choice">선택 지역:</div>
          <div className="selected-location">
            {visibleUsers.map((user, index) => (
              <button
                key={index}
                className={`generated-div ${selectedButtons.includes(user) ? 'selected' : ''}`}
                onClick={() => handleButtonClick(user)}
              >
                {user}
              </button>
            ))}
          </div>
          
          <div className="list">
            {usersWithColors.filter(user =>
              user.first_name.toLowerCase().includes(query)
            ).map(user => (
              <button
                className={`listItem ${getButtonStyle(user.first_name)}`}
                key={user.id}
                style={{ backgroundColor: user.color }}
                onClick={() => { toggleUserVisibility(user.first_name); handleButtonClick1(user.first_name); }}
              >
                <div className="hexagon-inner">
                  {user.first_name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/*커뮤, 마이, 로그인, 다음 버튼*/}
      <div className = "right">
        <div className = "top-right-buttons">
          <button className="community-button" onClick={goCommunity}>커뮤니티</button>
          <button className="my-page-button">마이페이지</button>
          <button className="kakao-login-button">카카오 로그인</button>
        </div>
        <button className="next" disabled={!nextButtonEn} onClick={() => navigate('/calendar')}>
          <p className="next-button">다음단계</p>
          <span className="material-icons" style={{ color: "#707070", marginRight: "20px" }}> 
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );      
}

export default Local;

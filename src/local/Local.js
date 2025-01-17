import { faCarSide } from '@fortawesome/free-solid-svg-icons'; //faCarSide 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesomeIcon 이미지 불러오기
import React, { useState, useEffect } from 'react'; // useState 사용
import { useNavigate } from "react-router-dom";
import './Local.css'
import { Users } from "./users";

function Loacl() {
  
  let [nextButtonEn, setnextButtonEn] = useState(false); // 다음 버튼의 활성화 상태를 저장

  const navigate = useNavigate();
  
  const nextPage = () => {
    navigate('../Calendar')
  }
  
  const MPage = () => {
    navigate('/')
  }

  const goCommunity = () => {
    navigate('../Community')
  }

  const goMyPage = () => {
    navigate('../MyPage')
  }

  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchQuery(query);
    }
  };

  const [visibleUsers, setVisibleUsers] = useState([]);

  const toggleUserVisibility = (user) => {
    if (visibleUsers.includes(user)) {
      setVisibleUsers(visibleUsers.filter(u => u !== user));
    } else {
      setVisibleUsers([...visibleUsers, user]);
    }
  };

  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (user) => {
    const newSelectedButtons = selectedButtons.includes(user)
      ? selectedButtons.filter(item => item !== user) // 이미 선택된 버튼 클릭 시 제거
      : [...selectedButtons, user]; // 새로 선택된 버튼 추가

    setSelectedButtons(newSelectedButtons);
    setnextButtonEn(newSelectedButtons.length > 0); // 선택된 버튼이 있으면 '다음 단계' 버튼 활성화
  };

  const [selectedButtons1, setSelectedButtons1] = useState([]);

  const handleButtonClick1 = (user) => {
    setSelectedButtons1(prevSelected1 => {
      // 클릭된 사용자 이름이 배열에 이미 존재하는지 확인
      const isSelected1 = prevSelected1.includes(user);
      if (isSelected1) {
        // 이미 선택된 상태라면 배열에서 제거
        return prevSelected1.filter(name => name !== user);
      } else {
        // 새로 선택된 상태라면 배열에 추가
        return [...prevSelected1, user];
      }
    });
  };

  const getButtonStyle = (user) => {
    return selectedButtons1.includes(user) ? 'enlarged' : '';
  };

  const [usersWithColors, setUsersWithColors] = useState([]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Users 데이터에 랜덤 색상 추가
  useEffect(() => {
    const usersWithColors = Users.map(user => ({
      ...user,
      color: getRandomColor(),
    }));
    setUsersWithColors(usersWithColors);
  }, [Users]);
    
  return (
    <div className="LocalPage">
      {/*로고, 이전 버튼*/}
      <div className = "left">
          <button className = "logo" onClick={MPage}>LOGO</button>
      </div>
      <div className = "local-center">  
        <div className = "top-center">
          <div>
            <div className="step-1">
              <p className = "step1-1">STEP1</p>
              <p className = "step2-1">STEP2</p>
              <p className = "step3-1">STEP3</p>
            </div>
            <span className = "situation-car">
              {/*FontAwesomeIcon에서 faCarSide를 출력 */}
              <FontAwesomeIcon icon={faCarSide} style = {{color: "#5E5E5E", width: "20px", height: "14px", marginBottom: "-9px", marginLeft: "17px"}}/>
            </span>
            <div className = "situation">
              <hr className = "current-situation"></hr>
              <hr className = "all-situation"></hr>
            </div>
          </div>
        </div>

        <div className="app">
          <input
            className="search"
            placeholder="어디로 여행을 떠날까요?"
            onChange={(ㄷ) => setQuery(ㄷ.target.value.toLowerCase())}
          />
          <button><img className="search-button" onClick={() => {handleSearch(); handleKeyDown();}} src={process.env.PUBLIC_URL + '/search.png'} width ='25px' height = '25px'/>
          </button>
          <div className="Choice">
            선택 지역:
          </div>
          <div className="selected-location"> 
            {visibleUsers.map((user, index) => (
              <button key={index} className={`generated-div ${selectedButtons.includes(user) ? 'selected' : ''}`} onClick={() => handleButtonClick(user)}>
                {user}
              </button>
            ))}
          </div>
          
          <div className="list">         
            {usersWithColors.filter((user) =>
              user.first_name.toLowerCase().includes(query)
            ).map((user) => (
              <button className={`listItem ${getButtonStyle(user)}`} key={user.id} style={{ backgroundColor: user.color }} onClick={() => {toggleUserVisibility(user.first_name); handleButtonClick1(user);}}>
                <div className="hexagon-inner">
                  {user.first_name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/*커뮤, 마이, 로그인, 다음 버튼*/}
      <div className = "right-L">
        <div className = "top-right-buttons-L">
          <button className="community-button" onClick={goCommunity}>커뮤니티</button>
          <button className="my-page-button" onClick={goMyPage}>마이페이지</button>
          <button className="kakao-login-button">카카오 로그인</button>
        </div>
        <button className="next" disabled={!nextButtonEn} onClick={nextPage}>
          <p className = "next-button">
            다음단계
          </p>
          {/*material-icon 중 chevron_right를 클릭시 다음 페이지로 이동*/}
          <span className="material-icons" style = {{color: "#707070", marginRight: "20px"}}> 
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );      
}

export default Loacl;
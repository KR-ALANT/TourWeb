import { faCarSide } from '@fortawesome/free-solid-svg-icons'; //faCarSide 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesomeIcon 이미지 불러오기
import React, { useState } from 'react'; // useState 사용
import { useNavigate } from "react-router-dom";
import './Local.css'
import { Users } from "./users";

function Loacl() {
  
  let [nextButtonEn, setnextButtonEn] = useState(false); // 다음 버튼의 활성화 상태를 저장

  const navigate = useNavigate();
  
  const nextPage = () => {
    navigate('../calendar/Claendar')
  }
  
  const prePage = () => {
    navigate('../main/MainPage')
  }

  const MPage = () => {
    navigate('../main/MainPage')
  }

  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
  };

  let [localName] = useState(['강릉', '춘천', '원주', '동해', '용인', '제주도', '수원', '부산', '대전', '대구', '울산', '인천', '경주'])

  return (
    <div className="LocalPage">
      {/*로고, 이전 버튼*/}
      <div className = "left">
          <button className = "logo" onClick={MPage}>LOGO</button>
        <button className = "prev" onClick={prePage}>
        {/*material-icon 중 chevron_left를 클릭시 이전 페이지로 이동*/}
          <span className="material-icons" style={{color: "#131313", marginLeft: "20px", fontSize: "30px"}}>
            chevron_left
          </span>
          <p className = "prev-button">
            이전단계
          </p>
        </button>
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
          <button><img className="search-button" onClick={handleSearch} src={process.env.PUBLIC_URL + '/search.png'} width ='25px' height = '25px'/></button>
          
          {query && (
            <div className="list">
              검색 지역:
              {Users.filter((ㅁㄴㅇ) =>
                ㅁㄴㅇ.first_name.toLowerCase().includes(query)
              ).map((user) => (
                <button className="listItem" key={user.id}>
                  {user.first_name}
                </button>
              ))}
            </div>
          )}  
        </div>
        
        <div className = "local-selection">
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[0]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[1]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[2]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[3]}</p>
            </div>
          </button>
      
          <button className = "hexagon1">
            <div className="hexagon-inner">
              <p>{localName[4]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[5]}</p>
            </div>
          </button>
          <button className = "hexagon2">
            <div className="hexagon-inner">
              <p>{localName[6]}</p>
            </div>
          </button>

          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[0]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[1]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[2]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[3]}</p>
            </div>
          </button>
      
          <button className = "hexagon1">
            <div className="hexagon-inner">
              <p>{localName[4]}</p>
            </div>
          </button>
          <button className = "hexagon">
            <div className="hexagon-inner">
              <p>{localName[5]}</p>
            </div>
          </button>
          <button className = "hexagon2">
            <div className="hexagon-inner">
              <p>{localName[6]}</p>
            </div>
          </button>
        </div>
      </div>
      
      {/*커뮤, 마이, 로그인, 다음 버튼*/}
      <div className = "right">
        <div className = "top-right-buttons">
          <button className="community-button">커뮤니티</button>
          <button className="my-page-button">마이페이지</button>
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
import { faCarSide } from '@fortawesome/free-solid-svg-icons'; //faCarSide 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesomeIcon 이미지 불러오기
import React, { useEffect } from "react"
import './Map.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const {kakao} = window;

function Map(){

    useEffect(() => {
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, [])


    const location = useLocation();
    const { dates } = location.state || { dates: [] };

    const formatDate = (date) => {
        if (!(date instanceof Date)) {
          return '유효하지 않은 날짜';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const navigate = useNavigate();

    const MPage = () => {
        navigate('/')
    }

    const CalPage = () => {
        navigate('../calendar/Calendar')
    }

    return (
        <div className = "kaMap" id ="map">
            <div className="MapPage0">
                {/* left */}
                <div className="MapNav"></div>
                <div className="left0">
                    <div className = "top-left0">
                        <button className = "logo0" onClick={MPage}>LOGO</button>
                        <button className = "prev0" onClick={CalPage}>
                            {/*material-icon 중 chevron_left를 클릭시 이전 페이지로 이동*/}
                            <span className="material-icons" style={{color: "#131313", marginLeft: "20px", fontSize: "30px"}}>
                                chevron_left
                            </span>
                           <p className = "prev-button0">
                                이전단계
                            </p>
                        </button>
                    </div>
                    <div className="left-center0">
                        {/* 일정 */}
                        <div className = "allplan">
                            <p className = "schedule">일정</p>
                            <div className = "map-trip-date">
                                <p>{formatDate(dates[0])}</p>
                                <p>&nbsp;~&nbsp;</p>
                                <p>{formatDate(dates[1])}</p>
                            </div>
                            <div className = "calplan">
                                <p className = "plusdate">날짜추가</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="left-center-back1">
                        </div>
                        <div className="left-center-back2">
                        </div>
                    </div>
                </div>
                <div className = "center0">
                    <div className = "top-center0">
                        <div className="step0">
                            <p className = "step10">STEP1</p>
                            <p className = "step20">STEP2</p>
                            <p className = "step30">STEP3</p>
                        </div>
                        <span className = "loadingcar0">
                            {/*FontAwesomeIcon에서 faCarSide를 출력 */}
                            <FontAwesomeIcon icon={faCarSide} style = {{color: "#5E5E5E", width: "20px", height: "14px", marginLeft: "200px", marginBottom: "-9px"}}/>
                        </span>
                        <div className = "bar0">
                            <hr className = "step-line0"></hr>
                            <hr className = "all-line0"></hr>
                        </div>
                    </div>
                </div>
                <div classNma="right0">
                    <div className="top-right0">
                        <div className = "top-right-buttons0">
                            <button className="community-button0">커뮤니티</button>
                            <button className="my-page-button0">마이페이지</button>
                            <button className="kakao-login-button0">카카오 로그인</button>
                        </div>
                        <button className="save-button0">
                            <p className="save0">저장하기</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;
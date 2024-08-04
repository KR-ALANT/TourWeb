import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import './Map.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';

const { kakao } = window;

function Map() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [plusdate, setPlusdate] = useState([]); // plusdate 상태 추가

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    const location = useLocation();
    const { dates } = location.state || { dates: [] };

    useEffect(() => {
        if (dates.length === 1) {
            setSelectedDate(new Date(dates[0]));
        }
    }, [dates]);

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
        navigate('/');
    }

    const CalPage = () => {
        navigate('../calendar/Calendar');
    }

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPlusdate((prevPlusdate) => [...prevPlusdate, date]); // plusdate 배열에 추가
        setIsCalendarOpen(false); // 날짜가 선택되면 달력을 닫음
    };

    const generateDateRange = (start, end) => {
        const dateArray = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    const validDates = dates.length === 2 ? generateDateRange(new Date(dates[0]), new Date(dates[1])) : [];

    return (
        <div className="kaMap" id="map">
            <div className="MapPage0">
                {/* left */}
                <div className="MapNav"></div>
                <div className="left0">
                    <div className="top-left0">
                        <button className="logo0" onClick={MPage}>LOGO</button>
                        <button className="prev0" onClick={CalPage}>
                            <span className="material-icons" style={{ color: "#131313", marginLeft: "20px", fontSize: "30px" }}>
                                chevron_left
                            </span>
                            <p className="prev-button0">
                                이전단계
                            </p>
                        </button>
                    </div>
                    <div className="left-center0">
                        {/* 일정 */}
                        <div className="allplan">
                            <p className="schedule">일정</p>
                            <div className="map-trip-date">
                                <p>{dates[0] ? formatDate(new Date(dates[0])) : '유효하지 않은 날짜'}</p>
                                <p>&nbsp;~&nbsp;</p>
                                <p>{dates[1] ? formatDate(new Date(dates[1])) : '유효하지 않은 날짜'}</p>
                            </div>
                            <button className="calplan" onClick={toggleCalendar}>
                                날짜추가
                            </button>
                            <div>
                            {isCalendarOpen && (
                                <DatePicker
                                    locale={ko}
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    inline
                                    includeDates={validDates}
                                    calendarClassName="custom-datepicker"
                                />
                            )}
                            </div>
                            {/* 선택된 날짜들 */}
                            <div className="selected-dates">
                                {plusdate.map((date, index) => (
                                    <div key={index} className="date-item">
                                        <div className = "scedate1">
                                            DAY{index + 1}
                                        </div>
                                        <div className = "scedate2">
                                            {formatDate(date)}
                                        </div>
                                        <button>
                                            <FontAwesomeIcon icon={faPlus} style={{ color: "#5E5E5E", width: "13px", height: "13px", marginLeft: "120px"}} />
                                        </button>
                                    </div>
                                ))}
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
                <div className="center0">
                    <div className="top-center0">
                        <div className="step0">
                            <p className="step10">STEP1</p>
                            <p className="step20">STEP2</p>
                            <p className="step30">STEP3</p>
                        </div>
                        <span className="loadingcar0">
                            <FontAwesomeIcon icon={faCarSide} style={{ color: "#5E5E5E", width: "20px", height: "14px", marginLeft: "200px", marginBottom: "-9px" }} />
                        </span>
                        <div className="bar0">
                            <hr className="step-line0"></hr>
                            <hr className="all-line0"></hr>
                        </div>
                    </div>
                </div>
                <div className="right0">
                    <div className="top-right0">
                        <div className="top-right-buttons0">
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

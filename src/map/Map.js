import React, { useState, useEffect } from "react";
import './Map.css';
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import TimePicker from 'react-time-picker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faPlus, faCircle, faCirclePlus, faLocationDot, faWallet, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const Map = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [plusdate, setPlusdate] = useState([]);
    const [boxes, setBoxes] = useState({});
    const [activePlusButton, setActivePlusButton] = useState({ dateIndex: null, boxIndex: null });
    const [isLocationClicked, setIsLocationClicked] = useState(false);
    const [editingCostIndex, setEditingCostIndex] = useState(null);
    const [newCost, setNewCost] = useState('');
    const [editingTimeIndex, setEditingTimeIndex] = useState(null);
    const [newStartTime, setNewStartTime] = useState('10:00');
    const [newEndTime, setNewEndTime] = useState('12:00');
    const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);

    useEffect(() => {
        // Function to load Kakao Maps API script
        const loadKakaoMapScript = () => {
            return new Promise((resolve, reject) => {
                if (window.kakao && window.kakao.maps) {
                    resolve();
                } else {
                    const script = document.createElement('script');
                    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY";
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Kakao Maps API'));
                    document.head.appendChild(script);
                }
            });
        };

        loadKakaoMapScript()
            .then(() => {
                setKakaoMapLoaded(true);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (kakaoMapLoaded) {
            const container = document.getElementById('map');
            if (container) {
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3
                };
                new window.kakao.maps.Map(container, options);
            } else {
                console.error('Map container not found');
            }
        }
    }, [kakaoMapLoaded]);

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
    };

    const CalPage = () => {
        navigate('../calendar/Calendar');
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPlusdate((prevPlusdate) => [...prevPlusdate, date]);
        setIsCalendarOpen(false);
    };

    const handleAddBox = (index) => {
        setBoxes((prevBoxes) => {
            const newBoxes = { ...prevBoxes };
            if (!newBoxes[index]) {
                newBoxes[index] = [];
            }
            newBoxes[index].push({
                location: '장소',
                time: '시간',
                cost: '비용'
            });
            return newBoxes;
        });
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

    const handlePlusClick = (dateIndex, boxIndex) => {
        setActivePlusButton((prev) => ({
            dateIndex: prev.dateIndex === dateIndex && prev.boxIndex === boxIndex ? null : dateIndex,
            boxIndex: prev.dateIndex === dateIndex && prev.boxIndex === boxIndex ? null : boxIndex,
        }));
    };

    const handleTimeClick = (index) => {
        setEditingTimeIndex(editingTimeIndex === index ? null : index);
    };

    const handleLocationClick = () => {
        setIsLocationClicked((prev) => !prev);
    };

    const handleStartTimeChange = (time) => {
        setNewStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        setNewEndTime(time);
    };

    const handleTimeSubmit = (index, boxIndex) => {
        setBoxes((prevBoxes) => {
            const newBoxes = { ...prevBoxes };
            newBoxes[index][boxIndex].time = `${newStartTime} ~ ${newEndTime}`;
            return newBoxes;
        });
        setEditingTimeIndex(null);
    };

    const handleCostClick = (index) => {
        setEditingCostIndex(editingCostIndex === index ? null : index);
    };

    const handleCostChange = (e) => {
        setNewCost(e.target.value);
    };

    const handleCostSubmit = (index, boxIndex) => {
        setBoxes((prevBoxes) => {
            const newBoxes = { ...prevBoxes };
            newBoxes[index][boxIndex].cost = newCost;
            return newBoxes;
        });
        setEditingCostIndex(null);
        setNewCost('');
    };

    return (
        <div className="kaMap">
            <div className="MapPage0">
                <div className="MapNav"></div>
                <div className="left0">
                    <div className="top-left0">
                        <button className="logo0" onClick={MPage}>LOGO</button>
                        <button className="prev0" onClick={CalPage}>
                            <span className="material-icons" style={{ color: "#131313", marginLeft: "20px", fontSize: "30px" }}>
                                chevron_left
                            </span>
                            <p className="prev-button0">이전단계</p>
                        </button>
                    </div>
                    <div className="left-center0">
                        <div className="allplan">
                            <p className="schedule">일정</p>
                            <div className="map-trip-date">
                                <p>{dates[0] ? formatDate(new Date(dates[0])) : '유효하지 않은 날짜'}</p>
                                <p>&nbsp;~&nbsp;</p>
                                <p>{dates[1] ? formatDate(new Date(dates[1])) : '유효하지 않은 날짜'}</p>
                            </div>
                            <button className="calplan" onClick={toggleCalendar}>날짜추가</button>
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
                        </div>
                        <div className="selected-dates">
                            {plusdate.map((date, index) => (
                                <div key={index} className="date-item">
                                    <div className="scedate">
                                        <div className="scedate1">
                                            DAY{index + 1}
                                        </div>
                                        <div className="scedate2">
                                            {formatDate(date)}
                                        </div>
                                        <button className="sceplus" onClick={() => handleAddBox(index)}>
                                            <FontAwesomeIcon icon={faPlus} style={{ color: "#5E5E5E", width: "13px", height: "13px"}} />
                                        </button>
                                    </div>                        
                                    <div className="boxes">
                                        {boxes[index] && boxes[index].map((box, boxIndex) => (
                                            <div key={boxIndex} className="bigbox">
                                                <FontAwesomeIcon icon={faCircle} style={{ color: "#707070", width: "8px", height: "8px"}} />
                                                <div className="smallbox">
                                                    <div className="boxlocation">
                                                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#000000", width: "15px", height: "15px", marginRight: "6px"}} />
                                                        <p>{box.location}</p>
                                                    </div>
                                                    <hr className="boxline"></hr>
                                                    <div className="boxtime">
                                                        <FontAwesomeIcon icon={faClock} style={{ color: "#5E5E5E", width: "15px", height: "15px", marginRight: "8px"}} />
                                                        {editingTimeIndex === `${index}-${boxIndex}` ? (
                                                            <>
                                                                <TimePicker
                                                                    onChange={handleStartTimeChange}
                                                                    value={newStartTime}
                                                                    className="time-picker"
                                                                />
                                                                <span> ~ </span>
                                                                <TimePicker
                                                                    onChange={handleEndTimeChange}
                                                                    value={newEndTime}
                                                                    className="time-picker"
                                                                />
                                                                <button onClick={() => handleTimeSubmit(index, boxIndex)}>
                                                                    확인
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <p>
                                                                {box.time}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="boxcost">
                                                        <FontAwesomeIcon icon={faWallet} style={{ color: "#5E5E5E", width: "15px", height: "15px", marginRight: "8px"}} />
                                                        {editingCostIndex === `${index}-${boxIndex}` ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={newCost}
                                                                    onChange={handleCostChange}
                                                                    className="cost-input"
                                                                    placeholder="비용 입력"
                                                                />
                                                                <button onClick={() => handleCostSubmit(index, boxIndex)}>
                                                                    확인
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <p>
                                                                {box.cost}
                                                            </p>
                                                        )}
                                                    </div>   
                                                </div>
                                                <button onClick={() => handlePlusClick(index, boxIndex)}>
                                                    <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#79CAFB", width: "20px", height: "20px"}} />
                                                </button>
                                                {activePlusButton.dateIndex === index && activePlusButton.boxIndex === boxIndex && (
                                                    <div className="plus-options">
                                                        <button className="oplocation" onClick={handleLocationClick}>장소</button>
                                                        <button className="optime" onClick={() => handleTimeClick(`${index}-${boxIndex}`)}>시간</button>
                                                        <button className="opcost" onClick={() => handleCostClick(`${index}-${boxIndex}`)}>비용</button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={`left-center-back1 ${isLocationClicked ? 'move-right' : ''}`}>
                            <div className="triplocation">
                                <div className="tripinput">
                                    <input
                                        className="tripsearch"
                                        placeholder="여행지를 입력해 주세요"
                                    />
                                    <button className="magnifyingglass">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#5E5E5E", width: "18px", height: "18px"}} />
                                    </button>
                                </div>
                                <p className="searchresult"> 검색결과 </p>
                            </div>
                        </div>
                        <div className={`left-center-back2 ${isLocationClicked ? 'move-right' : ''}`}></div>
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

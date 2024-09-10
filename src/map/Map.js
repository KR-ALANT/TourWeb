import { faCarSide, faPlus, faCircle, faCirclePlus, faLocationDot, faWallet, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import './Map.css';
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';

const { kakao } = window;

function Map() {
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
    const [locations, setLocations] = useState([]); // New state to store API data
    const location = useLocation();
    const [displayedLocations, setDisplayedLocations] = useState([]);
    const { dates } = location.state || { dates: [] };
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isSelectButtonActive, setIsSelectButtonActive] = useState(false);


     // 지도 설정 및 마커 추가
     useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.566535, 126.97796919999996), // 서울 중심 좌표
            level: 7 // 지도 확대 수준
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 위치 정보로 마커 생성
        locations.forEach((location) => {
            const lat = parseFloat(location.mapy);
            const lng = parseFloat(location.mapx);

            if (!isNaN(lat) && !isNaN(lng)) {
                const markerPosition = new kakao.maps.LatLng(lat, lng);

                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    map: map
                });

                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${location.title}</div>`
                });

                // 마커 클릭 이벤트 리스너
                kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                    setSelectedLocation(location); // 클릭된 관광지 정보 저장
                });
            } else {
                console.warn("유효하지 않은 좌표:", lat, lng);
            }
        });
    }, [locations]);

    const fetchData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.response && data.response.body && data.response.body.items && data.response.body.items.item) {
                    const items = data.response.body.items.item;
                    setLocations(items); // 지도에 표시할 데이터
                    setDisplayedLocations(items); // 화면에 표시할 데이터
                } else {
                    console.error('API 데이터가 없습니다.');
                }
            })
            .catch(error => {
                console.error('API 호출 에러:', error);
            });
    };

    // 클릭한 관광지를 최상단으로 올리는 함수
    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setIsSelectButtonActive(true); // 선택 버튼 활성화
    };

    const handleSelectButtonClick = () => {
        // 선택된 장소가 있고, plus 버튼이 눌린 상태에서만 동작
        if (selectedLocation && activePlusButton.dateIndex !== null && activePlusButton.boxIndex !== null) {
          // boxes가 배열로 설정되어 있는지 확인하고, 아닌 경우 빈 배열로 설정
          const updatedBoxes = Array.isArray(boxes) ? [...boxes] : [];
      
          // 선택된 날짜에 대한 박스 배열이 없으면 빈 배열로 초기화
          if (!updatedBoxes[activePlusButton.dateIndex]) {
            updatedBoxes[activePlusButton.dateIndex] = [];
          }
      
          // activePlusButton으로 선택된 boxIndex에 해당하는 박스가 없다면 새 박스를 추가
          if (!updatedBoxes[activePlusButton.dateIndex][activePlusButton.boxIndex]) {
            updatedBoxes[activePlusButton.dateIndex].push({
              location: '',
              time: '',
              cost: ''
            });
          }
      
          // 선택된 박스의 location을 selectedLocation.title로 업데이트
          updatedBoxes[activePlusButton.dateIndex][activePlusButton.boxIndex].location = selectedLocation.title;
      
          // boxes 상태 업데이트
          setBoxes(updatedBoxes);
      
          // 장소 선택 UI 닫기
          setIsLocationClicked(false);
        }
      };

    const Tourist = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=64&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=12';
        fetchData(url);
    };

    const Cultural = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=65&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=14';
        fetchData(url);
    };

    const Restaurant = () =>{
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=300&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=39';
        fetchData(url)
    };

    const Traveling = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=11&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=25';
        fetchData(url)
    };

    const Leports = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=7&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=28'
        fetchData(url)
    };

    const Festivities = () =>{
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=52&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=15';
        fetchData(url);
    };

    const Lodge = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=41&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=32'
        fetchData(url)
    };

    const Shopping = () => {
        const url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=0rLD0TFj0icKbvkAhD7FCbp4cpdmpBTY7OeAsTGEFkpcORZxcQ5AMHzf%2FgR75mQ3NSo5rIC7WwZJknCi9TcKFg%3D%3D&numOfRows=7&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=38';
        fetchData(url)
    };

    

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
        setActivePlusButton({ dateIndex, boxIndex });
        setIsLocationClicked(true); // 장소 선택 UI 열기
      
        // boxes 배열이 비어있으면 새로운 배열을 추가
        if (!boxes[dateIndex]) {
          setBoxes([...boxes, { [dateIndex]: [] }]);
        }
    };

    const handleTimeClick = (index) => {
        setEditingTimeIndex(editingTimeIndex === index ? null : index);
    };

    const handleLocationClick = () => {
        setIsLocationClicked((prev) => !prev);
    };

    const handleStartTimeChange = (e) => {
        setNewStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setNewEndTime(e.target.value);
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
        setEditingCostIndex(editingCostIndex === index ? null : index); // Toggle editing state
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
        setEditingCostIndex(null); // Close the input field after submission
        setNewCost(''); // Reset the input field
    };

    return (
        <div className="kaMap" id="map" style={{ width: '100%', height: '500px' }}>
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
                                    <div className = 'scedate'>
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
                                                                <input
                                                                    type="time"
                                                                    value={newStartTime}
                                                                    onChange={handleStartTimeChange}
                                                                    className="custom-time-input"
                                                                />
                                                                <span> ~ </span>
                                                                <input
                                                                    type="time"
                                                                    value={newEndTime}
                                                                    onChange={handleEndTimeChange}
                                                                    className="custom-time-input"
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
                                <button className="tourist-spot" onClick={Tourist}>관광지</button>
                                <button className="cultural" onClick={Cultural}>문화시설</button>
                                <button className= "restaurant" onClick={Restaurant}>음식점</button>
                                <button className= "traveling-course" onClick={Traveling}>여행코스</button>
                                <button className= "leports" onClick = {Leports}>레포츠</button>
                                <button className= "festivities" onClick={Festivities}>축제공연행사</button>
                                <button className= "lodge" onClick={Lodge}>숙박</button>
                                <button className= "shopping" onClick={Shopping}>쇼핑</button>
                                <p className="searchresult"> 검색결과 </p>
                                <div className="resultbox">
                                    <ul className="allapiresult">
                                        {displayedLocations.map((location, index) => (
                                        <li key={index} className='apiresult' onClick={() => handleLocationSelect(location)}>
                                            {location.firstimage ? (
                                                <img src={location.firstimage} alt={location.title} style={{ width: '80px', height: 'auto' }} />
                                            ) : location.firstimage2 ? (
                                                <img src={location.firstimage2} alt={location.title} style={{ width: '80px', height: 'auto' }} />
                                            ) : (
                                                <p style={{ width: '80px', height: 'auto' }}>이미지가 없습니다.</p>
                                            )}
                                            <div className="apititle">
                                                <h4>{location.title}</h4>
                                                <p>{location.addr1}</p>
                                                <p>{location.overview}</p>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="selplace">선택된 장소</p>
                                <div className="selresult">
                                    {selectedLocation ? (
                                        <div className="selapiresult">
                                            {selectedLocation.firstimage ? (
                                                <img src={selectedLocation.firstimage} alt={selectedLocation.title} style={{ width: '80px', height: 'auto' }} />
                                            ) : selectedLocation.firstimage2 ? (
                                                <img src={selectedLocation.firstimage2} alt={selectedLocation.title} style={{ width: '80px', height: 'auto' }} />
                                            ) : (
                                                <p>이미지가 없습니다.</p>
                                            )}
                                            <div className="selapi">
                                                <h4>{selectedLocation.title}</h4>
                                                <p>{selectedLocation.addr1}</p>
                                                <p>{selectedLocation.overview}</p>
                                            </div>
                                        </div>
                                    ) : (
                                    <p>마커를 클릭하면 해당 관광지 정보가 여기에 표시됩니다.</p>
                                    )}
                                </div>
                                <button 
          className={`selectplace ${isSelectButtonActive ? 'active' : ''}`} 
          onClick={handleSelectButtonClick}
          disabled={!isSelectButtonActive}
        >
          선택
        </button>
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
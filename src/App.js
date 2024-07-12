import { faCarSide } from '@fortawesome/free-solid-svg-icons'; //faCarSide 이미지 불러오기
import { faBars } from '@fortawesome/free-solid-svg-icons'; //faBars 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesomeIcon 이미지 불러오기
import React, { useState } from 'react'; // useState 사용
import './App.css';

function App() {

  const date = new Date();
  let [currYear, setCurrYear] = useState(date.getFullYear());
  let [currMonth, setCurrMonth] = useState(date.getMonth());

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const renderCalendar = () => {
    //해당 달의 첫째 날의 요일을 구함
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    //해당 달의 마지막 날짜를 구함
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const days = [];

    //(이전 달 마지막 위치 현재 달력에 설정)현재 달 시작위치 설정
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<li key={`inactive-${i}`} className="inactive"></li>);
    }

    // 현재 달력 날짜 생성
    for (let i = 1; i <= lastDateOfMonth; i++) {
      // i값을 사용하여 현재 연도와 월의 i 번쨰 날짜 생성
      const currentDate = new Date(currYear, currMonth, i);
      // currentDate가 오늘 날짜의 자정 이전인지 확인
      const isPast = currentDate < new Date().setHours(0, 0, 0, 0);
      days.push(
        <li key={i} className={isPast ? 'inactive' : ''}>
          {i}
        </li>
      );
    }

    // 그 달의 길이 만큼 일 수 생성
    const totalDays = days.length;
    //35(5주 * 7일)일을 기준으로 생성된 일 수 차감
    const remainingDays = 35 - totalDays; // 35 = 5 weeks * 7 days
    //현재 달력이 끝나는 마지막 날 +` ~ 토요일까지 빈칸 생성
    for (let i = 1; i <= remainingDays; i++) {
      days.push(<li key={`inactive-next-${i}`} className="inactive"></li>);
    }

    return days;
  };

  const renderCalendar1 = () => {
    
    //해당 달의 첫째 날의 요일을 구함
    const firstDayOfMonth = new Date(nextYear, nextMonth, 1).getDay();
    //해당 달의 마지막 날짜를 구함
    const lastDateOfMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    const days = [];

    //(이전 달 마지막 위치 현재 달력에 설정)현재 달 시작위치 설정
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<li key={`inactive-${i}`} className="inactive"></li>);
    }

    // 현재 달력 날짜 생성
    for (let i = 1; i <= lastDateOfMonth; i++) {
      days.push(<li key={i}>{i}</li>);
    }

    // 그 달의 길이 만큼 일 수 생성
    const totalDays = days.length;
    //35(5주 * 7일)일을 기준으로 생성된 일 수 차감
    const remainingDays = 35 - totalDays; // 35 = 5 weeks * 7 days
    //현재 달력이 끝나는 마지막 날 + ~ 토요일까지 빈칸 생성
    for (let i = 1; i <= remainingDays; i++) {
      days.push(<li key={`inactive-next-${i}`} className="inactive"></li>);
    }

    return days;
  };

  //이전 달로 이동
  const PrevMonth = () => {
    //currMonth가 0일 때 이전 념도로 넘어감
    if (currMonth === 0) {
      setCurrYear(currYear - 1);
      setCurrMonth(11); // December
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  //다음 달로 이동
  const NextMonth = () => {
    //currMonth가 11일 때 다음 년도로 넘어감
    if (currMonth === 11) {
      setCurrYear(currYear + 1);
      setCurrMonth(0); // January
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  // 다음 달로 넘어갈 때 현재 달이 11이면 0아니면 현재 달 +1를 nextMonth를 대입
  const nextMonth = currMonth === 11 ? 0 : currMonth + 1;
  // 다음다로 넘어갈 때 현재 달이 11이면 현재 년도 + 1 아니면 현재 년도를 nextYear에 대입
  const nextYear = currMonth === 11 ? currYear + 1 : currYear;



  return (
    <div className="App">
      {/*로고, 스텝, 메뉴바*/}
      <div className = "top">
        <div className ="logo">
          <p>LOGO</p>
        </div>
        <div className = "top-center">
          <div>
            <div className="step">
              <p className = "step1">STEP1</p>
              <p className = "step2">STEP2</p>
              <p className = "step3">STEP3</p>
            </div>
            <span className = "loadingcar">
              <FontAwesomeIcon icon={faCarSide} style = {{color: "#5E5E5E", width: "20px", height: "14px", marginBottom: "-9px"}}/>
            </span>
            <div className = "bar">
              <hr className = "step-line"></hr>
              <hr className = "all-line"></hr>
            </div>
          </div>
        </div>
        <div className = "menu-bar">
          <FontAwesomeIcon icon={faBars} size= "xl" className = "fa-bars" style = {{color: "#707070"}}/>
        </div>
      </div>
      {/*캘린더*/}
      <div className="cal">
        <div className="calendar">
          <div className="wrapper">
            <header>
              <div className="nav">
                <button className="material-icons" onClick={PrevMonth}>chevron_left</button>
                <p className="current-date">{currYear}년 {months[currMonth]}</p>
              </div>
            </header>
            <div className="month">
              <ul className="weeks">
                <li>일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li>토</li>
              </ul>
              <ul className="days">
                {renderCalendar()}
              </ul>
            </div>
          </div>
          <div className="wrapper">
            <header>
              <div className="nav">
                <p className="current-date1">{nextYear}년 {months[nextMonth]}</p>
                <button className="material-icons" onClick={NextMonth}>chevron_right</button>
              </div>
            </header>
            <div className="month">
              <ul className="weeks">
                <li>일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li>토</li>
              </ul>
              <ul className="days">
                {renderCalendar1()}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <hr className = "line"></hr>
        </div>
        <div className="correct">
          <div className = "trip-date">

          </div>
          <div>
            <button className = "select">선택</button>
          </div>
        </div>
      </div>
      {/*이전 버튼, 다음 버튼*/}
      <div className = "last">
        <button className = "prev">
          <span className="material-icons" style={{color: "#131313", marginLeft: "20px", fontSizeAdjust: "40px"}}>
            chevron_left
          </span>
          <p className = "prev-button">
            이전단계
          </p>
        </button>
        <button className = "next">
          <p className = "next-button">
            다음단계
          </p>
          <span className="material-icons" style = {{color: "#707070", marginRight: "20px"}}> 
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;

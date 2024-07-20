import { faCarSide } from '@fortawesome/free-solid-svg-icons'; //faCarSide 이미지 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesomeIcon 이미지 불러오기
import React, { useState } from 'react'; // useState 사용
import './Calendar.css';
import { useNavigate } from "react-router-dom";

function Calendar() {

  const date = new Date(); // 현재 날짜와 시간을 나타내는 Date 객체 생성
  let [currYear, setCurrYear] = useState(date.getFullYear()); //현재 연도 저장 및 업데이트
  let [currMonth, setCurrMonth] = useState(date.getMonth()); //현재 월 저장 및 업데이트
  let [selDates, setselDates] = useState([]); // 선택한 날짜들 저장
  let [nextButtonEn, setnextButtonEn] = useState(false); // 다음 버튼의 활성화 상태를 저장

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const DateClick = (currDate) => {
    // 두 개의 날짜가 선택된 경우 배열 초기화
    if (selDates.length === 2) {
      setselDates([currDate]);
    }
    // 배열에 두개의 미만의 날짜가 있는 경우 클릭한 날짜 배열에 추가
    else {
      setselDates((prevDates) => {
        //이전의 날짜 배열을 받고 새로 클릭한 날자 추가, 배열을 오름차순으로 정렬
        const newDates = [...prevDates, currDate].sort((a, b) => a - b);
        //정렬된 배열에서 날짜가 두 개를 초과하면 마지막 두 날짜만 유지
        return newDates.length > 2 ? newDates.slice(-2) : newDates;
      });
    }
  };


  const SelectClick = () => {
    //selDates 배열에 선택된 날짜가 두 개 있는지 확인
    if (selDates.length === 2) {
      // nextButtonEn을 true로 설정
      setnextButtonEn(true);
    }
  };


  const renderCalendar = () => {
    //해당 달의 첫째 날의 요일을 구함
    const firstDay = new Date(currYear, currMonth, 1).getDay();
    //해당 달의 마지막 날짜를 구함
    const lastDate = new Date(currYear, currMonth + 1, 0).getDate();
    const days = [];

    //(이전 달 마지막 위치 현재 달력에 설정)현재 달 시작위치 설정
    for (let i = firstDay; i > 0; i--) {
      days.push(<li key={`inactive-${i}`} className="inactive"></li>);
    }

    // 현재 달력 날짜 생성, i값을 사용하여 현재 연도와 월의 i 번쨰 날짜 생성
    for (let i = 1; i <= lastDate; i++) {
      // currDate가 오늘 날짜의 자정 이전인지 확인
      const currDate = new Date(currYear, currMonth, i);
      //현재 날짜 이전인지 확인
      const Past = currDate < new Date().setHours(0, 0, 0, 0);
      //클래스 이름 초기화
      let className = '';
      //selDates 배열에 currDate와 같은 날짜 있는지 확인 후 className을 sel-start-end로 설정
      if (selDates.some(date => date.getTime() === currDate.getTime())) {
        className = 'sel-start-end';
      }
      // 선택된 날짜 배열이 두 개의 날짜를 가지고 있으며 currDate가 두 날짜 사이에 있을 시 className을 sel-range로 설정
      else if (selDates.length === 2 && currDate > selDates[0] && currDate < selDates[1]) {
        className = 'sel-range';
      }

      //days 배열의 li요소 추가
      days.push(
        <li 
        //배열의 각 요소를 식별하기 위한 고유의 값 i
          key={i}
          // Past 가 true이면 inactive 클래스 추가 false이면 className 변수에 설정된 값 추가
          className={`${Past ? 'inactive' : ''} ${className}`}
          //Past가 false일 때 DateClick(currDate)함수 호출하도록 설정
          onClick={() => !Past && DateClick(currDate)}
        >
        {/*날짜 i 표시*/}
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
    const firstDay = new Date(nextYear, nextMonth, 1).getDay();
    //해당 달의 마지막 날짜를 구함
    const lastDate = new Date(nextYear, nextMonth + 1, 0).getDate();
    const days = [];

    //(이전 달 마지막 위치 현재 달력에 설정)현재 달 시작위치 설정
    for (let i = firstDay; i > 0; i--) {
      days.push(<li key={`inactive-${i}`} className="inactive"></li>);
    }

    // 현재 달력 날짜 생성, i값을 사용하여 현재 연도와 월의 i 번쨰 날짜 생성
    for (let i = 1; i <= lastDate; i++) {
      // nextDate가 오늘 날짜의 자정 이전인지 확인
      const nextDate = new Date(nextYear, nextMonth, i);
      //현재 날짜 이전인지 확인
      const Past = nextDate < new Date().setHours(0, 0, 0, 0);
      //클래스 이름 초기화
      let className = '';
      //selDates 배열에 nextDate와 같은 날짜 있는지 확인 후 className을 sel-start-end로 설정
      if (selDates.some(date => date.getTime() === nextDate.getTime())) {
        className = 'sel-start-end';
      }
      // 선택된 날짜 배열이 두 개의 날짜를 가지고 있으며 nextDate가 두 날짜 사이에 있을 시 className을 sel-range로 설정
      else if (selDates.length === 2 && nextDate > selDates[0] && nextDate < selDates[1]) {
        className = 'sel-range';
      }

      //days 배열의 li요소 추가
      days.push(
        <li 
        //배열의 각 요소를 식별하기 위한 고유의 값 i
          key={i}
          // Past 가 true이면 inactive 클래스 추가 false이면 className 변수에 설정된 값 추가
          className={`${Past ? 'inactive' : ''} ${className}`}
          //Past가 false일 때 DateClick(nextDate)함수 호출하도록 설정
          onClick={() => !Past && DateClick(nextDate)}
        >
        {/*날짜 i 표시*/}
          {i}
        </li>
      );
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

  const navigate = useNavigate();

  const nextPage = () => {
    navigate('../map/Map')
  }

  return (
    <div className="CalendarPage">
      {/*로고, 이전 버튼*/}
      <div className = "left">
        <div className ="logo">
          <p>LOGO</p>
        </div>
        <button className = "prev">
          {/*material-icon 중 chevron_left를 클릭시 이전 페이지로 이동*/}
          <span className="material-icons" style={{color: "#131313", marginLeft: "20px", fontSize: "30px"}}>
            chevron_left
          </span>
          <p className = "prev-button">
            이전단계
          </p>
        </button>
      </div>
      <div className = "center">  
        <div className = "top-center">
          <div>
            <div className="step">
              <p className = "step1">STEP1</p>
              <p className = "step2">STEP2</p>
              <p className = "step3">STEP3</p>
            </div>
            <span className = "loadingcar">
              {/*FontAwesomeIcon에서 faCarSide를 출력 */}
              <FontAwesomeIcon icon={faCarSide} style = {{color: "#5E5E5E", width: "20px", height: "14px", marginBottom: "-9px"}}/>
            </span>
            <div className = "bar">
              <hr className = "step-line"></hr>
              <hr className = "all-line"></hr>
            </div>
          </div>
        </div>
        {/*캘린더*/}
        <div className="cal">
          <div className="calendar">
            <div className="wrapper">
              <header>
                <div className="nav">
                  {/*material-icon 중 chevron_left를 클릭시 이전달로 이동*/}
                  <button className="material-icons" onClick={PrevMonth}>chevron_left</button>
                  {/*현재 년도 및 현재 월 출력*/}
                  <p className="curr-date">{currYear}년 {months[currMonth]}</p>
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
                  {/*현재 년도 및 다음 월 출력*/}
                  <p className="curr-date1">{nextYear}년 {months[nextMonth]}</p>
                  {/*material-icon 중 chevron_right를 클릭시 다음 달로 이동*/}
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
              {/*selDate[0]이 존재할 시 selDate[0]을 toLocalDatestring() 메서드를 사용하여 로컬 날짜 문자열 형식으로 표시 존재하지 않을 시 빈 문자열 표시*/}
              <p>{selDates[0] ? selDates[0].toLocaleDateString() : ''} </p>
              <p>&nbsp;~&nbsp;</p>
              {/*selDate[1]이 존재할 시 selDate[1]을 toLocalDatestring() 메서드를 사용하여 로컬 날짜 문자열 형식으로 표시 존재하지 않을 시 빈 문자열 표시*/}
              <p>{selDates[1] ? selDates[1].toLocaleDateString() : ''} </p>
            </div>
            <div>
            <button className="select" 
                disabled={selDates.length !== 2} 
                onClick={SelectClick}>선택</button>
            </div>
          </div>
        </div>
      </div>
      {/*이전 버튼, 다음 버튼*/}
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

export default Calendar;

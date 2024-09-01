// CardDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './CardDetail.css'
import { Posts } from "./posts";

function CardDetail() {
  const { id } = useParams(); // URL의 id 매개변수 가져오기

  // 문자열로 넘어온 id를 숫자로 변환
  const postId = parseInt(id, 10);

  // 카드 데이터를 id로 필터링
  const post = Posts.find((post) => post.id === postId);

  // 카드가 없을 때 처리
  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="card-detail">
      <header className="App-header1">
        <div className="header-content1">
        </div>
      </header>
      <div className="post-header">
        <img src={post.profileImage} alt="Profile" className="profile-image1" />
        <h1 className="post-title">{post.title}</h1>
      </div>
      <div className="post-body">
        <p className="post-description">{post.description}</p>
        <img src={post.cardImage} alt="Card" className="post-image" />
        <div className="post-footer">
          <span className="scrap-count1">{post.scrapCount} 명이 스크랩 중</span>
          <span className="post-date1">게시일: {post.postdata}</span>
        </div>
        <div className="hashtags1">
          {post.hashtags.map((hashtag, index) => (
            <span key={index} className="hashtag1">{hashtag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardDetail;

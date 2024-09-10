import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 스타일 불러오기
import { useNavigate } from "react-router-dom";
import './WritePage.css'; // CSS 파일 임포트

// 커스텀 툴바 모듈 설정
const modules = {
  toolbar: {
    container: [
      [{ 'size': ['small', 'medium', 'large', 'huge'] }], // 폰트 크기 옵션 추가
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      [{ 'align': [] }]
    ],
    handlers: {
      'image': handleImageUpload
    }
  }
};

// 이미지 업로드 핸들러
function handleImageUpload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  
  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
}

function WritePage() {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const goMyPage = () => {
    navigate('../MyPage')
  }

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          className="title-input"
        />
        
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          className="quill-editor"
          ref={quillRef}
          modules={modules}
        />
      </div>
      <div className="WP_footer">
        <div className="action-buttons">
          <button className="save-button">임시저장</button>
          <button className="submit-button" onClick={goMyPage}>완료</button>
        </div>
      </div>
    </div>
  );
}

export default WritePage;

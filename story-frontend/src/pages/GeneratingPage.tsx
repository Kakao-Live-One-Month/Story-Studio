// src/GeneratingPage.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/GeneratingPage.css'; // GeneratingPage 스타일시트 경로
import '../components/GenreSelect'; // GeneratingPage 스타일시트 경로
import ThemeInput from '../components/ThemeInput';
import DescribeInput from '../components/DescribeInput';
import GenreSelect from '../components/GenreSelect';
import PageSelect from '../components/PageSelect';
import GeneratingButton from '../components/GeneratingButton';


const GeneratingPage = () => {
  // 이 컴포넌트의 상태와 로직을 여기에 추가합니다.

  return (

    <div className="generating-page-container">

      <header>
        <h2>나만의 동화책 만들기</h2>
      </header>
      <section className="theme-container">
      <ThemeInput/>
         {/* <textarea className="theme-input" placeholder="예시)밤에만 움직이는 인형"></textarea> */}
      </section>
      <section className="options-section">
        {/* 옵션 버튼과 기타 UI 요소 */}
        <GenreSelect/>
      </section>
      <section className="slider-section">
        <PageSelect/>
        {/* 슬라이더 UI 요소 */}
      </section>
      <section className="textarea-section">
        
        {/* 텍스트 입력 영역 */}
        {/* <textarea placeholder="원하는 내용을 입력하세요. (선택)"></textarea> */}
        <DescribeInput/>
      </section>
      <footer>
      <Link to="/generated-1">
       <GeneratingButton/>
        </Link>
      </footer>

    </div>

  );
};

export default GeneratingPage;

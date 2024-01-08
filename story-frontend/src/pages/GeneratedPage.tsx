// src/GeneratingPage.tsx

import React from 'react';
import '../styles/GeneratedPage.css'; // GeneratingPage 스타일시트 경로
import '../components/GenreSelect'; // GeneratingPage 스타일시트 경로
import Prompt from '../components/Prompt';


const GeneratedPage = () => {
  // 이 컴포넌트의 상태와 로직을 여기에 추가합니다.

  return (

     <div className="generating-page-container">
      <header>
        <h2>나만의 동화책 만들기</h2>
      </header>
      <Prompt/>
      <section className="textarea-section">
        
        {/* 텍스트 입력 영역 */}
        <textarea placeholder="원하는 내용을 입력하세요. (선택)"></textarea>
      </section>
    
     </div>

    
  );
};

export default GeneratedPage;

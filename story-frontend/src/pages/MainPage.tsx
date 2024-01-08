import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/MainPage.css';
import { GenreProvider } from '../contexts/GenreContext';
const MainPage = () => {
  // 페이지에 필요한 상태(state) 또는 기능(function)을 여기에 추가합니다.

  return (
    <div className="main-container">
   <GenreProvider>

      <header className="main-header">
        <h1>이야기 작업실</h1>
        <p>작은 작업실에서 펼쳐내는 큰 꿈의 이야기<br />
        AI와 작가의 만남을 통해 새로운 이야기를 만나보세요.</p>
        <Link to="/generating">
        <button className="start-button">바로가기</button>
        </Link>
      </header>
      <section className="content-section">
        <div className="content-box">
          <h2>AI를 활용한 맞춤형 이야기</h2>
          <p>시가 사용자의 일상에 따른 맞춤형 이야기를 생성합니다. 저희의 전신을 어루만져 영감을 불어넣는 스토리텔링은 당신에게 나 전달합니다.</p>
          {/* 이미지는 적절한 img 태그로 교체해주세요 */}
        </div>
        <div className="content-box">
          <h2>챗봇 상호작용하기</h2>
          <p>상호작용 이야기의 전개에 자유 게임하며 새로운 흥분을 맛보십시오. 이야기 속의 다양한 선택지를 통해 자신만의 독창적 세계를 만들어 보세요.</p>
          {/* 이미지는 적절한 img 태그로 교체해주세요 */}
        </div>
      </section>
      {/* 기타 섹션/컴포넌트는 여기에 추가합니다. */}

      </GenreProvider>
    </div>
  );
};

export default MainPage;

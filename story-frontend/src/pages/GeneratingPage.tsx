// src/GeneratingPage.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../components/GenreSelect'; 
import ThemeInput from '../components/ThemeInput';
import DescribeInput from '../components/DescribeInput';
import GenreSelect from '../components/GenreSelect';
import PageSelect from '../components/PageSelect';
import GeneratingButton from '../components/GeneratingButton';


const GeneratingPage = () => {


  return (

    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-100'
      style={{
        backgroundImage: `url('/assets/img/paper-wall.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className='mt-24 pb-14'>
        <span className='text-7xl font-mono'>나만의 동화책 만들기</span>
      </header>

      {/* 주제 입력 영역*/}
      <section className="font-serif pb-9">
        <ThemeInput/>
      </section>

      {/* 장르 버튼 */}
      <section className="font-serif pb-24">
        <GenreSelect/>
      </section>

      {/* 페이지 수 결정 슬라이더*/}
      <section className="font-serif pb-24">
        <PageSelect/>
      </section>

      {/* 내용 입력 영역 */}
      <section className="pb-20 font-serif">
        <DescribeInput/>
      </section>

      <footer className='mb-40'>
        <Link to="/generated-1">
          <GeneratingButton/>
        </Link>
      </footer>
    </div>
  );
};

export default GeneratingPage;

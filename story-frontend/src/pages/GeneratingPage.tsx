import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeInput, DescribeInput, GenreSelect, PageSelect } from '../components';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import GeneratingButton from '../components/GeneratingButton';

const GeneratingPage: React.FC = () => {

//입력값 초기화
  const { setSelectedGenre } = useGenre();
  const { setSelectedPage } = usePage();
  const { setTheme } = useTheme();
  const { setDescribe } = useDescribe();

  // useEffect(() => {
  //   setSelectedPage(9);
  //   setSelectedGenre('');
  //   setTheme('');
  //   setDescribe('');
  // }, [setSelectedPage, setSelectedGenre, setTheme, setDescribe]);
// 

  return (
    <div className='min-h-screen w-full flex justify-center items-center'
      style={{
        backgroundImage: `url('/img/bg-book3.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        className='container mx-auto py-10 flex flex-col flex-wrap px-10 md:w-[700px] lg:w-[1000px]'>
        <Link to="/" className="absolute top-0 left-0 p-5">
          <img src="../../img/logo.png" alt="Image" className="cursor-pointer w-10 sm:w-16 md:w-20 lg:w-32"/>
        </Link>

        <div className="h-full py-10">
          <p className="text-center text-4xl font-gowun-batang lg:text-8xl">나만의 동화책 만들기.</p>
        </div>

        {/* 주제 입력 영역*/}
        <ThemeInput/>

        {/* 장르 버튼 */}
        <GenreSelect/>

        {/* 페이지 수 결정 슬라이더*/}
        <PageSelect/>

        {/* 내용 입력 영역 */}
        <DescribeInput/>

        {/* 만들기 버튼 */}
        <Link to="/generated">
          <GeneratingButton />
        </Link>
      </div>
    </div>
  );
};

export default GeneratingPage;

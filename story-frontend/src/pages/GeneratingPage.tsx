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
    <div className='container mx-auto flex flex-col flex-wrap bg-gray-100 px-10 py-16 md:w-[700px]'>
      <div className="h-full py-10">
        <p className="text-center text-4xl">나만의 동화책 만들기</p>
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
  );
};

export default GeneratingPage;

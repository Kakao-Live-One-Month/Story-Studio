import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeInput, DescribeInput, GenreSelect, PageSelect } from '../components';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import GeneratingButton from '../components/GeneratingButton';

interface GeneratingPageProps {
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
}
const GeneratingPage: React.FC<GeneratingPageProps> = ({setStoryArray, setIsVisitedPage, setImageUrlArray}) => {

//입력값 초기화
  const { setSelectedGenre } = useGenre();
  const { selectedPage } = usePage();
  const { setTheme } = useTheme();
  const { setDescribe } = useDescribe();

  useEffect(() => {
    // storyArray 초기화
    localStorage.removeItem('storyArray');
    setStoryArray([]);
  }, []);

  useEffect(() => {
    // isVisitedPage 초기화
    localStorage.removeItem('isVisitedPage');
    setIsVisitedPage(new Array(selectedPage).fill(false));
  }, []);


  useEffect(() => {
    // ImageUrlArray 초기화
    localStorage.removeItem('imageUrlArray');
    setImageUrlArray([]);
  }, []);
 
 

  return (
    <div className='min-h-screen w-full flex justify-center items-center'
      style={{
        backgroundImage: `url('/img/bg-book3.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <Link to="/">
        <div className="left-6 top-6 absolute font-bold md:left-20 md:top-20 md:text-xl lg:text-3xl">
          Story Workshop.
        </div>
      </Link>
      <div 
        className='bg-red-200 container mx-auto py-10 flex flex-col flex-wrap px-20 md:w-[800px] lg:w-[1000px]'
        style={{
          backgroundImage: `url('/img/gener-paper.png')`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className="h-full py-10">
          <p className="text-center text-4xl font-bold font-gowun-batang lg:text-6xl">나만의 동화책 만들기</p>
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

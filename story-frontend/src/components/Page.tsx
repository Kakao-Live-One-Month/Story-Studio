// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, Component } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { generateOption, callNextSession } from '../api/ApiRequest';
import Image from '../components/Image';
import { error } from 'console';

type Props = {};
type State = {};



// props의 타입을 정의하는 인터페이스
interface PageProps {
  lastSession: number; 
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
}

const Page: React.FC<PageProps> = ({lastSession, setStoryArray, storyArray}) => {

  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [qnoption, setQnoption] = useState<string[]>();
  const options = ["Question", "option1", "option2", "option3"];//qnoption의 예시
  const [choice, setChoice] = useState<number | null>(null);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const [pastpage, setPastpage] = useState<number[]>([]);
  const param = useParams();
  const page_id = Number(param.page_id);
  console.log(page_id);


  useEffect(() => {
    setShowLoaging(true);
      if (storyArray)
      {
        setCurrentPageStory(storyArray[page_id - 1]);
      }
      console.log(currentPageStory);

  }, [page_id]); 




  return (
    <div>
      <div>
        {/* 생성이미지 */}
        <Image/>

      </div>

      <div style={{alignItems:'center', width: '200px', // 뷰포트 전체 너비
      height: '200px', backgroundColor: 'rgba(255, 255, 255, 0.3)', // 반투명 배경
      zIndex: 9000}}>
      <p>안녕안녕안녕{currentPageStory}</p>
      </div>
    

      {/* {showModal && (
       <OptionModal setChoice={setChoice} choice={choice} setShowModal={setShowModal} page_id={page_id}/>
       )} */}

      <div style={{
        padding: '10px',
        textAlign: 'center',
      }}>

    </div>
    </div>


  );
  


} 

export default Page;

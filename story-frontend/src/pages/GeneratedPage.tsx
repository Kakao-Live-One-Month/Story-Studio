// src/GeneratingPage.tsx
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { StartApiRequest, generateOption, callNextSession, callLastSession } from '../api/ApiRequest';
import OptionModal from '../components/OptionModal';

// props의 타입을 정의하는 인터페이스
interface GeneratedPageProps {
  number: number;
  lastSession: number; 
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({ number, lastSession }) => {
  
  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [qnoption, setQnoption] = useState<string[]>();
  const options = ["Question", "option1", "option2", "option3"];//qnoption의 예시

  const [choice, setChoice] = useState<number | null>(null);

  const [storyArray, setStoryArray] = useState<string[]>([]);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");

  const [pastpage, setPastpage] = useState<number[]>([]);

  useEffect(() => {
    const firstApiRequest = async () => {
      try {
        let contentsArray = await StartApiRequest(theme, selectedGenre, selectedPage, describe);
        console.log(contentsArray);

        if (!contentsArray)
        {
            contentsArray = [] as string[];
        };

        setStoryArray([...storyArray, ...contentsArray]);
      } catch (error) {
        console.error('Error StartApiRequest data:', error);
      }
    };

    firstApiRequest();
  }, []);
 

  useEffect(() => {
    setShowLoaging(true);
    if (number % 3 === 0 && number!==selectedPage) {
  
      if (storyArray)
      {
       setCurrentPageStory(storyArray[number - 1]);
      }
      console.log(currentPageStory);
    } 
  }, [number]); 




  useEffect(() => {
    if (number % 3 === 0 && number!==selectedPage) {
      const response = generateOption();
      setQnoption(response);
    }
  }, [choice]); // 의존성 배열에 number와 lastSession을 넣어줍니다.



  const goToNextPage = () => {
    const nextPage = (number+1).toString();
    if (number % 3 === 0 && showModal === false && number!==selectedPage) {
      if (!pastpage.includes(number)){
        const response = generateOption();
        setQnoption(response);
        setPastpage([...pastpage, number]);
        console.log(pastpage);
        setShowModal(true);
        // number가 변경될 때 모달 표시 상태를 결정 
        } else { 
          setShowModal(false); 
          navigate(`/generated-${nextPage}`);
        }
    }else{
      navigate(`/generated-${nextPage}`);
    }
  };


  // number가 1보다 큰 경우에만 navigate 함수를 호출
  const goToPreviousPage = () => {
    const prePage = (number-1).toString();
    if (number > 1) {
      navigate(`/generated-${prePage}`);
    }
  };

  const previousButtonStyle: React.CSSProperties = {
    position: 'absolute', // 'absolute'는 Position 타입에 포함된 값입니다.
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: number > 1 ? 'pointer' : 'default',
    fontSize: '24px',
    padding: '0 10px',
    opacity: number > 1 ? 1 : 0.5,
    pointerEvents: number > 1 ? 'auto' : 'none',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <div style={{
        height: '100%',
        alignSelf: 'flex-start',
        padding: '10px',
        cursor: 'pointer'
      }}>
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>X</span>
      </div>
      <div style={{
        height: '100%',
        backgroundColor: 'lightgrey',
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        position: 'relative', 
      }}>

        {/* Previous page button */}
        <div style={previousButtonStyle} onClick={number > 1 ? goToPreviousPage : undefined}>
        {'<'}
        </div>

        <div style={{
          width: '50%',
          height: '800px',
          backgroundColor: 'grey'
        }}>
          Image
        </div>
        <div style={{
          width: '50%', 
          height: '800px'

        }}>
          <div style={{
            backgroundColor: 'white',
            width: '100%', 
            height: '100%', 

          }} >
            {currentPageStory}
          </div>
        </div>

        {/* Next page button */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '24px',
          padding: '0 10px',
        }} onClick={goToNextPage}>
          {'>'}
        </div>

      </div>

      {showModal && (
       <OptionModal QnOptions={options} setChoice={setChoice} choice={choice} setShowModal={setShowModal} goToNextPage={goToNextPage}/>
       )}

      <div style={{
        padding: '10px',
        textAlign: 'center',
      }}>
        {number}/{selectedPage}
      </div>
    </div>
  );
};

export default GeneratedPage;

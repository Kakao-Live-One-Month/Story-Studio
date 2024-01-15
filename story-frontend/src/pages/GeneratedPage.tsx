// src/GeneratingPage.tsx
import { useNavigate, Outlet,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { startApiRequest, callNextSession } from '../api/ApiRequest';
import OptionModal from '../components/OptionModal';
import Loading from '../components/Loading';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';

// props의 타입을 정의하는 인터페이스
interface GeneratedPageProps {
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  checkStoryCall: boolean;
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({setStoryArray, storyArray, setCheckStoryCall, checkStoryCall}) => {
  const param = useParams();
  const page_id = Number(param.page_id);

  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  
  const [pastpage, setPastpage] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  
  const firstApiRequest = async () => {
    try {
      setShowLoaging(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      console.log(contentsArray);

      if (!contentsArray)
      {
          contentsArray = [] as string[];
      };

      setStoryArray([...contentsArray]);
      setShowLoaging(false);
      navigate(`/generated/1`);
    } catch (error) {
      console.error('Error StartApiRequest data:', error);
    }
  };

  const callNextSessionFunc = async () => {
    try {
      const nextStorys = await callNextSession(selectedOption, selectedPage, page_id);
      setStoryArray([...storyArray, ...nextStorys]);
      setCheckStoryCall(true);
  
      return nextStorys;
    } catch (error) {
      console.error("callNextSession 에러: ", error);
    }
  };


  // useEffect(() => {
  //   firstApiRequest();
  // }, []);


  // useEffect(() => {
  //   if (!checkStoryCall)
  //   {
  //     callNextSessionFunc();
  //   }

  // }, [selectedOption]);

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
        
        <GoToPreviousPage/>
        
        {showLoading && (
          <Loading/>
        )}
        
        <Outlet />

        <GoToNextPage  setShowModal={setShowModal} showModal={showModal} setPastpage={setPastpage} pastpage={pastpage}/>
      </div>

      {showModal && (
        <OptionModal setShowModal={setShowModal} page_id={page_id} setSelectedOption={setSelectedOption} setCheckStoryCall={setCheckStoryCall} />
      )} 

      <div style={{
        padding: '10px',
        textAlign: 'center',
      }}>
        {page_id}/{selectedPage}
      </div>
    </div>
  );
};

export default GeneratedPage;

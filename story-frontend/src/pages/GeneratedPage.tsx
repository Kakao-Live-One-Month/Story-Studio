// src/GeneratingPage.tsx
import { useNavigate, Outlet,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { startApiRequest, callNextSession, generateOption } from '../api/ApiRequest';
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
  const [showLoading, setShowLoading] = useState(false);
  const [qnOptions, setQnoption] = useState<string[]>([]);
  const [pastpage, setPastpage] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  
  const firstApiRequest = async () => {
    try {
      setShowLoading(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      console.log(contentsArray);

      if (!contentsArray)
      {
          contentsArray = [] as string[];
      };

      setStoryArray([...contentsArray]);
      setShowLoading(false);
      navigate(`/generated/1`);
    } catch (error) {
      console.error('Error StartApiRequest data:', error);
    }
  };

  const callNextSessionFunc = async () => {
    try {
      setShowLoading(true);
      const nextStorys = await callNextSession(selectedOption, selectedPage, page_id);
      setStoryArray([...storyArray, ...nextStorys]);
      setCheckStoryCall(true);
      setShowLoading(false);
      return nextStorys;
    } catch (error) {
      console.error("callNextSession 에러: ", error);
    }
  };


  const callOptions = async () => {
    if(!Number.isNaN(page_id) && page_id !== undefined && page_id !== selectedPage){
    try {
      const optionResponse = await generateOption(); 
      setQnoption(optionResponse); 
      setCheckStoryCall(false);
    } catch (error) {
      console.error('generateOption 호출 중 오류 발생:', error);
    }
  }
};

  useEffect(() => {
    //callOptions();
  }, [storyArray]); 

  useEffect(() => {
    firstApiRequest();
  }, []);

  useEffect(() => {
    if (!checkStoryCall)
    {
      //callNextSessionFunc();
    }

  }, [selectedOption]);

  return (
    <div className='container justify-center mx-auto flex h-[700px] flex-wrap bg-blue-100 px-4 py-4'>
        <div className='relative flex'>
          <div className="absolute left-2 top-2 text-bold text-4xl">x</div>
          <GoToPreviousPage/>
          <Outlet />
          <GoToNextPage  setShowModal={setShowModal} showModal={showModal} setPastpage={setPastpage} pastpage={pastpage}/>
          <div className="absolute bottom-5 right-5 text-2xl">{page_id}/{selectedPage}</div>
        </div>
   
      {showLoading && (
        <Loading/>
      )}
      
      {showModal && (
        <OptionModal setShowModal={setShowModal} page_id={page_id} setSelectedOption={setSelectedOption} setCheckStoryCall={setCheckStoryCall} qnOptions={qnOptions} />
      )}
    </div>
  );
};

export default GeneratedPage;

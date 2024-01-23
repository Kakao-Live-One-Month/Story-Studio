// src/GeneratingPage.tsx
import { Outlet, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe, useLoading } from '../contexts';
import { startApiRequest, callNextSession, generateOption, callStoryTitle } from '../api/ApiRequest';
import { OptionModal, Loading } from '../components';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';
import { ErrorPage } from '../pages';
import { StoryStorage, VisitedPageStorage } from '../storage';

interface GeneratedPageProps {
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  checkStoryCall: boolean;
  isVisitedPage: boolean[];
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  imageUrlArray: string[];
  setCapturedPageImages: React.Dispatch<React.SetStateAction<string[]>>;
  capturedPageImages: string[];
  setMainTitle: React.Dispatch<React.SetStateAction<string>>;
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({
  setStoryArray, 
  storyArray, 
  setCheckStoryCall, 
  checkStoryCall, 
  isVisitedPage, 
  setIsVisitedPage, 
  imageUrlArray, 
  setCapturedPageImages,
  capturedPageImages,
  setMainTitle
}) => {
  const param = useParams();
  const page_id = Number(param.page_id);
  const { isLoading, setLoading } = useLoading();
  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();
  const [showModal, setShowModal] = useState(false);
  const [qnOptions, setQnoption] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);      

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  useEffect(() => {
    if (page_id > storyArray.length) {
     setIsError(true);
    }else{
      setIsError(false);
    }
  }, [page_id, storyArray.length]);


  const firstApiRequest = async () => {
    try {
      setLoading(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      if (!contentsArray){
        contentsArray = [] as string[];
      };
      setStoryArray([...contentsArray]);
      setLoading(false);
      console.log("firstArray", contentsArray);
    } catch (error) {
      console.error('Error StartApiRequest data:', error);
    } finally {
      setCheckStoryCall(true);
      console.log("firstApiRequest");
    }
  };

  //이야기 생성 후 이미지 생성까지의 로딩
  useEffect(() => { 
    if (checkStoryCall && imageUrlArray.length %3 == 0){
      setLoading(true);
    }
    if (imageUrlArray[page_id - 1] !== undefined){
      setLoading(false);
    }
  },[checkStoryCall, storyArray, imageUrlArray]);
 

  const callOptions = async () => {
    if( page_id !== selectedPage ){
      try {
        console.log("callOptions");
        const optionResponse = await generateOption(); 
        setQnoption(optionResponse); 
        await delay(300);
        setCheckStoryCall(false);
      } catch (error) {
        console.error('generateOption 호출 중 오류 발생:', error);
      } 
    }
  };

  useEffect(() => {
    if (checkStoryCall && page_id%3 === 1 &&!isVisitedPage[page_id]){
        callOptions();
    }
  }, [page_id, checkStoryCall]); 

 
  const callNextSessionFunc = async () => {
    try {
      setLoading(true);
      let nextStorys = await callNextSession(selectedOption, selectedPage, page_id);
      if (!nextStorys) {
        nextStorys = [] as string[];
      };
      setStoryArray([...storyArray, ...nextStorys]);
      if (nextStorys.length !== 0) {
        setLoading(false); // 로딩 종료
        setCheckStoryCall(true);
        console.log("callNextSession:", nextStorys);
      }
    } catch (error) {
      console.error("callNextSession 에러: ", error);
    } 
  };

  useEffect(() => {
    if (!isVisitedPage[page_id-1] && page_id !== 1 && storyArray.length == page_id-1){
      callNextSessionFunc();
      console.log(selectedOption);
    }
  }, [selectedOption]);



  const callTitle = async () => {
    try {
      const title = await callStoryTitle(storyArray); 
      console.log("책 제목", title);
      setMainTitle(title);
    } catch (error) {
      console.error('타이틀 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if(page_id == selectedPage && storyArray.length >= selectedPage){
    callTitle();
    }
  }, [page_id, storyArray]);



  return (
    <div 
      className="flex min-h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url('/img/bg-book2.jpg')`,
        backgroundSize: '100% 100%',
      }}
    >
      <div 
        className='justify-center mx-auto flex h-[700px] w-[1440px] flex-wrap bg-green-100 px-4 py-4 font-gaegu cursor-pointer active:cursor-auto'
        style={{
          backgroundImage: `url('/img/book-paper2.png')`,
          backgroundSize: 'cover',
        }}
      >
        <div className='relative flex'>
          <Link to="/" >
            <div className="absolute left-4 top-1 text-bold text-4xl">x</div>
          </Link>
          <GoToPreviousPage/>
          {
            isError ? (
              <ErrorPage/>
            ) : (
              <Outlet />
            )
          }
          <GoToNextPage 
            setShowModal={setShowModal} 
            showModal={showModal} 
            capturedPageImages={capturedPageImages}
            setCapturedPageImages={setCapturedPageImages}
            isVisitedPage={isVisitedPage}
            setCheckStoryCall={setCheckStoryCall}
          />
          <div className="absolute bottom-5 right-5 text-2xl">{page_id}/{selectedPage}</div>
        </div>
    
    
        {isLoading && (
          <Loading/>
        )}

        {showModal && (
          <OptionModal setShowModal={setShowModal} page_id={page_id} setSelectedOption={setSelectedOption} setCheckStoryCall={setCheckStoryCall} qnOptions={qnOptions} />
        )}

        <VisitedPageStorage
          isVisitedPage={isVisitedPage}
          setIsVisitedPage={setIsVisitedPage}
          imageUrlArray={imageUrlArray}
          page_id={page_id}
        />

        <StoryStorage
          setStoryArray={setStoryArray}
          storyArray={storyArray}
          firstApiRequest={firstApiRequest}
        />
      </div>
    </div>
  );
};

export default GeneratedPage;

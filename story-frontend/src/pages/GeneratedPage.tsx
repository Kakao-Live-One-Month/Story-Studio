// src/GeneratingPage.tsx
import { Outlet, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe, useLoading } from '../contexts';
import { startApiRequest, callNextSession, generateOption } from '../api/ApiRequest';
import { OptionModal, Loading } from '../components';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';
import { convertToPDF } from '../utils/jsPDF';
import { StoryStorage, VisitedPageStorage } from '../storage';

interface GeneratedPageProps {
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  checkStoryCall: boolean;
  isVisitedPage: boolean[];
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  imageUrlArray: string[];
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({setStoryArray, storyArray, setCheckStoryCall, checkStoryCall, isVisitedPage, setIsVisitedPage, imageUrlArray}) => {
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
  const [capturedPageImages, setCapturedPageImages] = useState<string[]>([]);

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const firstApiRequest = async () => {
    try {
      setLoading(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      // await delay(3000); 
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
  

  const callOptions = async () => {
    if( page_id !== selectedPage ){
      try {
        console.log("callOptions");
        const optionResponse = await generateOption(); 
        setQnoption(optionResponse); 
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

 
  useEffect(() => {
    if (!isVisitedPage[page_id-1] && page_id !== 1 && storyArray.length == page_id-1){
      callNextSessionFunc();
      console.log(selectedOption);
    }
  }, [selectedOption, page_id]);



  // PDF 변환 테스트 함수입니다. 컴포넌트 옮길 예정 
  const testhandlePDFDownload = () => {
    const pdfBlob = convertToPDF(capturedPageImages);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    link.click();
  };




  return (
    <div className='h-screen w-screen flex justify-center items-center px-4 py-4'
      style={{
        backgroundImage: `url('/img/bg-book2.jpg')`,
        backgroundSize: 'cover',
      }}
    >
      <div 
        className='justify-center mx-auto flex h-[700px] w-[1440px] flex-wrap bg-green-100 px-4 py-4 font-gaegu'
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
          <Outlet />
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
    
        {/* {isLoading && (
          <Loading/>
        )} */}
        
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

        {/* PDF테스트 버튼 */}
        <div className='h-4 absolute'>
          <button onClick={testhandlePDFDownload}>Convert to PDF Test</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPage;

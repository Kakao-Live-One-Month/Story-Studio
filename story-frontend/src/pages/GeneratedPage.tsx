// src/GeneratingPage.tsx
import { useNavigate, Outlet, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe, useLoading } from '../contexts';
import { startApiRequest, callNextSession, generateOption } from '../api/ApiRequest';
import { OptionModal, Loading } from '../components';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';
import { convertToPDF } from '../utils/jsPDF';

interface GeneratedPageProps {
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  checkStoryCall: boolean;
  isVisitedPage: boolean[];
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({setStoryArray, storyArray, setCheckStoryCall, checkStoryCall, isVisitedPage}) => {
  const param = useParams();
  const { isLoading, setLoading } = useLoading();
  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();
  const page_id = Number(param.page_id);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [qnOptions, setQnoption] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [capturedPageImages, setCapturedPageImages] = useState<string[]>([]);

  /////////////////////////////////////////////////////////////////////////////////
  const saveToLocalStorage = (storyArray: string[]): void => {
    localStorage.setItem('storyArray', JSON.stringify(storyArray));
  };

  const loadFromLocalStorage = (): string[] | null => {
    const savedData = localStorage.getItem('storyArray');
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const loadedStoryArray = loadFromLocalStorage();
    console.log("loadedStoryArray", loadedStoryArray)
    if (loadedStoryArray) {
      setStoryArray(loadedStoryArray);
    }else{
      firstApiRequest();
      navigate(`/generated/1`); 
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(storyArray);
  }, [storyArray]);
  
  /////////////////////////////////////////////////////////////////////////////////
  

  const firstApiRequest = async () => {
    try {
      setLoading(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      console.log("firstApiRequest");

      if (!contentsArray){
        contentsArray = [] as string[];
      };

      setStoryArray([...contentsArray]);
      
      setCheckStoryCall(true);
      setLoading(false);

    } catch (error) {
      console.error('Error StartApiRequest data:', error);
    }
  };

 

  const callNextSessionFunc = async () => {
    try {
      setLoading(true); // 로딩 시작
      let nextStorys = await callNextSession(selectedOption, selectedPage, page_id);
      if (!nextStorys) {
        nextStorys = [] as string[];
      };
      setStoryArray([...storyArray, ...nextStorys]);
      if (nextStorys.length !== 0) {
        setCheckStoryCall(true);
      }
    } catch (error) {
      console.error("callNextSession 에러: ", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  

  const callOptions = async () => {
    if( page_id !== selectedPage ){
    try {
      const optionResponse = await generateOption(); 
      setQnoption(optionResponse); 
    } catch (error) {
      console.error('generateOption 호출 중 오류 발생:', error);
    } finally {
      setCheckStoryCall(false);
    }
  }
};

  useEffect(() => {
    if (checkStoryCall && page_id%3 === 1 &&!isVisitedPage[page_id-1]){
    //callOptions();
    }
  }, [page_id]); 

 
  useEffect(() => {
    if (!checkStoryCall && !isVisitedPage[page_id-1]){
      //callNextSessionFunc();
    }
  }, [selectedOption, checkStoryCall]);



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
          />
          <div className="absolute bottom-5 right-5 text-2xl">{page_id}/{selectedPage}</div>
        </div>
    
        {isLoading && (
          <Loading/>
        )}
        
        {showModal && (
          <OptionModal setShowModal={setShowModal} page_id={page_id} setSelectedOption={setSelectedOption} setCheckStoryCall={setCheckStoryCall} qnOptions={qnOptions} />
        )}

        {/* PDF테스트 버튼 */}
        <div className='h-4 absolute'>
          <button onClick={testhandlePDFDownload}>Convert to PDF Test</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPage;

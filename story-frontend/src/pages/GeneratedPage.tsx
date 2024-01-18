// src/GeneratingPage.tsx
import { useNavigate, Outlet, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe, useLoading } from '../contexts';
import { startApiRequest, callNextSession, generateOption } from '../api/ApiRequest';
import{ OptionModal, Loading } from '../components';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';
import { convertToPDF } from '../utils/jsPDF';

// props의 타입을 정의하는 인터페이스
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

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [qnOptions, setQnoption] = useState<string[]>([]);
  const [pastpage, setPastpage] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [capturedPageImages, setCapturedPageImages] = useState<string[]>([]);
  const [page_id, setPageid] = useState<number>(NaN);
  


  // contentsArray를 localStorage에 저장하는 함수
  const saveToLocalStorage = (storyArray: string[]): void => {
    localStorage.setItem('storyArray', JSON.stringify(storyArray));
  };

  // localStorage에서 storyArray를 로드하는 함수
  const loadFromLocalStorage = (): string[] | null => {
    const savedData = localStorage.getItem('storyArray');
    return savedData ? JSON.parse(savedData) : null;
  };

    useEffect(() => {
      // 컴포넌트가 마운트될 때 localStorage에서 데이터 로드
      const loadedStoryArray = loadFromLocalStorage();
      console.log("loadedStoryArray", loadedStoryArray)
      if (loadedStoryArray) {
        setStoryArray(loadedStoryArray);
      }else{
        firstApiRequest();
        setPageid(1);
        navigate(`/generated/1`); 
      }
    }, []);

    // contentsArray가 변경될 때마다 localStorage에 저장
    useEffect(() => {
      saveToLocalStorage(storyArray);
    }, [storyArray]);
  


  const firstApiRequest = async () => {
    try {
      setLoading(true);
      let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
      // console.log(contentsArray);

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
      setLoading(true);
      const nextStorys = await callNextSession(selectedOption, selectedPage, page_id);
      setStoryArray([...storyArray, ...nextStorys]);
      setCheckStoryCall(true);
      setLoading(false);
      return nextStorys;
    } catch (error) {
      console.error("callNextSession 에러: ", error);
    }
  };


  const callOptions = async () => {
    if( page_id !== selectedPage ){
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
  if (param.page_id) {
    // URL의 page_id를 읽어와 상태를 설정
    setPageid(Number(param.page_id));
    console.log("page_id:", page_id);
    // 여기서 필요한 상태 업데이트 로직 추가
  }
}, []); // page_id가 변경될 때마다 실행



  useEffect(() => {
    if (checkStoryCall && page_id%3 === 1){
    // callOptions();
    }
  }, [storyArray]); 

 
  useEffect(() => {
    if (!checkStoryCall && page_id%3 === 1 && !isVisitedPage[page_id]){
      // callNextSessionFunc();
    }
  }, [selectedOption]);


  useEffect(() => {
    // 컴포넌트 마운트 시 localStorage에서 storyArray를 로드합니다.
    const savedStoryArray = localStorage.getItem('storyArray');
    if (savedStoryArray) {
      setStoryArray(JSON.parse(savedStoryArray));
    }
  }, []);
  
  useEffect(() => {
    // storyArray가 변경될 때마다 localStorage에 저장합니다.
    localStorage.setItem('storyArray', JSON.stringify(storyArray));
  }, [storyArray]);
  

  // useEffect(() => {
  //   if (selectedPage == page_id){
  //     callNextSessionFunc();
  //   }
  // }, [selectedOption]);

  /////////////////////////////////////////////////

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
    <div className='h-screen w-screen flex justify-center items-center bg-blue-100 px-4 py-4'
      style={{
        backgroundImage: `url('/img/bg-book.jpg')`,
        backgroundSize: 'cover',
      }}
    >
      <div className='justify-center mx-auto flex h-[700px] w-[1440px] flex-wrap bg-black px-4 py-4 font-gaegu'>
        <div className='relative flex bg-white'
          style={{
            backgroundImage: `url('/img/paper-wall.png')`,
            backgroundSize: 'cover',
          }}
        >
          <Link to="/" >
            <div className="absolute left-2 top-2 text-bold text-4xl bg-purple-300">x</div>
          </Link>
          <GoToPreviousPage/>
          <Outlet />
          <GoToNextPage 
            setShowModal={setShowModal} 
            showModal={showModal} 
            setPastpage={setPastpage} 
            pastpage={pastpage}
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
        <div className='bg-red-300 h-4 absolute'>
          <button onClick={testhandlePDFDownload}>Convert to PDF Test</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPage;

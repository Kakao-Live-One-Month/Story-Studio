import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPage, GeneratingPage, GeneratedPage, EndingPage }from './pages'; 
import { usePage } from './contexts/PageContext';
import { Page } from './components';
import { testFirestoreWriteRead } from './firebase/firebaseTest';

const App = () => {
  useEffect(() => {
    const run = async () => {
      try {
        const result = await testFirestoreWriteRead();
        console.log('firebase db 테스트 결과:', result);
      } catch (error) {
        console.error('firebase db 테스트 실행 중 오류:', error);
      }
    };

    run();
  }, []);
  const { selectedPage } = usePage();
  const [storyArray, setStoryArray] = useState<string[]>([]);
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [isVisitedPage, setIsVisitedPage] = useState<boolean[]>(new Array(selectedPage).fill(false));
  const [checkStoryCall, setCheckStoryCall] = useState<boolean>(false);
  const [capturedPageImages, setCapturedPageImages] = useState<string[]>([]);
  const [mainTitle, setMainTitle] = useState<string>("");
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />}/> 
      <Route path="/generating" element={<GeneratingPage setStoryArray={setStoryArray} setIsVisitedPage={setIsVisitedPage} setImageUrlArray={setImageUrlArray}/>}/>
      <Route 
        path="generated" 
        element={
          <GeneratedPage 
            setStoryArray={setStoryArray} 
            storyArray={storyArray} 
            setCheckStoryCall={setCheckStoryCall} 
            checkStoryCall={checkStoryCall} 
            isVisitedPage={isVisitedPage}
            setIsVisitedPage={setIsVisitedPage}
            imageUrlArray={imageUrlArray}
            setCapturedPageImages={setCapturedPageImages}
            capturedPageImages={capturedPageImages}
            setMainTitle={setMainTitle}
          />
        }
      >
                  
        <Route 
          path=":page_id" 
          element={
            <Page 
              storyArray={storyArray}
              setImageUrlArray={setImageUrlArray} 
              imageUrlArray={imageUrlArray}
              isVisitedPage={isVisitedPage}
              checkStoryCall={checkStoryCall}
              setCheckStoryCall={setCheckStoryCall}
            />
          }
        />
        </Route>
        <Route 
          path="/ending" 
          element={
            <EndingPage 
              capturedPageImages={capturedPageImages}
              mainTitle={mainTitle}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
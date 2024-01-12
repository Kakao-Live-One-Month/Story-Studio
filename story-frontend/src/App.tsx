import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import { MainPage, GeneratingPage, GeneratedPage }from './pages'; 
import { usePage } from './contexts/PageContext';
import { Page } from './components';

const App = () => {
  // 라우트 설정을 배열로 정의
  const [storyArray, setStoryArray] = useState<string[]>([]);
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const param = useParams();
  const page_id = Number(param.page_id);
  console.log(page_id);
  const { selectedPage } = usePage();
  const [isVisitedPage, setIsVisitedPage] = useState<boolean[]>(new Array(selectedPage).fill(false));
  const lastSession = selectedPage%3;
  const [checkStoryCall, setCheckStoryCall] = useState<boolean>(true);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />}/> 
      <Route path="/generating" element={<GeneratingPage />}/>
      <Route path="generated" element={<GeneratedPage setStoryArray={setStoryArray} storyArray={storyArray} setCheckStoryCall={setCheckStoryCall} checkStoryCall={checkStoryCall} />}>
        <Route 
          path=":page_id" 
          element={
            <Page 
              lastSession={lastSession} 
              setStoryArray={setStoryArray} 
              storyArray={storyArray} 
              setImageUrlArray={setImageUrlArray}
              imageUrlArray={imageUrlArray}
              setIsVisitedPage={setIsVisitedPage}
              isVisitedPage={isVisitedPage}
              checkStoryCall={checkStoryCall}
            />
          }
        />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
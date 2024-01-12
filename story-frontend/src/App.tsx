import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import { MainPage, GeneratingPage, GeneratedPage }from './pages'; 
import { usePage } from './contexts/PageContext';
import { Page } from './components';

const App = () => {
  // 라우트 설정을 배열로 정의
  const [storyArray, setStoryArray] = useState<string[]>([]);
  const param = useParams();
  const page_id = Number(param.page_id);
  console.log(page_id);
  const [choice, setChoice] = useState<number | null>(null);
  const { selectedPage } = usePage();
  const lastSession = selectedPage%3;

  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />}/> 
      <Route path="/generating" element={<GeneratingPage />}/>
      <Route path="generated" element={<GeneratedPage setStoryArray={setStoryArray} storyArray={storyArray}/>}>
        <Route path=":page_id" element={<Page lastSession={lastSession} setStoryArray={setStoryArray} storyArray={storyArray}/>}/>
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
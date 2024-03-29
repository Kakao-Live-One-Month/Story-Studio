import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPage, GeneratingPage, GeneratedPage, EndingPage }from './pages'; 
import { usePage } from './contexts/PageContext';
import { Page } from './components';

const App = () => {

  const { selectedPage } = usePage();
  const [storyArray, setStoryArray] = useState<string[]>([]);
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [isVisitedPage, setIsVisitedPage] = useState<boolean[]>(new Array(selectedPage).fill(false));
  const [checkStoryCall, setCheckStoryCall] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />}/> 
      <Route path="/generating" element={<GeneratingPage setStoryArray={setStoryArray} setIsVisitedPage={setIsVisitedPage} setImageUrlArray={setImageUrlArray}/>}/>
      <Route path="generated" 
             element={
               <GeneratedPage 
                  setStoryArray={setStoryArray} 
                  storyArray={storyArray} 
                  setCheckStoryCall={setCheckStoryCall} 
                  checkStoryCall={checkStoryCall} 
                  isVisitedPage={isVisitedPage}
                  setIsVisitedPage={setIsVisitedPage}
                  imageUrlArray={imageUrlArray}
                />}>
                  
        <Route 
          path=":page_id" 
          element={
            <Page 
              storyArray={storyArray}
              setImageUrlArray={setImageUrlArray} 
              imageUrlArray={imageUrlArray}
              isVisitedPage={isVisitedPage}
              checkStoryCall={checkStoryCall}
            />
          }
        />
        </Route>
        <Route path="/ending" element={<EndingPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
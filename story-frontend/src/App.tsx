import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPage, GeneratingPage, GeneratedPage }from './pages'; 
import { usePage } from './contexts/PageContext';

const App = () => {
  // 라우트 설정을 배열로 정의
  const { selectedPage } = usePage();
  const lastSession = selectedPage%3;
  const routes = [
    { path: "/", element: <MainPage /> },
    { path: "/generating", element: <GeneratingPage /> },
    // 동화 생성 1페이지 ~ selectedPage
    ...Array.from({ length: selectedPage  }, (_, i) => ({
      path: `/generated-${i + 1}`,
      element: <GeneratedPage number={i + 1} lastSession={lastSession}/>, 
    })),
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
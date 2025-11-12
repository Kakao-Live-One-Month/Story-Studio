import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div 
      className="flex min-h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url('/img/bg-book2.jpg')`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className="flex w-full justify-center p-10 font-gowun-batang lg:max-w-full">
        <div className="flex-1">
          <div className="flex h-full w-full flex-col items-center justify-center space-y-6 p-10">
            <div className="space-y-10 p-4 mb-8 text-start lg:mb-12">
              <p className="text-5xl font-extrabold lg:text-6xl lg:leading-tight">상상에서 피어나는 <br />큰 꿈의 이야기.</p>
              <p className="text-2xl lg:text-4xl lg:leading-tight">
                AI와 창작의 문을 열고<br />
                새로운 이야기를 만들어 보세요.
              </p>
            </div>
            <Link to="/login">
              <button className="text-3xl font-semibold text-white animate-bounce h-16 w-96 rounded-full bg-[#E5A500] shadow-lg-dark hover:shadow-inner-dark lg:text-5xl lg:w-[500px] lg:h-24 cursor-pointer active:cursor-auto">  
                동화 만들기
              </button>
            </Link>
          </div>
        </div>

        <div className="text-sm bg-amber-900 text-amber-900">.</div>

        <div className="flex flex-1 items-center justify-center">
          <div className="p-10">
            <p className="text-9xl font-bold leading-tight lg:text-[180px]">
              이야기 <br />
              작업실
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-20 absolute font-bold text-xl lg:text-3xl">
        Story Workshop.
      </div>
    </div>
  );
};

export default MainPage;
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { GenreProvider } from '../contexts/GenreContext';

const MainPage: React.FC = () => {
  return (
    
    <div className="bg-transparent flex flex-col justify-center items-stretch">
      {/* 상단 경계선 및 배경 설정 */}
      
      <div className="border flex items-stretch border-black border-solid max-md:max-w-full max-md:flex-wrap">
      
        <div className="font-sans ">
          <GenreProvider>
            <header className=" pt-32 pb-16 text-black text-center relative h-2/4 flex flex-col justify-center items-center">
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: 'url("../../img/headerbg.png")', zIndex: -1}}
            />
              <h1 className=" text-8xl font-bold">이야기 작업실</h1>
              <p className="text-2xl text-gray-700 my-8">
                작은 작업실에서 펼쳐내는 큰 꿈의 이야기
                <br />
                AI와 창작의 문을 열고 새로운 이야기를 만나보세요.
              </p>
              <Link to="/generating">
                <button className="block mx-auto mt-10 px-20 py-10 bg-black rounded-full text-white text-4xl cursor-pointer">
                  바로가기
                </button>
              </Link>
            </header>

            <section className="flex justify-around">
              <div className="flex w-3/5 mx-8 my-16 px-11 py-20 bg-gray-200 rounded-[30px]">
                <div>
                  <h2 className="text-3xl font-bold pb-2">AI를 활용한 맞춤형 이야기</h2>
                  <p className="text-2xl">
                  AI가 사용자의 입력에 따른 맞춤형 이야기를 생성합니다. 주제와 컨셉을 입력하여 인공지능과 함께 스토리를 만들어 나갑니다.
                  </p>
                </div>
                <img src="../../img/2.png" alt="Image" className="max-w-full h-auto" />
              </div>
            

              <div className="flex w-3/5 mx-8 my-16 px-11 py-20 bg-gray-200 rounded-[30px]">
                
              <img src="../../img/1.png" alt="Image" className="max-w-full h-auto" />
                <div>
                  <h2 className="text-3xl font-bold pb-2">챗봇 상호작용하기</h2>
                  <p className="text-2xl">
                  사용자는 이야기의 전개에 직접 개입하여 새로운 흐름을 만듭니다. 이야기 속의 다양한 선택지를 골라 자신만의 동화 세계를 만들어 보세요.
                  </p>
                </div>
              </div>
            </section>
            {/* 기타 섹션/컴포넌트는 여기에 추가합니다. */}
          </GenreProvider>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

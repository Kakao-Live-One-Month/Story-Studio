import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { GenreProvider } from '../contexts/GenreContext';

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-stretch">
      {/* 상단 경계선 및 배경 설정 */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
        /* style={{ backgroundImage: 'url("../../img/bg.png")'}} */
      />
      <div className="flex items-stretch max-md:max-w-full max-md:flex-wrap">
        <div className="font-sans relative w-full">
          <GenreProvider>
            <header className="pt-16 pb-8 text-black text-center relative h-[80vh] flex flex-col justify-center items-center">
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
              style={{
                backgroundImage: 'url("../../img/headerbg.png")',
              }}
            />
            <Link to="/" className="absolute top-0 left-0 p-5">
                <img src="../../img/logo.png" alt="Image" className="cursor-pointer w-20"/>
              </Link>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-gowun-batang">이야기 작업실</h1>
              <p className="text-xl text-gray-700 my-4 lg:my-8 lg:text-2xl font-gowun-batang">
                작은 작업실에서 펼쳐내는 큰 꿈의 이야기
                <br />
                AI와 창작의 문을 열고 새로운 이야기를 만나보세요.
              </p>
              <Link to="/generating">
                
              <button className="block mx-auto mt-10 px-14 py-7 lg:px-20 lg:py-10 bg-black rounded-full text-white text-2xl lg:text-4xl cursor-pointer font-gowun-batang">  
                바로가기
              </button>
              </Link>
            </header>

            <section className="flex flex-col lg:flex-row flexbox justify-around ">
              <div className="flex flex-col md:flex-row lg:flex-row mx-8 my-16 px-11 py-20 rounded-[30px] min-w-[300px]" style={{ backgroundColor: '#DCDBEB'}} >
                <div className="flex justify-center flex-col pr-8">
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold pb-2 font-gowun-batang">AI를 활용한 맞춤형 이야기</h2>
                  <p className="text-1xl md:text-2xl lg:text-2xl font-gowun-batang">
                    AI가 사용자의 입력에 따른 맞춤형 이야기를 생성합니다. 주제와 컨셉을 입력하여 인공지능과 함께 스토리를 만들어 나갑니다.
                  </p>
                </div>
                <img src="../../img/2.png" alt="Image" className="flex justify-center mx-auto w-[230px] h-[220px] mt-10 md:mt-0" />
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row mx-8 my-16 px-11 py-20 rounded-[30px] min-w-[300px]" style={{ backgroundColor: '#F8EEEE' }}>
              <img src="../../img/1.png" alt="Image" className="flex justify-center mx-auto w-[230px] h-[220px] mb-10 md:mb-0" />
                <div className="flex justify-center flex-col">
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold pb-2 pl-0 md:pl-8 font-gowun-batang">책과 상호작용하기</h2>
                  <p className="text-1xl md:text-2xl lg:text-2xl pl-0 md:pl-8 font-gowun-batang">
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

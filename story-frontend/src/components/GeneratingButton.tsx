import React, { useState, useEffect } from 'react';
import '../styles/GenreSelect.css'; // GenreSelect 스타일시트 경로
import ApiRequest from '../api/ApiRequest';



const GeneratingButton = () => {


  return (
    <div>
      <button className='p-3 text-[25px] rounded-full w-52 font-serif text-black bg-indigo-300 hover:bg-indigo-400'>
        만들기
      </button>
      <ApiRequest/>
    </div>
  );
};

export default GeneratingButton;

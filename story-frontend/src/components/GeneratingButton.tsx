import React, { useState, useEffect } from 'react';
import '../styles/GenreSelect.css'; // GenreSelect 스타일시트 경로
import ApiRequest from '../api/ApiRequest';



const GeneratingButton = () => {


  return (
    <div>
      <button>만들기</button>
      <ApiRequest/>
    </div>
  );
};

export default GeneratingButton;

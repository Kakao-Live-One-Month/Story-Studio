import React, { useState, useEffect } from 'react';
import { StartApiRequest } from '../api/ApiRequest';



const GeneratingButton = () => {


  return (
    <div>
      <button className='p-3 text-[25px] rounded-full w-52 font-serif text-black bg-indigo-300 hover:bg-indigo-400'>
        만들기
      </button>
      <StartApiRequest/>
    </div>
  );
};

export default GeneratingButton;

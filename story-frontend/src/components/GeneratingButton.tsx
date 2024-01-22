import React, { useState, useEffect } from 'react';



const GeneratingButton = () => {


  return (
    <div className="flex">
      <button className="mx-auto h-12 w-40 text-white text-2xl bg-[#E5A500] rounded-full shadow-lg-dark hover:shadow-inner-dark font-gowun-batang lg:text-3xl lg:w-52 lg:h-16 cursor-pointer active:cursor-auto">
        만들기
      </button>
    </div>
  );
};

export default GeneratingButton;

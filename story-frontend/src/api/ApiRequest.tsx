// src/components/SomeOtherComponent.tsx
import React, { useState } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { OpenAI } from './OpenAI';

export type StoryPageType = {
  page_id: number
  content: string
  summery: string
};

export type StoryType = {
  pages: StoryPageType[];
}

// export type ApiRequestProps = {
//   onHandleReceivedData: (jsonData: StoryType) => void;
// };

export const StartApiRequest = () => {
  const { selectedGenre } = useGenre();
  const { selectedPage } = usePage();
  const { theme } = useTheme();
  const { describe } = useDescribe();

  const inputPrompt: string = `주제는 ${theme}, 장르는 ${selectedGenre}, 페이지 수는 ${selectedPage}, ${describe}`;
  const totalPrompt: string = `${inputPrompt}인 동화책 내용을 완벽한 JSON 형식으로 {pages: [{page_id: , content: , summery: }, ]}으로 작성해주세요. `
                            + `page_id의 값은 페이지의 번호입니다. `
                            + `content의 값은 해당 페이지의 내용으로 2문장의 문단으로 만들어주세요. `
                            + `summery의 값은 해당 페이지의 간단한 장면 요약을 넣어주세요. `
                            + `모든 값은 반드시 있어야 합니다. ` 
                            + `JSON 외의 설명을 쓰지 마세요.`;

  const [receivedData, setReceivedData] = useState<StoryType | null>(null);

  
  const handleButtonClick = async () => {
    console.log(totalPrompt);
    const apiResponse = await OpenAI(totalPrompt);
    console.log(apiResponse);
    handleOpenAIResult(apiResponse);
  };
  
  const handleOpenAIResult = (apiResponse: string) => {
    // API 결과를 문자열로 받아 처리
    const splitResponse: string = apiResponse.split('\n').join('');
    console.log(splitResponse);

    const test = '{ "pages": [ { "page_id": 1, "content": "한때 우주에서 소문났던 토끼는 어느 날 혜성을 발견했습니다. 그리고 그 혜성은 빛나는 꼬리를 가지고 있었습니다.", "summery": "우주에서 토끼가 혜성을 발견한다." }, { "page_id": 2, "content": "토끼는 혜성을 따라가기로 결심했습니다. 그리고 토끼는 혜성이 무엇인지 알아보기 위해 다양한 책과 인터넷 검색을 시작했습니다.", "summery": "토끼가 혜성에 대해 알아보려고 한다." }, { "page_id": 3, "content": "토끼는 혜성이 우주에서 오는 작은 별들이라는 것을 알게 되었습니다. 그리고 별들이 지나갈 때마다 아름다운 불꽃을 내며 흔적을 남긴다는 사실도 알게 되었습니다.", "summery": "토끼가 별들이 혜성의 일부라는 것을 안다." }, { "page_id": 4, "content": "\"혜성은 참 신기한 것이야!\" 토끼는 혜성을 계속해서 따라가기로 마음먹었습니다. 그리고 토끼는 우주선을 준비하고 떠나기로 결심했습니다.", "summery": "토끼가 혜성을 계속해서 따라가기로 한다." }, { "page_id": 5, "content": "우주선에 탑승한 토끼는 혜성을 향해 가속합니다. 그리고 많은 별들과 은하수를 지나며 멋진 경치를 즐깁니다.", "summery": "토끼가 우주선으로 여행을 시작한다." }, { "page_id": 6, "content": "\"여기서 혜성이 보일 것 같아!\" 토끼는 설레는 마음으로 창문 밖을 내다보았습니다. 그리고 정말로 아름다운 혜성을 발견하게 되었습니다.", "summery": "토끼가 아름다운 혜성을 발견한다." }, { "page_id": 7, "content": "\"와, 정말 아름다워!\" 토끼는 감탄사를 내지 않을 수 없었습니다. 그리고 혜성이 어디론가 사라져갈 때까지 오랫동안 그 모습을 바라보았습니다.", "summery": "토끼가 혜성의 아름다움에 감탄한다." }, { "page_id": 8, "content": "마침내 혜성은 사라졌지만, 토끼는 그 경험이 평생의 추억으로 남을 것이라고 생각했습니다. 그래서 토끼는 다시 우주선에 올라타고 새로운 모험을 찾아 떠나기로 결심했습니다.", "summery": "혜성은 사라지지만 토끼는 새로운 모험을 시작한다." } ]}';
    // JSON 데이터 파싱
    console.log(test);
    const test2 = '{ "pages": [{ "page_id": 1, "content": "컨텐트1", "summery": "서머리1" }, { "page_id": 2, "content": "컨텐트2", "summery": "서머리2" }, { "page_id": 3, "content": "컨텐트3", "summery": "서머리3" } ]}';
    try {
      const parsedData: StoryType = JSON.parse(test2);
      console.log(parsedData);
      setReceivedData(parsedData);
    } catch (error) {
      console.error('JSON 파싱 에러:', error);
    }
  };

  return (
    <div>
      <button className='p-3 text-[25px] rounded-full w-52 font-serif text-black bg-indigo-300 hover:bg-indigo-400' onClick={handleButtonClick}>만들기</button>
    </div>
  );
};

export const MiddleApiRequest = () => {
  
};

export const OptionsApiRequest = () => {

};

// export default { StartApiRequest, MiddleApiRequest, OptionsApiRequest };
// src/components/SomeOtherComponent.tsx
import { OpenAI } from './OpenAI';

let prevStory: string = "";

interface StoryPageType {
  page_id: number
  content: string
  summery: string
};

interface StoryType {
  pages: StoryPageType[]
};


// export type ApiRequestProps = {
  //   onHandleReceivedData: (jsonData: StoryType) => void;
  // };
  
export const StartApiRequest = async (theme: string, selectedGenre: string, selectedPage: number,describe: string) => {
  try {
  const inputPrompt: string = `[주제: ${theme}, 장르: ${selectedGenre}, 페이지 수: ${selectedPage}, 간단설명: ${describe}]`;
  const totalPrompt: string = `${inputPrompt}을 기반으로 한 동화책 내용을 완벽한 JSON 형식으로 {pages: [{page_id: , content: , summery: }, ]}으로 작성해주세요. `
                            + `page_id의 값은 페이지의 번호입니다. `
                            + `content의 값은 해당 페이지의 내용으로 3문장의 문단으로 만들어주세요. `
                            + `summery의 값은 해당 페이지의 간단한 장면 요약을 넣어주세요. `
                            + `모든 값은 반드시 있어야 합니다. ` 
                            + `모든 아이템과 값은 쌍따옴표로 감싸주세요. `
                            + `JSON 외의 설명을 쓰지 마세요.`;
                            
  const apiResponse: string = await OpenAI(totalPrompt);
  const splitResponse: string = apiResponse.split("\n").join('');
  const splitResponse2: string = splitResponse.split("\"").join('');

  const test2 = '{ "pages": [{ "page_id": 1, "content": "컨텐트1", "summery": "서머리1" }, { "page_id": 2, "content": "컨텐트2", "summery": "서머리2" }, { "page_id": 3, "content": "컨텐트3", "summery": "서머리3" }, { "page_id": 4, "content": "컨텐트4", "summery": "서머리4" } ]}';

    const parsedData: StoryType = JSON.parse(test2);
    const contentsArray: string[] = [];
    for (let i = 0; i < 3; i++)
    {
      if (parsedData.pages[i])
      {
        contentsArray.push(parsedData.pages[i].content);
        prevStory = prevStory + " " + parsedData.pages[i].content;
      }
    }

    return contentsArray;
  } catch (error) {
    console.error('API 호출 또는 JSON 파싱 에러: ', error);
    return undefined;
  };
};




export const MiddleApiRequest = () => {

};

export const OptionsApiRequest = () => {

};
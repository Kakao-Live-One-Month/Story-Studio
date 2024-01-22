// src/components/SomeOtherComponent.tsx
import { OpenAI } from './OpenAI';
import { ImageAI } from './ImageAI';

interface StoryPageType {
  page_id: number;
  content: string;
  summery: string;
};

interface StoryType {
  pages: StoryPageType[];
};

interface optionType {
  option_id: number;
  option: string;
};

interface selectionType {
  question: string;
  options: optionType[];
};

interface selectionData {
  selection: selectionType;
};

const jsonPrompt: string =  `완벽한 JSON 형식으로 {"pages": [{"page_id": , "content": , "summery": }, ]}으로 작성해주세요. `
                          + `page_id의 값은 페이지의 번호입니다. `
                          + `content의 값은 해당 페이지의 내용으로 3문장의 문단으로 만들어주세요. `
                          + `summery의 값은 해당 페이지의 간단한 장면 요약을 넣어주세요. `
                          + `모든 값은 반드시 있어야 합니다. `
                          + `모든 아이템과 값은 쌍따옴표로 감싸주세요. `
                          + `JSON 외의 설명을 쓰지 마세요.`;

let prevStory: string = "";

const imagePromptArray: string[] = [];

const callOpenAIAndTransformApiResponse = async (prompt: string) => {
  const apiResponse: string = await OpenAI(prompt);
  const splitResponse: string = apiResponse.split("\n").join('');

  return splitResponse;
}

export const startApiRequest = async (theme: string, selectedGenre: string, selectedPage: number, describe: string) => {
  try {
  const inputPrompt: string = `[주제: ${theme}, 장르: ${selectedGenre}, 페이지 수: ${selectedPage}, 간단설명: ${describe}]`;
  const totalPrompt: string = `${inputPrompt}을 기반으로 한 동화책 내용을 ` + jsonPrompt;

  console.log(totalPrompt);
  // const transformedResponse: string = await callOpenAIAndTransformApiResponse(totalPrompt);
  
  const test = '{ "pages": [ { "page_id": 1, "content": "한때 우주에서 소문났던 토끼는 어느 날 혜성을 발견했습니다. 그리고 그 혜성은 빛나는 꼬리를 가지고 있었습니다.", "summery": "우주에서 토끼가 혜성을 발견한다." }, { "page_id": 2, "content": "토끼는 혜성을 따라가기로 결심했습니다. 그리고 토끼는 혜성이 무엇인지 알아보기 위해 다양한 책과 인터넷 검색을 시작했습니다.", "summery": "토끼가 혜성에 대해 알아보려고 한다." }, { "page_id": 3, "content": "토끼는 혜성이 우주에서 오는 작은 별들이라는 것을 알게 되었습니다. 그리고 별들이 지나갈 때마다 아름다운 불꽃을 내며 흔적을 남긴다는 사실도 알게 되었습니다.", "summery": "토끼가 별들이 혜성의 일부라는 것을 안다." }, { "page_id": 4, "content": "혜성은 참 신기한 것이야! 토끼는 혜성을 계속해서 따라가기로 마음먹었습니다. 그리고 토끼는 우주선을 준비하고 떠나기로 결심했습니다.", "summery": "토끼가 혜성을 계속해서 따라가기로 한다." }, { "page_id": 5, "content": "우주선에 탑승한 토끼는 혜성을 향해 가속합니다. 그리고 많은 별들과 은하수를 지나며 멋진 경치를 즐깁니다.", "summery": "토끼가 우주선으로 여행을 시작한다." }, { "page_id": 6, "content": "여기서 혜성이 보일 것 같아! 토끼는 설레는 마음으로 창문 밖을 내다보았습니다. 그리고 정말로 아름다운 혜성을 발견하게 되었습니다.", "summery": "토끼가 아름다운 혜성을 발견한다." }, { "page_id": 7, "content": "와, 정말 아름다워! 토끼는 감탄사를 내지 않을 수 없었습니다. 그리고 혜성이 어디론가 사라져갈 때까지 오랫동안 그 모습을 바라보았습니다.", "summery": "토끼가 혜성의 아름다움에 감탄한다." }, { "page_id": 8, "content": "마침내 혜성은 사라졌지만, 토끼는 그 경험이 평생의 추억으로 남을 것이라고 생각했습니다. 그래서 토끼는 다시 우주선에 올라타고 새로운 모험을 찾아 떠나기로 결심했습니다.", "summery": "혜성은 사라지지만 토끼는 새로운 모험을 시작한다." } ]}';
  const test2 = '{ "pages": [{ "page_id": 1, "content": "컨텐트1", "summery": "서머리1" }, { "page_id": 2, "content": "컨텐트2", "summery": "서머리2" }, { "page_id": 3, "content": "컨텐트3", "summery": "서머리3" }, { "page_id": 4, "content": "컨텐트4", "summery": "서머리4" } ]}';

  // console.log("첫 번쨰 이야기 요청 값: ", test);

  const parsedData: StoryType = JSON.parse(test);
  const contentsArray: string[] = [];
  for (let i = 0; i < 3; i++)
  {
    if (parsedData.pages[i])
    {
      contentsArray.push(parsedData.pages[i].content);
      prevStory = prevStory + " " + parsedData.pages[i].content;
      imagePromptArray.push(parsedData.pages[i].summery);
    }
  }

    return contentsArray;
  } catch (error) {
    console.error('API 호출 또는 JSON 파싱 에러: ', error);
    return [];
  };
};

export const generateOption = async () => {
  try {
    const optionApiRequestPrompt = `[${prevStory}], 이 다음 동화의 전개를 선택하게 하는 qeustion을 만들어주고  맥락에 맞는 option 3개를 JSON 형식 `
                                  + `{"selection" :{"question": "", "options": [{ "option_id": ,"option": }, ]}}으로 작성해주세요. `
                                  + `question 값은 string, option_id 값은 number, option 값은 string 입니다. `
                                  + `option의 값은 3단어 이하로 작성해 주세요. `
                                  + `모든 값은 반드시 있어야 합니다. ` 
                                  + `JSON 외의 설명을 쓰지 마세요.`;
    console.log("옵션 요청: ", optionApiRequestPrompt);
    const test = '{"selection" : {"question": "질문지 내용", "options": [{ "option_id": 1, "option": "선택지 1" }, { "option_id": 2, "option": "선택지 2" }, { "option_id": 3, "option": "선택지 3" }]}}'
    // const transformedResponse: string = await callOpenAIAndTransformApiResponse(optionApiRequestPrompt);
    console.log("옵션 반환 값: ", test);

    const parsedData: selectionData = JSON.parse(test);
    
    const question: string = parsedData.selection.question;
    const options: optionType[] = parsedData.selection.options;
    
    const questionAndOptionsArray: string[] = [];
    questionAndOptionsArray.push(question);
    
    options.forEach((option) => {
      questionAndOptionsArray.push(option.option);
    });

    return questionAndOptionsArray;
  } catch (error) {
    console.error("API 요청 또는 파싱 에러: ", error);
    return [];
  }
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export const callNextSession = async (selectedOption : string, selectedPage: number, currentPage: number) => {
  try {
    const optionPrompt: string = `[${prevStory}]에 [${selectedOption}]을 반영해서 다음 이어질 이야기를 만들어 주세요. `
                                + `page_id = ${currentPage + 1} 부터 page_id = ${selectedPage}까지 작성해야 하고 page_id = ${selectedPage}에서 이야기의 결말이 나와야 합니다. `
    const totalPrompt: string = optionPrompt + jsonPrompt;

    // const transformedResponse: string = await callOpenAIAndTransformApiResponse(totalPrompt);
    // console.log("중간 페이지 반환 값: ", transformedResponse);
    await delay(6000);
    const test = '{ "pages": [ { "page_id": 1, "content": "한때 우주에서 소문났던 토끼는 어느 날 혜성을 발견했습니다. 그리고 그 혜성은 빛나는 꼬리를 가지고 있었습니다.", "summery": "우주에서 토끼가 혜성을 발견한다." }, { "page_id": 2, "content": "토끼는 혜성을 따라가기로 결심했습니다. 그리고 토끼는 혜성이 무엇인지 알아보기 위해 다양한 책과 인터넷 검색을 시작했습니다.", "summery": "토끼가 혜성에 대해 알아보려고 한다." }, { "page_id": 3, "content": "토끼는 혜성이 우주에서 오는 작은 별들이라는 것을 알게 되었습니다. 그리고 별들이 지나갈 때마다 아름다운 불꽃을 내며 흔적을 남긴다는 사실도 알게 되었습니다.", "summery": "토끼가 별들이 혜성의 일부라는 것을 안다." }, { "page_id": 4, "content": "혜성은 참 신기한 것이야! 토끼는 혜성을 계속해서 따라가기로 마음먹었습니다. 그리고 토끼는 우주선을 준비하고 떠나기로 결심했습니다.", "summery": "토끼가 혜성을 계속해서 따라가기로 한다." }, { "page_id": 5, "content": "우주선에 탑승한 토끼는 혜성을 향해 가속합니다. 그리고 많은 별들과 은하수를 지나며 멋진 경치를 즐깁니다.", "summery": "토끼가 우주선으로 여행을 시작한다." }, { "page_id": 6, "content": "여기서 혜성이 보일 것 같아! 토끼는 설레는 마음으로 창문 밖을 내다보았습니다. 그리고 정말로 아름다운 혜성을 발견하게 되었습니다.", "summery": "토끼가 아름다운 혜성을 발견한다." }, { "page_id": 7, "content": "와, 정말 아름다워! 토끼는 감탄사를 내지 않을 수 없었습니다. 그리고 혜성이 어디론가 사라져갈 때까지 오랫동안 그 모습을 바라보았습니다.", "summery": "토끼가 혜성의 아름다움에 감탄한다." }, { "page_id": 8, "content": "마침내 혜성은 사라졌지만, 토끼는 그 경험이 평생의 추억으로 남을 것이라고 생각했습니다. 그래서 토끼는 다시 우주선에 올라타고 새로운 모험을 찾아 떠나기로 결심했습니다.", "summery": "혜성은 사라지지만 토끼는 새로운 모험을 시작한다." } ]}';
    const parsedData: StoryType = JSON.parse(test);
    const contentsArray: string[] = [];

    let count: number = 0;
    parsedData.pages.forEach((element) => {
      if (element && count < 3)
      {
        contentsArray.push(element.content);
        prevStory = prevStory + " " + element.content;
        imagePromptArray.push(element.summery);

        count++;
      }
    });

    return contentsArray;
  } catch (error) {
    console.error("Api 요청 또는 파싱 에러: ", error);
    return [];
  }
};

export const imageCreateApiRequest = async (currentPage: number) => {
  try {
    const imageSummery: string = imagePromptArray[currentPage - 1];
    const imagePrompt: string = `${imageSummery} (동화적인 이미지)`;

    const imageUrlApiResponse: string = await ImageAI(imagePrompt);

    return imageUrlApiResponse;
  } catch (error) {
    console.log("이미지 요청 실패", error);
    return "";
  }
};
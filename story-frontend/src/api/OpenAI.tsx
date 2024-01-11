import secretJsonData from './application-secret.json';
import axios from 'axios';

export const OpenAI = async (prompt: string): Promise<string> => {
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(
      apiEndpoint, 
      {
        model: `${secretJsonData.GPT_VERSION}`,
        messages: [
            {
                role: "user",
                content: prompt
            }, 
        ],
        temperature: 0.6,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stop: ["Human"],
      }, 
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretJsonData.OPENAI_API_KEY}`
        }
      }
    );

    const data = response.data;

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      throw new Error('올바른 형식의 API 응답이 아닙니다.');
    }

    const apiResponse: string = data.choices[0].message.content;

    return apiResponse;
  } catch (error) {
      console.error('OpenAI API 호출 중 오류 발생:', error);
      return 'OpenAI API 호출 중 오류 발생';
  }
};

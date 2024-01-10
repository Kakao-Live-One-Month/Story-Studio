import secretJsonData from './application-secret.json';

export const OpenAI = async (prompt: string): Promise<string> => {
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretJsonData.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
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
    }),
  };

  try {
    const response = await fetch(apiEndpoint, requestOptions);

    if (!response.ok) {
        throw new Error(`OpenAI API 호출이 실패했습니다. 응답 코드: ${response.status}`);
    }

    const data = await response.json();

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
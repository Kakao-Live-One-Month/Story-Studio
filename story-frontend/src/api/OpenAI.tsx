import { getOpenAIKey, getOpenAIModel } from '../utils/env';
import axios, { AxiosError } from 'axios';

// API 응답 타입 정의
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// 커스텀 에러 클래스
export class OpenAIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export const OpenAI = async (prompt: string): Promise<string> => {
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const openAIKey = getOpenAIKey();
  const openAIModel = getOpenAIModel();

  // 환경변수 검증
  if (!openAIKey) {
    throw new OpenAIError('OpenAI API 키가 설정되지 않았습니다.');
  }
  if (!openAIModel) {
    throw new OpenAIError('OpenAI 모델이 설정되지 않았습니다.');
  }

  try {
    const response = await axios.post<OpenAIResponse>(
      apiEndpoint,
      {
        model: openAIModel, // 템플릿 리터럴 제거
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
          'Authorization': `Bearer ${openAIKey}`
        }
      }
    );

    const data = response.data;

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      throw new OpenAIError('올바른 형식의 API 응답이 아닙니다.');
    }

    return data.choices[0].message.content;
  } catch (error) {
    // axios 에러 처리
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: { message?: string } }>;
      const statusCode = axiosError.response?.status;
      const errorMessage = axiosError.response?.data?.error?.message 
        || axiosError.message 
        || 'OpenAI API 호출 중 오류가 발생했습니다.';
      
      throw new OpenAIError(errorMessage, statusCode);
    }

    // 기타 에러 처리
    if (error instanceof OpenAIError) {
      throw error;
    }

    throw new OpenAIError(
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    );
  }
};
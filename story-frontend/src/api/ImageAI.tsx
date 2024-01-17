import secretJsonData from './application-secret.json';
import axios from 'axios';


export const ImageAI = async (prompt: string): Promise<string> => {
  const apiEndpoint = 'https://api.openai.com/v1/images/generations'

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        prompt: prompt,
        model: "dall-e-3",
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          Authorization: `Bearer ${secretJsonData.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl: string = response.data.data[0].url;
    console.log(imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Image API Request Error:', error);
    throw new Error('이미지 생성 실패');
  }
};

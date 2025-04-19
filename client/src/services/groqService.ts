// src/services/groqService.ts
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const explainCode = async (code: string): Promise<{ result: string, error?: string }> => {
  if (!code.trim()) {
    return { result: '', error: 'Please enter some code to explain' };
  }

  if (!API_KEY) {
    const errorMsg = 'GROQ API key is missing - check .env file';
    console.error(errorMsg);
    return { result: '', error: errorMsg };
  }

  console.debug('Using GROQ API endpoint:', 'https://api.groq.com/v1/chat/completions');

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions', 
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a code explainer. Explain the given code clearly and concisely.',
          },
          {
            role: 'user',
            content: code,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
    

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Unexpected API response:', response.data);
      return { result: '', error: 'Received unexpected response format from API' };
    }

    return { result: response.data.choices[0].message.content };
  } catch (err: unknown) {
    console.error('API Error:', err);

    let errorMsg = 'API Error: ';

    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMsg += `${err.response.status} - `;
        if (err.response.data?.error?.message) {
          errorMsg += err.response.data.error.message;
        } else {
          errorMsg += err.response.statusText || 'Unknown error';
        }
      } else if (err.request) {
        errorMsg += 'No response from server - check network';
      } else {
        errorMsg += err.message || 'Failed to process request';
      }
    } else if (err instanceof Error) {
      errorMsg += err.message || 'Unknown error occurred';
    } else {
      errorMsg += 'Unknown error occurred';
    }

    return { result: '', error: errorMsg };
  }
};


export const fixCode = async (code: string): Promise<{ result: string, error?: string }> => {
  if (!code.trim()) return { result: '', error: 'Code is empty!' };
  if (!API_KEY) return { result: '', error: 'Missing GROQ API key' };

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a coding assistant. Find and fix any errors in the following code. Return the fixed code and a short explanation of the fix.',
          },
          {
            role: 'user',
            content: code,
          },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data?.choices?.[0]?.message?.content;
    if (!message) return { result: '', error: 'No content in response' };

    return { result: message };
  } catch (err) {
    console.error('FixCode API Error:', err);
    return { result: '', error: 'Something went wrong while fixing code' };
  }
};

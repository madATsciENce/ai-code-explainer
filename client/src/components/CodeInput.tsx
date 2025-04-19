// src/components/CodeInput.tsx
import React from 'react';
import { explainCode } from '../services/groqService';

interface CodeInputProps {
  setExplanation: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  codeInput: string;
  setCodeInput: React.Dispatch<React.SetStateAction<string>>;
}

const CodeInput: React.FC<CodeInputProps> = ({
  setExplanation,
  setError,
  setIsLoading,
  codeInput,
  setCodeInput,
}) => {
  const handleSubmit = async () => {
    if (!codeInput.trim()) {
      setError('Please enter some code to explain');
      return;
    }

    setIsLoading(true);
    setError('');

    const { result, error } = await explainCode(codeInput);

    setIsLoading(false);

    if (error) {
      setError(error);
    } else {
      setExplanation(result);
    }
  };

  return (
    <div>
      <textarea
        value={codeInput}
        onChange={(e) => {
          setCodeInput(e.target.value);
          setError('');
        }}
        placeholder="Paste your code here..."
        className="w-full p-2 border border-gray-300 rounded"
        rows={10}
      />
      <button
        onClick={handleSubmit}
        disabled={!codeInput.trim()}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
      >
        Explain Code
      </button>
    </div>
  );
};

export default CodeInput;


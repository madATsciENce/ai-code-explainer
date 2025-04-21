import React from 'react';
import { explainCode, fixCode } from '../services/groqService';

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
  const handleExplain = async () => {
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

  const handleFix = async () => {
    if (!codeInput.trim()) {
      setError('Please enter some code to fix');
      return;
    }

    setIsLoading(true);
    setError('');

    const { result, error } = await fixCode(codeInput);

    setIsLoading(false);

    if (error) {
      setError(error);
    } else {
      setExplanation(result);
    }
  };

  return (
    <div className="editor">
      <textarea
        value={codeInput}
        onChange={(e) => {
          setCodeInput(e.target.value);
          setError('');
        }}
        placeholder="Paste or write your code here..."
        className="code-textarea"
        rows={10}
      />
      <div className="button-group">
        <button
          onClick={handleExplain}
          disabled={!codeInput.trim()}
          className="explain-btn"
        >
          Explain Code
        </button>
        <button
          onClick={handleFix}
          disabled={!codeInput.trim()}
          className="fix-btn"
        >
          Fix My Code
        </button>
      </div>
    </div>
  );
};

export default CodeInput;

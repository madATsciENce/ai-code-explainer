// src/App.tsx
import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import Explanation from './components/Explanation';
import { fixCode } from './services/groqService';
import CodeRunner from './components/CodeRunner';
import './App.css';


const App: React.FC = () => {
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [fixedResult, setFixedResult] = useState('');
  const [fixError, setFixError] = useState('');

  const handleFixCode = async () => {
    const { result, error } = await fixCode(codeInput);
    if (error) {
      setFixError(error);
      setFixedResult('');
    } else {
      setFixedResult(result);
      setFixError('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-2xl font-bold mb-4">AI-Powered Code Explainer</h1>

      <div className="mb-8">
        {/* Code Runner Component */}
        <CodeRunner />
      </div>

      <div className="mb-8">
        {/* Code Input Component */}
        <CodeInput 
          setExplanation={setExplanation}
          setError={setError}
          setIsLoading={setIsLoading}
          codeInput={codeInput}
          setCodeInput={setCodeInput}
        />
      </div>

      {/* Explanation Display */}
      <Explanation 
        explanation={explanation}
        error={error}
        isLoading={isLoading}
      />

      {/* Fix My Code Button */}
      <button onClick={handleFixCode} className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
        Fix My Code
      </button>

      {/* Fixed Code Output */}
      {fixError && <p className="text-red-600">{fixError}</p>}

      {fixedResult && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="font-bold mb-2">🔧 Fixed Code & Explanation:</h3>
          <pre className="whitespace-pre-wrap">{fixedResult}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

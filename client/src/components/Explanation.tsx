import React from 'react';

interface Props {
  explanation: string;
  error?: string;
  isLoading?: boolean;
}

const Explanation: React.FC<Props> = ({ explanation, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className="output">
        <p className="loading-text">
          ⏳ Loading<span className="dot-animation">...</span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="output">
        <h2 style={{ color: 'red' }}>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!explanation) {
    return null;
  }

  return (
    <div className="output">
      <h2>Code Output:</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{explanation}</pre>
    </div>
  );
};

export default Explanation;

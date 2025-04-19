// src/components/Explanation.tsx
import React from 'react';

interface Props {
  explanation: string;
  error?: string;
  isLoading?: boolean;
}

const Explanation: React.FC<Props> = ({ explanation, error, isLoading }) => {
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading explanation...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!explanation) {
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Code Explanation:</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{explanation}</pre>
    </div>
  );
};

export default Explanation;
